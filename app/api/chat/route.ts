import { NextResponse } from "next/server";
import { getRealChatStream, getMockChatResponse, openai } from "@/lib/ai/services/openai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Fallback if OpenAI key is not configured
    if (!openai) {
      const mockResult = getMockChatResponse(messages);
      const encoder = new TextEncoder();

      const stream = new ReadableStream({
        async start(controller) {
          const text = mockResult.content;
          const words = text.split(" ");
          for (let i = 0; i < words.length; i++) {
            const word = words[i] + (i === words.length - 1 ? "" : " ");
            controller.enqueue(encoder.encode(word));
            // Simulate a natural typing speed (approx 50ms per word)
            await new Promise((resolve) => setTimeout(resolve, 50));
          }
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          "Connection": "keep-alive",
        },
      });
    }

    // Real OpenAI API stream
    const stream = await getRealChatStream(messages);
    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || "";
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("[Chat API Error]:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
