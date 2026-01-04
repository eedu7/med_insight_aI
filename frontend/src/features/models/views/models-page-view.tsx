"use client";

import { Button } from "@/components/ui/button";
import {
    Activity,
    BrainCircuit,
    Calendar,
    Database,
    Info,
    Layers,
    Loader2,
    Search
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const DUMMY_MODELS = [
    {
        id: "d1c5eb6a-1a78-41f4-a454-a8fbe8b30706",
        display_name: "ViT-Base Lung/Colon Cancer",
        short_description: "State-of-the-art vision transformer optimized for identifying malignant histopathological features in lung and colon tissue slides.",
        medical_domain: "Oncology",
        architecture: "ViT-Patch16-224",
        accuracy: 0.9994,
        created_at: "2026-01-04T05:22:40.011Z",
        updated_at: "2026-01-04T05:22:40.011Z",
        is_active: true,
    },
    {
        id: "e2d6fb7b-2b89-5263-c4fd-b9fce9c40817",
        display_name: "DenseNet-121 Pneumonia Scan",
        short_description: "High-precision radiographic analysis module for automated detection of viral and bacterial pneumonia from frontal-view chest X-rays.",
        medical_domain: "Radiology",
        architecture: "DenseNet-121",
        accuracy: 0.9421,
        created_at: "2025-12-15T10:11:20.000Z",
        updated_at: "2026-01-02T14:30:00.000Z",
        is_active: true,
    }
];

export const ModelsPageView = () => {
    const [models, setModels] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API Fetch
        const timer = setTimeout(() => {
            setModels(DUMMY_MODELS);
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                    <p className="text-xs font-mono uppercase tracking-[0.3em]">Querying Registry...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-6 lg:p-12">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                            <Activity className="h-3 w-3 animate-pulse" /> Diagnostic Registry
                        </div>
                        <h1 className="text-5xl font-bold tracking-tight">
                            Neural <span className="text-muted-foreground font-light">Inventory</span>
                        </h1>
                        <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
                            Access our suite of specialized clinical intelligence modules. Every architecture is
                            validated against histopathological benchmarks for sub-second diagnostic support.
                        </p>
                    </div>

                    <div className="relative w-full md:w-72 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Filter modules..."
                            className="w-full bg-card border border-border rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        />
                    </div>
                </header>

                {/* Models List */}
                <div className="grid gap-6">
                    {models.map((model) => (
                        <div
                            key={model.id}
                            className="group relative bg-card border border-border/60 rounded-[2.5rem] p-8 hover:border-emerald-500/40 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                <div className="space-y-5 flex-1">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-500">
                                                <BrainCircuit className="h-5 w-5" />
                                            </div>
                                            <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                                {model.display_name}
                                            </h2>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-500/5 px-2 py-0.5 rounded-md">
                                                <Database className="h-3 w-3" /> {model.medical_domain}
                                            </span>
                                            <span className="h-1 w-1 rounded-full bg-border" />
                                            <span className="flex items-center gap-1.5">
                                                <Layers className="h-3 w-3" /> {model.architecture}
                                            </span>
                                        </div>
                                    </div>

                                    {/* SHORT DESCRIPTION */}
                                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 max-w-3xl">
                                        {model.short_description}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border/40">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-tight">
                                            <Calendar className="h-3.5 w-3.5" />
                                            Deployed: {new Date(model.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-tight">
                                            <Activity className="h-3.5 w-3.5" />
                                            Accuracy: {(model.accuracy * 100).toFixed(2)}%
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button size="lg" className="rounded-4xl gap-2 px-8 h-14 bg-foreground hover:bg-emerald-600 shadow-lg transition-all active:scale-95" asChild>
                                        <Link href={`/models/${model.id}`}>
                                            <Info className="h-4 w-4" /> Model Details
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <footer className="pt-12 text-center opacity-30">
                    <p className="text-[9px] font-mono uppercase tracking-[0.5em]">MedInsight_Registry_V3.0</p>
                </footer>
            </div>
        </div>
    );
};