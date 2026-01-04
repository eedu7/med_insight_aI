"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetModels } from "@/features/models/hooks/use-models";
import { Cpu, SendHorizontal, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useChatContext } from "../context/chat-context";

export default function ChatPageView() {
    const [input, setInput] = useState("");
    const { setPendingMessage, selectedModel, setSelectedModel } = useChatContext();
    const { data: hfModels, isSuccess } = useGetModels();
    const router = useRouter();

    // Set default model on load
    useEffect(() => {
        if (isSuccess && hfModels?.length > 0 && !selectedModel) {
            setSelectedModel(hfModels[0].hfModelId);
        }
    }, [isSuccess, hfModels, selectedModel, setSelectedModel]);

    const handleStartChat = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !selectedModel) return;

        setPendingMessage(input);
        const newChatId = crypto.randomUUID();
        router.push(`/chat/${newChatId}`);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background p-4">
            <div className="w-full max-w-2xl space-y-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 shadow-inner">
                        <Sparkles className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
                        Neural Assistant
                    </h1>
                </div>

                {/* Model Selection UI */}
                <div className="flex flex-col items-center gap-2">
                    <label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                        <Cpu className="h-3 w-3" /> SELECT ENGINE
                    </label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger className="w-64 h-10 bg-card border-border">
                            <SelectValue placeholder="Loading models..." />
                        </SelectTrigger>
                        <SelectContent>
                            {hfModels?.map((m) => (
                                <SelectItem key={m.id} value={m.hfModelId}>
                                    {m.displayName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <form onSubmit={handleStartChat} className="relative group">
                    <input
                        autoFocus
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything..."
                        className="w-full h-16 pl-6 pr-16 rounded-2xl bg-card border border-border shadow-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 text-lg transition-all"
                    />
                    <Button
                        type="submit"
                        disabled={!input.trim() || !selectedModel}
                        className="absolute right-3 top-3 h-10 w-10 rounded-xl bg-primary text-primary-foreground hover:bg-emerald-600 transition-all active:scale-95"
                    >
                        <SendHorizontal className="h-5 w-5" />
                    </Button>
                </form>

                <div className="flex gap-2 justify-center pt-4">
                    {["Analyze code", "Write an email", "Summarize text"].map((suggestion) => (
                        <button
                            key={suggestion}
                            onClick={() => setInput(suggestion)}
                            className="text-xs px-3 py-1.5 rounded-full border border-border bg-card hover:bg-muted transition-colors text-muted-foreground"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}