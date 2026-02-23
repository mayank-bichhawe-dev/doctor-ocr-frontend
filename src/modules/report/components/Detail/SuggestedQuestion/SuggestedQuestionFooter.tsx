export default function SuggestedQuestionFooter({
  totalQuestionsCount,
}: {
  totalQuestionsCount: number;
}) {
  return (
    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
      <p className="text-xs text-gray-400">
        💡 Tip: Screenshot this list or save it before your appointment
      </p>
      <span className="text-xs text-gray-400">
        {totalQuestionsCount} questions generated
      </span>
    </div>
  );
}
