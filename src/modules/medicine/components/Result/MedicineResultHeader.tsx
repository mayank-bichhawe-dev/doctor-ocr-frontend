export default function MedicineResultHeader({
  searchTerm,
  count,
}: {
  searchTerm: string;
  count: number;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            Search Results
          </h1>
          <p className="text-gray-600">
            Showing results for "
            <span className="font-semibold text-indigo-600">{searchTerm}</span>"
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {count} result{count !== 1 ? "s" : ""} found
        </div>
      </div>
    </div>
  );
}
