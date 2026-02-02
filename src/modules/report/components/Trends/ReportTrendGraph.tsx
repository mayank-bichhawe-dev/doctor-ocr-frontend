import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getTrendBarColor } from "../../utils";
import type { BloodReportTrend } from "../../types";

interface Props {
  chartData: BloodReportTrend[];
}

export default function ReportTrendGraph({ chartData }: Props) {
  return (
    <div className="space-y-6">
      {/* Bar Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Comparison Bar Chart
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fill: "#4b5563", fontSize: 12 }}
            />
            <YAxis tick={{ fill: "#4b5563" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Bar dataKey="previousValue" fill="#94a3b8" radius={[8, 8, 0, 0]} />
            <Bar dataKey="currentValue" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getTrendBarColor(entry.trend)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Trend Line Chart
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fill: "#4b5563", fontSize: 12 }}
            />
            <YAxis tick={{ fill: "#4b5563" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Line
              type="monotone"
              dataKey="previousValue"
              stroke="#94a3b8"
              strokeWidth={3}
              dot={{ r: 6, fill: "#94a3b8" }}
            />
            <Line
              type="monotone"
              dataKey="currentValue"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 6, fill: "#6366f1" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as BloodReportTrend;
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-800 mb-2">{data.name}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value} {data.unit}
          </p>
        ))}
      </div>
    );
  }
  return null;
};
