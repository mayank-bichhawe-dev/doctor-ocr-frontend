import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, startTransition } from "react";

import Loader from "../../../../components/Loader";
import TabButton from "../../../../components/TabButton";
import ReportListHeader from "./ReportListHeader";
import ReportListTitle from "./ReportListTitle";
import ReportListFilterBar from "./ReportListFilterBar";
import ReportListEmpty from "./ReportListEmpty";
import ReportListCard from "./ReportListCard";
import ReportListTable from "./ReportListTable";

import axiosInstance from "../../../../interceptor";
import {
  getReportStatusCounts,
  setReportDetailsInLocalStorage,
} from "../../utils";
import type { CardAndTableViewMode } from "../../../../types";
import type { ReportFilterStatus, Report, ReportsApiRes } from "../../types";

const ReportsList = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [totalReports, setTotalReports] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<CardAndTableViewMode>("cards");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<ReportFilterStatus>("all");

  const fetchReports = () => {
    setLoading(true);
    axiosInstance
      .get<ReportsApiRes>("/report/list")
      .then((response) => {
        setReports(response.data.data);
        setTotalReports(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Filter reports
  const filteredReports = useMemo(() => {
    const data = reports
      .filter((report) => {
        const matchesSearch =
          report.patientName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          report.reportType.toLowerCase().includes(searchQuery.toLowerCase());

        if (filterStatus === "all") return matchesSearch;

        const hasStatus = report.parameters.some(
          (p) => p.status === filterStatus
        );
        return matchesSearch && hasStatus;
      })
      .map((report) => {
        return {
          ...report,
          statusCounts: getReportStatusCounts(report.parameters),
        };
      });

    startTransition(() => {
      setTotalReports(data.length);
    });

    return data;
  }, [reports, searchQuery, filterStatus]);

  const toggleViewMode = (viewMode: CardAndTableViewMode) => {
    setViewMode(viewMode);
  };

  const handleViewReport = (reportId: string) => {
    const report = filteredReports.find((report) => report.id === reportId);
    setReportDetailsInLocalStorage(report as Report);
    navigate(`/report/${reportId}`);
  };

  if (loading) {
    return <Loader message="Loading reports..." />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      <ReportListHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <ReportListTitle totalReports={totalReports} />

        <ReportListFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        <TabButton
          tabs={["cards", "table"]}
          viewMode={viewMode}
          onClick={(currViewMode) =>
            toggleViewMode(currViewMode as CardAndTableViewMode)
          }
        />

        {filteredReports.length === 0 ? (
          <ReportListEmpty />
        ) : viewMode === "cards" ? (
          <ReportListCard
            reports={filteredReports}
            handleViewReport={handleViewReport}
          />
        ) : (
          <ReportListTable
            reports={filteredReports}
            handleViewReport={handleViewReport}
          />
        )}
      </div>
    </div>
  );
};

export default ReportsList;
