import { Activity, BarChart3 } from "lucide-react";

interface Props {
  viewMode: string;
  onChangeViewMode: (viewMode: string) => void;
}

export default function ReportTrendLegendCard({
  viewMode,
  onChangeViewMode,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-600">Increased</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-gray-600">Decreased</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span className="text-gray-600">Stable</span>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => onChangeViewMode("cards")}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
              viewMode === "cards"
                ? "bg-white shadow-md text-indigo-600"
                : "text-gray-600"
            }`}
          >
            <Activity className="w-4 h-4" />
            Cards
          </button>
          <button
            onClick={() => onChangeViewMode("graph")}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
              viewMode === "graph"
                ? "bg-white shadow-md text-indigo-600"
                : "text-gray-600"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Graphs
          </button>
        </div>
      </div>
    </div>
  );
}
