import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const lastUserMessage = [...messages].reverse().find(
    (m) => m.role === "user"
  );

  const selectedModel =
    lastUserMessage?.metadata?.selectedModel ?? "chatgpt-4o-latest";

  console.log("Selected Model:", selectedModel);

  const result = streamText({
    model: openai(selectedModel),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
