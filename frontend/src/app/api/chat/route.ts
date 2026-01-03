import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export async function POST(req: Request) {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
        model: openai("chatgpt-4o-latest"),
        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}
