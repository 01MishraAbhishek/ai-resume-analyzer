exports.analyze = async (req, res) => {
  res.json({
    matchScore: 75,
    presentSkills: ["Java", "React"],
    missingSkills: ["Docker"],
    suggestions: ["Add Docker"]
  });
};