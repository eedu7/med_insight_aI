"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetModels } from "@/features/models/hooks/use-models"
import { Activity, SendHorizontal, ShieldAlert, Stethoscope } from "lucide-react"
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
        setIsFirstMessage
    } = useChatContext();

    const { data: hfModels } = useGetModels()
    const { mutate, isPending } = useCreateChat()

    const handleStartChat = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!pendingMessage.trim() || isPending) return;

        if (hfModels?.length && !selectedModel) { setSelectedModel(hfModels[0].hfModelId) }

        setIsFirstMessage(true);

        mutate(undefined, {
            onSuccess: (data) => {
                router.push(`/chat/${data.id}`);
            }
        })
    }

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
            <div className="w-full max-w-2xl space-y-8 text-center animate-in fade-in duration-700">
                <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-blue-600/10 rounded-3xl border border-blue-200 dark:border-blue-900 shadow-sm">
                        <Stethoscope className="h-10 w-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        MedInsight AI
                    </h1>
                    <p className="text-slate-500 text-sm">Clinical Intelligence & Medical Analysis</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <label className="text-[10px] font-bold text-slate-400 flex items-center gap-2 tracking-widest uppercase">
                        <Activity className="h-3 w-3" /> Select Analysis Engine
                    </label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger className="w-64 h-11 bg-white dark:bg-slate-900 border-slate-200">
                            <SelectValue placeholder="Loading models..." />
                        </SelectTrigger>
                        <SelectContent>
                            {hfModels?.map((m) => (
                                <SelectItem key={m.id} value={m.hfModelId}>{m.displayName}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <form onSubmit={handleStartChat} className="relative group max-w-xl mx-auto w-full">
                    <input
                        autoFocus
                        value={pendingMessage}
                        onChange={(e) => setPendingMessage(e.target.value)}
                        placeholder="Describe symptoms or medical questions..."
                        className="w-full h-16 pl-6 pr-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 shadow-xl focus:ring-2 focus:ring-blue-500/20 outline-none text-lg transition-all"
                    />
                    <Button
                        type="submit"
                        disabled={!pendingMessage.trim() || isPending}
                        className="absolute right-3 top-3 h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all"
                    >
                        {isPending ? <Activity className="h-5 w-5 animate-pulse" /> : <SendHorizontal className="h-5 w-5" />}
                    </Button>
                </form>

                <div className="flex gap-3 justify-center pt-4">
                    {["Common flu symptoms", "Interpret lab results", "Drug interactions"].map((s) => (
                        <button key={s} onClick={() => setPendingMessage(s)} className="text-xs px-3 py-1.5 rounded-full border bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-500 transition-colors">
                            {s}
                        </button>
                    ))}
                </div>

                <div className="mt-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 flex gap-3 text-left max-w-lg mx-auto">
                    <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0" />
                    <p className="text-[10px] text-amber-800 dark:text-amber-500 leading-relaxed">
                        <strong>Disclaimer:</strong> This AI tool provides informational insights only. It is not a substitute for professional medical advice, diagnosis, or treatment.
                    </p>
                </div>
            </div>
        </div>
    )
}