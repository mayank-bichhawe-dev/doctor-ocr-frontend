import { useState } from "react";

import ReportDetailNotFound from "./ReportDetailNotFound";
import ReportDetailHeader from "./ReportDetailHeader";
import ReportDetailCardHeader from "./ReportDetailCardHeader";
import ReportDetailSummaryCard from "./ReportDetailSummaryCard";
import ReportDetailOverallSummary from "./ReportDetailOverallSummary";
import ReportDetailTableTabs from "./ReportDetailTableTabs";
import ReportDetailTableNoData from "./ReportDetailTableNoData";
import ReportDetailTable from "./ReportDetailTable";

import { getReportDetailsFromLocalStorage } from "../../utils";

export default function ReportDetail() {
  const report = getReportDetailsFromLocalStorage();
  const [activeTab, setActiveTab] = useState<"all" | "normal" | "abnormal">(
    "all"
  );

  const getStatusCounts = () => {
    if (!report) return { normal: 0, low: 0, high: 0, total: 0 };
    return {
      normal: report.parameters.filter((p) => p.status === "NORMAL").length,
      low: report.parameters.filter((p) => p.status === "LOW").length,
      high: report.parameters.filter((p) => p.status === "HIGH").length,
      total: report.parameters.length,
    };
  };

  const getFilteredParameters = () => {
    if (!report) return [];
    if (activeTab === "all") return report.parameters;
    if (activeTab === "normal")
      return report.parameters.filter((p) => p.status === "NORMAL");
    return report.parameters.filter(
      (p) => p.status === "HIGH" || p.status === "LOW"
    );
  };

  if (!report) {
    return <ReportDetailNotFound />;
  }

  const statusCounts = getStatusCounts();
  const filteredParams = getFilteredParameters();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <ReportDetailHeader />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Report Header Card */}
        <ReportDetailCardHeader report={report} />

        {/* Summary Cards */}
        <ReportDetailSummaryCard />

        {/* Overall Summary */}
        <ReportDetailOverallSummary
          overallSummary={report.overallSummary}
          disclaimer={report.disclaimer}
        />

        {/* Parameters Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tab Filter */}
          <ReportDetailTableTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            statusCounts={statusCounts}
          />
          {/* Parameters Table */}
          <ReportDetailTable filteredParams={filteredParams} />

          {filteredParams.length === 0 && <ReportDetailTableNoData />}
        </div>
      </div>
    </div>
  );
}
