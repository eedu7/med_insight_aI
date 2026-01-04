"use client";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Bot, SendHorizontal, Settings2, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ChatPageView() {
    const [selectedModel, setSelectedModel] = useState("gpt-5-mini");
    const [input, setInput] = useState("");

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/chat",
        }),
    });

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages, status]);

    const isLoading = status === "streaming" || status === "submitted";

    return (
        <div className="flex flex-col h-screen bg-background overflow-hidden">
            <header className="flex items-center justify-between px-6 py-4 border-b bg-card/50 backdrop-blur-xl z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <Bot className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h2 className="text-sm font-bold tracking-tight hidden md:block text-foreground">Neural Assistant</h2>
                </div>

                <div className="flex items-center gap-2">
                    <Settings2 className="h-4 w-4 text-muted-foreground" />
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger className="w-45 h-9 text-xs font-semibold rounded-lg bg-background shadow-sm focus:ring-emerald-500/20">
                            <SelectValue placeholder="Select Model" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl shadow-2xl">
                            <SelectItem value="chatgpt-4o-latest" className="text-xs">GPT-4o (Frontier)</SelectItem>
                            <SelectItem value="gpt-4o-mini" className="text-xs">GPT-4o Mini (Fast)</SelectItem>
                            <SelectItem value="o1-preview" className="text-xs">o1-Preview (Reasoning)</SelectItem>
                            <SelectItem value="gpt-5-mini" className="text-xs">gpt-5-mini</SelectItem>
                            <SelectItem value="gpt-5.2-chat-latest" className="text-xs">gpt-5.2-chat-latest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </header>

            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-emerald-500/20"
            >
                <div className="max-w-3xl mx-auto space-y-6 py-4">
                    {messages.map((m) => (
                        <div key={m.id} className={`flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                            <div className={`shrink-0 h-9 w-9 flex items-center justify-center rounded-xl border ${m.role === "assistant" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-muted border-border text-muted-foreground"}`}>
                                {m.role === "assistant" ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
                            </div>
                            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm max-w-[85%] ${m.role === "assistant" ? "bg-card border border-border text-foreground" : "bg-primary text-primary-foreground"}`}>
                                {m.parts.map((part, i) => part.type === 'text' ? <span key={i}>{part.text}</span> : null)}
                            </div>
                        </div>
                    ))}

                    <div className="h-4" />
                </div>
            </div>

            {/* Input Form */}
            <footer className="p-4 md:p-8 border-t bg-card/30 backdrop-blur-md">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (input.trim() && status === 'ready') {
                            sendMessage({
                                metadata: { selectedModel },
                                text: input,
                            });
                            setInput('');
                        }
                    }}
                    className="max-w-3xl mx-auto relative group"
                >
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={status !== 'ready'}
                        placeholder={`Ask ${selectedModel}...`}
                        className="w-full h-14 pl-6 pr-16 rounded-2xl bg-background border border-border shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-foreground"
                    />
                    <Button
                        type="submit"
                        disabled={!input.trim() || status !== 'ready'}
                        className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-foreground hover:bg-emerald-600 text-background transition-all active:scale-95 disabled:opacity-30"
                    >
                        <SendHorizontal className="h-5 w-5" />
                    </Button>
                </form>
                <p className="text-[10px] text-center mt-3 text-muted-foreground uppercase tracking-widest font-medium">
                    AI response may vary based on model architecture
                </p>
            </footer>
        </div>
    );
}