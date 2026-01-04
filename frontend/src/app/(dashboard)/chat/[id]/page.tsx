import { ChatMessagesPageView } from "@/features/chat/views/ChatMessagesPageView"

interface Props {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
    const { id } = await params
    return (
        <ChatMessagesPageView chatId={id} />
    )
}
