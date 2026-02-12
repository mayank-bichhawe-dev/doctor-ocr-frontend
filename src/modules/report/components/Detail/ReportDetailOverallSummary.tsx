import { AlertCircle } from "lucide-react";

interface Props {
  overallSummary: string[];
  disclaimer: string;
}

export default function ReportDetailOverallSummary({
  overallSummary,
  disclaimer,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <AlertCircle className="w-6 h-6 text-indigo-600" />
        Overall Summary
      </h3>
      <ul className="list-disc list-inside space-y-2 mb-4 pl-2">
        {overallSummary.map((point, index) => (
          <li key={index} className="text-gray-700 leading-relaxed">
            {point}
          </li>
        ))}
      </ul>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800 leading-relaxed">
          <strong>Disclaimer:</strong> {disclaimer}
        </p>
      </div>
    </div>
  );
}
