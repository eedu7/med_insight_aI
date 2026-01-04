import { ChatMessagePageView } from "@/features/chat/views/chat-messages-page-view"

interface Props {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
    const { id } = await params
    return (
        <ChatMessagePageView chatId={id} />
    )
}
