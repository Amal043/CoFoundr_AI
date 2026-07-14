import { PRODUCT_AGENT_PROMPT } from "@/lib/ai/prompts/product";
import { AgentConfig } from "../types";

export const ProductAgent: AgentConfig = {
  id: "product",
  name: "Product Agent",
  role: "Principal Product Manager & Technical Architect",
  description: "Scopes core MVP backlogs, selects optimal tech stacks, designs user journeys, and defines phasing milestones.",
  inputSchema: [
    "Startup Name",
    "Business Type",
    "Target Audience",
    "Timeline",
    "GTM Launch Reference",
    "Pricing Model Limits",
  ],
  outputSchema: [
    "MVP Core Feature Scope",
    "User Journey Flow Layout",
    "Tech Stack Recommendations",
    "Phased Development Backlog",
    "Milestone Timeline Milestones",
  ],
  promptTemplate: PRODUCT_AGENT_PROMPT,
  status: "ready",
  dependencies: ["research", "finance", "marketing"],
  execute: async (profile) => {
    const response = await fetch("/api/agents/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile }),
    });
    if (!response.ok) throw new Error("Product Agent execution failed");
    const result = await response.json();
    return result.output;
  },
};
