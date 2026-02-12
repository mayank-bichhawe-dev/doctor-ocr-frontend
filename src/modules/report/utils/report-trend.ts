import type { BloodReportTrendType, ReportParameterStatus } from "../types";

export const getTrendBarColor = (trend: BloodReportTrendType): string => {
  switch (trend) {
    case "INCREASED":
      return "#3b82f6";
    case "DECREASED":
      return "#f97316";
    case "STABLE":
      return "#6b7280";
  }
};

export const getTrendColor = (trend: BloodReportTrendType): string => {
  switch (trend) {
    case "INCREASED":
      return "bg-blue-50 border-blue-200";
    case "DECREASED":
      return "bg-orange-50 border-orange-200";
    case "STABLE":
      return "bg-gray-50 border-gray-200";
  }
};

export const getTrendStatusBadge = (status: ReportParameterStatus): string => {
  const styles: Record<ReportParameterStatus, string> = {
    NORMAL: "bg-green-100 text-green-800",
    HIGH: "bg-red-100 text-red-800",
    LOW: "bg-yellow-100 text-yellow-800",
    "N/A": "bg-gray-100 text-gray-800",
  };
  return styles[status];
};
