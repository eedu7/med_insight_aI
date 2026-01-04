"use client";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetModels } from "@/features/models/hooks/use-models";
import { Bot, Loader2, SendHorizontal, Settings2, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

export default function ChatPageView() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [status, setStatus] = useState<"ready" | "streaming">("ready");
    const { data: hfModels } = useGetModels()
    const [selectedModel, setSelectedModel] = useState(hfModels?.[1]?.hfModelId || "");

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages, status]);

    const getModelIdByHFModelId = (hfModelId: string) => {
        const model = hfModels?.find(m => m.hfModelId === hfModelId);
        return model?.id;
    }

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || status !== "ready") return;

        const userContent = input;

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: userContent };
        const assistantMsgId = (Date.now() + 1).toString();

        const updatedHistory = [...messages, userMsg];
        setMessages([...updatedHistory, { id: assistantMsgId, role: "assistant", content: "" }]);
        setStatus("streaming");

        try {
            const response = await fetch("http://localhost:8000/api/v1/chat/message?stream=true", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTdjZDdiYmYtMWIzNi00OTc2LWEzODYtYmEyMDNjYmU3MGVjIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImV4cCI6MTc2NzYyNzkwNCwidHlwZSI6ImFjY2VzcyJ9.L23t4w0UHvI0qAg0IXARozCiPEIK8b12yDgQ6PKU61M`
                },
                body: JSON.stringify({
                    "chat_id": crypto.randomUUID(),
                    "model_name": selectedModel,
                    "model_id": getModelIdByHFModelId(selectedModel),
                    role: "user",
                    content: userContent,
                }),
            });
            setInput("");


            if (!response.ok) throw new Error("Failed to connect to server");

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
            console.error("Chat Error:", error);
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === assistantMsgId
                        ? { ...msg, content: "⚠️ Error: Connection lost." }
                        : msg
                )
            );
        } finally {
            setStatus("ready");
        }
    };

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
                            {
                                hfModels?.map((model) => (
                                    <SelectItem key={model.id} value={model.hfModelId} className="text-xs">{model.displayName}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
            </header>

            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-thin"
            >
                <div className="max-w-3xl mx-auto space-y-6 py-4">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground opacity-50">
                            <Sparkles className="h-12 w-12 mb-4" />
                            <p className="text-sm">Ready for input.</p>
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
                </div>
            </div>

            <footer className="p-4 md:p-8 border-t bg-card/30 backdrop-blur-md">
                <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto relative group">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={status !== 'ready'}
                        placeholder={`Ask ${selectedModel}...`}
                        className="w-full h-14 pl-6 pr-16 rounded-2xl bg-background border border-border shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-foreground"
                    />
                    <Button
                        type="submit"
                        disabled={!input.trim() || status !== 'ready'}
                        className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-foreground hover:bg-emerald-600 text-background transition-all active:scale-95 disabled:opacity-30"
                    >
                        {status === 'streaming' ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizontal className="h-5 w-5" />}
                    </Button>
                </form>
            </footer>
        </div>

    );
}