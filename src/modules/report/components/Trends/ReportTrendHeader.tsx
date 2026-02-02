import { Activity, ArrowLeft, FileText, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ReportTrendHeader({
  patientId,
}: {
  patientId: string;
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo and Title */}
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all group"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-indigo-600" />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Doctor OCR</h1>
                <p className="text-sm text-gray-600">Blood Report Comparison</p>
              </div>
            </div>
          </div>

          {/* Right Side - Navigation Links */}
          <nav className="flex items-center gap-2">
            <Link
              to={`/reports/${patientId}`}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all font-medium"
            >
              <FileText className="w-4 h-4" />
              <span>Reports</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all font-medium"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
