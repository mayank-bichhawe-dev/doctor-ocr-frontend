import { useEffect, useState } from "react";
import ReportTrendHeader from "./ReportTrendHeader";
import ReportTrendTitle from "./ReportTrendTitle";
import ReportTrendLegendCard from "./ReportTrendLegendCard";
import ReportTrendGraph from "./ReportTrendGraph";
import ReportTrendCard from "./ReportTrendCard";
import ReportTrendSummaryStats from "./ReportTrendSummaryStats";
import type { BloodReportTrend, ReportTrendsApiRes } from "../../types";
import axios from "axios";
import { useParams } from "react-router-dom";

type ViewMode = "cards" | "graph";
const BASE_URL = "http://localhost:3000";

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
  const { patientId } = useParams();
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [trends, setTrends] = useState<BloodReportTrend[]>([]);
  const [comparisonDates, setComparisonDates] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    if (patientId) {
      fetchReportTrends(patientId);
    }
  }, [patientId]);

  function fetchReportTrends(id: string) {
    axios
      .get<ReportTrendsApiRes>(`${BASE_URL}/report/trends/${id}`)
      .then((res) => {
        setTrends(res.data.trends);
        setComparisonDates({
          start: res.data.from,
          end: res.data.to,
        });
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
      <ReportTrendHeader patientId={patientId as string} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title & Description */}
        <ReportTrendTitle />

        {/* View Toggle & Legend Card */}
        <ReportTrendLegendCard
          viewMode={viewMode}
          onChangeViewMode={(currViewMode: string) =>
            setViewMode(currViewMode as ViewMode)
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
