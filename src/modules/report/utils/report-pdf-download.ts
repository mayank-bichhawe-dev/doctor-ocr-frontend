import jsPDF from "jspdf";
import { getReportDetailsFromLocalStorage } from "./index";
import type { ReportParameter } from "../types";

// --- Theme Constants ---
const THEME = {
  primary: "#4F46E5", // Indigo 600
  secondary: "#4338CA", // Indigo 700
  accent: "#EEF2FF", // Indigo 50
  text: {
    primary: "#1F2937", // Gray 800
    secondary: "#4B5563", // Gray 600
    light: "#9CA3AF", // Gray 400
    white: "#FFFFFF",
  },
  status: {
    high: "#DC2626", // Red 600
    low: "#EA580C", // Orange 600
    normal: "#16A34A", // Green 600
    "N/A": "#6B7280", // Gray 500
  },
  border: "#E5E7EB", // Gray 200
  table: {
    headerBg: "#4F46E5",
    headerText: "#FFFFFF",
    rowEven: "#FFFFFF",
    rowOdd: "#F9FAFB", // Gray 50
  },
};

export function reportPdfDownload() {
  try {
    const report = getReportDetailsFromLocalStorage();
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10; // Narrow margin

    // Helper: Draw Activity Icon (Heartbeat pulse)
    const drawActivityIcon = (x: number, y: number, size: number) => {
      doc.setDrawColor(THEME.primary);
      doc.setLineWidth(0.8);
      // Activity icon coordinates relative to a 24x24 grid, scaled to size
      // SVG path approximation: M22 12h-4l-3 9L9 3l-3 9H2
      const scale = size / 24;

      const points = [
        [2, 12],
        [6, 12],
        [9, 21],
        [15, 3],
        [18, 12],
        [22, 12],
      ];

      for (let i = 0; i < points.length - 1; i++) {
        doc.line(
          x + points[i][0] * scale,
          y + points[i][1] * scale,
          x + points[i + 1][0] * scale,
          y + points[i + 1][1] * scale,
        );
      }
    };

    // Helper: Draw Header
    const drawHeader = () => {
      // Header Background Strip
      doc.setFillColor(THEME.accent);
      doc.rect(0, 0, pageWidth, 40, "F");

      // Brand Logo Container
      doc.setFillColor(THEME.table.rowEven);
      doc.roundedRect(margin, 10, 12, 12, 3, 3, "F"); // White box

      // Draw Vector Icon centered in the box
      // Box is 12x12 at (margin, 10). Center is (margin+6, 16).
      // Icon size ~8 for padding. Top-left of icon should be around (margin+2, 12)
      drawActivityIcon(margin + 2, 12, 8);

      // Brand Name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(THEME.primary);
      doc.text("Doctor OCR", margin + 18, 19);

      // Report Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(THEME.text.primary);
      doc.text("BLOOD REPORT", pageWidth - margin, 20, { align: "right" });

      // Separator Line
      doc.setDrawColor(THEME.primary);
      doc.setLineWidth(0.5);
      doc.line(margin, 40, pageWidth - margin, 40);
    };

    // Helper: Draw Footer
    const drawFooter = (pageNo: number) => {
      const footerY = pageHeight - 15;

      doc.setDrawColor(THEME.border);
      doc.setLineWidth(0.1);
      doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(THEME.text.light);

      doc.text(
        `Generated on ${new Date().toLocaleDateString()} | Report ID: ${
          report.id
        }`,
        margin,
        footerY,
      );

      doc.text(`Page ${pageNo}`, pageWidth - margin, footerY, {
        align: "right",
      });
    };

    // --- Content Generation ---
    drawHeader();

    let yPos = 55;

    // Patient Details Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(THEME.primary);
    doc.text("PATIENT DETAILS", margin, yPos);

    yPos += 8;

    // Draw Patient Info Box
    const boxHeight = 35;
    doc.setDrawColor(THEME.border);
    doc.setFillColor(THEME.table.rowOdd);
    doc.roundedRect(
      margin,
      yPos,
      pageWidth - margin * 2,
      boxHeight,
      3,
      3,
      "FD",
    );

    // Info Grid
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(THEME.text.secondary);

    const leftColX = margin + 5;
    const rightColX = pageWidth / 2 + 5;
    const rowGap = 10;
    let localY = yPos + 10;

    // Row 1
    doc.text("Patient Name:", leftColX, localY);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(THEME.text.primary);
    doc.text(report.patientName, leftColX + 30, localY);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(THEME.text.secondary);
    doc.text("Report Date:", rightColX, localY);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(THEME.text.primary);
    doc.text(report.reportDate, rightColX + 25, localY);

    localY += rowGap;

    // Row 2
    doc.setFont("helvetica", "normal");
    doc.setTextColor(THEME.text.secondary);
    doc.text("Age / Gender:", leftColX, localY);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(THEME.text.primary);
    doc.text(`${report.age} / ${report.gender}`, leftColX + 30, localY);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(THEME.text.secondary);
    doc.text("Report Type:", rightColX, localY);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(THEME.text.primary);
    doc.text(report.reportType, rightColX + 25, localY);

    yPos += boxHeight + 15;

    // Parameters Table Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(THEME.primary);
    doc.text("TEST RESULTS", margin, yPos);
    yPos += 8;

    // Table Config
    const headerHeight = 10;
    const rowHeight = 10;

    // Dynamic column widths based on available width
    const availableWidth = pageWidth - margin * 2;
    // Ratios: Name(35%), Result(15%), Unit(15%), Ref(20%), Status(15%)
    const colWidths = [
      availableWidth * 0.35,
      availableWidth * 0.15,
      availableWidth * 0.15,
      availableWidth * 0.2,
      availableWidth * 0.15,
    ];

    const colX = [
      margin,
      margin + colWidths[0],
      margin + colWidths[0] + colWidths[1],
      margin + colWidths[0] + colWidths[1] + colWidths[2],
      margin + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3],
    ];

    // Draw Table Header
    doc.setFillColor(THEME.table.headerBg);
    doc.rect(margin, yPos, availableWidth, headerHeight, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(THEME.table.headerText);

    doc.text("TEST PARAMETER", colX[0] + 2, yPos + 6);
    doc.text("RESULT", colX[1] + 2, yPos + 6);
    doc.text("UNIT", colX[2] + 2, yPos + 6);
    doc.text("REF. RANGE", colX[3] + 2, yPos + 6);
    doc.text("STATUS", colX[4] + 2, yPos + 6);

    yPos += headerHeight;

    // Draw Table Rows
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    report.parameters.forEach((param: ReportParameter, index: number) => {
      // Check for page break
      if (yPos > pageHeight - 30) {
        drawFooter(doc.getCurrentPageInfo().pageNumber);
        doc.addPage();
        drawHeader();
        yPos = 50; // Reset Y for new page

        // Redraw Header on new page
        doc.setFillColor(THEME.table.headerBg);
        doc.rect(margin, yPos, availableWidth, headerHeight, "F");
        doc.setFont("helvetica", "bold");
        doc.setTextColor(THEME.table.headerText);
        doc.text("TEST PARAMETER", colX[0] + 2, yPos + 6);
        doc.text("RESULT", colX[1] + 2, yPos + 6);
        doc.text("UNIT", colX[2] + 2, yPos + 6);
        doc.text("REF. RANGE", colX[3] + 2, yPos + 6);
        doc.text("STATUS", colX[4] + 2, yPos + 6);
        yPos += headerHeight;
        doc.setFont("helvetica", "normal");
      }

      // Row Background
      if (index % 2 === 0) {
        doc.setFillColor(THEME.table.rowOdd);
      } else {
        doc.setFillColor(THEME.table.rowEven);
      }
      doc.rect(margin, yPos, availableWidth, rowHeight, "F");

      // Text Colors
      doc.setTextColor(THEME.text.primary);
      doc.text(param.name.substring(0, 30), colX[0] + 2, yPos + 6);
      doc.text(param.value, colX[1] + 2, yPos + 6);
      doc.text(param.unit || "-", colX[2] + 2, yPos + 6);
      doc.text(param.referenceRange || "-", colX[3] + 2, yPos + 6);

      // Status Badge
      let statusColor = THEME.status["N/A"];
      const statusUpper = param.status.toUpperCase();
      if (statusUpper === "HIGH") statusColor = THEME.status.high;
      else if (statusUpper === "LOW") statusColor = THEME.status.low;
      else if (statusUpper === "NORMAL") statusColor = THEME.status.normal;

      doc.setTextColor(statusColor);
      doc.setFont("helvetica", "bold");
      doc.text(param.status, colX[4] + 2, yPos + 6);
      doc.setFont("helvetica", "normal");

      // Bottom Border
      doc.setDrawColor(THEME.border);
      doc.line(margin, yPos + rowHeight, pageWidth - margin, yPos + rowHeight);

      yPos += rowHeight;
    });

    if (report.overallSummary) {
      yPos += 15;

      // Page break check for summary heading
      if (yPos > pageHeight - 40) {
        drawFooter(doc.getCurrentPageInfo().pageNumber);
        doc.addPage();
        drawHeader();
        yPos = 50;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(THEME.primary);
      doc.text("SUMMARY", margin, yPos);
      yPos += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(THEME.text.secondary);

      const bulletIndent = margin + 6;
      const textMaxWidth = pageWidth - bulletIndent - margin;

      report.overallSummary.forEach((point) => {
        // Page break check for each bullet point
        if (yPos > pageHeight - 20) {
          drawFooter(doc.getCurrentPageInfo().pageNumber);
          doc.addPage();
          drawHeader();
          yPos = 50;
        }

        // Draw bullet dot
        doc.text("\u2022", margin, yPos);

        // Wrap long text and draw indented
        const splitLine = doc.splitTextToSize(point, textMaxWidth);
        doc.text(splitLine, bulletIndent, yPos);
        yPos += splitLine.length * 5 + 3;
      });

      yPos += 5;
    }

    // --- Disclaimer Section ---
    // Always push disclaimer to near bottom of current page content, or new page if no space
    if (yPos > pageHeight - 30) {
      drawFooter(doc.getCurrentPageInfo().pageNumber);
      doc.addPage();
      drawHeader();
      yPos = 50;
    } else {
      yPos += 10;
    }

    // Draw Disclaimer Box/Text
    doc.setDrawColor(THEME.border);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 5;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(THEME.text.light);
    doc.text("DISCLAIMER:", margin, yPos);

    doc.setFont("helvetica", "normal");
    const disclaimerText =
      report.disclaimer ||
      "This report is generated by AI and should be verified by a certified medical professional. Not for definitive medical diagnosis.";
    const splitDisclaimer = doc.splitTextToSize(
      disclaimerText,
      pageWidth - margin * 2 - 20,
    ); // slightly narrower
    doc.text(splitDisclaimer, margin + 20, yPos);

    // Final Footer
    drawFooter(doc.getCurrentPageInfo().pageNumber);

    doc.save(`doctor-ocr-report-${report.id}.pdf`);
  } catch (error) {
    console.error("PDF download error:", error);
    alert("Failed to download PDF. Please try again.");
  }
}
