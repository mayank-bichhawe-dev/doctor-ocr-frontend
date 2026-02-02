import { Loader as LoaderIcon } from "lucide-react";

export default function Loader({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <LoaderIcon className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
