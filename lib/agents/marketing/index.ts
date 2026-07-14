import { MARKETING_AGENT_PROMPT } from "@/lib/ai/prompts/marketing";
import { AgentConfig } from "../types";

export const MarketingAgent: AgentConfig = {
  id: "marketing",
  name: "Marketing Agent",
  role: "Chief Marketing Officer (CMO) & Growth Lead",
  description: "Formulates customer acquisition funnels, GTM distribution channels, and organic loop launch mixes.",
  inputSchema: [
    "Startup Name",
    "Target Audience",
    "Country/Market",
    "Pricing Model",
    "Market Research SWOT Reference",
  ],
  outputSchema: [
    "Customer Acquisition Funnel Layout",
    "GTM Distribution Channels Mix",
    "Organic Growth Loop Tactics",
    "Brand Positioning Metrics",
    "Day-One Launch Plan",
  ],
  promptTemplate: MARKETING_AGENT_PROMPT,
  status: "ready",
  dependencies: ["research"],
  execute: async (profile) => {
    const response = await fetch("/api/agents/marketing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile }),
    });
    if (!response.ok) throw new Error("Marketing Agent execution failed");
    const result = await response.json();
    return result.output;
  },
};
