import { useState } from "react";
import SuggestedQuestionHeader from "./SuggestedQuestionHeader";
import SuggestedQuestionSkeleton from "./SuggestedQuestionSkeleton";
import SuggestedQuestionError from "./SuggestedQuestionError";
import SuggestedQuestionListIntro from "./SuggestedQuestionListIntro";
import SuggestedQuestionListCard from "./SuggestedQuestionListCard";
import SuggestedQuestionFooter from "./SuggestedQuestionFooter";
import axiosInstance from "../../../../../interceptor";
import { getSuggestedQuestionCategory } from "../../../utils";

interface Props {
  reportId: string;
  initialQuestions?: string[] | null;
}

async function fetchSuggestedQuestions(reportId: string): Promise<string[]> {
  const { data } = await axiosInstance.get<{ data: string[] }>(
    `/report/${reportId}/suggested-questions`,
  );
  return data.data;
}

export default function ReportDetailSuggestedQuestions({
  reportId,
  initialQuestions,
}: Props) {
  const [questions, setQuestions] = useState<string[]>(initialQuestions ?? []);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async () => {
    // If closing — just close
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    // If we already have questions — just open
    if (questions.length > 0) {
      setIsOpen(true);
      return;
    }

    // Fetch from API
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchSuggestedQuestions(reportId);
      setQuestions(result);
      setIsOpen(true);
    } catch {
      setError("Failed to load questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 border border-purple-100">
      {/* ── Toggle Button Header ── */}
      <SuggestedQuestionHeader
        isLoading={isLoading}
        isOpen={isOpen}
        totalQuestionsCount={questions.length}
        handleToggle={handleToggle}
      />

      {/* ── Loading skeleton ── */}
      {isLoading && <SuggestedQuestionSkeleton />}

      {/* ── Error state ── */}
      {error && !isLoading && (
        <SuggestedQuestionError error={error} handleToggle={handleToggle} />
      )}

      {/* ── Questions list ── */}
      {isOpen && questions.length > 0 && !isLoading && (
        <div className="px-6 pb-6">
          {/* Intro banner */}
          <SuggestedQuestionListIntro />

          {/* Question cards */}
          <div className="space-y-3">
            {questions.map((question, index) => {
              const category = getSuggestedQuestionCategory(question);
              return (
                <SuggestedQuestionListCard
                  key={index}
                  index={index}
                  question={question}
                  label={category.label}
                  color={category.color}
                />
              );
            })}
          </div>

          {/* Footer tip */}
          <SuggestedQuestionFooter totalQuestionsCount={questions.length} />
        </div>
      )}
    </div>
  );
}
