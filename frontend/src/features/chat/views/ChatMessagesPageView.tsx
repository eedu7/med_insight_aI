"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetModels } from "@/features/models/hooks/use-models";
import { getCookie } from "@/lib/cookie";
import { BrainCircuit, Fingerprint, Loader2, SendHorizontal, ShieldAlert, Stethoscope, User } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useChatContext } from "../context/chat-context";

export const ChatMessagesPageView = ({ chatId }: { chatId: string }) => {
    const {
        pendingMessage,
        setPendingMessage,
        selectedModel,
        setSelectedModel,
        isFirstMessage,
        setIsFirstMessage
    } = useChatContext();

    const { data: hfModels } = useGetModels();
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ id: string, role: "user" | "assistant", content: string }[]>([]);
    const [status, setStatus] = useState<"ready" | "streaming">("ready");

    const scrollRef = useRef<HTMLDivElement>(null);
    const hasFired = useRef(false);

    const getModelId = (hfId: string) => hfModels?.find(m => m.hfModelId === hfId)?.id;

    const processMessage = useCallback(async (content: string) => {
        if (!content.trim() || status !== "ready" || !selectedModel) return;

        const assistantMsgId = crypto.randomUUID();
        setMessages(prev => [
            ...prev,
            { id: crypto.randomUUID(), role: "user", content },
            { id: assistantMsgId, role: "assistant", content: "" }
        ]);

        setStatus("streaming");

        const accessToken = getCookie("accessToken");

        try {
            const response = await fetch("http://localhost:8000/api/v1/chat/message?stream=true", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    model_name: selectedModel,
                    model_id: getModelId(selectedModel),
                    role: "user",
                    content,
                }),
            });
            console.log("Response:", await response.json())

            if (!response.ok) throw new Error();
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let accumulated = "";

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    accumulated += decoder.decode(value, { stream: true });
                    setMessages(prev => prev.map(m => m.id === assistantMsgId ? { ...m, content: accumulated } : m));
                }
            }
        } catch (err) {
            setMessages(prev => prev.map(m => m.id === assistantMsgId ? { ...m, content: "⚠️ Clinical analysis interrupted. Please verify your connection." } : m));
        } finally {
            setStatus("ready");
        }
    }, [chatId, selectedModel, status, hfModels]);

    useEffect(() => {
        if (isFirstMessage && pendingMessage && selectedModel && !hasFired.current) {
            hasFired.current = true;
            const initialMsg = pendingMessage;
            setIsFirstMessage(false);
            setPendingMessage("");
            processMessage(initialMsg);
        }
    }, [isFirstMessage, pendingMessage, selectedModel, setIsFirstMessage, setPendingMessage, processMessage]);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col h-screen bg-background">
            {/* Professional Header */}
            <header className="flex items-center justify-between px-8 py-4 border-b border-border/60 bg-card/50 backdrop-blur-md z-10">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <Stethoscope className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                        <span className="text-sm font-bold tracking-tight block">MedInsight AI</span>
                        <span className="text-[9px] font-mono text-emerald-600 uppercase tracking-[0.2em]">Session: {chatId.slice(0, 8)}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest hidden md:block">Active Protocol:</span>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger className="w-48 h-9 text-xs bg-background border-border/60 rounded-xl">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {hfModels?.map(m => (
                                <SelectItem key={m.id} value={m.hfModelId}>{m.displayName}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </header>

            {/* Disclaimer Bar */}
            <div className="bg-amber-500/5 px-8 py-2 border-b border-amber-500/10 flex items-center gap-3">
                <ShieldAlert className="h-3 w-3 text-amber-600" />
                <p className="text-[10px] text-amber-700 dark:text-amber-500 font-mono uppercase tracking-wider">Non-diagnostic Informational Stream</p>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-12">
                <div className="max-w-4xl mx-auto space-y-10">
                    {messages.map((m) => (
                        <div key={m.id} className={`flex gap-6 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                            {/* Icon Avatar */}
                            <div className={`h-10 w-10 shrink-0 rounded-2xl flex items-center justify-center border shadow-sm transition-all ${m.role === "assistant"
                                ? "bg-card border-border/60 text-emerald-500"
                                : "bg-emerald-600 border-emerald-500 text-white"
                                }`}>
                                {m.role === "assistant" ? <BrainCircuit className="h-5 w-5" /> : <User className="h-5 w-5" />}
                            </div>

                            {/* Message Content */}
                            <div className={`relative p-6 rounded-[2rem] max-w-[80%] text-sm shadow-sm leading-relaxed transition-all ${m.role === "user"
                                ? "bg-emerald-600 text-white rounded-tr-none"
                                : "bg-card border border-border/60 text-foreground rounded-tl-none"
                                }`}>
                                {m.role === "assistant" && (
                                    <div className="flex items-center gap-2 mb-3 opacity-40">
                                        <Fingerprint className="h-3 w-3" />
                                        <span className="text-[9px] font-mono uppercase tracking-widest">Neural Response</span>
                                    </div>
                                )}
                                <div className={m.role === "user" ? "font-medium" : "font-light"}>
                                    {m.content || (status === "streaming" && <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Input */}
            <footer className="p-6 bg-background border-t border-border/60">
                <form
                    onSubmit={(e) => { e.preventDefault(); processMessage(input); setInput(""); }}
                    className="max-w-4xl mx-auto relative group"
                >
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type clinical follow-up..."
                        className="w-full h-14 pl-6 pr-16 rounded-[1.5rem] bg-card border border-border/60 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                    <Button
                        type="submit"
                        disabled={!input.trim() || status !== "ready"}
                        className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-foreground hover:bg-emerald-600 text-background transition-all"
                    >
                        <SendHorizontal className="h-5 w-5" />
                    </Button>
                </form>
                <p className="text-center text-[9px] text-muted-foreground mt-4 font-mono uppercase tracking-[0.2em]">
                    End-to-End Encrypted Clinical Analysis
                </p>
            </footer>
        </div>
    );
};