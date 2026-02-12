export type ReportParameterStatus = "NORMAL" | "LOW" | "HIGH" | "N/A";
export type ReportFilterStatus = "all" | "NORMAL" | "LOW" | "HIGH";
export type BloodReportTrendType = "INCREASED" | "DECREASED" | "STABLE";

export interface BloodParameterSubParameter {
  label: string;
  description: string;
}

export interface ReportParameter {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: ReportParameterStatus;
  subParameters: BloodParameterSubParameter[] | null;
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
  overallSummary: string[];
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
