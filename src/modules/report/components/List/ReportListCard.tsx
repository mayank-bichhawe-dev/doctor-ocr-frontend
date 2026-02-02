import { memo } from "react";
import { Calendar, Download, Eye, FileText, User } from "lucide-react";
import { formatDate } from "../../../../utils";
import { reportPdfDownload } from "../../utils";
import type { ReportListProps } from "../../types";

export default memo(function ReportListCard({
  reports,
  handleViewReport,
}: ReportListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((report) => {
        return (
          <div
            key={report.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
          >
            {/* Card Header */}
            <div className="bg-linear-to-r from-indigo-500 to-purple-500 p-4 text-white">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span className="font-semibold">{report.reportType}</span>
                </div>
                <span className="text-xs bg-opacity-20 px-2 py-1 rounded-full">
                  ID: {report.id.slice(0, 8)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(report.reportDate)}</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5">
              {/* Patient Info */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold text-gray-800">
                    {report.patientName}
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>Age: {report.age}</span>
                  <span>Gender: {report.gender}</span>
                </div>
              </div>

              {/* Status Summary */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-600 mb-2">
                  Parameters Status
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                    ✓ {report.statusCounts.normal} Normal
                  </span>
                  {report.statusCounts.high > 0 && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full font-medium">
                      ↑ {report.statusCounts.high} High
                    </span>
                  )}
                  {report.statusCounts.low > 0 && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
                      ↓ {report.statusCounts.low} Low
                    </span>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {report.overallSummary}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewReport(report.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium text-sm cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button
                  title="Download PDF"
                  onClick={reportPdfDownload}
                  className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});
