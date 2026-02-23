import { Loader2 } from "lucide-react";

export default function SuggestedQuestionSkeleton() {
  return (
    <div className="px-6 pb-6">
      <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
        <div className="flex items-center gap-3 mb-5">
          <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />
          <p className="text-purple-700 font-medium text-sm">
            AI is generating personalized questions…
          </p>
        </div>
        <div className="space-y-3">
          {[90, 75, 85, 65, 80, 70].map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-100 animate-pulse shrink-0" />
              <div
                className="h-4 bg-purple-100 rounded-full animate-pulse"
                style={{ width: `${w}%`, animationDelay: `${i * 80}ms` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
