"use client";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { getCookie } from "@/lib/cookie";
import { Bot, Loader2, SendHorizontal, Settings2, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

export default function ChatPageView() {
    const [selectedModel, setSelectedModel] = useState("m42-health/Llama3-Med42-70B:featherless-ai");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [status, setStatus] = useState<"ready" | "streaming">("ready");

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages, status]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || status !== "ready") return;

        const userContent = input;
        setInput("");

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: userContent };
        const updatedHistory = [...messages, userMsg];
        setMessages(updatedHistory);
        setStatus("streaming");

        const assistantMsgId = (Date.now() + 1).toString();
        setMessages((prev) => [...prev, { id: assistantMsgId, role: "assistant", content: "" }]);


        const accessToken = getCookie("accessToken");

        try {
            const response = await fetch("http://localhost:8000/api/v1/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`


                },
                body: JSON.stringify({
                    model: selectedModel,
                    messages: updatedHistory.map(m => ({ role: m.role, content: m.content })),
                    stream: true,
                }),
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let accumulatedContent = "";

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    accumulatedContent += chunk;

                    setMessages((prev) =>
                        prev.map((msg) =>
                            msg.id === assistantMsgId
                                ? { ...msg, content: accumulatedContent }
                                : msg
                        )
                    );
                }
            }
        } catch (error) {
            console.error("Streaming error:", error);
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === assistantMsgId
                        ? { ...msg, content: "Error: Failed to reach the neural server." }
                        : msg
                )
            );
        } finally {
            setStatus("ready");
        }
    };

    return (
        <div className="flex flex-col h-screen bg-background overflow-hidden text-foreground">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b bg-card/50 backdrop-blur-xl z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <Bot className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h2 className="text-sm font-bold tracking-tight hidden md:block">Neural Assistant</h2>
                </div>

                <div className="flex items-center gap-2">
                    <Settings2 className="h-4 w-4 text-muted-foreground" />
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger className="w-45 h-9 text-xs font-semibold rounded-lg bg-background shadow-sm focus:ring-emerald-500/20">
                            <SelectValue placeholder="Select Model" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl shadow-2xl">
                            <SelectItem value="openai/gpt-oss-20b" className="text-xs">openai/gpt-oss-20b</SelectItem>
                            <SelectItem value="m42-health/Llama3-Med42-70B:featherless-ai" className="text-xs">m42-health/Llama3-Med42-70B:featherless-ai</SelectItem>
                            <SelectItem value="emilykang/medner-obstetrics_gynecology:featherless-ai" className="text-xs">emilykang/medner-obstetrics_gynecology:featherless-ai</SelectItem>
                            <SelectItem value="Intelligent-Internet/II-Medical-8B:featherless-ai" className="text-xs">Intelligent-Internet/II-Medical-8B</SelectItem>
                            <SelectItem value="johnsnowlabs/JSL-MedLlama-3-8B-v2.0" className="text-xs">johnsnowlabs/JSL-MedLlama-3-8B-v2.0</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </header>

            {/* Chat Messages */}
            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-emerald-500/20"
            >
                <div className="max-w-3xl mx-auto space-y-6 py-4">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground opacity-50">
                            <Sparkles className="h-12 w-12 mb-4" />
                            <p className="text-sm">Initiate a neural link to begin.</p>
                        </div>
                    )}

                    {messages.map((m) => (
                        <div key={m.id} className={`flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                            <div className={`shrink-0 h-9 w-9 flex items-center justify-center rounded-xl border ${m.role === "assistant" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-muted border-border text-muted-foreground"}`}>
                                {m.role === "assistant" ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
                            </div>
                            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm max-w-[85%] whitespace-pre-wrap ${m.role === "assistant" ? "bg-card border border-border text-foreground" : "bg-primary text-primary-foreground"}`}>
                                {m.content}
                                {m.role === "assistant" && m.content === "" && (
                                    <Loader2 className="h-4 w-4 animate-spin opacity-50" />
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="h-4" />
                </div>
            </div>

            {/* Input Form */}
            <footer className="p-4 md:p-8 border-t bg-card/30 backdrop-blur-md">
                <form
                    onSubmit={handleSendMessage}
                    className="max-w-3xl mx-auto relative group"
                >
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={status !== 'ready'}
                        placeholder={`Ask ${selectedModel}...`}
                        className="w-full h-14 pl-6 pr-16 rounded-2xl bg-background border border-border shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-foreground disabled:opacity-50"
                    />
                    <Button
                        type="submit"
                        disabled={!input.trim() || status !== 'ready'}
                        className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-foreground hover:bg-emerald-600 text-background transition-all active:scale-95 disabled:opacity-30"
                    >
                        {status === 'streaming' ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <SendHorizontal className="h-5 w-5" />
                        )}
                    </Button>
                </form>
                <p className="text-[10px] text-center mt-3 text-muted-foreground uppercase tracking-widest font-medium">
                    AI response may vary based on model architecture
                </p>
            </footer>
        </div>
    );
}