import { AlertCircle, Pill } from "lucide-react";
import Loader from "../../../../components/Loader";

interface Props {
  loading: boolean;
  error: string;
  isEmpty: boolean;
  children: React.ReactNode;
}
export default function MedicineResultStateRender({
  loading,
  error,
  isEmpty,
  children,
}: Props) {
  if (loading) {
    return <Loader message="Loading medicine information..." />;
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 font-medium mb-2">Error</p>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
        <Pill className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">
          No medicines found matching your search.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Try searching with a different name or spelling.
        </p>
      </div>
    );
  }

  return <div className="space-y-4">{children}</div>;
}
