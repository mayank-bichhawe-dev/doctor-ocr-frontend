import { Activity, Upload } from "lucide-react";
import ReportListHeaderDropdown from "./ReportListHeaderDropdown";
import useReportUploadModal from "../Modal/ReportUploadModal";

export default function ReportListHeader() {
  const { ReportUploadModal, handleToggleModal } = useReportUploadModal();

  return (
    <>
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Doctor OCR</h1>
                <p className="text-sm text-gray-600">Blood Report Management</p>
              </div>
            </div>

            {/* Right Side - Upload Button & User Menu */}
            <div className="flex items-center gap-4">
              {/* Upload Button */}
              <button
                onClick={handleToggleModal}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload New Report
              </button>

              {/* User Dropdown */}
              <ReportListHeaderDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <ReportUploadModal />
    </>
  );
}
