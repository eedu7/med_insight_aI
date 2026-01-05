import { getCookie } from "@/lib/cookie";
import { useMutation, useQuery } from "@tanstack/react-query";

interface CreateChatRead {
    id: string;
    title: string;
}

export const useCreateChat = () => {
    const accessToken = getCookie("accessToken");
    return useMutation({
        mutationKey: ["create-chat"],
        mutationFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/chat/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
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
    const accessToken = getCookie("accessToken");

    return useMutation({
        mutationKey: ["create-chat"],
        mutationFn: async (data: CreateChatMessageProps) => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/chat/message`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
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

interface UserChatMessage {
    model_id: string;
    id: string;
    updated_at: string;
    created_at: string;
    chat_id: string;
    role: string;
    content: string;  
}

interface UserChat {
    id: string;
    updated_at: string;
    created_at: string;
    user_id: string;
    title: string;
    messages: UserChatMessage[]
}

export const useGetChats = () => {
    const accessToken = getCookie("accessToken");

    return useQuery({
        queryKey: ["chats"],
        queryFn: async() => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/chat/`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                }
            );
            return res.json() as Promise<UserChat[]>;
        }
    })
}