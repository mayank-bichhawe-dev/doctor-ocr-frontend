export function getSuggestedQuestionCategory(question: string): {
  label: string;
  color: string;
} {
  const q = question.toLowerCase();
  if (q.includes("diet") || q.includes("food") || q.includes("eat"))
    return { label: "Diet", color: "bg-green-100 text-green-700" };
  if (q.includes("medication") || q.includes("medicine") || q.includes("drug"))
    return { label: "Medication", color: "bg-blue-100 text-blue-700" };
  if (q.includes("test") || q.includes("follow-up") || q.includes("recheck"))
    return { label: "Follow-up", color: "bg-purple-100 text-purple-700" };
  if (
    q.includes("symptom") ||
    q.includes("watch") ||
    q.includes("concern") ||
    q.includes("worry")
  )
    return { label: "Symptoms", color: "bg-orange-100 text-orange-700" };
  if (q.includes("lifestyle") || q.includes("exercise") || q.includes("sleep"))
    return { label: "Lifestyle", color: "bg-teal-100 text-teal-700" };
  if (q.includes("specialist") || q.includes("refer"))
    return { label: "Referral", color: "bg-red-100 text-red-700" };
  return { label: "General", color: "bg-indigo-100 text-indigo-700" };
}
