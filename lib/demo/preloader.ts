import { StartupProfile } from "@/lib/ai/services/orchestrator";
import { WorkspaceData } from "@/types/workspace";
import { HistoryRecord, WorkspaceVersion } from "@/types/decision-engine";

const SAMPLE_PROFILE: StartupProfile = {
  name: "Amal043 CoFoundr AI",
  audience: "Early-stage founders, indie hackers, accelerators, and product managers.",
  pricing: "Starter: $19/mo, Pro: $49/mo, Enterprise: Custom Quote.",
  country: "United States / Global",
  businessType: "Enterprise AI Developer SaaS",
  timeline: "8 weeks MVP sprint, followed by Product Hunt public beta launch.",
  teamSize: "2 core founders (product & marketing).",
};

const SAMPLE_REPORTS: Record<string, string> = {
  research: `# Market Summary
Amal043 CoFoundr AI addresses the rapid expansion of the AI-native developer automation sector, currently expanding at a 32% CAGR. Target audiences express high friction with manual business plan templates.

# Competitor Analysis
1. General AI Chatbots (no persistent workspace context)
2. Traditional Business Agencies (prohibitively slow and expensive)
3. Niche SaaS Templates (lack interactive validation/scoring)

# Demand Score
Strong Fit (86/100). Validated via onboarding response signals.

# SWOT Matrix
- **S**: Clean vertical agent architecture, sub-second workspace memory updates
- **W**: Limited developer brand awareness in bootstrap phase
- **O**: B2B integrations with accelerators and venture studios
- **T**: Quick feature copycats by heavily funded legacy platforms

# Recommendations
Establish deep developer integrations early, seed developer boards with templates, and secure accelerator partners.`,

  product: `# Phase 1 MVP Features
- **Boardroom Workspace**: Central dashboard highlighting completion percentages and AI CEO review logs.
- **Dynamic Decision Console**: Inline card editors with auto-saving triggers.
- **SVG Analytics Dashboard**: Live charts displaying revenue curves and growth funnels.

# Phase 2 & 3 Roadmap
- **Phase 2**: Real-time collaborative shared boards and automated pitch deck builders.
- **Phase 3**: Custom enterprise logic models and Slack/Linear webhook integrations.

# Recommended Tech Stack
- **Frontend**: Next.js 15, Tailwind CSS, Framer Motion
- **Backend & Database**: Supabase postgres instance & Clerk Auth
- **AI Engine**: OpenAI completions API model (gpt-4o-mini)

# Development Timeline
8-week developer timeline covering DB schemas setups, agent pipeline syncs, and private closed-beta rollout.`,

  finance: `# Pricing Strategy
- **Starter Plan**: $19/month. Limited to 3 active plans.
- **Pro Tier**: $49/month. Unlimited updates, full deck exports, and priority CEO reasoning slots.
- **Enterprise**: Custom quotes.

# Financial Projections
- Months 1-3: $2,500 MRR (initial waitlist conversion)
- Months 4-6: $14,000 MRR (accelerator partner funnels)
- Months 7-12: $48,000 MRR (viral developer loop growth).

# Funding Need & Runway
Targeting pre-seed funding of $150,000 to maintain 14 months of runway, hire a software developer, and scale API tokens capacity.`,

  marketing: `# Launch Plan
Launch a high-converting waitlist page, followed by Hacker News templates seeding, and a public Product Hunt campaign.

# Marketing Channels
1. Developers boards (organic seeding and templates templates)
2. LinkedIn automated outbound cold outreach
3. Organic search SEO optimizing for "AI Co-Founder" keywords.

# Growth Strategy
Viral referral model: Offer $15 API generation credits to both the referrer and referee upon successful subscription onboarding.`,

  synthesis: `# Executive Summary
Amal043 CoFoundr AI is a high-growth AI Operating System enabling startup builders to generate investable strategies in real time. By structuring agent pipelines (Product, Finance, Research, Marketing) under a persistent workspace context, the platform serves as a single source of truth for startup execution.`,
};

