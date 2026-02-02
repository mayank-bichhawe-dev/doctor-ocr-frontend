import {
  AlertCircle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import type { ReportParameter } from "../../types/report.type";

interface Props {
  filteredParams: ReportParameter[];
}

const getStatusBadge = (status: string) => {
  const styles = {
    NORMAL: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-200",
      icon: <CheckCircle className="w-4 h-4" />,
    },
    HIGH: {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-200",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    LOW: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-200",
      icon: <TrendingDown className="w-4 h-4" />,
    },
    UNKNOWN: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-200",
      icon: <AlertCircle className="w-4 h-4" />,
    },
  };
  return styles[status as keyof typeof styles] || styles.UNKNOWN;
};

export default function ReportDetailTable({ filteredParams }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Parameter
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Value
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Reference Range
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredParams.map((param, index) => {
            const statusStyle = getStatusBadge(param.status);
            return (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-800">{param.name}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900">
                    {param.value}{" "}
                    <span className="text-gray-500 font-normal">
                      {param.unit}
                    </span>
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-600">
                    {param.referenceRange}{" "}
                    <span className="text-gray-500">{param.unit}</span>
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                  >
                    {statusStyle.icon}
                    {param.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
