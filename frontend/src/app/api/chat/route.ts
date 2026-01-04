import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export async function POST(req: Request) {
    const { messages, selectedModel }: { messages: UIMessage[], selectedModel?: string } = await req.json();
    console.log("Selected Model:", selectedModel);
    const result = streamText({
        model: openai(selectedModel || "chatgpt-4o-latest"),
        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}