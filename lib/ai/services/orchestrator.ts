import { openai } from "./openai";
import { RESEARCH_AGENT_PROMPT } from "../prompts/research";
import { PRODUCT_AGENT_PROMPT } from "../prompts/product";
import { FINANCE_AGENT_PROMPT } from "../prompts/finance";
import { MARKETING_AGENT_PROMPT } from "../prompts/marketing";
import { CEO_SYNTHESIS_PROMPT } from "../prompts/ceo";

export interface StartupProfile {
  name: string;
  audience: string;
  pricing: string;
  country: string;
  businessType: string;
  timeline: string;
  teamSize: string;
}

// Helper to format profile as string for prompts
function formatProfile(profile: StartupProfile): string {
  return `
STARTUP BLUEPRINT DETAILS:
- Name: ${profile.name}
- Target Audience: ${profile.audience}
- Pricing Model: ${profile.pricing}
- Country/Market: ${profile.country}
- Business Type: ${profile.businessType}
- Timeline: ${profile.timeline}
- Team Size: ${profile.teamSize}
`;
}

// -------------------------------------------------------------
// Real Agent runners (OpenAI calls)
// -------------------------------------------------------------

async function callOpenAIWithPrompt(systemPrompt: string, userPrompt: string): Promise<string> {
  if (!openai) throw new Error("OpenAI is not initialized");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return response.choices[0]?.message?.content || "No analysis generated.";
}

export async function runResearchAgent(profile: StartupProfile): Promise<string> {
  if (!openai) return getMockResearchReport(profile);

  const userPrompt = `Please run a market feasibility and competitor analysis based on this startup:\n${formatProfile(profile)}`;
  return callOpenAIWithPrompt(RESEARCH_AGENT_PROMPT, userPrompt);
}

export async function runProductAgent(profile: StartupProfile): Promise<string> {
  if (!openai) return getMockProductReport(profile);

  const userPrompt = `Please define the MVP features, timeline, and tech stack based on this startup:\n${formatProfile(profile)}`;
  return callOpenAIWithPrompt(PRODUCT_AGENT_PROMPT, userPrompt);
}

export async function runFinanceAgent(profile: StartupProfile): Promise<string> {
  if (!openai) return getMockFinanceReport(profile);

  const userPrompt = `Please generate the pricing strategy, projections, and budget breakdown based on this startup:\n${formatProfile(profile)}`;
  return callOpenAIWithPrompt(FINANCE_AGENT_PROMPT, userPrompt);
}

export async function runMarketingAgent(profile: StartupProfile): Promise<string> {
  if (!openai) return getMockMarketingReport(profile);

  const userPrompt = `Please construct the launch plan and customer acquisition strategy based on this startup:\n${formatProfile(profile)}`;
  return callOpenAIWithPrompt(MARKETING_AGENT_PROMPT, userPrompt);
}

export async function combineAgentOutputs(
  profile: StartupProfile,
  outputs: { research: string; product: string; finance: string; marketing: string }
): Promise<string> {
  if (!openai) return getMockCeoSynthesis(profile);

  const userPrompt = `
Here is the profile details:\n${formatProfile(profile)}

Below are the reports from our specialized agents:

RESEARCH AGENT REPORT:
${outputs.research}

PRODUCT AGENT REPORT:
${outputs.product}

FINANCE AGENT REPORT:
${outputs.finance}

MARKETING AGENT REPORT:
${outputs.marketing}

Please synthesize these reports into a single, cohesive, premium Executive Summary and Core Strategy. Eliminate any contradictions.
`;

  return callOpenAIWithPrompt(CEO_SYNTHESIS_PROMPT, userPrompt);
}

// -------------------------------------------------------------
// High-Fidelity Mock Reports (Used when API Key is missing)
// -------------------------------------------------------------

function getMockResearchReport(profile: StartupProfile): string {
  const name = profile.name !== "-" ? profile.name : "This Startup";
  const audience = profile.audience !== "-" ? profile.audience : "target users";
  const country = profile.country !== "-" ? profile.country : "Global";

  return `# Market Summary
The market size for **${name}** targeting **${audience}** in **${country}** is projected to grow rapidly over the next five years. With digital acceleration and specialized software needs, customers in this segment are searching for verticalized, easy-to-use platforms. There is a strong macro trend towards decentralized services and AI-native automation, which directly aligns with this initiative.

# Competitor Analysis
We have identified three primary competitors currently serving this space:
1. **Incumbent Enterprise Corp**: Strong distribution networks, but possesses legacy user interfaces, high pricing tiers, and lack of AI integration.
2. **NicheFlow Inc**: Offers cheap utilities, but suffers from low customer retention due to poor onboarding support and limited feature scaling.
3. **AgileSync Software**: Active in secondary markets, but lacks vertical features for **${audience}**.

# Demand Score
**Demand Score: 84/100**
*Rationale*: Target users express a high willingness to pay due to current manual workflow bottlenecks. Existing solutions fail to address the core problem efficiently, presenting a significant customer acquisition window.

# SWOT Analysis
- **Strengths**: Light operating cost, customized features for ${audience}, AI automation speed.
- **Weaknesses**: Bootstrapped early launch budget, initial lack of brand recognition.
- **Opportunities**: Rapid penetration via low-touch subscription models; integration partnerships.
- **Threats**: Rapid imitation by well-funded platforms; changes in local regulatory frameworks.

# Recommendations
1. Focus initially on a narrow sub-segment of **${audience}** to validate the core value proposition.
2. Build content loops emphasizing the performance advantages of AI automation over manual alternatives.
3. Establish a partner network with micro-influencers in the industry.
`;
}

