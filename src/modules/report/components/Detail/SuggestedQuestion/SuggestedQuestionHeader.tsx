import {
  Stethoscope,
  Loader2,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

export default function SuggestedQuestionHeader({
  totalQuestionsCount,
  isLoading,
  isOpen,
  handleToggle,
}: {
  totalQuestionsCount: number;
  isLoading: boolean;
  isOpen: boolean;
  handleToggle: () => void;
}) {
  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className="w-full flex items-center justify-between p-6 hover:bg-purple-50 transition-colors group"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-purple-200 group-hover:shadow-purple-300 transition-shadow">
          <Stethoscope className="w-6 h-6 text-white" />
        </div>
        <div className="text-left">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-800">
              Suggested Questions for Your Doctor
            </h3>
            {totalQuestionsCount > 0 && (
              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                {totalQuestionsCount}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">
            {totalQuestionsCount > 0
              ? "AI-generated questions based on your report"
              : "Get personalized questions to discuss with your doctor"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {/* Status indicator */}
        {totalQuestionsCount === 0 && !isLoading && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Generate
          </div>
        )}

        {isLoading ? (
          <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />
        ) : isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </div>
    </button>
  );
}
