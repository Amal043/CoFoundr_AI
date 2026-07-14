import { FINANCE_AGENT_PROMPT } from "@/lib/ai/prompts/finance";
import { AgentConfig } from "../types";

export const FinanceAgent: AgentConfig = {
  id: "finance",
  name: "Finance Agent",
  role: "Strategic Chief Financial Officer (CFO)",
  description: "Structures pricing frameworks, multi-year margin forecasting, runway models, and cash burn projections.",
  inputSchema: [
    "Startup Name",
    "Pricing Model",
    "Target Audience",
    "Country/Market",
    "Team Size",
    "Market SWOT Report Reference",
  ],
  outputSchema: [
    "Pricing Framework Layout",
    "Multi-Year Projections",
    "CAC & LTV Analysis Metrics",
    "Cash Runway Forecast",
    "Operational Budget Breakdown",
  ],
  promptTemplate: FINANCE_AGENT_PROMPT,
  status: "ready",
  dependencies: ["research"],
  execute: async (profile) => {
    const response = await fetch("/api/agents/finance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile }),
    });
    if (!response.ok) throw new Error("Finance Agent execution failed");
    const result = await response.json();
    return result.output;
  },
};
