import { NextResponse } from "next/server";
import { runResearchAgent } from "@/lib/ai/services/orchestrator";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { profile } = await req.json();
    const output = await runResearchAgent(profile);
    return NextResponse.json({ output });
  } catch (error) {
    console.error("[Research Agent Route Error]:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
