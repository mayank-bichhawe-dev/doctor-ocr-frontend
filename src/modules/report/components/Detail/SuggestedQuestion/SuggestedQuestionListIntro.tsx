import { ClipboardList } from "lucide-react";

export default function SuggestedQuestionListIntro() {
  return (
    <div className="flex items-start gap-3 p-4 bg-linear-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl mb-5">
      <ClipboardList className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
      <p className="text-sm text-purple-800 leading-relaxed">
        These questions are tailored to your blood report results. Take this
        list to your next doctor's appointment to get the most out of your
        consultation.
      </p>
    </div>
  );
}
