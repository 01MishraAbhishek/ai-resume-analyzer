import { useState, useEffect } from "react";
import axios from "axios";

export default function Verify() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-fill email from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("verifyEmail");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleVerify = async () => {
    try {
      if (!email || !otp) {
        alert("Email aur OTP dono bharna hai ⚠️");
        return;
      }

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/verify-otp",
        { email, otp }
      );

      alert(res.data.message || "Verified ✅");

      // Clean storage
      localStorage.removeItem("verifyEmail");

      // Redirect to login
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.error ||
          "Verification failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      if (!email) {
        alert("Email required ⚠️");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/resend-otp",
        { email }
      );

      alert("OTP resent 📩");
    } catch (error) {
      console.error(error);
      alert("Failed to resend OTP ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="glass p-8 w-full max-w-md shadow-xl rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          🔐 Verify OTP
        </h2>

        {/* Email */}
        <input
          type="email"
          value={email}
          disabled
          className="w-full mb-4 px-4 py-2 rounded bg-gray-700 border border-gray-600"
        />

        {/* OTP */}
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
        />

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="btn w-full mb-3"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend */}
        <button
          onClick={handleResend}
          className="w-full text-blue-400 hover:underline"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}