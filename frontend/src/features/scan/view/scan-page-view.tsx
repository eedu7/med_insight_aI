"use client";

import { Button } from "@/components/ui/button";
import {
    AlertCircle,
    BrainCircuit,
    Loader2,
    ShieldCheck,
    Sparkles,
    Zap
} from "lucide-react";
import { useState } from "react";
import { DropZone, isFileDropItem } from "react-aria-components";
import { ScanHeader } from "../components/scan-header";
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
    const [scanType, setScanType] = useState<string>("Skin");
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
        if (items.length === 0 || !scanType) return;
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("scanType", scanType);
            items.forEach((item) => formData.append("files", item.file));

            const response = await fetch("/api/scan", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Analysis failed");
            const result = await response.json();
            console.log("Analysis Result:", result);
            alert("Analysis Complete. Check console.");
        } catch (error) {
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <DropZone
            onDrop={async (e) => {
                const files = await Promise.all(
                    e.items.filter(isFileDropItem).map((item) => item.getFile()),
                );
                processFiles(files);
            }}
            className="w-full min-h-screen outline-none transition-colors data-drop-target:bg-emerald-500/5"
        >
            <div className="max-w-4xl mx-auto py-16 px-6 space-y-12">
                <ScanHeader />

                <div className="bg-card border border-border/60 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-emerald-500/5 relative overflow-hidden">
                    <BrainCircuit className="absolute -right-16 -top-16 h-80 w-80 opacity-[0.03] text-emerald-500 pointer-events-none" />

                    <div className="relative z-10 space-y-12">
                        <section className="space-y-6">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600/70">
                                <Sparkles className="h-4 w-4" /> Protocol Selection
                            </div>
                            <SelectScanType value={scanType} onValueChange={setScanType} />
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600/70">
                                <ShieldCheck className="h-4 w-4" /> Imagery Upload
                            </div>
                            <SelectImages
                                items={items}
                                onProcessFiles={processFiles}
                                onRemoveItem={removeItem}
                            />
                        </section>

                        <div className="space-y-4">
                            <Button
                                className="w-full h-16 rounded-[1.5rem] text-lg font-bold bg-foreground hover:bg-emerald-600 text-background transition-all shadow-xl active:scale-[0.98] disabled:opacity-30 group"
                                disabled={isUploading || items.length === 0 || !scanType}
                                onClick={handleAnalyze}
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Neural Processing...
                                    </>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Execute Analysis Protocol <Zap className="h-4 w-4 fill-current" />
                                    </span>
                                )}
                            </Button>

                            {!scanType && items.length > 0 && (
                                <div className="flex items-center justify-center gap-2 text-amber-500 text-[10px] font-bold uppercase tracking-widest animate-in fade-in slide-in-from-bottom-1">
                                    <AlertCircle className="h-3 w-3" /> Select scan category to enable analysis
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DropZone>
    );
};