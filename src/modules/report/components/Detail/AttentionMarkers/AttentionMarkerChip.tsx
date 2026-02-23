import { TrendingDown, TrendingUp } from "lucide-react";
import type { ReportParameterStatus } from "../../../types";

interface Props {
  markerStatus: ReportParameterStatus;
  markerName: string;
}

export default function AttentionMarkerChip({
  markerStatus,
  markerName,
}: Props) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${
        markerStatus === "HIGH"
          ? "bg-red-50 border-red-200 text-red-700"
          : "bg-yellow-50 border-yellow-200 text-yellow-700"
      }`}
    >
      {markerStatus === "HIGH" ? (
        <TrendingUp className="w-3.5 h-3.5" />
      ) : (
        <TrendingDown className="w-3.5 h-3.5" />
      )}
      {markerName}
      <span
        className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
          markerStatus === "HIGH"
            ? "bg-red-100 text-red-600"
            : "bg-yellow-100 text-yellow-600"
        }`}
      >
        {markerStatus}
      </span>
    </div>
  );
}
