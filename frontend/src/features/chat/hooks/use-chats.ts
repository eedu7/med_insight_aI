import { getCookie } from "@/lib/cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateChatRead {
    id: string;
    title: string;
}

export const useCreateChat = () => {
    const queryClient = useQueryClient();
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
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["chats", "use-get-chats"]
            })
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
    const accessToken = getCookie("accessToken");

    return useMutation({
        mutationKey: ["create-chat-message"],
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

interface UserChat {
    id: string;
    user_id: string;
    title: string;
}

export const useGetChats = () => {
    const accessToken = getCookie("accessToken");

    return useQuery({
        queryKey: ["chats", "use-get-chats"],
        queryFn: async () => {
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

interface GetChatByIdChatMessage {
    id: string;
    role: string;
    content: string;
}

interface GetChatByIdChat {
    id: string;
    title: string;
    messages: GetChatByIdChatMessage[]
}

export const useGetChatById = (id: string) => {
    const accessToken = getCookie("accessToken");

    return useQuery({
        queryKey: ['chat', 'get-chat-by-id', id],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/chat/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            )
            if (!res.ok) {
                toast.error("Error in fetching chat");
                throw new Error("Error in fetching chat")
            }

            return res.json() as Promise<GetChatByIdChat>;

        },
        enabled: !!id
    })
}