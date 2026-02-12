// import {
//   AlertCircle,
//   CheckCircle,
//   TrendingUp,
//   TrendingDown,
// } from "lucide-react";
// import type {
//   ReportParameter,
//   ReportParameterStatus,
// } from "../../types/report.type";

// interface Props {
//   filteredParams: ReportParameter[];
// }

// const getStatusBadge = (status: ReportParameterStatus) => {
//   const styles: Record<
//     ReportParameterStatus,
//     { bg: string; text: string; border: string; icon: React.ReactNode }
//   > = {
//     NORMAL: {
//       bg: "bg-green-100",
//       text: "text-green-800",
//       border: "border-green-200",
//       icon: <CheckCircle className="w-4 h-4" />,
//     },
//     HIGH: {
//       bg: "bg-red-100",
//       text: "text-red-800",
//       border: "border-red-200",
//       icon: <TrendingUp className="w-4 h-4" />,
//     },
//     LOW: {
//       bg: "bg-yellow-100",
//       text: "text-yellow-800",
//       border: "border-yellow-200",
//       icon: <TrendingDown className="w-4 h-4" />,
//     },
//     "N/A": {
//       bg: "bg-gray-100",
//       text: "text-gray-800",
//       border: "border-gray-200",
//       icon: <AlertCircle className="w-4 h-4" />,
//     },
//   };
//   return styles[status as keyof typeof styles] || styles["N/A"];
// };

// export default function ReportDetailTable({ filteredParams }: Props) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full">
//         <thead className="bg-gray-50 border-b border-gray-200">
//           <tr>
//             <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//               Parameter
//             </th>
//             <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//               Value
//             </th>
//             <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//               Reference Range
//             </th>
//             <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//               Status
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {filteredParams.map((param, index) => {
//             const statusStyle = getStatusBadge(param.status);
//             return (
//               <tr key={index} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-6 py-4">
//                   <p className="font-medium text-gray-800">{param.name}</p>
//                 </td>
//                 <td className="px-6 py-4">
//                   <p className="font-semibold text-gray-900">
//                     {param.value}{" "}
//                     <span className="text-gray-500 font-normal">
//                       {param.unit}
//                     </span>
//                   </p>
//                 </td>
//                 <td className="px-6 py-4">
//                   <p className="text-gray-600">
//                     {param.referenceRange}{" "}
//                     <span className="text-gray-500">{param.unit}</span>
//                   </p>
//                 </td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
//                   >
//                     {statusStyle.icon}
//                     {param.status}
//                   </span>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Info,
} from "lucide-react";
import type {
  ReportParameter,
  ReportParameterStatus,
} from "../../types/report.type";

interface Props {
  filteredParams: ReportParameter[];
}

const getStatusBadge = (status: ReportParameterStatus) => {
  const styles: Record<
    ReportParameterStatus,
    { bg: string; text: string; border: string; icon: React.ReactNode }
  > = {
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
    "N/A": {
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-200",
      icon: <AlertCircle className="w-4 h-4" />,
    },
  };
  return styles[status as keyof typeof styles] || styles["N/A"];
};

const getSubParamAccentColor = (status: ReportParameterStatus) => {
  if (status === "HIGH") return "border-red-300 bg-red-50";
  if (status === "LOW") return "border-yellow-300 bg-yellow-50";
  return "border-gray-200 bg-gray-50";
};

const getLabelColor = (status: ReportParameterStatus) => {
  if (status === "HIGH") return "text-red-700 bg-red-100";
  if (status === "LOW") return "text-yellow-700 bg-yellow-100";
  return "text-gray-700 bg-gray-100";
};

export default function ReportDetailTable({ filteredParams }: Props) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const hasSubParams = (param: ReportParameter) =>
    (param.status === "HIGH" || param.status === "LOW") &&
    param.subParameters &&
    param.subParameters.length > 0;

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
            {/* Empty header for expand toggle column */}
            <th className="px-4 py-4 w-10" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredParams.map((param, index) => {
            const statusStyle = getStatusBadge(param.status);
            const isExpanded = expandedRows.has(index);
            const canExpand = hasSubParams(param);

            return (
              <>
                {/* Main Row */}
                <tr
                  key={`row-${index}`}
                  className={`transition-colors ${
                    canExpand ? "cursor-pointer" : ""
                  } ${isExpanded ? "bg-gray-50" : "hover:bg-gray-50"}`}
                  onClick={() => canExpand && toggleRow(index)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-800">{param.name}</p>
                      {canExpand && (
                        <span className="inline-flex items-center gap-1 text-xs text-indigo-500 font-medium">
                          <Info className="w-3 h-3" />
                          Insights
                        </span>
                      )}
                    </div>
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
                  <td className="px-4 py-4">
                    {canExpand && (
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </td>
                </tr>

                {/* Sub-Parameters Expanded Row */}
                {canExpand && isExpanded && (
                  <tr key={`sub-${index}`}>
                    <td
                      colSpan={5}
                      className={`px-6 py-4 border-b ${getSubParamAccentColor(param.status)}`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Info className="w-4 h-4 text-indigo-500" />
                        <p className="text-sm font-semibold text-gray-700">
                          Insights for{" "}
                          <span className="text-indigo-600">{param.name}</span>
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {param.subParameters!.map((sub, subIndex) => (
                          <div
                            key={subIndex}
                            className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm"
                          >
                            <span
                              className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${getLabelColor(param.status)}`}
                            >
                              {sub.label}
                            </span>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {sub.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
