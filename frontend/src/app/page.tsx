"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Construction, Hammer } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Visual Icon */}
                <div className="relative inline-flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                    <div className="relative bg-card border shadow-xl p-6 rounded-3xl">
                        <Construction className="h-12 w-12 text-primary animate-pulse" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-3">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Under Development
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        We're currently building something amazing. This home
                        page is under construction and will be ready soon.
                    </p>
                </div>

                {/* Progress Indicator (Optional visual) */}
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-2/3 rounded-full" />
                </div>

                {/* Call to Action */}
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        variant="default"
                        className="rounded-full px-8 h-12 shadow-lg shadow-primary/20 group"
                        asChild
                    >
                        <Link href="/chat" className="flex items-center gap-2">
                            Start Assistant
                            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>

                    <Button
                        variant="outline"
                        className="rounded-full px-8 h-12 border-2 hover:bg-muted"
                        asChild
                    >
                        <Link href="/scan">Open Scanner</Link>
                    </Button>
                </div>

                {/* Footer simple tag */}
                <footer className="pt-12">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-2">
                        <Hammer className="h-3 w-3" /> Built with Precision
                    </p>
                </footer>
            </div>
        </div>
    );
}
