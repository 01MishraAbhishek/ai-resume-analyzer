import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard({ setShowDashboard, handleLogout }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 📡 Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);
      } catch (error) {
        console.error(error);
        alert("Session expired ❌");
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      
      <div className="glass p-8 max-w-4xl mx-auto rounded-2xl shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">📊 Dashboard</h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Logout 🚪
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-gray-400">Loading profile...</p>
        ) : (
          <>
            {/* User Info */}
            <div className="bg-gray-800 p-4 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-2">👤 Profile</h2>
              <p>Email: {user?.email}</p>
            </div>

            {/* Stats Section */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <h3 className="text-lg font-semibold">📄 Resumes</h3>
                <p className="text-2xl mt-2">0</p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <h3 className="text-lg font-semibold">⭐ Avg Score</h3>
                <p className="text-2xl mt-2">--</p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <h3 className="text-lg font-semibold">📈 Improvements</h3>
                <p className="text-2xl mt-2">--</p>
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={() => setShowDashboard(false)}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
            >
              ⬅ Back to Analyzer
            </button>
          </>
        )}
      </div>
    </div>
  );
}