import { useMutation, useQuery } from "@tanstack/react-query";


interface CreateChatProps {
    title: string;
}

export const useCreateChat = () => {
    return useMutation({
        mutationKey: ["create-chat"],
        mutationFn: async (data: CreateChatProps) => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/chats`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "title": data.title
                    }),
                }
            );
            return res.json();
        }
    })
}

interface CreateChatMessageProps {
    chatId: string;
    modelName: string;
    modelId: string;
    role: "user" | "assistant";
    content: string;
}

export const useCreateChatMessage = () => {
    return useMutation({
        mutationKey: ["create-chat"],
        mutationFn: async (data: CreateChatMessageProps) => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/chats/message`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "chat_id": data.chatId,
                        "model_name": data.modelName,
                        "model_id": data.modelId,
                        "role": data.role,
                        "content": data.content,
                    }),
                }
            );
            return res.json();
        }
    })
}

export const useGetChats = () => {
    return useQuery({
        queryKey: ["chats"],
        queryFn: async() => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/chats`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return res.json();
        }
    })
}