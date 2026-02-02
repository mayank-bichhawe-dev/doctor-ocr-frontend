import type {
  BloodReportTrendType,
  ReportParameterStatus,
} from "./report.type";

export interface BloodReportTrend {
  name: string;
  previousValue: string;
  currentValue: string;
  unit: string;
  trend: BloodReportTrendType;
  referenceRange: string;
  status: ReportParameterStatus;
}

export interface ReportTrendsApiRes {
  from: string;
  to: string;
  trends: BloodReportTrend[];
}
