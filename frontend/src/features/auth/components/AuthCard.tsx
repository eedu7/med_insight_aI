import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
    children: React.ReactNode;
    title: string;
    decsription: string;
    actionLabel: string;
    actionUrl: string;
}

export const AuthCard = ({ title, decsription, children, actionLabel, actionUrl }: Props) => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-6">
            <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="flex flex-col items-center text-center gap-3">
                    <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-sm">
                        <Stethoscope className="h-8 w-8 text-emerald-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tighter text-foreground">
                            MedInsight <span className="text-emerald-500">AI</span>
                        </h1>
                    </div>
                </div>

                <Card className="bg-card border border-border/60 rounded-[2.5rem] p-4 shadow-2xl shadow-emerald-500/5 overflow-hidden">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold tracking-tight text-center">{title}</CardTitle>
                        <CardDescription className="text-center font-mono text-[10px] uppercase tracking-widest text-emerald-600/70">
                            {decsription}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {children}
                    </CardContent>
                    <CardFooter className="flex justify-center pt-2">
                        <Link
                            href={actionUrl}
                            className="text-xs font-medium text-muted-foreground hover:text-emerald-500 transition-colors uppercase tracking-wider"
                        >
                            {actionLabel}
                        </Link>
                    </CardFooter>
                </Card>

                <p className="text-[10px] text-center text-muted-foreground/60 uppercase tracking-[0.2em] font-medium">
                    Secure Clinical Portal &bull; Encrypted Session
                </p>
            </div>
        </div>
    )
}