import { memo } from "react";

interface TabButtonProps {
  tabs: string[];
  viewMode: string;
  onClick: (tab: string) => void;
}

export default memo(function TabButton({
  tabs,
  viewMode,
  onClick,
}: TabButtonProps) {
  return (
    <div className="flex justify-end mb-6">
      <div className="flex gap-2 bg-white p-1 rounded-lg shadow-md">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onClick(tab)}
            className={`px-4 py-2 rounded-md transition-all ${
              viewMode === tab
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
});
