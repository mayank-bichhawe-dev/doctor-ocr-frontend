export default function ReportListTitle({
  totalReports,
}: {
  totalReports: number;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">My Reports</h2>
      <p className="text-gray-600">Total {totalReports} blood test reports</p>
    </div>
  );
}
