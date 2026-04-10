import { useState } from "react";
import { loginUser } from "../services/api";

export default function Login({ setToken, setShowLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("Email aur password dono bharna hai ⚠️");
        return;
      }

      setLoading(true);

      const data = await loginUser({ email, password });

      if (data?.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);

        alert("Login successful ✅");
      } else {
        alert(data?.error || "Login failed ❌");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(
        error?.response?.data?.error ||
          "Server error, please try again ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="glass p-8 w-full max-w-md shadow-xl rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">🔐 Login</h2>

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
          onClick={handleLogin}
          disabled={loading}
          className="btn w-full flex justify-center items-center gap-2"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => setShowLogin(false)}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}