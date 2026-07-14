import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const hasKey = !!process.env.OPENAI_API_KEY;

  return NextResponse.json({
    apiStatus: hasKey ? "configured" : "fallback",
    hasOpenAIKey: hasKey,
    version: "1.0.0-beta",
  });
}
