"use client";

import React, { createContext, useContext, useState } from "react";

interface ChatContextType {
    pendingMessage: string;
    setPendingMessage: (msg: string) => void;
    selectedModel: string;
    setSelectedModel: (model: string) => void;
    isFirstMessage: boolean;
    setIsFirstMessage: (val: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [pendingMessage, setPendingMessage] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [isFirstMessage, setIsFirstMessage] = useState(false);

    return (
        <ChatContext.Provider value={{
            pendingMessage,
            setPendingMessage,
            selectedModel,
            setSelectedModel,
            isFirstMessage,
            setIsFirstMessage
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