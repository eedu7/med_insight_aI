"use client";
import { ChevronDown, Upload } from "lucide-react"; // Optional: icon library
import type React from "react";
import { useState } from "react";

export default function Page() {
    const [selectedBodyPart, setSelectedBodyPart] = useState("");
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const bodyParts = [
        { id: "chest", label: "Chest (X-Ray)" },
        { id: "brain", label: "Brain (MRI)" },
        { id: "knee", label: "Knee (Orthopedic)" },
        { id: "skin", label: "Skin (Dermoscopy)" },
    ];

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Medical Scan Analysis
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Upload an image and select the body part to begin AI
                        diagnosis.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* 1. Body Part Dropdown */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-sm font-semibold text-slate-700">
                            Select Body Part
                        </h1>
                        <div className="relative">
                            <select
                                className="w-full appearance-none bg-white border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                                value={selectedBodyPart}
                                onChange={(e) =>
                                    setSelectedBodyPart(e.target.value)
                                }
                            >
                                <option value="">Choose an area...</option>
                                {bodyParts.map((part) => (
                                    <option key={part.id} value={part.id}>
                                        {part.label}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                                <ChevronDown size={20} />
                            </div>
                        </div>
                    </div>

                    {/* 2. Image Upload Area */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-sm font-semibold text-slate-700">
                            Upload Scan
                        </h1>
                        <label
                            className={`group relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-all
              ${previewImage ? "border-blue-400 bg-blue-50" : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"}`}
                        >
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="h-full w-full object-contain p-2 rounded-xl"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload
                                        className="text-slate-400 group-hover:text-blue-500 mb-3 transition-colors"
                                        size={40}
                                    />
                                    <p className="mb-2 text-sm text-slate-500">
                                        <span className="font-semibold">
                                            Click to upload
                                        </span>{" "}
                                        or drag and drop
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        DICOM, PNG, or JPG (MAX. 10MB)
                                    </p>
                                </div>
                            )}
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </label>
                    </div>

                    {/* 3. Action Button */}
                    <button
                        type="button"
                        disabled={!selectedBodyPart || !previewImage}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
                    >
                        Run Diagnostic Scan
                    </button>
                </div>
            </div>

            {/* Footer Info */}
            <p className="mt-8 text-slate-400 text-xs text-center max-w-md">
                Disclaimer: This tool is for informational purposes and should
                not replace professional medical advice.
            </p>
        </div>
    );
}
