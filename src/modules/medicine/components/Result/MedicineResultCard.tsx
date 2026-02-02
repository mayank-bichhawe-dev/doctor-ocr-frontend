import { AlertCircle } from "lucide-react";
import type { DrugLabel } from "../../types";

interface Props {
  medicine: DrugLabel;
  selectedMedicine: DrugLabel | null;
  handleMedicineClick: (medicine: DrugLabel) => void;
}

export default function MedicineResultCard({
  medicine,
  selectedMedicine,
  handleMedicineClick,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-lg">
      {/* Card Header - Always Visible */}
      <button
        onClick={() => handleMedicineClick(medicine)}
        className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              {medicine.brandName}
            </h2>
            <p className="text-indigo-600 font-medium mb-2">
              {medicine.genericName}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                {medicine.activeIngredient?.substring(0, 50)}
                {medicine.activeIngredient?.length > 50 ? "..." : ""}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                {medicine.purpose}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-500 text-right">
            <p className="font-medium">{medicine.manufacturerName}</p>
            <p className="text-xs mt-1">
              {selectedMedicine?.brandName === medicine.brandName
                ? "Click to collapse"
                : "Click to expand"}
            </p>
          </div>
        </div>
      </button>

      {/* Expandable Details */}
      {selectedMedicine?.brandName === medicine.brandName && (
        <div className="border-t border-gray-200 p-6 bg-gray-50 space-y-6">
          {/* Uses */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              Uses
            </h3>
            <p className="text-gray-700 ml-4">
              {medicine.dosageAndAdministration}
            </p>
          </div>

          {/* Dosage */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              Dosage & Administration
            </h3>
            <p className="text-gray-700 ml-4 whitespace-pre-line">
              {medicine.dosageAndAdministration}
            </p>
          </div>

          {/* When Using */}
          {medicine.whenUsing && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                When Using This Product
              </h3>
              <p className="text-gray-700 ml-4">{medicine.whenUsing}</p>
            </div>
          )}

          {/* Warnings */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Important Warnings
            </h3>
            <div className="space-y-2 ml-4">
              {medicine?.warnings?.slice(0, 5).map((warning, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <p className="text-gray-700 flex-1">{warning}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Do Not Use */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              Do Not Use
            </h3>
            <p className="text-gray-700 ml-4">{medicine.doNotUse}</p>
          </div>

          {/* Ask Doctor */}
          {medicine.askDoctor && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                Ask a Doctor Before Use
              </h3>
              <p className="text-gray-700 ml-4">{medicine.askDoctor}</p>
            </div>
          )}

          {/* Stop Use */}
          {medicine.stopUse && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                Stop Use and Ask a Doctor If
              </h3>
              <p className="text-gray-700 ml-4">{medicine.stopUse}</p>
            </div>
          )}

          {/* Storage */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              Storage Information
            </h3>
            <p className="text-gray-700 ml-4">{medicine.storageAndHandling}</p>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> This information is for reference
              only. Always consult with a healthcare professional before taking
              any medication.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
