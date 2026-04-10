import { useState } from "react";
import axios from "axios";

export default function Register({ setShowLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      if (!email || !password) {
        alert("Email aur password dono bharna hai ⚠️");
        return;
      }

      if (password.length < 8) {
        alert("Password minimum 8 characters ka hona chahiye ⚠️");
        return;
      }

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/register",
        {
          email,
          password,
        }
      );

      alert("OTP sent to your email 📩");

      // 👉 Important: Verify page pe bhejo
      localStorage.setItem("verifyEmail", email);
      window.location.href = "/verify";

    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.error ||
          "Registration failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="glass p-8 w-full max-w-md shadow-xl rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          📝 Register
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
        />

        {/* Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="btn w-full flex justify-center items-center"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Login Link */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => setShowLogin(true)}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}