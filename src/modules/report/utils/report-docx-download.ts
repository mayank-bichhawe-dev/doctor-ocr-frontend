import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableCell,
  TableRow,
  WidthType,
  AlignmentType,
  BorderStyle,
  ShadingType,
  Footer,
} from "docx";
import { formatDate } from "../../../utils";
import { getReportDetailsFromLocalStorage } from "./index";
import type { Report } from "../types";

const safeText = (value: any): string =>
  value === null || value === undefined || value === "" ? "-" : String(value);

const getStatusColor = (status: string) => {
  switch (status) {
    case "HIGH":
      return "DC2626"; // red-600
    case "LOW":
      return "F59E0B"; // amber-500
    case "NORMAL":
      return "10B981"; // emerald-500
    default:
      return "6B7280"; // gray-500
  }
};

const getRowShading = (status: string) => {
  switch (status) {
    case "HIGH":
      return "FEE2E2"; // red-100
    case "LOW":
      return "FEF3C7"; // amber-100
    case "NORMAL":
      return "D1FAE5"; // emerald-100
    default:
      return "F3F4F6"; // gray-100
  }
};

export async function reportDocxDownload() {
  try {
    const report: Report = getReportDetailsFromLocalStorage();

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440, // 1 inch
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          footers: {
            default: new Footer({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 200 },
                  border: {
                    top: {
                      color: "E5E7EB",
                      space: 1,
                      style: BorderStyle.SINGLE,
                      size: 6,
                    },
                  },
                  children: [
                    new TextRun({
                      text: "This is an electronically generated report and does not require a physical signature.",
                      size: 18,
                      color: "6B7280",
                      italics: true,
                    }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: "Doctor OCR - Intelligent Blood Report Analysis",
                      size: 16,
                      color: "6366F1",
                      bold: true,
                    }),
                  ],
                }),
              ],
            }),
          },
          children: [
            // ===== HEADER WITH BRANDING =====
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
              shading: {
                type: ShadingType.CLEAR,
                fill: "6366F1", // Indigo-600
              },
              children: [
                new TextRun({
                  text: "DOCTOR OCR",
                  bold: true,
                  size: 32,
                  color: "FFFFFF",
                }),
              ],
            }),

            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
              shading: {
                type: ShadingType.CLEAR,
                fill: "EEF2FF", // Indigo-50
              },
              children: [
                new TextRun({
                  text: "Blood Report Analysis",
                  bold: true,
                  size: 28,
                  color: "4338CA", // Indigo-700
                }),
              ],
            }),

            // ===== REPORT INFO CARD =====
            new Paragraph({
              spacing: { before: 200, after: 100 },
              shading: {
                type: ShadingType.CLEAR,
                fill: "F9FAFB", // Gray-50
              },
              border: {
                top: {
                  color: "6366F1",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 12,
                },
                bottom: {
                  color: "6366F1",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 12,
                },
                left: {
                  color: "6366F1",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 12,
                },
                right: {
                  color: "6366F1",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 12,
                },
              },
              children: [
                new TextRun({
                  text: "  Report Information",
                  bold: true,
                  size: 24,
                  color: "4338CA",
                }),
              ],
            }),

            // Patient Details Grid
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
                insideHorizontal: { style: BorderStyle.NONE },
                insideVertical: { style: BorderStyle.NONE },
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 50, type: WidthType.PERCENTAGE },
                      shading: { type: ShadingType.CLEAR, fill: "F9FAFB" },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Patient Name: ",
                              bold: true,
                              size: 22,
                            }),
                            new TextRun({
                              text: safeText(report.patientName),
                              size: 22,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: { size: 50, type: WidthType.PERCENTAGE },
                      shading: { type: ShadingType.CLEAR, fill: "F9FAFB" },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Report ID: ",
                              bold: true,
                              size: 22,
                            }),
                            new TextRun({
                              text: safeText(report.id.slice(0, 8)),
                              size: 22,
                              font: "Courier New",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      shading: { type: ShadingType.CLEAR, fill: "F9FAFB" },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Age: ",
                              bold: true,
                              size: 22,
                            }),
                            new TextRun({
                              text: `${safeText(report.age)} years`,
                              size: 22,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      shading: { type: ShadingType.CLEAR, fill: "F9FAFB" },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Gender: ",
                              bold: true,
                              size: 22,
                            }),
                            new TextRun({
                              text:
                                report.gender === "M"
                                  ? "Male"
                                  : report.gender === "F"
                                  ? "Female"
                                  : safeText(report.gender),
                              size: 22,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      shading: { type: ShadingType.CLEAR, fill: "F9FAFB" },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Report Type: ",
                              bold: true,
                              size: 22,
                            }),
                            new TextRun({
                              text: safeText(report.reportType),
                              size: 22,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      shading: { type: ShadingType.CLEAR, fill: "F9FAFB" },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Report Date: ",
                              bold: true,
                              size: 22,
                            }),
                            new TextRun({
                              text: formatDate(report.reportDate),
                              size: 22,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            new Paragraph({ text: "" }),

            // ===== SUMMARY STATISTICS =====
            new Paragraph({
              spacing: { before: 200, after: 100 },
              shading: { type: ShadingType.CLEAR, fill: "EEF2FF" },
              border: {
                top: {
                  color: "6366F1",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 8,
                },
                bottom: {
                  color: "6366F1",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 8,
                },
                left: {
                  color: "6366F1",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 8,
                },
                right: {
                  color: "6366F1",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 8,
                },
              },
              children: [
                new TextRun({
                  text: "  Quick Summary",
                  bold: true,
                  size: 24,
                  color: "4338CA",
                }),
              ],
            }),

            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
                insideHorizontal: { style: BorderStyle.NONE },
                insideVertical: {
                  color: "E5E7EB",
                  style: BorderStyle.SINGLE,
                  size: 6,
                },
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      shading: { type: ShadingType.CLEAR, fill: "DBEAFE" },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: "Total Parameters\n",
                              size: 20,
                              color: "1E40AF",
                            }),
                            new TextRun({
                              text: String(report.parameters.length),
                              bold: true,
                              size: 32,
                              color: "1E40AF",
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      shading: { type: ShadingType.CLEAR, fill: "D1FAE5" },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: "Normal\n",
                              size: 20,
                              color: "065F46",
                            }),
                            new TextRun({
                              text: String(report.statusCounts.normal),
                              bold: true,
                              size: 32,
                              color: "065F46",
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      shading: { type: ShadingType.CLEAR, fill: "FEE2E2" },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: "High\n",
                              size: 20,
                              color: "991B1B",
                            }),
                            new TextRun({
                              text: String(report.statusCounts.high),
                              bold: true,
                              size: 32,
                              color: "991B1B",
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      shading: { type: ShadingType.CLEAR, fill: "FEF3C7" },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: "Low\n",
                              size: 20,
                              color: "92400E",
                            }),
                            new TextRun({
                              text: String(report.statusCounts.low),
                              bold: true,
                              size: 32,
                              color: "92400E",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            new Paragraph({ text: "", spacing: { after: 200 } }),

            // ===== PARAMETERS TABLE =====
            new Paragraph({
              spacing: { before: 200, after: 100 },
              shading: { type: ShadingType.CLEAR, fill: "EEF2FF" },
              border: {
                top: {
                  color: "6366F1",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 8,
                },
                bottom: {
                  color: "6366F1",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 8,
                },
                left: {
                  color: "6366F1",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 8,
                },
                right: {
                  color: "6366F1",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 8,
                },
              },
              children: [
                new TextRun({
                  text: "  Test Parameters",
                  bold: true,
                  size: 24,
                  color: "4338CA",
                }),
              ],
            }),

            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                // Header Row
                new TableRow({
                  tableHeader: true,
                  children: [
                    { text: "Parameter Name", width: 30 },
                    { text: "Value", width: 15 },
                    { text: "Unit", width: 15 },
                    { text: "Status", width: 15 },
                    { text: "Reference Range", width: 25 },
                  ].map(
                    (h) =>
                      new TableCell({
                        width: { size: h.width, type: WidthType.PERCENTAGE },
                        shading: { type: ShadingType.CLEAR, fill: "4338CA" },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: h.text,
                                bold: true,
                                size: 22,
                                color: "FFFFFF",
                              }),
                            ],
                          }),
                        ],
                      })
                  ),
                }),
                // Data Rows
                ...report.parameters.map(
                  (p: any) =>
                    new TableRow({
                      children: [
                        new TableCell({
                          width: { size: 30, type: WidthType.PERCENTAGE },
                          shading: {
                            type: ShadingType.CLEAR,
                            fill: getRowShading(p.status),
                          },
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: safeText(p.name),
                                  size: 20,
                                  bold: true,
                                }),
                              ],
                            }),
                          ],
                        }),
                        new TableCell({
                          width: { size: 15, type: WidthType.PERCENTAGE },
                          shading: {
                            type: ShadingType.CLEAR,
                            fill: getRowShading(p.status),
                          },
                          children: [
                            new Paragraph({
                              alignment: AlignmentType.CENTER,
                              children: [
                                new TextRun({
                                  text: safeText(p.value),
                                  size: 20,
                                  bold: true,
                                }),
                              ],
                            }),
                          ],
                        }),
                        new TableCell({
                          width: { size: 15, type: WidthType.PERCENTAGE },
                          shading: {
                            type: ShadingType.CLEAR,
                            fill: getRowShading(p.status),
                          },
                          children: [
                            new Paragraph({
                              alignment: AlignmentType.CENTER,
                              children: [
                                new TextRun({
                                  text: safeText(p.unit),
                                  size: 20,
                                }),
                              ],
                            }),
                          ],
                        }),
                        new TableCell({
                          width: { size: 15, type: WidthType.PERCENTAGE },
                          shading: {
                            type: ShadingType.CLEAR,
                            fill: getRowShading(p.status),
                          },
                          children: [
                            new Paragraph({
                              alignment: AlignmentType.CENTER,
                              children: [
                                new TextRun({
                                  text: safeText(p.status),
                                  size: 20,
                                  bold: true,
                                  color: getStatusColor(p.status),
                                }),
                              ],
                            }),
                          ],
                        }),
                        new TableCell({
                          width: { size: 25, type: WidthType.PERCENTAGE },
                          shading: {
                            type: ShadingType.CLEAR,
                            fill: getRowShading(p.status),
                          },
                          children: [
                            new Paragraph({
                              alignment: AlignmentType.CENTER,
                              children: [
                                new TextRun({
                                  text: safeText(p.referenceRange),
                                  size: 20,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    })
                ),
              ],
            }),

            new Paragraph({ text: "", spacing: { after: 200 } }),

            // ===== OVERALL SUMMARY =====
            new Paragraph({
              spacing: { before: 200, after: 100 },
              shading: { type: ShadingType.CLEAR, fill: "FEF3C7" },
              border: {
                top: {
                  color: "F59E0B",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 8,
                },
                bottom: {
                  color: "F59E0B",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 8,
                },
                left: {
                  color: "F59E0B",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 8,
                },
                right: {
                  color: "F59E0B",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 8,
                },
              },
              children: [
                new TextRun({
                  text: "  Overall Summary",
                  bold: true,
                  size: 24,
                  color: "92400E",
                }),
              ],
            }),

            new Paragraph({
              spacing: { before: 100, after: 200 },
              children: [
                new TextRun({
                  text: safeText(report.overallSummary),
                  size: 22,
                  color: "374151",
                }),
              ],
            }),

            // ===== DISCLAIMER =====
            new Paragraph({
              spacing: { before: 200, after: 100 },
              shading: { type: ShadingType.CLEAR, fill: "FEE2E2" },
              border: {
                top: {
                  color: "DC2626",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 8,
                },
                bottom: {
                  color: "DC2626",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 8,
                },
                left: {
                  color: "DC2626",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 8,
                },
                right: {
                  color: "DC2626",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 8,
                },
              },
              children: [
                new TextRun({
                  text: "  ⚠ Important Disclaimer",
                  bold: true,
                  size: 24,
                  color: "991B1B",
                }),
              ],
            }),

            new Paragraph({
              spacing: { before: 100, after: 400 },
              children: [
                new TextRun({
                  text: safeText(report.disclaimer),
                  size: 20,
                  color: "374151",
                  italics: true,
                }),
              ],
            }),

            // ===== METADATA =====
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200 },
              border: {
                top: {
                  color: "E5E7EB",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 6,
                },
              },
              children: [
                new TextRun({
                  text: `Generated on: ${formatDate(report.createdAt)}`,
                  size: 18,
                  color: "6B7280",
                }),
              ],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `BloodReport_${report.patientName.replace(/\s+/g, "_")}_${
      report.reportDate
    }.docx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Word download error:", error);
    alert("Failed to download Word document. Please try again.");
  }
}
