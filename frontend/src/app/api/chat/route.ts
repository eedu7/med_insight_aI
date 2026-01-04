import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

type UserMetadata = {
  selectedModel?: string;
};

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const lastUserMessage = [...messages].reverse().find(
    (m) => m.role === "user"
  );

  const selectedModel =
    (lastUserMessage?.metadata as UserMetadata | undefined)?.selectedModel ??
    "chatgpt-4o-latest";


  const result = streamText({
    model: openai(selectedModel),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
