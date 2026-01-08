"use client"

import { Button } from "@/components/ui/button"
import { SelectModel } from "@/features/models/components/SelectModel"
import { Activity, BrainCircuit, SendHorizontal, ShieldAlert, Stethoscope } from "lucide-react"
import { useRouter } from "next/navigation"
import { useChatContext } from "../context/chat-context"
import { useCreateChat } from "../hooks/use-chats"

export const ChatPageView = () => {
    const router = useRouter();
    const {
        pendingMessage,
        setPendingMessage,
        selectedModel,
        setSelectedModel,
        setIsFirstMessage,
        setSelectedModelId
    } = useChatContext();

    // const { data: hfModels } = useGetModels()
    const { mutate, isPending } = useCreateChat()

    const handleStartChat = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!pendingMessage.trim() || isPending) return;

        // if (hfModels?.length && !selectedModel) {
        //     setSelectedModel(hfModels[0].hfModelId)
        // }

        setIsFirstMessage(true);

        mutate(undefined, {
            onSuccess: (data) => {
                router.push(`/chat/${data.id}`);
            }
        })
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-6">
            <div className="w-full max-w-4xl space-y-12 animate-in fade-in duration-700">

                {/* Header Section */}
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-4 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 shadow-sm">
                        <Stethoscope className="h-10 w-10 text-emerald-500" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-5xl font-bold tracking-tighter text-foreground">
                            MedInsight <span className="text-emerald-500">AI</span>
                        </h1>
                        <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.4em]">
                            Clinical Intelligence & Neural Analysis
                        </p>
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-card border border-border/60 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-emerald-500/5 relative overflow-hidden">
                    <BrainCircuit className="absolute -right-16 -top-16 h-80 w-80 opacity-[0.03] text-emerald-500 pointer-events-none" />

                    <div className="relative z-10 space-y-10">
                        {/* Model Selection */}
                        <div className="flex flex-col items-center gap-4">
                            <label className="text-[10px] font-black text-emerald-600/70 flex items-center gap-2 tracking-[0.3em] uppercase">
                                <Activity className="h-3 w-3" /> Select Analysis Engine
                            </label>
                            <SelectModel
                                onValudIdChange={setSelectedModelId}
                                value={selectedModel}
                                onValueChange={setSelectedModel}
                            />
                        </div>

                        {/* Input Form */}
                        <form onSubmit={handleStartChat} className="relative group max-w-2xl mx-auto w-full">
                            <input
                                autoFocus
                                value={pendingMessage}
                                onChange={(e) => setPendingMessage(e.target.value)}
                                placeholder="Describe symptoms or medical questions..."
                                className="w-full h-20 pl-8 pr-20 rounded-[2rem] bg-background border border-border/60 shadow-xl focus:ring-2 focus:ring-emerald-500/20 outline-none text-lg transition-all"
                            />
                            <Button
                                type="submit"
                                disabled={!pendingMessage.trim() || isPending}
                                className="absolute right-3 top-3 h-14 w-14 rounded-[1.2rem] bg-foreground hover:bg-emerald-600 text-background transition-all shadow-lg active:scale-95"
                            >
                                {isPending ? <Activity className="h-6 w-6 animate-pulse" /> : <SendHorizontal className="h-6 w-6" />}
                            </Button>
                        </form>

                    </div>
                </div>

                {/* Disclaimer */}
                <div className="p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/10 flex gap-4 text-left max-w-2xl mx-auto">
                    <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0" />
                    <p className="text-[10px] text-amber-700 dark:text-amber-500/80 leading-relaxed uppercase tracking-wider font-medium">
                        <strong>Clinical Disclaimer:</strong> This AI tool provides informational insights only. It is not a substitute for professional medical advice, diagnosis, or treatment.
                    </p>
                </div>
            </div>
        </div>
    )
}