interface Props {
  activeTab: "all" | "normal" | "abnormal";
  setActiveTab: (tab: "all" | "normal" | "abnormal") => void;
  statusCounts: {
    normal: number;
    low: number;
    high: number;
    total: number;
  };
}

export default function ReportDetailTableTabs({
  activeTab,
  setActiveTab,
  statusCounts,
}: Props) {
  return (
    <div className="border-b border-gray-200 print:hidden">
      <div className="flex">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex-1 py-4 text-center font-semibold transition-all ${
            activeTab === "all"
              ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          All Parameters ({statusCounts.total})
        </button>
        <button
          onClick={() => setActiveTab("normal")}
          className={`flex-1 py-4 text-center font-semibold transition-all ${
            activeTab === "normal"
              ? "text-green-600 border-b-2 border-green-600 bg-green-50"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          Normal ({statusCounts.normal})
        </button>
        <button
          onClick={() => setActiveTab("abnormal")}
          className={`flex-1 py-4 text-center font-semibold transition-all ${
            activeTab === "abnormal"
              ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          Abnormal ({statusCounts.high + statusCounts.low})
        </button>
      </div>
    </div>
  );
}
