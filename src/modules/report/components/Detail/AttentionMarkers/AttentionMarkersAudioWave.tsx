export default function AttentionMarkersAudioWave({
  isSpeaking,
}: {
  isSpeaking: boolean;
}) {
  const bars = Array.from({ length: 28 });
  return (
    <div className="flex items-center justify-center gap-[3px] h-10">
      {bars.map((_, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-full transition-all ${
            isSpeaking ? "bg-indigo-500" : "bg-indigo-200"
          }`}
          style={{
            height: isSpeaking
              ? `${20 + Math.sin((i / bars.length) * Math.PI * 3) * 12}px`
              : "6px",
            animation: isSpeaking
              ? `wave ${0.6 + (i % 5) * 0.1}s ease-in-out infinite alternate`
              : "none",
            animationDelay: `${(i * 30) % 300}ms`,
          }}
        />
      ))}
      <style>{`
        @keyframes wave {
          0%   { height: 6px; }
          100% { height: ${28 + Math.random() * 12}px; }
        }
      `}</style>
    </div>
  );
}