const SAMPLE_WORKSPACE: WorkspaceData = {
  overview: {
    name: "Amal043 CoFoundr AI",
    tagline: "The Multi-Agent Operating System for Modern Founders.",
    problem: "Launching a startup is incredibly complex, requiring domain knowledge in product, marketing, finance, and research. Traditional business advice is static, expensive, and slow.",
    solution: "An AI-powered team of virtual co-founders (CEO, Research, Product, Finance, Marketing) coordinating from a centralized workspace that automatically recalculates dependencies.",
    mission: "To democratize high-caliber startup planning and validation for builders globally.",
    vision: "A world where any ambitious idea can be validated, structured, and prepared for funding in seconds.",
    targetUsers: "Early-stage founders, indie developers, and venture studios.",
    industry: "Enterprise AI Developer SaaS",
    businessModel: "SaaS Subscription Model",
  },
  research: {
    marketSummary: "High-growth AI developer productivity sector, estimated at $15B+ and growing at a CAGR of 32%.",
    competitors: "1. Isolated general-purpose AI bots (no shared workspace memory)\n2. Traditional consultancy firms (expensive and slow)\n3. Niche document template sites (no interactive validation).",
    marketDemand: "Demand Score: 86/100. Surveyed founders report high frustration with disconnected templates and manual planning loops.",
    swotAnalysis: "- **S**: High-margin architecture, sub-second workspace updates\n- **W**: Bootstrapped early marketing budget\n- **O**: Venture studio and accelerator distribution partnerships\n- **T**: Quick replication by heavily-funded legacy platforms.",
    opportunities: "Integrating with low-code platforms and forming partnerships with startup accelerators.",
    risks: "Platform dependency and regulatory changes in cloud security.",
    recommendations: "Focus on B2B SaaS founders first, build out high-fidelity templates, and launch on developer hubs.",
  },
  product: {
    mvpFeatures: "- **Boardroom Workspace**: Central dashboard highlighting completion percentages and AI CEO review logs.\n- **Dynamic Decision Console**: Inline card editors with auto-saving triggers.\n- **SVG Analytics Dashboard**: Live charts displaying revenue curves and growth funnels.",
    futureFeatures: "- **Phase 2**: Team collaborative workspaces, webhooks, and third-party integrations.\n- **Phase 3**: Custom model training and Enterprise security single sign-on (SSO).",
    techStack: "- **Frontend**: Next.js 15, Tailwind CSS, Framer Motion\n- **Backend**: Node.js & Supabase postgres database\n- **Hosting**: Vercel & Supabase Cloud",
    devRoadmap: "8-week agile dev sprint covering database design, core streaming integrations, and beta deployment.",
    timeline: "MVP ready for beta launch within 8 weeks of design kickoff.",
  },
  finance: {
    pricing: "- **Starter Plan**: $19/mo (basic strategy access)\n- **Pro Tier**: $49/mo (unlimited generation + extraction)\n- **Enterprise**: Custom quote.",
    revenueModel: "Tiered SaaS subscription billing model recurring monthly.",
    revenueProjection: "Month 1-3: $2,500 MRR\nMonth 4-6: $14,000 MRR\nMonth 7-12: $48,000 MRR.",
    startupCost: "Estimated launch budget: $15,000 (hosting, developer APIs, domain, and initial contractor costs).",
    breakEven: "Operating break-even targeted at Month 5 with 250 active Pro subscribers.",
    fundingNeed: "Pre-seed target of $150,000 to scale core AI pipelines and hire a dedicated engineer.",
  },
  marketing: {
    gtmPlan: "minimalist pre-launch landing page waitlist, followed by Hacker News and Product Hunt launch campaigns.",
    targetAudience: "Pre-seed founders and bootstrap builders.",
    channels: "1. Search SEO (targeting startup queries)\n2. High-value LinkedIn cold outbound campaigns\n3. Developer community content seeding.",
    socialStrategy: "Weekly educational threads detailing SaaS templates and low-code MVP building blocks.",
    growthPlan: "Invite-only peer referral program offering $15 API credits for every active founder referred.",
  },
  roadmap: [
    { id: "1", week: "Week 1", task: "Complete competitor analysis and identify market gaps." },
    { id: "2", week: "Week 2", task: "Build MVP wireframes and define core database schemas." },
    { id: "3", week: "Week 3", task: "Deploy private beta to early developer waitlists." },
    { id: "4", week: "Week 4", task: "Execute Product Hunt launch and activate viral loops." },
  ],
  canvas: {
    partners: "Cloud hosting providers (Vercel/AWS), Payment gateways (Stripe), Authentication APIs (Clerk/Supabase).",
    activities: "Core software engineering, template design, waitlist campaign execution, and roadmap updates.",
    resources: "AI CEO reasoning node, virtual agent prompts repository, developer contractors, early community waitlist.",
    valuePropositions: "10x faster startup validation and investable strategy compiling using virtual co-founder agents.",
    relationships: "Self-service onboarding pipelines, automated advisor logs, and monthly strategic update emails.",
    channels: "Product Hunt, HN templates seeding, developer boards, and organic startup keyword SEO.",
    segments: "Pre-seed tech founders, product managers, venture studios, and indie developers.",
    costs: "OpenAI API tokens, cloud infrastructure, domain registry, and contractor contractor fees.",
    revenues: "Starter subscription model ($19/mo), Pro tier upgrades ($49/mo), and Custom Consulting advisory audits.",
  },
};

