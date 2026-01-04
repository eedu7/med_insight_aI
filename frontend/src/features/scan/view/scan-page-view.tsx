"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { DropZone, isFileDropItem } from "react-aria-components";
import { SelectImages } from "../components/select-images";
import { SelectScanType } from "../components/select-scan-type";

interface ImageItem {
    id: string;
    url: string;
    name: string;
    file: File;
}

export const ScanPageView = () => {
    const [items, setItems] = useState<ImageItem[]>([]);
    const [scanType, setScanType] = useState<string>("");
    const [isUploading, setIsUploading] = useState(false);

    const processFiles = (files: File[]) => {
        const newFiles: ImageItem[] = files.map((file) => ({
            id: crypto.randomUUID(),
            url: URL.createObjectURL(file),
            name: file.name,
            file: file,
        }));

        setItems((prev) => [...prev, ...newFiles].slice(0, 6));
    };

    const removeItem = (id: string) => {
        setItems((prev) => {
            const filtered = prev.filter((item) => item.id !== id);
            const removedItem = prev.find(item => item.id === id);
            if (removedItem) URL.revokeObjectURL(removedItem.url);
            return filtered;
        });
    };

    const handleAnalyze = async () => {
        if (items.length === 0 || !scanType) {
            alert("Please select a scan type and upload at least one image.");
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("scanType", scanType);

            items.forEach((item) => {
                formData.append("files", item.file);
            });

            const response = await fetch("/api/scan", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to analyze");

            const result = await response.json();
            console.log("Analysis Result:", result);
            alert("Analysis complete! Check console for data.");

        } catch (error) {
            console.error("Upload error:", error);
            alert("Something went wrong during the upload.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <DropZone
            onDrop={async (e) => {
                const files = await Promise.all(
                    e.items
                        .filter(isFileDropItem)
                        .map((item) => item.getFile()),
                );
                processFiles(files);
            }}
            className="w-full min-h-screen outline-none transition-colors data-drop-target:bg-primary/5"
        >
            <div className="w-full min-h-screen max-w-4xl mx-auto flex items-center justify-center p-4">
                <Card className="w-full max-w-lg shadow-none border-none bg-transparent">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold">Medical Scan Analysis</CardTitle>
                        <CardDescription>
                            Upload up to 6 images and select the scan type to begin.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-8">
                        <SelectScanType
                            value={scanType}
                            onValueChange={setScanType}
                        />

                        <SelectImages
                            items={items}
                            onProcessFiles={processFiles}
                            onRemoveItem={removeItem}
                        />

                        <Button
                            className="w-full py-6 text-lg"
                            disabled={isUploading || items.length === 0}
                            onClick={handleAnalyze}
                        >
                            {isUploading ? (
                                <>
                                    <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />
                                    Analyzing Scans...
                                </>
                            ) : (
                                "Run AI Diagnosis"
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </DropZone>
    );
};