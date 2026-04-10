export default function Suggestions({ suggestions = [] }) {
  return (
    <div className="glass p-6 rounded-xl shadow-lg">

      {/* Title */}
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        💡 Improvement Suggestions
      </h2>

      {/* Empty State */}
      {suggestions.length === 0 ? (
        <p className="text-gray-400 text-center">
          No suggestions available
        </p>
      ) : (
        <div className="space-y-3">
          {suggestions.map((s, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-gray-800 p-4 rounded-lg hover:shadow-md hover:scale-[1.02] transition"
            >
              <span className="text-blue-400 text-lg">💡</span>

              <p className="text-gray-200 leading-relaxed">
                {s}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}