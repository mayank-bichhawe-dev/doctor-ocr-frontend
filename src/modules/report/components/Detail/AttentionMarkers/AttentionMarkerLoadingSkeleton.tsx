import { Mic } from "lucide-react";

export default function AttentionMarkerLoadingSkeleton() {
  return (
    <div className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center animate-pulse">
          <Mic className="w-7 h-7 text-indigo-400" />
        </div>
        <p className="text-indigo-600 font-medium text-sm animate-pulse">
          AI is analyzing your markers…
        </p>
        <div className="w-full space-y-2">
          {[80, 60, 70, 45].map((w, i) => (
            <div
              key={i}
              className="h-3 bg-indigo-100 rounded-full animate-pulse"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
