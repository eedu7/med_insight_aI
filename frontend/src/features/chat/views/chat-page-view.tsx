"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
    Bot,
    ChevronLeft,
    Circle,
    SendHorizontal,
    Sparkles,
    User
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ChatPageView() {
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/chat",
        }),
    });

    const isLoading = status === "streaming" || status === "submitted";

    // Auto-scroll logic
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, status]);

    return (
        <div className="flex flex-col h-screen bg-background text-foreground">
            {/* --- Header --- */}
            <header className="flex items-center justify-between px-4 md:px-8 py-4 border-b bg-card/50 backdrop-blur-xl sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 shadow-sm shadow-emerald-500/5">
                        <Bot className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold tracking-tight">Diagnostic Assistant</h2>
                        <div className="flex items-center gap-1.5">
                            <Circle className={cn(
                                "h-1.5 w-1.5 fill-emerald-500 text-emerald-500",
                                isLoading && "animate-pulse"
                            )} />
                            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                                {status === 'ready' ? 'System Ready' : 'Neural Processing'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-600">
                    Neural-Link Secure
                </div>
            </header>

            {/* --- Chat Content --- */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth"
            >
                <div className="max-w-3xl mx-auto space-y-8">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full py-20 text-center space-y-4">
                            <div className="p-4 bg-muted/30 rounded-3xl border border-dashed border-border">
                                <Sparkles className="h-8 w-8 text-muted-foreground/40" />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                                Start a consultation by typing below
                            </p>
                        </div>
                    )}

                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex items-start gap-3 md:gap-5 animate-in fade-in slide-in-from-bottom-3 duration-500",
                                message.role === "user" ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            {/* Avatar Icon */}
                            <div className={cn(
                                "shrink-0 p-2.5 rounded-2xl border shadow-sm transition-all",
                                message.role === "assistant"
                                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 shadow-emerald-500/5"
                                    : "bg-background border-border text-foreground"
                            )}>
                                {message.role === "assistant" ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
                            </div>

                            {/* Message Bubble */}
                            <div className={cn(
                                "max-w-[85%] md:max-w-[75%] space-y-2",
                                message.role === "user" ? "items-end text-right" : "items-start"
                            )}>
                                <div className={cn(
                                    "px-5 py-3.5 rounded-[1.5rem] text-sm md:text-base leading-relaxed shadow-sm",
                                    message.role === "assistant"
                                        ? "bg-card border border-border text-foreground rounded-tl-none"
                                        : "bg-foreground text-background rounded-tr-none font-medium"
                                )}>
                                    {message.parts.map((part, index) =>
                                        part.type === 'text' ? <span key={index}>{part.text}</span> : null
                                    )}
                                </div>
                                <div className="px-2 flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">
                                        {message.role === "assistant" ? "Neural Protocol" : "Patient Query"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex items-center gap-3 text-emerald-600/60 animate-in fade-in duration-300">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest">Processing Intelligence</span>
                        </div>
                    )}
                </div>
            </div>

            {/* --- Footer / Input --- */}
            <footer className="p-4 md:p-8 border-t bg-card/30 backdrop-blur-xl">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (input.trim() && status === 'ready') {
                            sendMessage({ text: input });
                            setInput('');
                        }
                    }}
                    className="max-w-3xl mx-auto relative group"
                >
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={status !== 'ready'}
                        placeholder="Inquire about scan analysis or clinical data..."
                        className="w-full h-14 md:h-16 pl-6 pr-16 rounded-[1.2rem] md:rounded-[2rem] bg-background border border-border shadow-lg transition-all text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 placeholder:text-muted-foreground/50"
                    />
                    <Button
                        type="submit"
                        disabled={!input.trim() || status !== 'ready'}
                        className="absolute right-2 top-2 h-10 md:h-12 w-10 md:w-12 rounded-xl md:rounded-2xl bg-foreground hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-20"
                    >
                        <SendHorizontal className="h-5 w-5" />
                    </Button>
                </form>
                <div className="mt-4 flex flex-col items-center gap-1">
                    <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-[0.2em] opacity-40">
                        End-to-End Encrypted Analysis
                    </p>
                </div>
            </footer>
        </div>
    );
}