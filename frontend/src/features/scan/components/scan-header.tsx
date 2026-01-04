"use client";

import { AlertTriangle } from "lucide-react";

export const ScanHeader = () => {
    return (
        <header className="text-center">
            <div className="max-w-2xl mx-auto px-4 py-3 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-3 text-left transition-colors hover:bg-amber-500/10">
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">
                        Medical Disclaimer
                    </p>
                    <p className="text-[10px] md:text-xs text-amber-600/80 leading-tight italic font-medium">
                        This tool is powered by experimental AI models for informational purposes only. It is <strong>not</strong> a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician.
                    </p>
                </div>
            </div>
        </header>
    );
};