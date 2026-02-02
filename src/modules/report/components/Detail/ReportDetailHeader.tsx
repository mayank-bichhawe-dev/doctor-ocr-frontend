import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  Download,
  Printer,
  Share2,
  FileText,
  FileSpreadsheet,
  ChevronDown,
} from "lucide-react";

import {
  reportPdfDownload,
  reportDocxDownload,
  reportExcelDownload,
} from "../../utils";

export default function ReportDetailHeader() {
  const navigate = useNavigate();
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);

  const handleBack = () => {
    navigate(-1);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      downloadRef.current &&
      !downloadRef.current.contains(event.target as Node)
    ) {
      setIsDownloadOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShare = async () => {
    // Web Share API for modern browsers
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Blood Report",
          text: "Check out my blood report",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadAsPDF = () => {
    setIsDownloadOpen(false);
    reportPdfDownload();
  };

  const downloadAsExcel = () => {
    setIsDownloadOpen(false);
    reportExcelDownload();
  };

  const downloadAsWord = async () => {
    setIsDownloadOpen(false);
    await reportDocxDownload();
  };

  return (
    <div className="bg-white shadow-md border-b border-gray-200 print:hidden">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Doctor OCR</h1>
                <p className="text-sm text-gray-600">Report Details</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all font-medium flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all font-medium flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>

            {/* Download Dropdown */}
            <div className="relative" ref={downloadRef}>
              <button
                onClick={() => setIsDownloadOpen(!isDownloadOpen)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isDownloadOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Download Options Menu */}
              {isDownloadOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={downloadAsPDF}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all text-left"
                  >
                    <FileText className="w-4 h-4 text-red-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">PDF</p>
                      <p className="text-xs text-gray-500">Portable format</p>
                    </div>
                  </button>

                  <button
                    onClick={downloadAsExcel}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all text-left"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Excel</p>
                      <p className="text-xs text-gray-500">
                        Spreadsheet format
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={downloadAsWord}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all text-left"
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Word</p>
                      <p className="text-xs text-gray-500">Document format</p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
