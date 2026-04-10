const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyOtp,
  resendOtp,
  getProfile
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// ================= ROUTES =================

// Register user + send OTP
router.post("/register", register);

// Verify OTP
router.post("/verify-otp", verifyOtp);

// Resend OTP
router.post("/resend-otp", resendOtp);

// Login (only after verification)
router.post("/login", login);

// Protected route (JWT required)
router.get("/profile", authMiddleware, getProfile);

module.exports = router;