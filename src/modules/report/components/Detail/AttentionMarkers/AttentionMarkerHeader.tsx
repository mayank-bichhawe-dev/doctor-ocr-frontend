import { AlertTriangle, Loader2, Mic } from "lucide-react";

interface Props {
  isAttentionMarkersTextAvailable: boolean;
  isLoading: boolean;
  isSpeaking: boolean;
  totalAbnormalParams: number;
  handleExplain: () => void;
}

export default function AttentionMarkerHeader({
  isAttentionMarkersTextAvailable,
  isLoading,
  isSpeaking,
  totalAbnormalParams,
  handleExplain,
}: Props) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Attention Required
          </h3>
          <p className="text-sm text-gray-500">
            {totalAbnormalParams} marker
            {totalAbnormalParams !== 1 ? "s" : ""} need your attention
          </p>
        </div>
      </div>

      {/* Explain button (shown when no text yet or as re-trigger) */}
      {!isSpeaking && (
        <button
          onClick={handleExplain}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-indigo-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              {isAttentionMarkersTextAvailable
                ? "Play Explanation"
                : "Explain Markers"}
            </>
          )}
        </button>
      )}
    </div>
  );
}
