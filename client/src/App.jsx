import { useState, useEffect } from "react";
import Login from "./components/Login";
import Verify from "./components/Verify";
import Register from "./components/Register";
import UploadResume from "./components/UploadResume";
import ATSScore from "./components/ATSScore";
import Skills from "./components/Skills";
import Suggestions from "./components/Suggestions";
import SkillsChart from "./components/SkillsChart";
import Dashboard from "./pages/Dashboard";
import { generatePDF } from "./utils/generatePDF";

function App() {
  const [result, setResult] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);

  // 🔄 Sync token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("verifyEmail"); // cleanup
    setToken(null);
    setShowDashboard(false);
    setResult(null);
  };

  // 🔐 AUTH FLOW (FIXED 🔥)
  if (!token) {
    const path = window.location.pathname;

    // 👉 Verify Page
    if (path === "/verify") {
      return <Verify />;
    }

    // 👉 Login / Register
    return showLogin ? (
      <Login setToken={setToken} setShowLogin={setShowLogin} />
    ) : (
      <Register setShowLogin={setShowLogin} />
    );
  }

  // 📊 Dashboard
  if (showDashboard) {
    return (
      <Dashboard
        setShowDashboard={setShowDashboard}
        handleLogout={handleLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="text-left">
          <h1 className="text-3xl md:text-4xl font-bold">
            🚀 AI Resume Analyzer
          </h1>
          <p className="text-gray-400 mt-2">
            Smart Resume Analysis with AI + ATS Matching
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowDashboard(true)}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg shadow transition"
          >
            Dashboard 📊
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow transition"
          >
            Logout 🚪
          </button>
        </div>
      </div>

      {/* Upload Section */}
      <div className="flex justify-center mb-12">
        <div className="glass p-6 w-full max-w-2xl">
          <UploadResume setResult={setResult} />
        </div>
      </div>

      {/* Result Section */}
      {result ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="hover:scale-105 transition">
              <ATSScore score={result.matchScore || 0} />
            </div>

            <div className="hover:scale-105 transition">
              <Skills
                present={result.presentSkills || []}
                missing={result.missingSkills || []}
              />
            </div>

            <div className="hover:scale-105 transition">
              <SkillsChart skills={result.skills || []} />
            </div>

            <div className="md:col-span-2 lg:col-span-3 hover:scale-105 transition">
              <Suggestions suggestions={result.suggestions || []} />
            </div>
          </div>

          {/* PDF Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => generatePDF(result)}
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg shadow transition"
            >
              Download PDF 📄
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-400 mt-10">
          Upload your resume to see AI analysis 🚀
        </p>
      )}
    </div>
  );
}

export default App;