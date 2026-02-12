import { useEffect, useState } from "react";
import ReportTrendHeader from "./ReportTrendHeader";
import ReportTrendTitle from "./ReportTrendTitle";
import ReportTrendLegendCard from "./ReportTrendLegendCard";
import ReportTrendGraph from "./ReportTrendGraph";
import ReportTrendCard from "./ReportTrendCard";
import ReportTrendSummaryStats from "./ReportTrendSummaryStats";
import type { BloodReportTrend, ReportTrendsApiRes } from "../../types";
import axiosInstance from "../../../../interceptor";
import type { CardAndGraphViewMode } from "../../../../types";

function trendStatsCount(trends: BloodReportTrend[]) {
  let increasedCount = 0;
  let decreasedCount = 0;
  let stableCount = 0;

  for (const trend of trends) {
    if (trend.trend === "INCREASED") {
      increasedCount++;
    } else if (trend.trend === "DECREASED") {
      decreasedCount++;
    } else {
      stableCount++;
    }
  }
  return {
    increasedCount,
    decreasedCount,
    stableCount,
  };
}

export default function ReportTrends() {
  const [viewMode, setViewMode] = useState<CardAndGraphViewMode>("cards");
  const [trends, setTrends] = useState<BloodReportTrend[]>([]);

  useEffect(() => {
    fetchReportTrends();
  }, []);

  function fetchReportTrends() {
    axiosInstance
      .get<ReportTrendsApiRes>(`/report/trends`)
      .then((res) => {
        setTrends(res.data.trends);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const { increasedCount, decreasedCount, stableCount } =
    trendStatsCount(trends);
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header - Matching theme */}
      <ReportTrendHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title & Description */}
        <ReportTrendTitle />

        {/* View Toggle & Legend Card */}
        <ReportTrendLegendCard
          viewMode={viewMode}
          onChangeViewMode={(currViewMode: string) =>
            setViewMode(currViewMode as CardAndGraphViewMode)
          }
        />

        {/* Graph View */}
        {viewMode === "graph" && <ReportTrendGraph chartData={trends} />}

        {/* Cards View */}
        {viewMode === "cards" && <ReportTrendCard trends={trends} />}

        {/* Summary Stats */}
        <ReportTrendSummaryStats
          increasedCount={increasedCount}
          decreasedCount={decreasedCount}
          stableCount={stableCount}
        />
      </div>
    </div>
  );
}
