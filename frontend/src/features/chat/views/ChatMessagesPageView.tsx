"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetModels } from "@/features/models/hooks/use-models";
import { BrainCircuit, Loader2, SendHorizontal, ShieldAlert, Stethoscope, User } from "lucide-react";
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

        try {
            const response = await fetch("http://localhost:8000/api/v1/chat/message?stream=true", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    model_name: selectedModel,
                    model_id: getModelId(selectedModel),
                    role: "user",
                    content,
                }),
            });

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

    // PREVENT DOUBLE FIRE: Ref lock + Flag check
    useEffect(() => {
        if (isFirstMessage && pendingMessage && selectedModel && !hasFired.current) {
            hasFired.current = true; // Lock immediately
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
        <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950">
            <header className="flex items-center justify-between px-6 py-3 border-b bg-white dark:bg-slate-900 shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <Stethoscope className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-bold tracking-tight">MedInsight AI</span>
                </div>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-44 h-8 text-xs bg-slate-50 dark:bg-slate-800">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {hfModels?.map(m => (
                            <SelectItem key={m.id} value={m.hfModelId}>{m.displayName}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </header>

            <div className="bg-amber-50/50 dark:bg-amber-950/10 px-6 py-1.5 border-b border-amber-100 dark:border-amber-900/30 flex items-center gap-2">
                <ShieldAlert className="h-3 w-3 text-amber-600" />
                <p className="text-[10px] text-amber-700 font-medium">For informational use only. Not professional medical advice.</p>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    {messages.map((m) => (
                        <div key={m.id} className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                            <div className={`h-8 w-8 shrink-0 rounded-lg flex items-center justify-center border shadow-sm ${m.role === "assistant" ? "bg-blue-600 text-white" : "bg-white text-slate-500"}`}>
                                {m.role === "assistant" ? <BrainCircuit className="h-5 w-5" /> : <User className="h-5 w-5" />}
                            </div>
                            <div className={`p-4 rounded-2xl max-w-[85%] text-sm shadow-sm leading-relaxed ${m.role === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-tl-none"}`}>
                                {m.content || (status === "streaming" && <Loader2 className="h-4 w-4 animate-spin" />)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="p-4 bg-white dark:bg-slate-900 border-t">
                <form onSubmit={(e) => { e.preventDefault(); processMessage(input); setInput(""); }} className="max-w-4xl mx-auto relative">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type clinical follow-up..."
                        className="w-full h-12 pl-4 pr-14 rounded-xl bg-slate-50 dark:bg-slate-800 border focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                    <Button type="submit" disabled={!input.trim() || status !== "ready"} className="absolute right-1.5 top-1.5 h-9 w-9 bg-blue-600">
                        <SendHorizontal className="h-4 w-4" />
                    </Button>
                </form>
            </footer>
        </div>
    );
};