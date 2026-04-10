const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const analyzeResumeWithAI = async (resumeText) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert ATS resume analyzer. Always return JSON format only.",
        },
        {
          role: "user",
          content: `
Analyze this resume and return STRICT JSON format like:

{
  "matchScore": number,
  "presentSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "suggestions": ["suggestion1", "suggestion2"]
}

Resume:
${resumeText}
          `,
        },
      ],
      max_tokens: 500,
      temperature: 0.5,
    });

    let response = completion.choices[0].message.content;

    // 🧠 Clean response (sometimes AI adds extra text)
    response = response.replace(/```json|```/g, "").trim();

    // ✅ Parse JSON safely
    try {
      return JSON.parse(response);
    } catch (err) {
      console.error("JSON Parse Error:", err.message);

      // fallback
      return {
        matchScore: 50,
        presentSkills: [],
        missingSkills: [],
        suggestions: ["Unable to parse AI response"],
      };
    }

  } catch (error) {
    console.error("OpenAI Error:", error.message);

    return {
      matchScore: 0,
      presentSkills: [],
      missingSkills: [],
      suggestions: ["AI analysis failed"],
    };
  }
};

module.exports = analyzeResumeWithAI;