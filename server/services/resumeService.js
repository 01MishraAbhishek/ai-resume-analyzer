const parseResumePDF = require("../utils/pdfParser");
const Resume = require("../models/Resume");
const analyzeResumeWithAI = require("./aiService");

const analyzeResume = async (filePath) => {

  try {

    // PDF parse
    const resumeText = await parseResumePDF(filePath);

    // AI analysis
    const aiAnalysis = await analyzeResumeWithAI(resumeText);

    const text = resumeText.toLowerCase();

    // Skill keywords
    const keywords = [
      "java",
      "javascript",
      "react",
      "node",
      "mongodb",
      "sql",
      "python",
      "html",
      "css",
      "aws"
    ];

    // Skill detection
    const matchedSkills = keywords.filter(skill =>
      text.includes(skill)
    );

    // ATS score
    const score = Math.min(100, matchedSkills.length * 10);

    const suggestions = [
      "Add more projects",
      "Improve resume formatting"
    ];

    // Save result in MongoDB
    await Resume.create({
      score,
      skills: matchedSkills,
      suggestions,
      aiAnalysis
    });

    // Return result
    return {
      score,
      skills: matchedSkills,
      suggestions,
      aiAnalysis
    };

  } catch (error) {

    console.error("Resume analysis error:", error);
    throw error;

  }

};

module.exports = analyzeResume;