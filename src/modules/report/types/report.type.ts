export type ReportParameterStatus = "NORMAL" | "LOW" | "HIGH" | "UNKNOWN";
export type ReportFilterStatus = "all" | "NORMAL" | "LOW" | "HIGH";
export type BloodReportTrendType = "INCREASED" | "DECREASED" | "STABLE";

export interface ReportParameter {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: ReportParameterStatus;
}

export interface ReportParameterCounts {
  normal: number;
  low: number;
  high: number;
}

export interface Report {
  id: string;
  patientName: string;
  age: string;
  gender: string;
  reportType: string;
  reportDate: string;
  parameters: ReportParameter[];
  overallSummary: string;
  disclaimer: string;
  createdAt: string;
  updatedAt: string;
  statusCounts: ReportParameterCounts;
}

export interface ReportsApiRes {
  success: boolean;
  count: number;
  data: Report[];
}

export interface ReportUploadApiRes {
  success: boolean;
  data: Report;
}
