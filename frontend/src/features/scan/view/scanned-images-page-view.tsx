"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    BrainCircuit,
    ChevronLeft,
    Dna,
    FileSearch,
    Fingerprint,
    ImageIcon,
    Loader2,
    Maximize2,
    ShieldCheck,
    Target
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ScannedImage {
    id: string;
    file_name: string;
    status: "loading" | "completed" | "failed";
    result?: string;
}

interface ScanData {
    id: string;
    title: string;
    number_of_images: number;
    scanned_images: ScannedImage[];
}

export const ScannedImagesPageView = ({ scanId }: { scanId: string }) => {
    const [scan, setScan] = useState<ScanData | null>(null);
    const [isMetadataLoading, setIsMetadataLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setScan({
                id: scanId,
                title: "Neural Histopathology Protocol",
                number_of_images: 4,
                scanned_images: [],
            });
            setIsMetadataLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [scanId]);

    useEffect(() => {
        if (!isMetadataLoading && scan && scan.scanned_images.length < scan.number_of_images) {
            const timer = setTimeout(() => {
                const nextIndex = scan.scanned_images.length + 1;
                const newImage: ScannedImage = {
                    id: crypto.randomUUID(),
                    file_name: `IMG_SOURCE_0${nextIndex}.dicom`,
                    status: "completed",
                    result: "Analysis indicates normal tissue density with no observable cellular mutations in the primary quadrant."
                };
                setScan(prev => prev ? { ...prev, scanned_images: [...prev.scanned_images, newImage] } : null);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [isMetadataLoading, scan]);

    if (isMetadataLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                    <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground">Synchronizing Neural Threads...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-6 lg:p-12">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <Button variant="ghost" size="sm" className="rounded-full gap-2 text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/5" asChild>
                            <Link href="/scans"><ChevronLeft className="h-4 w-4" /> System Inventory</Link>
                        </Button>
                        <div className="flex items-center gap-3 text-emerald-500 font-mono text-[10px] font-black uppercase tracking-[0.4em]">
                            <Fingerprint className="h-4 w-4" /> Sequence ID: {scanId.slice(0, 8)}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter italic uppercase text-foreground">
                            {scan?.title}
                        </h1>
                    </div>
                    <Badge aria-label={`${scan?.scanned_images.length} / ${scan?.number_of_images} Frames Resolved`} >{`${scan?.scanned_images.length} / ${scan?.number_of_images} Frames Resolved`}</Badge>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Array.from({ length: scan?.number_of_images || 0 }).map((_, index) => {
                        const imageData = scan?.scanned_images[index];

                        return (
                            <div key={imageData?.id || index}>
                                {imageData ? (
                                    /* COMPLETED IMAGE CARD */
                                    <div className="bg-card border border-border/60 rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-emerald-500/10 rounded-xl">
                                                    <Target className="h-4 w-4 text-emerald-500" />
                                                </div>
                                                <h3 className="font-bold text-sm font-mono tracking-tight">{imageData.file_name}</h3>
                                            </div>
                                            <Badge variant="outline" aria-label="Verified" className="text-[8px] border-emerald-500/30 text-emerald-500">Verified</Badge>
                                        </div>

                                        {/* Image Placeholder Area */}
                                        <div className="relative aspect-video w-full rounded-2xl bg-slate-950 border border-border/40 overflow-hidden group/img">
                                            <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                                                <Dna className="h-24 w-24 text-emerald-500" />
                                            </div>
                                            <div className="absolute top-2 right-2 p-2 bg-black/40 backdrop-blur-md rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity">
                                                <Maximize2 className="h-3 w-3 text-white" />
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center border-[0.5px] border-emerald-500/10 pointer-events-none">
                                                <div className="w-full h-[1px] bg-emerald-500/20 absolute" />
                                                <div className="w-[1px] h-full bg-emerald-500/20 absolute" />
                                            </div>
                                            <div className="absolute bottom-2 left-3">
                                                <span className="text-[8px] font-mono text-emerald-500/50 uppercase tracking-[0.2em]">Source Imagery: Raw_Data_S0{index + 1}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Neural Interpretation</p>
                                            <p className="text-sm text-muted-foreground leading-relaxed font-light">
                                                {imageData.result}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-border/40 flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                                                <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">No Abnormalities Detected</span>
                                            </div>
                                            <FileSearch className="h-4 w-4 text-muted-foreground/20" />
                                        </div>
                                    </div>
                                ) : (
                                    /* SKELETON LOADING CARD */
                                    <div className="bg-card/40 border border-dashed border-border/60 rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden">
                                        <div className="flex justify-between items-center relative z-10">
                                            <div className="h-6 w-32 bg-muted/60 rounded-lg animate-pulse" />
                                            <div className="h-5 w-16 bg-muted/40 rounded-full animate-pulse" />
                                        </div>

                                        {/* Loading Image Placeholder */}
                                        <div className="relative aspect-video w-full rounded-2xl bg-muted/20 border border-border/20 overflow-hidden flex flex-col items-center justify-center gap-3">
                                            <ImageIcon className="h-8 w-8 text-muted-foreground/20 animate-pulse" />
                                            <div className="w-48 h-1 bg-muted/40 rounded-full overflow-hidden">
                                                <div className="w-full h-full bg-emerald-500/40 -translate-x-full animate-[shimmer_1.5s_infinite]" />
                                            </div>
                                            {/* Scanning Line */}
                                            <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-500/20 animate-[scan_3s_ease-in-out_infinite]" />
                                        </div>

                                        <div className="space-y-4 relative z-10">
                                            <div className="space-y-2">
                                                <div className="h-3 w-full bg-muted/40 rounded-md animate-pulse" />
                                                <div className="h-3 w-4/6 bg-muted/40 rounded-md animate-pulse delay-150" />
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-border/40 flex justify-between items-center relative z-10">
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="h-3 w-3 text-emerald-500 animate-spin" />
                                                <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-500/60 font-bold">Decoding Packet {index + 1}...</span>
                                            </div>
                                            <BrainCircuit className="h-4 w-4 text-muted-foreground/10" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>


        </div>
    );
};