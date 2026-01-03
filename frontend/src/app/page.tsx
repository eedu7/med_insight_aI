"use client";

import { Button } from "@/components/ui/button";
import {
    Activity,
    ArrowRight,
    MessageSquare,
    ScanLine,
    ShieldCheck,
    Zap,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
            <div className="max-w-2xl w-full text-center space-y-12">
                {/* Brand Identity Section */}
                <div className="relative inline-flex flex-col items-center">
                    {/* Medical Pulse Glow */}
                    <div className="absolute inset-0 bg-emerald-400/10 blur-[120px] rounded-full animate-pulse" />

                    <div className="relative bg-card border border-border/60 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] p-12 rounded-[3.5rem] transition-all duration-1000 group">
                        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                            {/* Fluent Rotating Logo */}
                            <img
                                src="/logos/logo-small.svg"
                                alt="MedInsight AI Logo"
                                className="w-full h-full object-contain animate-[spin_15s_linear_infinite] drop-shadow-sm"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Activity className="h-8 w-8 text-emerald-500 animate-[pulse_2s_ease-in-out_infinite] opacity-80" />
                            </div>
                        </div>

                        <div className="mt-8 space-y-1">
                            <h1 className="text-5xl font-bold tracking-tight text-foreground">
                                MedInsight{" "}
                                <span className="text-emerald-500">AI</span>
                            </h1>
                            <p className="text-xs font-mono uppercase tracking-[0.5em] text-muted-foreground/80">
                                Advanced Diagnostics Engine
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-xl mx-auto">
                    <Button
                        variant="outline"
                        className="h-auto p-8 rounded-[2rem] border-2 bg-card/50 backdrop-blur-sm flex flex-col items-center gap-4 transition-all hover:border-emerald-500/50 hover:bg-emerald-50/10 group shadow-sm"
                        asChild
                    >
                        <Link href="/chat">
                            <div className="p-4 bg-emerald-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                                <MessageSquare className="h-7 w-7 text-emerald-600" />
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold">
                                    Consult AI
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Clinical Assistant
                                </div>
                            </div>
                        </Link>
                    </Button>

                    <Button
                        variant="outline"
                        className="h-auto p-8 rounded-[2rem] border-2 bg-card/50 backdrop-blur-sm flex flex-col items-center gap-4 transition-all hover:border-blue-500/50 hover:bg-blue-50/10 group shadow-sm"
                        asChild
                    >
                        <Link href="/scan">
                            <div className="p-4 bg-blue-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                                <ScanLine className="h-7 w-7 text-blue-600" />
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold">
                                    Visual Scan
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Imaging Analysis
                                </div>
                            </div>
                        </Link>
                    </Button>
                </div>

                {/* System Footer */}
                <div className="pt-8 flex flex-col items-center gap-6">
                    <Link
                        href="/history"
                        className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
                    >
                        <Zap className="h-4 w-4 text-amber-500 group-hover:fill-amber-500" />
                        Check Deployment History
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <div className="flex items-center gap-6 px-6 py-2 rounded-full border border-border/40 bg-muted/30 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        <span className="flex items-center gap-2">
                            <ShieldCheck className="h-3 w-3 text-emerald-500" />{" "}
                            HIPAA Compliant Environment
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
