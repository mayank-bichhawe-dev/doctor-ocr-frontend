import type { Report } from "../types";

export const setReportDetailsInLocalStorage = (report: Report) => {
  localStorage.setItem("report-details", JSON.stringify(report));
};

export const getReportDetailsFromLocalStorage = () => {
  const report = localStorage.getItem("report-details");
  const parsedReport = report ? JSON.parse(report) : null;
  return parsedReport as Report;
};
