"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    BrainCircuit,
    ChevronLeft,
    FileSearch,
    Fingerprint,
    ImageIcon,
    Loader2,
    Maximize2,
    ShieldCheck,
    Target
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetScanByID } from "../hooks/use-scans";

export const ScannedImagesPageView = ({ scanId }: { scanId: string }) => {
    const { data: scan, isLoading, isError } = useGetScanByID(scanId);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                    <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground">Synchronizing Neural Threads...</p>
                </div>
            </div>
        );
    }

    if (isError || !scan) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="text-destructive font-mono text-sm uppercase">Error: Data Retrieval Failed</p>
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
                            {scan.title}
                        </h1>
                    </div>
                    <Badge variant="secondary" className="font-mono">
                        {scan.scanned_images.length} / {scan.number_of_images} Frames Resolved
                    </Badge>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* We map using the total expected count to show empty slots as loading */}
                    {Array.from({ length: scan.number_of_images }).map((_, index) => {
                        const imageData = scan.scanned_images[index];
                        const isCompleted = imageData?.status === "completed";

                        return (
                            <div key={imageData?.id || index}>
                                {isCompleted ? (
                                    /* COMPLETED IMAGE CARD */
                                    <div className="group bg-card border border-border/60 rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-emerald-500/10 rounded-xl">
                                                    <Target className="h-4 w-4 text-emerald-500" />
                                                </div>
                                                <h3 className="font-bold text-xs font-mono truncate max-w-[200px]">
                                                    {/* Extracting filename from URL if necessary, or showing full */}
                                                    {imageData.file_name.split('/').pop()}
                                                </h3>
                                            </div>
                                            <Badge variant="outline" className="text-[8px] border-emerald-500/30 text-emerald-500 uppercase">
                                                {imageData.status}
                                            </Badge>
                                        </div>

                                        {/* Real Image Display */}
                                        <div className="relative aspect-video w-full rounded-2xl bg-black border border-border/40 overflow-hidden group/img">
                                            <Image
                                                src={imageData.file_name}
                                                alt="Medical Scan"
                                                fill
                                                className="object-cover opacity-80 group-hover/img:opacity-100 transition-opacity duration-500"
                                            />

                                            {/* Technical Overlay */}
                                            <div className="absolute inset-0 pointer-events-none border-[0.5px] border-emerald-500/20">
                                                <div className="w-full h-[1px] bg-emerald-500/10 absolute top-1/2 -translate-y-1/2" />
                                                <div className="w-[1px] h-full bg-emerald-500/10 absolute left-1/2 -translate-x-1/2" />
                                            </div>

                                            <div className="absolute top-2 right-2 p-2 bg-black/60 backdrop-blur-md rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity">
                                                <Maximize2 className="h-3 w-3 text-white" />
                                            </div>

                                            <div className="absolute bottom-2 left-3 bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                                                <span className="text-[8px] font-mono text-emerald-400/80 uppercase tracking-[0.2em]">Source: Remote_Srv_Node</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Neural Interpretation</p>
                                            <p className="text-sm text-muted-foreground leading-relaxed font-light">
                                                {imageData.results || "Analysis verification in progress..."}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-border/40 flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                                                <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">Integrity Confirmed</span>
                                            </div>
                                            <FileSearch className="h-4 w-4 text-muted-foreground/20" />
                                        </div>
                                    </div>
                                ) : (
                                    /* SKELETON / LOADING CARD */
                                    <div className="bg-card/40 border border-dashed border-border/60 rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden">
                                        <div className="flex justify-between items-center relative z-10">
                                            <div className="h-6 w-32 bg-muted/60 rounded-lg animate-pulse" />
                                            <Badge variant="outline" className="animate-pulse">Pending</Badge>
                                        </div>

                                        <div className="relative aspect-video w-full rounded-2xl bg-muted/20 border border-border/20 overflow-hidden flex flex-col items-center justify-center gap-3">
                                            <ImageIcon className="h-8 w-8 text-muted-foreground/20 animate-pulse" />
                                            <div className="w-48 h-1 bg-muted/40 rounded-full overflow-hidden">
                                                <div className="w-full h-full bg-emerald-500/40 animate-[shimmer_1.5s_infinite]" />
                                            </div>
                                            {/* Scanning Animation */}
                                            <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-[scan_3s_ease-in-out_infinite]" />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="h-3 w-full bg-muted/40 rounded-md animate-pulse" />
                                            <div className="h-3 w-2/3 bg-muted/40 rounded-md animate-pulse" />
                                        </div>

                                        <div className="pt-4 border-t border-border/40 flex justify-between items-center relative z-10">
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="h-3 w-3 text-emerald-500 animate-spin" />
                                                <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-500/60 font-bold">
                                                    {imageData?.status === "processing" ? "Analyzing..." : "Awaiting Data..."}
                                                </span>
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