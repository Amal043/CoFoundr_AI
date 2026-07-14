import { NextResponse } from "next/server";
import { getRealProfileExtraction, getMockProfileExtraction, openai } from "@/lib/ai/services/openai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Fallback if OpenAI key is not configured
    if (!openai) {
      const mockExtraction = getMockProfileExtraction(messages);
      return NextResponse.json(mockExtraction);
    }

    // Real OpenAI structured profile extraction
    const extraction = await getRealProfileExtraction(messages);
    return NextResponse.json(extraction);
  } catch (error) {
    console.error("[Extract API Error]:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
