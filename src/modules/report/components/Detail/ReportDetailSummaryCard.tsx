interface Props {
  statusCounts: {
    normal: number;
    low: number;
    high: number;
    total: number;
  };
}

export default function ReportDetailSummaryCard({ statusCounts }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
        <p className="text-sm text-gray-600 mb-1">Total Parameters</p>
        <p className="text-3xl font-bold text-gray-800">{statusCounts.total}</p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
        <p className="text-sm text-gray-600 mb-1">Normal</p>
        <p className="text-3xl font-bold text-green-600">
          {statusCounts.normal}
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
        <p className="text-sm text-gray-600 mb-1">High Values</p>
        <p className="text-3xl font-bold text-red-600">{statusCounts.high}</p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
        <p className="text-sm text-gray-600 mb-1">Low Values</p>
        <p className="text-3xl font-bold text-yellow-600">{statusCounts.low}</p>
      </div>
    </div>
  );
}