function getMockProductReport(profile: StartupProfile): string {
  const name = profile.name !== "-" ? profile.name : "This Startup";
  const team = profile.teamSize !== "-" ? profile.teamSize : "Solo founder";
  const hasTech = team.toLowerCase().includes("tech") || team.toLowerCase().includes("partner") || team.toLowerCase().includes("2-3");

  const techStack = hasTech 
    ? "Frontend: Next.js (App Router, Tailwind CSS)\n- Backend: Node.js (TypeScript) & FastAPI\n- Database: PostgreSQL & Redis\n- Hosting: Vercel & AWS ECS"
    : "Frontend: Next.js (Tailwind CSS)\n- Backend & Database: Supabase (BaaS)\n- Payments: Stripe Billing\n- Hosting: Vercel";

  return `# Phase 1 MVP
The MVP for **${name}** will center on solving the single highest-value workflow block:
- **Core Dashboard**: Live workspace view showcasing status indicators.
- **AI Configuration Console**: Setup and parameters adjustments interface.
- **Basic Metadata Extractor**: Structured JSON output parser.
- **Dynamic Suggested Actions**: Interactive tags to streamline customer flows.

# Phase 2 & 3 Roadmap
- **Phase 2 (Growth)**: Native email integrations, team shared folders, advanced metrics analytics, and webhooks.
- **Phase 3 (Scale)**: Collaborative multi-founder workspaces, custom AI training parameters, and enterprise SSO security.

# Recommended Tech Stack
- **Framework**: ${techStack}
- **Auth**: Next-Auth / Supabase Auth
- **Deployment**: Github Actions CI/CD

# Development Timeline
- **Weeks 1-3**: Database schema, API architecture, and layout foundation.
- **Weeks 4-6**: Core AI streaming integration, profile extractor, and UI panels.
- **Weeks 7-8**: Client review, beta testing, and deployment to production.
`;
}

function getMockFinanceReport(profile: StartupProfile): string {
  const name = profile.name !== "-" ? profile.name : "This Startup";

  return `# Pricing Strategy
We propose a value-based pricing structure for **${name}** to capture different segments of the market:
- **Starter Tier**: $19/month. Limited to 3 startup workspace plans and basic suggestions.
- **Pro Tier**: $49/month. Unlimited workspaces, real-time metadata extraction, and priority AI CEO reasoning.
- **Enterprise / Consulting**: Custom quote. Tailored integration audits.

# Revenue Projection
- **Month 1-3**: Validation phase. Target 50 beta users ($1,000 MRR).
- **Month 4-6**: Launch phase. Target 250 active Pro subscribers ($12,250 MRR).
- **Month 7-12**: Growth phase. Scaling to 800 active subscribers and 3 enterprise consulting partners ($45,000 MRR).

# Funding Need & Runway
- **Estimated Launch Budget**: $15,000 for hosting, API costs, domain, and initial contractor help.
- **Monthly Burn Rate**: $2,500 (low overhead structure).
- **Runway**: Bootstrapped runway of 6 months. Operational break-even target is at Month 5.

# Financial Summary
- **Gross Margin**: ~88% (primarily cloud hosting and OpenAI token costs).
- **Target CAC**: $35 (low-touch acquisition).
- **Estimated LTV**: $450 (based on a 9-month average customer lifecycle).
`;
}

function getMockMarketingReport(profile: StartupProfile): string {
  const name = profile.name !== "-" ? profile.name : "This Startup";
  const audience = profile.audience !== "-" ? profile.audience : "target customers";

  return `# Launch Plan
- **Pre-Launch**: Create a minimalist landing page with an interactive early-access waitlist.
- **Launch Day**: Deploy product reveals on Product Hunt, Hacker News, and target subreddits.
- **Post-Launch**: Send a targeted sequence of case study emails showing early user success.

# Marketing Channels
1. **Content SEO**: Target search intents surrounding "AI templates" and "starting a business in this niche".
2. **Cold Email / LinkedIn**: High-personalization outbound campaigns targeting **${audience}**.
3. **Developer Communities**: Build small open-source helper utilities to funnel developers to **${name}**.

# Growth Strategy
We will launch an invite-only **Founder Referral Program**:
- Users get $10 API credits for every peer co-founder who registers and completes an interview.
- Creates an viral loop (K-factor > 1.2) among entrepreneur circles.

# Content Suggestions
1. "How to build a startup in 2026 without a technical team: The complete blueprint."
2. "Why legacy platforms are costing you 15 hours a week in manual admin."
`;
}

function getMockCeoSynthesis(
  profile: StartupProfile
): string {
  const name = profile.name !== "-" ? profile.name : "This Startup";

  return `# Executive Summary
**${name}** represents a highly viable startup opportunity targeting a clear market gap. By coordinating AI-powered automation with specialized product, finance, and marketing strategies, the company is built to capture market demand quickly.

# Coherent Core Strategy
Our founding strategy leverages a streamlined tech stack to launch a high-margin, low-touch MVP in 2 months:
1. **Product & Tech**: supafast MVP built on Next.js and Supabase to validate features with target customers.
2. **Financial Alignment**: Priced at a $49/mo subscription, allowing operational break-even at just 250 subscribers.
3. **Marketing Sync**: Driving leads through targeted Content SEO and a viral peer referral program, keeping CAC under $35.

# Combined Synergy Analysis
By utilizing an AI-first modular architecture, **${name}** achieves an exceptionally high gross margin of 88%, which insulates the business from large early-stage hiring costs. We have aligned our tech stack recommendations (low-code integrations) with our bootstrapped budget constraints, assuring 6 months of active runway to hit growth targets.
`;
}
