"use client";

import React, { createContext, useContext, useState } from "react";

interface ChatContextType {
    pendingMessage: string;
    setPendingMessage: (msg: string) => void;
    selectedModel: string;
    setSelectedModel: (model: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [pendingMessage, setPendingMessage] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    return (
        <ChatContext.Provider value={{
            pendingMessage,
            setPendingMessage,
            selectedModel,
            setSelectedModel
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) throw new Error("useChatContext must be used within a ChatProvider");
    return context;
};