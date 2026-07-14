import { RESEARCH_AGENT_PROMPT } from "@/lib/ai/prompts/research";
import { AgentConfig } from "../types";

export const ResearchAgent: AgentConfig = {
  id: "research",
  name: "Research Agent",
  role: "Senior Market Intelligence Analyst",
  description: "Analyzes industry landscapes, competitor SWOT indices, and demand signals to compile market feasibility reports.",
  inputSchema: [
    "Startup Name",
    "Business Type",
    "Target Audience",
    "Country/Market",
    "Founder Interview Notes",
  ],
  outputSchema: [
    "Market Size Summary",
    "Competitor Matrix",
    "SWOT Matrix Analysis",
    "Sector Opportunities",
    "Platform Risks",
    "CEO Feasibility Verdict",
  ],
  promptTemplate: RESEARCH_AGENT_PROMPT,
  status: "ready",
  dependencies: [],
  execute: async (profile) => {
    const response = await fetch("/api/agents/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile }),
    });
    if (!response.ok) throw new Error("Research Agent execution failed");
    const result = await response.json();
    return result.output;
  },
};
