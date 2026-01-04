"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetModels } from "@/features/models/hooks/use-models";
import { Bot, Loader2, SendHorizontal, Sparkles, User } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useChatContext } from "../context/chat-context";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export const ChatMessagePageView = ({ chatId }: { chatId: string }) => {
  // Use Context for shared model state
  const { pendingMessage, setPendingMessage, selectedModel, setSelectedModel } = useChatContext();
  const { data: hfModels, isSuccess } = useGetModels();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<"ready" | "streaming">("ready");

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getModelIdByHFModelId = (hfId: string) => hfModels?.find(m => m.hfModelId === hfId)?.id;

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
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTdjZDdiYmYtMWIzNi00OTc2LWEzODYtYmEyMDNjYmU3MGVjIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImV4cCI6MTc2NzYzMjkzOCwidHlwZSI6ImFjY2VzcyJ9.jT_V-LNdjLqfo0c6eaR_DYwaHNhVKhqBwvcORtJyTY4`
        },
        body: JSON.stringify({
          chat_id: chatId,
          model_name: selectedModel,
          model_id: getModelIdByHFModelId(selectedModel),
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
      setMessages(prev => prev.map(m => m.id === assistantMsgId ? { ...m, content: "⚠️ Connection Error." } : m));
    } finally {
      setStatus("ready");
    }
  }, [chatId, selectedModel, status, hfModels]);

  // Handle message transfer from landing page
  useEffect(() => {
    if (pendingMessage && selectedModel && status === "ready") {
      const msg = pendingMessage;
      setPendingMessage("");
      processMessage(msg);
    }
  }, [pendingMessage, selectedModel, status, setPendingMessage, processMessage]);

  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: scrollContainerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-4 border-b bg-card/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Bot className="h-5 w-5 text-emerald-600" />
          <span className="text-sm font-bold">Neural Assistant</span>
        </div>
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-40 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {hfModels?.map(m => (
              <SelectItem key={m.id} value={m.hfModelId}>
                {m.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </header>

      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`h-8 w-8 shrink-0 rounded-lg border flex items-center justify-center ${m.role === "assistant" ? "bg-emerald-500/10" : "bg-muted"}`}>
                {m.role === "assistant" ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border"}`}>
                {m.content || (status === "streaming" && <Loader2 className="h-4 w-4 animate-spin" />)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="p-4 border-t bg-card/30">
        <form onSubmit={(e) => { e.preventDefault(); processMessage(input); setInput(""); }} className="max-w-3xl mx-auto relative">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
            className="w-full h-12 pl-4 pr-12 rounded-xl bg-background border focus:ring-2 focus:ring-emerald-500/20 outline-none"
          />
          <Button type="submit" disabled={!input.trim() || status !== "ready"} className="absolute right-1.5 top-1.5 h-9 w-9 rounded-lg">
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </footer>
    </div>
  );
};