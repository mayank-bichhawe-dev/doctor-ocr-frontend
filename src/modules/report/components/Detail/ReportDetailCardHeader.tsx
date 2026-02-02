import { Calendar, FileText, User } from "lucide-react";
import { formatDate } from "../../../../utils";
import type { Report } from "../../types/report.type";

interface Props {
  report: Report;
}

export default function ReportDetailCardHeader({ report }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
      <div className="bg-linear-to-r from-indigo-500 to-purple-500 p-8 text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-8 h-8" />
              <h2 className="text-3xl font-bold">{report.reportType} Report</h2>
            </div>
            <p className="text-indigo-100">Report ID: {report.id}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-2">
              <Calendar className="w-5 h-5" />
              <span className="text-lg font-semibold">
                {formatDate(report.reportDate)}
              </span>
            </div>
            <p className="text-sm text-indigo-100">
              Created: {formatDate(report.createdAt)}
            </p>
          </div>
        </div>

        {/* Patient Info */}
        <div className="bg-white/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Patient Information</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-indigo-100">Name</p>
              <p className="font-semibold text-lg">{report.patientName}</p>
            </div>
            <div>
              <p className="text-sm text-indigo-100">Age</p>
              <p className="font-semibold text-lg">{report.age} years</p>
            </div>
            <div>
              <p className="text-sm text-indigo-100">Gender</p>
              <p className="font-semibold text-lg">
                {report.gender === "M"
                  ? "Male"
                  : report.gender === "F"
                  ? "Female"
                  : report.gender}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
