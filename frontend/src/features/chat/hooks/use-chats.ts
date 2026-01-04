import { useMutation, useQuery } from "@tanstack/react-query";

interface CreateChatRead {
    id: string;
    title: string;
}

export const useCreateChat = () => {
    return useMutation({
        mutationKey: ["create-chat"],
        mutationFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/chat`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
                    },
                }
            );
            return res.json() as Promise<CreateChatRead>;
        },
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