const SAMPLE_HISTORY: HistoryRecord[] = [
  {
    id: "hist-3",
    timestamp: "03:15 PM",
    userAction: "Changed Pricing Tiers in FINANCE",
    affectedAgents: ["finance", "marketing"],
    updatedSections: ["Financial Modeling", "Marketing Channels"],
    ceoSummary: "Adjusted pricing to $19/$49 subscription tiers. Annual projected ARR increased by 14% with high adoption estimates.",
  },
  {
    id: "hist-2",
    timestamp: "02:40 PM",
    userAction: "Updated Target Users in OVERVIEW",
    affectedAgents: ["research", "marketing", "product"],
    updatedSections: ["Startup Overview", "Research Report", "Marketing Channels", "Product MVP Strategy"],
    ceoSummary: "Refined target audience to developers and venture studios. Marketing plan was shifted to organic HN/seeding.",
  },
  {
    id: "hist-1",
    timestamp: "02:10 PM",
    userAction: "Baseline generated",
    affectedAgents: [],
    updatedSections: ["All sections initialized"],
    ceoSummary: "Initial boardroom business blueprint approved by AI CEO.",
  },
];

const SAMPLE_VERSIONS: WorkspaceVersion[] = [
  {
    id: "ver-3",
    workspaceData: SAMPLE_WORKSPACE,
    timestamp: "03:15 PM",
    logId: "hist-3",
  },
  {
    id: "ver-2",
    workspaceData: SAMPLE_WORKSPACE,
    timestamp: "02:40 PM",
    logId: "hist-2",
  },
  {
    id: "ver-1",
    workspaceData: SAMPLE_WORKSPACE,
    timestamp: "02:10 PM",
    logId: "hist-1",
  },
];

/**
 * Loads the complete sample startup blueprint into LocalStorage
 */
export function preloadDemoStartup(): void {
  if (typeof window === "undefined") return;

  localStorage.setItem("cofoundr_chat_profile", JSON.stringify(SAMPLE_PROFILE));
  localStorage.setItem("cofoundr_workspace_outputs", JSON.stringify(SAMPLE_REPORTS));
  localStorage.setItem("cofoundr_workspace_data", JSON.stringify(SAMPLE_WORKSPACE));
  localStorage.setItem("cofoundr_workspace_history", JSON.stringify(SAMPLE_HISTORY));
  localStorage.setItem("cofoundr_workspace_versions", JSON.stringify(SAMPLE_VERSIONS));
}
