import type { ReportParameter } from "../types";

export const getReportStatusCounts = (parameters: ReportParameter[]) => {
  let normal = 0;
  let low = 0;
  let high = 0;
  parameters.forEach((p) => {
    if (p.status === "NORMAL") normal++;
    if (p.status === "LOW") low++;
    if (p.status === "HIGH") high++;
  });
  return { normal, low, high };
};
