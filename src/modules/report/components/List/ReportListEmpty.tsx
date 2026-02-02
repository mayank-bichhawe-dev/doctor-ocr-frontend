import { FileText } from "lucide-react";

export default function ReportListEmpty() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
      <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        No Reports Found
      </h3>
      <p className="text-gray-600">
        Try adjusting your search or filter criteria
      </p>
    </div>
  );
}
