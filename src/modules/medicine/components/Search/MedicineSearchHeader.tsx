import { Pill } from "lucide-react";

export default function MedicineSearchHeader() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg">
          <Pill className="w-10 h-10 text-white" />
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
        Medicine Information
      </h1>
      <p className="text-lg text-gray-600">
        Search for detailed medication information and safety guidelines
      </p>
    </div>
  );
}
