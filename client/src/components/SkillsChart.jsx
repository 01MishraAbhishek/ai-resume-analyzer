import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SkillsChart({ skills = [] }) {
  return (
    <div className="glass p-6 rounded-xl shadow-lg">

      {/* Title */}
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        📊 Skill Analysis
      </h2>

      {/* Empty State */}
      {skills.length === 0 ? (
        <p className="text-gray-400 text-center">
          No skill data available
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={skills}
            margin={{ top: 10, right: 20, left: -10, bottom: 10 }}
          >
            {/* Grid */}
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />

            {/* X Axis */}
            <XAxis
              dataKey="name"
              stroke="#ccc"
              tick={{ fill: "#ccc", fontSize: 12 }}
            />

            {/* Y Axis */}
            <YAxis
              stroke="#ccc"
              tick={{ fill: "#ccc", fontSize: 12 }}
            />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            />

            {/* Bars */}
            <Bar
              dataKey="level"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}