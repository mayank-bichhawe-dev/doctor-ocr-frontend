import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { getTrendColor, getTrendStatusBadge } from "../../utils";
import type { BloodReportTrend, BloodReportTrendType } from "../../types";

interface ChangeCalculation {
  diff: string;
  percent: string;
}

interface Props {
  trends: BloodReportTrend[];
}

const getTrendIcon = (trend: BloodReportTrendType) => {
  switch (trend) {
    case "INCREASED":
      return <TrendingUp className="w-5 h-5 text-blue-500" />;
    case "DECREASED":
      return <TrendingDown className="w-5 h-5 text-orange-500" />;
    case "STABLE":
      return <Minus className="w-5 h-5 text-gray-500" />;
  }
};

export default function ReportTrendCard({ trends }: Props) {
  const calculateChange = (prev: string, curr: string): ChangeCalculation => {
    const prevNum = parseFloat(prev);
    const currNum = parseFloat(curr);
    const diff = currNum - prevNum;
    const percentChange = ((diff / prevNum) * 100).toFixed(1);
    const data = { diff: diff.toFixed(2), percent: percentChange };
    return data;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trends.map((item, index) => {
        const change = calculateChange(item.previousValue, item.currentValue);
        return (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-md border-2 ${getTrendColor(
              item.trend
            )} p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <span
                  className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getTrendStatusBadge(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>
              <div className="bg-white rounded-lg p-2 shadow-sm">
                {getTrendIcon(item.trend)}
              </div>
            </div>

            {/* Values Comparison */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Previous:</span>
                <span className="text-lg font-medium text-gray-700">
                  {item.previousValue} {item.unit}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Current:</span>
                <span className="text-xl font-bold text-gray-900">
                  {item.currentValue} {item.unit}
                </span>
              </div>
            </div>

            {/* Change Indicator */}
            <div className="border-t pt-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Change:</span>
                <span
                  className={`font-semibold ${
                    item.trend === "INCREASED"
                      ? "text-blue-600"
                      : item.trend === "DECREASED"
                      ? "text-orange-600"
                      : "text-gray-600"
                  }`}
                >
                  {parseFloat(change.diff) > 0 ? "+" : ""}
                  {change.diff}({parseFloat(change.percent) > 0 ? "+" : ""}
                  {change.percent}%)
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Reference: {item.referenceRange} {item.unit}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
