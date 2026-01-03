"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/chat",
        }),
    });
    const [input, setInput] = useState("");
    return (
        <div className="min-h-screen max-w-4xl mx-auto space-y-4 py-20">
            {messages.map((message) => (
                <div key={message.id}>
                    {message.role === "user" ? "User: " : "AI: "}
                    {message.parts.map(
                        (part, index) =>
                            part.type === "text" && (
                                <span key={index}>{part.text}</span>
                            ),
                    )}
                </div>
            ))}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (input.trim()) {
                        sendMessage({ text: input });
                        setInput("");
                    }
                }}
                className="space-y-4"
            >
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={status !== "ready"}
                    placeholder="Say something"
                />
                <Button type="submit" disabled={status !== "ready"}>
                    Submit
                </Button>
            </form>
        </div>
    );
}
