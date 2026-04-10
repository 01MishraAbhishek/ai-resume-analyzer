const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Email Function
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: `"AI Resume Analyzer" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,

      // Optional HTML (better UI email)
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Email Verification</h2>
          <p>${text}</p>
          <p style="color: gray;">This OTP will expire in 5 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent to:", to);
  } catch (error) {
    console.error("❌ Email error:", error.message);
    throw new Error("Email not sent");
  }
};

module.exports = sendEmail;