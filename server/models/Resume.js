const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({

  score: Number,

  skills: [String],

  suggestions: [String],

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Resume", ResumeSchema);