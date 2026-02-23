export default function SuggestedQuestionError({
  error,
  handleToggle,
}: {
  error: string;
  handleToggle: () => void;
}) {
  return (
    <div className="px-6 pb-6">
      <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
        <span>{error}</span>
        <button
          onClick={handleToggle}
          className="text-red-600 font-semibold underline underline-offset-2 hover:text-red-800"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
