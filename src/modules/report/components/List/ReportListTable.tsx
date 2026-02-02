import { memo } from "react";
import { Download, Eye } from "lucide-react";
import { formatDate } from "../../../../utils";
import { reportPdfDownload } from "../../utils";
import type { ReportListProps } from "../../types";

export default memo(function ReportListTable({
  reports,
  handleViewReport,
}: ReportListProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-linear-to-r from-indigo-500 to-purple-500 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Report ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Patient
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Type
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report) => {
              return (
                <tr
                  key={report.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    {report.id.slice(0, 8)}...
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {report.patientName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {report.age}Y, {report.gender}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
                      {report.reportType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(report.reportDate)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                        {report.statusCounts.normal}N
                      </span>
                      {report.statusCounts.high > 0 && (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">
                          {report.statusCounts.high}H
                        </span>
                      )}
                      {report.statusCounts.low > 0 && (
                        <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                          {report.statusCounts.low}L
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewReport(report.id)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={reportPdfDownload}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});
