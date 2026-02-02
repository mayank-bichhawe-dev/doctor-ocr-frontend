import * as XLSX from "xlsx";
import { getReportDetailsFromLocalStorage } from "./index";

export function reportExcelDownload() {
  try {
    const report = getReportDetailsFromLocalStorage();
    const worksheetData = [
      ["Blood Report"],
      [],
      ["Patient Name", report.patientName],
      ["Age", report.age],
      ["Gender", report.gender],
      ["Report Type", report.reportType],
      ["Report Date", report.reportDate],
      [],
      ["Parameter", "Value", "Unit", "Reference Range", "Status"],
      ...report.parameters.map((p: any) => [
        p.name,
        p.value,
        p.unit,
        p.referenceRange,
        p.status,
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Blood Report");

    XLSX.writeFile(workbook, `blood-report-${report.id}.xlsx`);
  } catch (error) {
    console.error("Excel download error:", error);
    alert("Failed to download Excel. Please try again.");
  }
}
