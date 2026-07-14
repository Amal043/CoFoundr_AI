import { WorkspaceData, WorkspaceRoadmapNode, WorkspaceCanvas } from "@/types/workspace";

// Helper to extract specific headers from Markdown
export function extractMarkdownSection(md: string, heading: string): string {
  if (!md) return "";
  const lines = md.split("\n");
  const result: string[] = [];
  let capture = false;

  for (const line of lines) {
    const cleanLine = line.trim();
    if (cleanLine.startsWith("#") && cleanLine.toLowerCase().includes(heading.toLowerCase())) {
      capture = true;
      continue;
    }
    if (capture && cleanLine.startsWith("#")) {
      break;
    }
    if (capture) {
      result.push(line);
    }
  }

  const output = result.join("\n").trim();
  // Strip starting lists bullet formats if they surround the whole block
  return output || `- No specific details generated for ${heading}.`;
}

// Default fallback workspace data
export const createDefaultWorkspace = (profileName = "My Startup", audience = "-"): WorkspaceData => {
  const defaultRoadmap: WorkspaceRoadmapNode[] = [
    { id: "1", week: "Week 1", task: "Complete market validation and compile competitor SWOT audits." },
    { id: "2", week: "Week 2", task: "Design and implement core MVP features and database schemas." },
    { id: "3", week: "Week 3", task: "Launch closed-beta testing and gather early feedback loops." },
    { id: "4", week: "Week 4", task: "Execute Product Hunt launch and activate organic SEO funnels." },
  ];

  const defaultCanvas: WorkspaceCanvas = {
    partners: "Cloud hosting provider (Vercel/AWS), Payment gateway (Stripe), Auth API (Clerk/Supabase), Database provider.",
    activities: "Core software engineering, customer discovery, marketing campaign management, roadmap scheduling.",
    resources: "AI CEO reasoning system, developer/designer contractors, early waitlist user base.",
    valuePropositions: "10x faster startup strategy generation and automated research planning for ambitious founders.",
    relationships: "Automated onboarding pipeline, self-service workspace dashboards, periodic product check-in logs.",
    channels: "Content SEO, organic Product Hunt launches, target outbound cold emails, social media groups.",
    segments: audience !== "-" ? audience : "Pre-seed founders, product managers, and agile startup builders.",
    costs: "OpenAI API tokens, cloud infrastructure hosting, domain registry, software subscription APIs.",
    revenues: "Starter subscription plan, Pro strategy model tiers, and enterprise advisory reports.",
  };

  return {
    overview: {
      name: profileName !== "-" ? profileName : "My Startup",
      tagline: "The AI-native foundation to launch and scale with momentum.",
      problem: "Traditional startup discovery and research processes are slow, expensive, and lack operational alignment.",
      solution: "An intelligent, multi-agent advisory system compiling developer-ready specifications in real time.",
      mission: "To democratize high-caliber startup strategy coordination for founders worldwide.",
      vision: "A world where any ambitious idea can be validated, modeled, and structured for investment instantly.",
      targetUsers: audience !== "-" ? audience : "Early-stage founders and product teams.",
      industry: "Enterprise AI Software / EdTech SaaS",
      businessModel: "SaaS Subscription Model",
    },
    research: {
      marketSummary: "High-growth sector driven by the rapid adoption of verticalized AI-native advisory and strategy platforms.",
      competitors: "1. Traditional consulting agencies (expensive, slow)\n2. Isolated AI chatbots (lack workspace memory)\n3. Niche templates directories (non-interactive).",
      marketDemand: "Demand Score: 85/100. Target users express frustration with disconnected templates and manual planning loops.",
      swotAnalysis: "- **S**: High-margin architecture, fast iteration\n- **W**: Bootstrapped early marketing budget\n- **O**: Untapped niche SaaS markets\n- **T**: Quick replication by heavily-funded platforms.",
      opportunities: "Integrating with low-code platforms and forming partnerships with startup accelerators.",
      risks: "Platform dependency and regulatory changes in cloud security.",
      recommendations: "Focus on B2B SaaS founders first, build out high-fidelity templates, and launch on developer hubs.",
    },
    product: {
      mvpFeatures: "- **Core Dashboard**: Live workspace view showcasing status indicators.\n- **AI Configuration Console**: Setup and parameters adjustments interface.\n- **Dynamic Suggested Actions**: Interactive tags to streamline customer flows.",
      futureFeatures: "- **Phase 2**: Team collaborative workspaces, webhooks, and third-party integrations.\n- **Phase 3**: Custom model training and Enterprise security single sign-on (SSO).",
      techStack: "- **Frontend**: Next.js 15, Tailwind CSS, Framer Motion\n- **Backend**: Node.js & Supabase BaaS\n- **Hosting**: Vercel & Supabase Cloud",
      devRoadmap: "8-week agile dev sprint covering database design, core streaming integrations, and beta deployment.",
      timeline: "MVP ready for beta launch within 8 weeks of design kickoff.",
    },
    finance: {
      pricing: "- **Starter Plan**: $19/mo (basic strategy access)\n- **Pro Tier**: $49/mo (unlimited generation + extraction)\n- **Enterprise**: Custom quote.",
      revenueModel: "Tiered SaaS subscription billing model recurring monthly.",
      revenueProjection: "Month 1-3: $1k MRR\nMonth 4-6: $12k MRR\nMonth 7-12: $45k MRR.",
      startupCost: "Estimated launch budget: $15,000 (hosting, developer APIs, domain, and initial contractor costs).",
      breakEven: "Operating break-even targeted at Month 5 with 250 active Pro subscribers.",
      fundingNeed: "Pre-seed target of $150,000 to scale core AI pipelines and hire a dedicated engineer.",
    },
    marketing: {
      gtmPlan: "minimalist pre-launch landing page waitlist, followed by Hacker News and Product Hunt launch campaigns.",
      targetAudience: audience !== "-" ? audience : "Pre-seed founders and bootstrap builders.",
      channels: "1. Search SEO (targeting startup queries)\n2. High-value LinkedIn cold outbound campaigns\n3. Developer community content seeding.",
      socialStrategy: "Weekly educational threads detailing SaaS templates and low-code MVP building blocks.",
      growthPlan: "Invite-only peer referral program offering $10 API credits for every active founder referred.",
    },
    roadmap: defaultRoadmap,
    canvas: defaultCanvas,
  };
};

