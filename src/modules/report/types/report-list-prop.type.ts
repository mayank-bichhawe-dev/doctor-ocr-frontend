import type { Report } from "./report.type";

export interface ReportListProps {
  reports: Report[];
  handleViewReport: (reportId: string) => void;
}
