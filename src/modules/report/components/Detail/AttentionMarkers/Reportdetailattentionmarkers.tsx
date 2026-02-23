import { useState, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  X,
} from "lucide-react";
import { useSpeak } from "react-text-to-speech";
import axiosInstance from "../../../../../interceptor";
import AttentionMarkersAudioWave from "./AttentionMarkersAudioWave";
import AttentionMarkerHeader from "./AttentionMarkerHeader";
import AttentionMarkerChip from "./AttentionMarkerChip";
import AttentionMarkerLoadingSkeleton from "./AttentionMarkerLoadingSkeleton";
import type { ReportParameter } from "../../../types/report.type";

interface Props {
  reportId: string;
  parameters: ReportParameter[];
  attentionMarkersText?: string | null;
}

// ─── Helper: call API to get attention markers text ──────────────────────────
async function fetchAttentionMarkersText(reportId: string): Promise<string> {
  const { data } = await axiosInstance.get<{ success: boolean; data: string }>(
    `report/attention-markers/${reportId}`,
  );
  return data.data;
}

export default function ReportDetailAttentionMarkers({
  reportId,
  parameters,
  attentionMarkersText,
}: Props) {
  const abnormalParams = parameters.filter(
    (p) => p.status === "HIGH" || p.status === "LOW",
  );

  // ─── Speech state ───────────────────────────────────────────────────────────
  const [text, setText] = useState<string>(attentionMarkersText ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [rate, setRate] = useState(0.95);

  const { speak, speechStatus, start, pause, stop, Text } = useSpeak();

  const isSpeaking = speechStatus === "started";

  const handlePlay = () => {
    if (!text) return;
    stop();
    speak(text, {
      rate,
      lang: "en-AU",
    });
  };

  const handleSkipBack = () => {
    stop();
    setTimeout(() => handlePlay(), 100);
  };

  const handleSkipForward = () => {
    stop();
  };

  const toggleMute = () => {
    isMuted ? start() : pause();
    setIsMuted((prev) => !prev);
  };

  const handleSpeedControler = async (newRate: number) => {
    stop();
    setRate(newRate);
    speak(text, {
      rate: newRate,
      lang: "en-AU",
    });
  };

  // ─── Fetch text from API ────────────────────────────────────────────────────
  const handleExplain = async () => {
    if (text) {
      // Text already available — just play
      handlePlay();
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchAttentionMarkersText(reportId);
      setText(result);
      handlePlay();
    } catch {
      setError("Failed to load explanation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    stop();
    return () => {
      stop();
    };
  }, []);

  if (abnormalParams.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-orange-100">
      {/* ── Section Header ── */}
      <AttentionMarkerHeader
        isAttentionMarkersTextAvailable={text.length > 0}
        isLoading={isLoading}
        isSpeaking={isSpeaking}
        totalAbnormalParams={abnormalParams.length}
        handleExplain={handleExplain}
      />

      {/* ── Marker Chips ── */}
      <div className="flex flex-wrap gap-3 mb-6">
        {abnormalParams.map((param, i) => (
          <AttentionMarkerChip
            key={i}
            markerStatus={param.status}
            markerName={param.name}
          />
        ))}
      </div>

      {/* ── Error state ── */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-4 text-red-700 text-sm">
          <X className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* ── Loading skeleton ── */}
      {isLoading && <AttentionMarkerLoadingSkeleton />}

      {/* ── Audio Player ── (shown when text is ready) */}
      {text && !isLoading && (
        <div className="bg-linear-to-br from-indigo-50 via-purple-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
          {/* Waveform */}
          <div className="mb-4">
            <AttentionMarkersAudioWave isSpeaking={isSpeaking} />
          </div>

          {/* Progress bar */}
          {/* <div className="mb-5">
            <div className="flex justify-between text-xs text-gray-400 mb-1.5">
              <span>
                Word {Math.min(wordIndex, words.length)} of {words.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div> */}

          {/* Controls */}
          <div className="flex items-center justify-between">
            {/* Speed selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">Speed</span>
              <div className="flex gap-1">
                {[0.75, 0.95, 1.2].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSpeedControler(s)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      rate === s
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-500 border border-gray-200 hover:border-indigo-300"
                    }`}
                  >
                    {s === 0.75 ? "0.75×" : s === 0.95 ? "1×" : "1.2×"}
                  </button>
                ))}
              </div>
            </div>

            {/* Playback controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSkipBack}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:border-indigo-300 text-gray-600 hover:text-indigo-600 transition-all shadow-sm"
                title="Restart"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => (isSpeaking ? pause() : handlePlay())}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-300 transition-all active:scale-95"
              >
                {isSpeaking ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-0.5" />
                )}
              </button>

              <button
                onClick={handleSkipForward}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:border-indigo-300 text-gray-600 hover:text-indigo-600 transition-all shadow-sm"
                title="Skip to end"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Mute */}
            <button
              onClick={toggleMute}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isMuted
                  ? "bg-red-50 border-red-200 text-red-600"
                  : "bg-white border-gray-200 text-gray-500 hover:border-indigo-300"
              }`}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
              {isMuted ? "Muted" : "Mute"}
            </button>
          </div>

          {/* Text preview */}
          {/* <div className="mt-5 pt-4 border-t border-indigo-100">
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
              {text}
            </p>
          </div> */}
          <Text />
        </div>
      )}
    </div>
  );
}