// Migrate Phase 3 agent reports into structured WorkspaceData
export function migrateOutputsToWorkspace(profileName: string, audience: string, outputs: { [key: string]: string }): WorkspaceData {
  const base = createDefaultWorkspace(profileName, audience);

  if (!outputs.research && !outputs.product && !outputs.finance && !outputs.marketing) {
    return base;
  }

  // Parse Research Agent Output
  if (outputs.research) {
    const market = extractMarkdownSection(outputs.research, "Market Summary");
    const comps = extractMarkdownSection(outputs.research, "Competitor Analysis");
    const score = extractMarkdownSection(outputs.research, "Demand Score");
    const swot = extractMarkdownSection(outputs.research, "SWOT");
    const recs = extractMarkdownSection(outputs.research, "Recommendations");

    if (market) base.research.marketSummary = market;
    if (comps) base.research.competitors = comps;
    if (score) base.research.marketDemand = score;
    if (swot) {
      base.research.swotAnalysis = swot;
      // Extract opportunities & threats/risks if possible
      const swotLines = swot.split("\n");
      const opps = swotLines.filter((l) => l.toLowerCase().includes("opportunit"));
      const threats = swotLines.filter((l) => l.toLowerCase().includes("threat") || l.toLowerCase().includes("risk"));
      if (opps.length > 0) base.research.opportunities = opps.join("\n");
      if (threats.length > 0) base.research.risks = threats.join("\n");
    }
    if (recs) base.research.recommendations = recs;
  }

  // Parse Product Agent Output
  if (outputs.product) {
    const mvp = extractMarkdownSection(outputs.product, "Phase 1 MVP");
    const fut = extractMarkdownSection(outputs.product, "Phase 2");
    const stack = extractMarkdownSection(outputs.product, "Recommended Tech Stack");
    const timeline = extractMarkdownSection(outputs.product, "Development Timeline");

    if (mvp) base.product.mvpFeatures = mvp;
    if (fut) base.product.futureFeatures = fut;
    if (stack) base.product.techStack = stack;
    if (timeline) {
      base.product.devRoadmap = timeline;
      base.product.timeline = timeline.split("\n").slice(0, 3).join("\n");
    }
  }

  // Parse Finance Agent Output
  if (outputs.finance) {
    const pricingVal = extractMarkdownSection(outputs.finance, "Pricing Strategy");
    const proj = extractMarkdownSection(outputs.finance, "Revenue Projection");
    const budget = extractMarkdownSection(outputs.finance, "Funding Need");
    const breakEvenVal = extractMarkdownSection(outputs.finance, "Financial Summary");

    if (pricingVal) {
      base.finance.pricing = pricingVal;
      const firstLines = pricingVal.split("\n").slice(0, 3).join("\n");
      base.finance.revenueModel = firstLines || "Monthly recurring subscription plans.";
    }
    if (proj) base.finance.revenueProjection = proj;
    if (budget) {
      base.finance.startupCost = budget;
      base.finance.fundingNeed = budget;
    }
    if (breakEvenVal) base.finance.breakEven = breakEvenVal;
  }

  // Parse Marketing Agent Output
  if (outputs.marketing) {
    const launch = extractMarkdownSection(outputs.marketing, "Launch Plan");
    const channels = extractMarkdownSection(outputs.marketing, "Marketing Channels");
    const growth = extractMarkdownSection(outputs.marketing, "Growth Strategy");
    const content = extractMarkdownSection(outputs.marketing, "Content Suggestions");

    if (launch) base.marketing.gtmPlan = launch;
    if (channels) base.marketing.channels = channels;
    if (growth) base.marketing.growthPlan = growth;
    if (content) base.marketing.socialStrategy = content;
  }

  // Populate Business Model Canvas dynamically from reports
  base.canvas.segments = base.overview.targetUsers;
  base.canvas.valuePropositions = base.overview.solution;
  base.canvas.channels = base.marketing.channels.split("\n").slice(0, 4).join("\n").replace(/^\d+\.\s+/gm, "");
  base.canvas.revenues = base.finance.pricing.split("\n").slice(0, 4).join("\n");
  base.canvas.costs = base.finance.startupCost.split("\n").slice(0, 3).join("\n");

  return base;
}

