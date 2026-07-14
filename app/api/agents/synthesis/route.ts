import { NextResponse } from "next/server";
import { combineAgentOutputs } from "@/lib/ai/services/orchestrator";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { profile, outputs } = await req.json();
    const output = await combineAgentOutputs(profile, outputs);
    return NextResponse.json({ output });
  } catch (error) {
    console.error("[Synthesis Agent Route Error]:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
