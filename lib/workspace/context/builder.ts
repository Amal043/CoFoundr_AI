import { WorkspaceData } from "@/types/workspace";

export interface ChatMessageLog {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Reusable helper to assemble the complete startup blueprint and interview context
 * for future AI agent nodes.
 */
export function buildAIContextString(
  interviewMessages: ChatMessageLog[],
  workspace: WorkspaceData,
  rawAgentOutputs?: Record<string, string>
): string {
  const overviewContext = `
[STARTUP OVERVIEW]
- Name: ${workspace.overview.name}
- Tagline: ${workspace.overview.tagline}
- Problem: ${workspace.overview.problem}
- Solution: ${workspace.overview.solution}
- Mission: ${workspace.overview.mission}
- Vision: ${workspace.overview.vision}
- Target Users: ${workspace.overview.targetUsers}
- Industry: ${workspace.overview.industry}
- Business Model: ${workspace.overview.businessModel}
`;

  const researchContext = `
[MARKET RESEARCH & COMPETITORS]
- Market summary: ${workspace.research.marketSummary}
- Key Competitors: ${workspace.research.competitors}
- SWOT Summary: ${workspace.research.swotAnalysis}
- Recommendations: ${workspace.research.recommendations}
`;

  const productContext = `
[PRODUCT MVP & DEV ROADMAP]
- MVP Features: ${workspace.product.mvpFeatures}
- Recommended Tech Stack: ${workspace.product.techStack}
- Development Roadmap: ${workspace.product.devRoadmap}
`;

  const financeContext = `
[FINANCIAL ANALYSIS & PRICING]
- Pricing Plan: ${workspace.finance.pricing}
- Revenue Projection: ${workspace.finance.revenueProjection}
- Funding Target & Runway: ${workspace.finance.fundingNeed} (Break-even: ${workspace.finance.breakEven})
`;

  const marketingContext = `
[GTM & CUSTOMER ACQUISITION]
- Go-to-market plan: ${workspace.marketing.gtmPlan}
- Marketing Channels: ${workspace.marketing.channels}
- Growth Loop Strategy: ${workspace.marketing.growthPlan}
`;

  const roadmapContext = `
[OPERATIONAL TIMELINE roadmap]
${workspace.roadmap.map((node) => `- ${node.week}: ${node.task}`).join("\n")}
`;

  // Parse the last few interview messages to extract dynamic context
  const filteredMessages = interviewMessages.filter((msg) => msg.role !== "system");
  const recentMessages = filteredMessages.slice(-8); // Capture last 8 messages for token efficiency

  const interviewContext = `
[RECENT DISCOVERY CONVERSATION LOGS]
${recentMessages
  .map((msg) => `[${msg.role.toUpperCase()}]: ${msg.content}`)
  .join("\n")}
`;

  const rawOutputsContext = rawAgentOutputs
    ? `
[RAW AGENT REPORTS COMPILED]
- Research output status: ${rawAgentOutputs.research ? "Present" : "None"}
- Product output status: ${rawAgentOutputs.product ? "Present" : "None"}
- Finance output status: ${rawAgentOutputs.finance ? "Present" : "None"}
- Marketing output status: ${rawAgentOutputs.marketing ? "Present" : "None"}
`
    : "";

  return `
COFOUNDR AI STARTUP CONTEXT LAYER
=====================================================
${overviewContext}
-----------------------------------------------------
${researchContext}
-----------------------------------------------------
${productContext}
-----------------------------------------------------
${financeContext}
-----------------------------------------------------
${marketingContext}
-----------------------------------------------------
${roadmapContext}
-----------------------------------------------------
${rawOutputsContext}
-----------------------------------------------------
${interviewContext}
=====================================================
`;
}
export type ContextBuilderFunction = typeof buildAIContextString;