// -------------------------------------------------------------
// Storage API Wrapper (Database-ready interface)
// -------------------------------------------------------------

export function loadWorkspaceData(): WorkspaceData | null {
  if (typeof window === "undefined") return null;

  // 1. Try to load existing edited workspace data
  const data = localStorage.getItem("cofoundr_workspace_data");
  if (data) return JSON.parse(data);

  // 2. Fallback: try to migrate from Phase 3 outputs
  const savedOutputs = localStorage.getItem("cofoundr_workspace_outputs");
  const savedProfile = localStorage.getItem("cofoundr_chat_profile");

  if (savedOutputs && savedProfile) {
    const outputs = JSON.parse(savedOutputs);
    const profile = JSON.parse(savedProfile);
    const migrated = migrateOutputsToWorkspace(profile.name, profile.audience, outputs);
    
    // Save migrated data immediately
    localStorage.setItem("cofoundr_workspace_data", JSON.stringify(migrated));
    return migrated;
  }

  // 3. Fallback: if profile exists but no outputs, create default
  if (savedProfile) {
    const profile = JSON.parse(savedProfile);
    const defaultData = createDefaultWorkspace(profile.name, profile.audience);
    localStorage.setItem("cofoundr_workspace_data", JSON.stringify(defaultData));
    return defaultData;
  }

  return null;
}

export function saveWorkspaceData(data: WorkspaceData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("cofoundr_workspace_data", JSON.stringify(data));
}
