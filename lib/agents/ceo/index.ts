import { CEO_SYNTHESIS_PROMPT } from "@/lib/ai/prompts/ceo";
import { AgentConfig } from "../types";

export const CeoAgent: AgentConfig = {
  id: "ceo",
  name: "AI CEO",
  role: "Managing Partner & Principal Orchestrator",
  description: "Synthesizes specialized agent reports into a cohesive venture strategy plan, aligns roadmap coordinates, and emits final workspace parameters.",
  inputSchema: [
    "Market SWOT Report",
    "Pricing & Financial runway Projections",
    "GTM & Marketing Channels Launch Mix",
    "MVP Scope & Product Roadmap Milestones",
  ],
  outputSchema: [
    "Cohesive Executive Summary",
    "Unified Venture SWOT Convergence",
    "Launch Feasibility Grade",
    "Investor Presentation Core Outline",
    "Strategic Day-One Actions List",
  ],
  promptTemplate: CEO_SYNTHESIS_PROMPT,
  status: "ready",
  dependencies: ["product"],
  execute: async (profile, inputs) => {
    const response = await fetch("/api/agents/synthesis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile, outputs: inputs }),
    });
    if (!response.ok) throw new Error("CEO Agent Synthesis failed");
    const result = await response.json();
    return result.output;
  },
};
