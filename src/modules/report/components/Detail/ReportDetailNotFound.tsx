import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ReportDetailNotFound() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Report Not Found
        </h2>
        <p className="text-gray-600 mb-4">
          The requested report could not be loaded.
        </p>
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
