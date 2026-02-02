import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Upload,
  X,
  FileText,
  Loader,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { setReportDetailsInLocalStorage } from "../../utils";
import type { ReportUploadApiRes } from "../../types";

type ReturnType = {
  ReportUploadModal: React.FC;
  handleToggleModal: () => void;
};

export default function useReportUploadModal(): ReturnType {
  const navigate = useNavigate();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToggleModal = () => {
    setIsUploadModalOpen((prev) => !prev);
    setSelectedFile(null);
    setUploadStatus("idle");
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type (PDF or images)
      const validTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];
      if (!validTypes.includes(file.type)) {
        setErrorMessage("Please select a valid file (PDF, JPG, or PNG)");
        setSelectedFile(null);
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setErrorMessage("File size must be less than 5MB");
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
      setErrorMessage("");
    }
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a file to upload");
      return;
    }

    setUploadStatus("uploading");
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const { data } = await axios.post<ReportUploadApiRes>(
        "http://localhost:3000/report/upload-and-summarize",
        formData
      );
      setReportDetailsInLocalStorage(data.data);
      setUploadStatus("success");
      setSuccessMessage("Report uploaded successfully!");

      setTimeout(() => {
        handleToggleModal();
        navigate(`/report/${data.data.id}`);
      }, 2000);
    } catch (error: any) {
      setUploadStatus("error");
      setErrorMessage(
        error.message || "Failed to upload report. Please try again."
      );
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      // Create a fake event to reuse handleFileSelect logic
      const fakeEvent = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(fakeEvent);
    }
  };

  const ReportUploadModal = () => {
    return (
      <>
        {isUploadModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Upload className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Upload Blood Report
                    </h2>
                    <p className="text-sm text-gray-600">
                      Upload PDF or image file
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleToggleModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                  disabled={uploadStatus === "uploading"}
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {/* File Upload Area */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    selectedFile
                      ? "border-indigo-300 bg-indigo-50"
                      : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    disabled={uploadStatus === "uploading"}
                  />

                  {!selectedFile ? (
                    <>
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-700 font-medium mb-2">
                        Drag and drop your file here
                      </p>
                      <p className="text-sm text-gray-500 mb-4">or</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium"
                        disabled={uploadStatus === "uploading"}
                      >
                        Browse Files
                      </button>
                      <p className="text-xs text-gray-500 mt-4">
                        Supported formats: PDF, JPG, PNG (Max 10MB)
                      </p>
                    </>
                  ) : (
                    <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-indigo-600" />
                        <div className="text-left">
                          <p className="font-medium text-gray-800">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      {uploadStatus !== "uploading" && (
                        <button
                          onClick={() => setSelectedFile(null)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{errorMessage}</p>
                  </div>
                )}

                {/* Success Message */}
                {successMessage && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-green-800">{successMessage}</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={handleToggleModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                  disabled={uploadStatus === "uploading"}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadSubmit}
                  disabled={!selectedFile || uploadStatus === "uploading"}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {uploadStatus === "uploading" ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Upload Report
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return { ReportUploadModal, handleToggleModal };
}
