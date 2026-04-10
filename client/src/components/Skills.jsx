export default function Skills({ present = [], missing = [] }) {
  return (
    <div className="glass p-6 rounded-xl shadow-lg">

      {/* Title */}
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        🛠 Skills Analysis
      </h2>

      {/* Empty State */}
      {present.length === 0 && missing.length === 0 ? (
        <p className="text-gray-400 text-center">
          No skills data available
        </p>
      ) : (
        <>
          {/* Present Skills */}
          <div className="mb-5">
            <h3 className="text-green-400 font-medium mb-2">
              ✔ Present Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {present.length > 0 ? (
                present.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm hover:scale-105 transition"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 text-sm">
                  No present skills found
                </p>
              )}
            </div>
          </div>

          {/* Missing Skills */}
          <div>
            <h3 className="text-red-400 font-medium mb-2">
              ❌ Missing Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {missing.length > 0 ? (
                missing.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm hover:scale-105 transition"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 text-sm">
                  No missing skills 🎉
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}