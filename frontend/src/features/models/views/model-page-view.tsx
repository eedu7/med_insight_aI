"use client";

import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    Code2,
    Database,
    Dna, FileText,
    Fingerprint,
    FlaskConical,
    Globe,
    Loader2,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "../components/badge";
import { DetailItem } from "../components/detail-item";
import { ExternalActionLink } from "../components/external-action-link";
import { MetricBox } from "../components/metric-box";

// Mock Data representing the individual model response
const DUMMY_MODEL_DETAIL = {
    display_name: "vit-base-patch16-224-in21k_lung_and_colon_cancer",
    hf_model_id: "DunnBC22/vit-base-patch16-224-in21k_lung_and_colon_cancer",
    hf_url: "https://huggingface.co/DunnBC22/vit-base-patch16-224-in21k_lung_and_colon_cancer",
    short_description: "Vision Transformer optimized for malignant tissue identification.",
    full_description: "This model is a fine-tuned version of the Vision Transformer (ViT) architecture, specifically trained on over 25,000 histopathological images. It is engineered to distinguish between lung adenocarcinomas, lung squamous cell carcinomas, and colon adenocarcinomas with near-perfect clinical accuracy. The protocol utilizes a 16x16 patch size and was pre-trained on the ImageNet-21k dataset before medical fine-tuning.",
    task_type: "Image Classification",
    medical_domain: "Lung and Colon Cancer",
    modality: "Histopathology Image",
    accuracy: 0.9994,
    f1_score: 0.9994,
    auc_score: 0.9998,
    precision: 0.9994,
    recall: 0.9994,
    trained_on_dataset: "LC25000 Histopathological Dataset",
    dataset_url: "https://www.kaggle.com/datasets/andrewmvd/lung-and-colon-cancer-histopathological-images",
    architecture: "ViT-base-patch16-224",
    framework: "PyTorch",
    parameters_millions: "86",
    inference_type: "Trainer Generated",
    model_version: "v2.4.0-Alpha",
    id: "d1c5eb6a-1a78-41f4-a454-a8fbe8b30706",
    user_id: "97cd7bbf-1b36-4976-a386-ba203cbe70ec",
    created_at: "2026-01-04T05:22:40.011Z",
    updated_at: "2026-01-04T05:22:40.011Z"
};

export const ModelPageView = ({ modelId }: { modelId: string }) => {
    const [model, setModel] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API Fetch for a specific ID
        const timer = setTimeout(() => {
            setModel(DUMMY_MODEL_DETAIL);
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [modelId]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                    <p className="text-[10px] font-mono uppercase tracking-[0.4em]">Deciphering Protocol...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-6 lg:p-12">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Navigation */}
                <Button variant="ghost" size="sm" className="rounded-full gap-2 text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/5 transition-all" asChild>
                    <Link href="/models">
                        <ChevronLeft className="h-4 w-4" /> System Inventory
                    </Link>
                </Button>

                {/* Main Dossier Header */}
                <div className="relative bg-card border border-border/60 rounded-[3rem] p-8 md:p-12 overflow-hidden ">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                        <Dna className="h-80 w-80 rotate-12 text-emerald-500" />
                    </div>

                    <div className="relative z-10 flex flex-col gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-emerald-500 font-mono text-[10px] font-black uppercase tracking-[0.4em]">
                                <Fingerprint className="h-4 w-4" />
                                Model ID: {modelId}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-4xl">
                                {model.display_name}
                            </h1>
                            <div className="flex flex-wrap gap-2 pt-2">
                                <Badge label={model.framework} />
                                <Badge label={model.task_type} />
                                <Badge label={model.model_version} icon={<ShieldCheck className="h-3 w-3" />} />
                            </div>
                        </div>

                        {/* Performance Metrics Dashboard */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                            <MetricBox label="Accuracy" value={model.accuracy} />
                            <MetricBox label="F1 Score" value={model.f1_score} />
                            <MetricBox label="Precision" value={model.precision} />
                            <MetricBox label="Recall" value={model.recall} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Primary Technical Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-card border border-border/60 rounded-[2.5rem] p-10 space-y-10">
                            <div className="space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-emerald-500" /> Clinical Spec Sheet
                                </h3>
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-muted-foreground leading-relaxed text-xl font-light">
                                        {model.full_description}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pt-8 border-t border-border/40">
                                <DetailItem label="Medical Domain" value={model.medical_domain} icon={<FlaskConical className="h-4 w-4" />} />
                                <DetailItem label="Core Architecture" value={model.architecture} icon={<Code2 className="h-4 w-4" />} />
                                <DetailItem label="Modality" value={model.modality} icon={<Globe className="h-4 w-4" />} />
                                <DetailItem label="Dataset Source" value={model.trained_on_dataset} icon={<Database className="h-4 w-4" />} />
                            </div>
                        </div>
                    </div>



                    {/* External Reference Card */}
                    <div className="bg-card border border-border/60 rounded-[2.5rem] p-8 space-y-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Verification Links</p>
                        <div className="space-y-3">
                            <ExternalActionLink label="Hugging Face Registry" href={model.hf_url} />
                            <ExternalActionLink label="Training Data Source" href={model.dataset_url} />
                        </div>
                        <div className="pt-4 border-t border-border/40">
                            <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground uppercase">
                                <span>Sync Status</span>
                                <span className="text-emerald-500 font-bold">Verified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


