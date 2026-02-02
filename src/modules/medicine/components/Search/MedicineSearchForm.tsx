import { AlertCircle, Loader2, Search } from "lucide-react";

interface Props {
  searchTerm: string;
  onChangeSearchTerm: (e: string) => void;
  error: string;
  loading: boolean;
  handleSearch: () => void;
}

export default function MedicineSearchForm({
  searchTerm,
  onChangeSearchTerm,
  error,
  loading,
  handleSearch,
}: Props) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
        <input
          type="text"
          placeholder="Enter medicine or drug name..."
          value={searchTerm}
          onChange={(e) => onChangeSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full pl-16 pr-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-lg text-gray-700 shadow-lg bg-white"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <button
        onClick={handleSearch}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-5 rounded-2xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Searching...
          </>
        ) : (
          <>
            <Search className="w-6 h-6" />
            Search Medicine
          </>
        )}
      </button>
    </div>
  );
}
