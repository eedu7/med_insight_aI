"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { DropZone, isFileDropItem } from "react-aria-components";
import { SelectImages } from "../components/select-images";
import { SelectScanType } from "../components/select-scan-type";

interface ImageItem {
    id: string;
    url: string;
    name: string;
}

export const ScanPageView = () => {
    const [items, setItems] = useState<ImageItem[]>([]);

    const processFiles = (files: File[]) => {
        const newFiles: ImageItem[] = files.map((file) => ({
            id: crypto.randomUUID(),
            url: URL.createObjectURL(file),
            name: file.name,
        }));

        setItems((prev) => [...prev, ...newFiles].slice(0, 6));
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
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
                        <CardTitle>Medical Scan Analysis</CardTitle>
                        <CardDescription>
                            Upload an image and select the body part to begin AI diagnosis.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-8">
                        <SelectScanType />

                        <SelectImages
                            items={items}
                            onProcessFiles={processFiles}
                            onRemoveItem={removeItem}
                        />
                    </CardContent>
                </Card>
            </div>
        </DropZone>
    );
};
