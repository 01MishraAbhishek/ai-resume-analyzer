const express = require("express");
const router = express.Router();
const { analyze } = require("../controllers/resumeController");
const auth = require("../middleware/authMiddleware");

router.post("/match", auth, analyze);

module.exports = router;