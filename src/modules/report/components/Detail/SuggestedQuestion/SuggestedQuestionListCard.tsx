import { MessageCircleQuestion } from "lucide-react";

export default function SuggestedQuestionListCard({
  index,
  question,
  label,
  color,
}: {
  index: number;
  question: string;
  label: string;
  color: string;
}) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/40 transition-all group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Index number */}
      <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-indigo-600 text-white text-sm font-bold flex items-center justify-center shrink-0 shadow-sm shadow-purple-200">
        {index + 1}
      </div>

      {/* Question text + category */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors">
            {question}
          </p>
          <span
            className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full mt-0.5 ${color}`}
          >
            {label}
          </span>
        </div>
      </div>

      {/* Question icon */}
      <MessageCircleQuestion className="w-4 h-4 text-gray-300 group-hover:text-purple-400 transition-colors shrink-0 mt-0.5" />
    </div>
  );
}
