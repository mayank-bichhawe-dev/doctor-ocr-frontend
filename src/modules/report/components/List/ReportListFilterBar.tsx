import { Filter, Search } from "lucide-react";
import type { ReportFilterStatus } from "../../types";

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: ReportFilterStatus;
  setFilterStatus: (status: ReportFilterStatus) => void;
}

export default function ReportListFilterBar({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by patient name or report type..."
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as ReportFilterStatus)
            }
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="NORMAL">Normal</option>
            <option value="HIGH">High Values</option>
            <option value="LOW">Low Values</option>
          </select>
        </div>
      </div>
    </div>
  );
}
