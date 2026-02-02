import { FileText } from "lucide-react";

export default function ReportDetailTableNoData() {
  return (
    <div className="text-center py-12">
      <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500">No parameters match the selected filter</p>
    </div>
  );
}
