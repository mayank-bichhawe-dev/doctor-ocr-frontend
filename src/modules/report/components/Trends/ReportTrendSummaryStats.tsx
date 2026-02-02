interface Props {
  increasedCount: number;
  decreasedCount: number;
  stableCount: number;
}
export default function ReportTrendSummaryStats({
  increasedCount,
  decreasedCount,
  stableCount,
}: Props) {
  return (
    <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">
            {increasedCount}
          </div>
          <div className="text-sm text-gray-600">Parameters Increased</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">
            {decreasedCount}
          </div>
          <div className="text-sm text-gray-600">Parameters Decreased</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-gray-600">{stableCount}</div>
          <div className="text-sm text-gray-600">Parameters Stable</div>
        </div>
      </div>
    </div>
  );
}
