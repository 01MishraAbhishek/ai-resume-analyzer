export default function ATSScore({ score = 0 }) {

  const getColor = () => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getMessage = () => {
    if (score >= 80) return "Excellent match 🔥";
    if (score >= 50) return "Good match 👍";
    return "Needs improvement ⚠️";
  };

  return (
    <div className="glass p-6 rounded-xl shadow-lg">

      {/* Title */}
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        🎯 ATS Match Score
      </h2>

      {/* Score Number */}
      <div className="text-3xl font-bold text-center mb-3">
        {score}%
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-6 overflow-hidden">

        <div
          className={`${getColor()} h-6 flex items-center justify-center text-xs font-semibold transition-all duration-700`}
          style={{ width: `${score}%` }}
        >
          {score}%
        </div>

      </div>

      {/* Feedback */}
      <p className="mt-4 text-sm text-gray-300 text-center">
        {getMessage()}
      </p>

    </div>
  );
}