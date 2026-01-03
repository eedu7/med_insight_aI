"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, Microscope } from "lucide-react";
import Link from "next/link";

export const HistoryPageView = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
            <div className="max-w-md w-full text-center space-y-10">
                {/* Animated Medical Component */}
                <div className="relative inline-flex items-center justify-center">
                    <div className="absolute inset-0 bg-emerald-500/5 blur-[80px] rounded-full" />

                    <div className="relative bg-card border border-border shadow-2xl p-10 rounded-[3rem]">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            {/* Ultra-smooth Logo Rotation */}
                            <img
                                src="/logos/logo-small.svg"
                                alt="logo"
                                className="w-full h-full object-contain animate-[spin_20s_linear_infinite] opacity-40 grayscale"
                            />
                            {/* Centered Processing Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Microscope className="h-10 w-10 text-emerald-500 animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Floating Data Nodes (Decorative) */}
                    <div className="absolute -top-2 -right-2 h-4 w-4 bg-emerald-400 rounded-full animate-ping" />
                </div>

                {/* Progress Narrative */}
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 text-[11px] font-bold uppercase tracking-[0.2em]">
                        <Loader2 className="h-3 w-3 animate-spin" /> Indexing
                        Patient History
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight">
                        Building Insight{" "}
                        <span className="text-muted-foreground font-light">
                            Archives
                        </span>
                    </h1>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                        We are currently engineering the archival layer for
                        **MedInsight AI**. This module will allow you to track
                        diagnostic trends and historical consultations with
                        sub-second retrieval.
                    </p>
                </div>

                {/* Technical Progress Bar */}
                <div className="w-full space-y-2">
                    <div className="flex justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-widest px-1">
                        <span>Database Sync</span>
                        <span>72%</span>
                    </div>
                    <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                        <div
                            className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                            style={{ width: "72%" }}
                        />
                    </div>
                </div>

                {/* Return Action */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-emerald-600 transition-all rounded-full"
                    asChild
                >
                    <Link href="/chat" className="flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Back to Command Center
                    </Link>
                </Button>

                <footer className="pt-10 opacity-30 flex flex-col items-center gap-1">
                    <div className="h-px w-12 bg-border mb-2" />
                    <p className="text-[9px] font-mono uppercase tracking-[0.5em]">
                        MedInsight_Protocol_Alpha
                    </p>
                </footer>
            </div>
        </div>
    );
};
