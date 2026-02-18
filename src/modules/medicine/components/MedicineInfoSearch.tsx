import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { type AxiosError } from "axios";
import type { MedicineSearchApiRes, DrugLabel } from "../types";
import MedicineSearchHeader from "./Search/MedicineSearchHeader";
import MedicineSearchForm from "./Search/MedicineSearchForm";
import MedicineSearchInfoCard from "./Search/MedicineSearchInfoCard";
import MedicineResultHeader from "./Result/MedicineResultHeader";
import MedicineResultCard from "./Result/MedicineResultCard";
import MedicineResultStateRender from "./Result/MedicineResultStateRender";
import axiosInstance from "../../../interceptor";

const MedicineInfoSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState<DrugLabel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<DrugLabel | null>(
    null,
  );

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a medicine name");
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const { data } = await axiosInstance.get<MedicineSearchApiRes>(
        `/medicine/search/${searchTerm}`,
      );

      setMedicines(data.data);
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message || "Something went wrong. Please try again.");
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSearchTerm("");
    setMedicines([]);
    setHasSearched(false);
    setError("");
    setSelectedMedicine(null);
  };

  const handleMedicineClick = (medicine: DrugLabel) => {
    setSelectedMedicine(selectedMedicine?.id === medicine.id ? null : medicine);
  };

  const onChangeSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setError("");
  };

  // Initial Search Screen
  if (!hasSearched) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <MedicineSearchHeader />

          {/* Search Input */}
          <MedicineSearchForm
            searchTerm={searchTerm}
            onChangeSearchTerm={onChangeSearchTerm}
            error={error}
            loading={loading}
            handleSearch={handleSearch}
          />

          {/* Info Card */}
          <MedicineSearchInfoCard />
        </div>
      </div>
    );
  }

  // Results Screen
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Search
        </button>

        {/* Header */}

        <MedicineResultHeader
          searchTerm={searchTerm}
          count={medicines.length}
        />
        {/* Results */}
        <MedicineResultStateRender
          loading={loading}
          error={error}
          isEmpty={medicines.length === 0}
        >
          {medicines.map((medicine) => (
            <MedicineResultCard
              key={medicine.id}
              medicine={medicine}
              selectedMedicine={selectedMedicine}
              handleMedicineClick={handleMedicineClick}
            />
          ))}
        </MedicineResultStateRender>
      </div>
    </div>
  );
};

export default MedicineInfoSearch;
