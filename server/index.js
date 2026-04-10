require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

// ================= DB CONNECT =================
connectDB();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================

// 🔐 Auth routes
app.use("/api", authRoutes); 
// 👉 now: /api/login, /api/register, /api/verify-otp

// 📄 Resume routes
app.use("/api", resumeRoutes); 
// 👉 now: /api/match, /api/profile etc.

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

// ================= SERVER START =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);