const fs = require("fs");
const pdf = require("pdf-parse");

const parseResumePDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);

    const data = await pdf(dataBuffer);

    return data.text;
  } catch (error) {
    console.error("PDF Parsing Error:", error);
    throw error;
  }
};

module.exports = parseResumePDF;