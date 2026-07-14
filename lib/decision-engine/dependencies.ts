export interface FieldDependency {
  agents: ("research" | "product" | "finance" | "marketing")[];
  sections: string[];
}

export const DEPENDENCY_MAP: Record<string, FieldDependency> = {
  // Overview Fields
  "overview.name": { agents: [], sections: ["Startup Overview"] },
  "overview.tagline": { agents: ["marketing"], sections: ["Startup Overview", "Marketing Channels"] },
  "overview.problem": { agents: ["research", "product"], sections: ["Startup Overview", "Research Report", "Product MVP Strategy"] },
  "overview.solution": { agents: ["product", "research"], sections: ["Startup Overview", "Product MVP Strategy", "Research Report"] },
  "overview.mission": { agents: [], sections: ["Startup Overview"] },
  "overview.vision": { agents: [], sections: ["Startup Overview"] },
  "overview.targetUsers": {
    agents: ["research", "marketing", "product"],
    sections: ["Startup Overview", "Research Report", "Marketing Channels", "Product MVP Strategy"],
  },
  "overview.industry": { agents: ["research"], sections: ["Startup Overview", "Research Report"] },
  "overview.businessModel": { agents: ["finance"], sections: ["Startup Overview", "Financial Modeling"] },

  // Research Fields
  "research.marketSummary": { agents: [], sections: ["Research Report"] },
  "research.competitors": {
    agents: ["product", "marketing"],
    sections: ["Research Report", "Product MVP Strategy", "Marketing Channels"],
  },
  "research.marketDemand": { agents: ["finance"], sections: ["Research Report", "Financial Modeling"] },
  "research.swotAnalysis": { agents: ["marketing"], sections: ["Research Report", "Marketing Channels"] },
  "research.opportunities": { agents: ["product"], sections: ["Research Report", "Product MVP Strategy"] },
  "research.risks": { agents: ["finance"], sections: ["Research Report", "Financial Modeling"] },
  "research.recommendations": { agents: [], sections: ["Research Report"] },

  // Product Fields
  "product.mvpFeatures": {
    agents: ["finance", "marketing"],
    sections: ["Product MVP Strategy", "Financial Modeling", "Marketing Channels"],
  },
  "product.futureFeatures": { agents: [], sections: ["Product MVP Strategy"] },
  "product.techStack": { agents: ["finance"], sections: ["Product MVP Strategy", "Financial Modeling"] },
  "product.devRoadmap": { agents: [], sections: ["Product MVP Strategy"] },
  "product.timeline": { agents: ["finance"], sections: ["Product MVP Strategy", "Financial Modeling"] },

  // Finance Fields
  "finance.pricing": { agents: ["finance", "marketing"], sections: ["Financial Modeling", "Marketing Channels"] },
  "finance.revenueModel": { agents: ["finance"], sections: ["Financial Modeling"] },
  "finance.revenueProjection": { agents: [], sections: ["Financial Modeling"] },
  "finance.startupCost": { agents: ["finance"], sections: ["Financial Modeling"] },
  "finance.breakEven": { agents: [], sections: ["Financial Modeling"] },
  "finance.fundingNeed": { agents: ["finance"], sections: ["Financial Modeling"] },

  // Marketing Fields
  "marketing.gtmPlan": { agents: [], sections: ["Marketing Channels"] },
  "marketing.targetAudience": {
    agents: ["marketing", "research"],
    sections: ["Marketing Channels", "Research Report"],
  },
  "marketing.channels": { agents: ["marketing", "finance"], sections: ["Marketing Channels", "Financial Modeling"] },
  "marketing.socialStrategy": { agents: [], sections: ["Marketing Channels"] },
  "marketing.growthPlan": { agents: ["marketing"], sections: ["Marketing Channels"] },

  // BMC Canvas Fields
  "canvas.partners": { agents: ["product"], sections: ["Business Model Canvas", "Product MVP Strategy"] },
  "canvas.activities": { agents: ["product"], sections: ["Business Model Canvas", "Product MVP Strategy"] },
  "canvas.resources": { agents: ["finance"], sections: ["Business Model Canvas", "Financial Modeling"] },
  "canvas.valuePropositions": {
    agents: ["marketing", "research"],
    sections: ["Business Model Canvas", "Marketing Channels", "Research Report"],
  },
  "canvas.relationships": { agents: ["marketing"], sections: ["Business Model Canvas", "Marketing Channels"] },
  "canvas.channels": {
    agents: ["marketing", "finance"],
    sections: ["Business Model Canvas", "Marketing Channels", "Financial Modeling"],
  },
  "canvas.segments": {
    agents: ["research", "marketing"],
    sections: ["Business Model Canvas", "Research Report", "Marketing Channels"],
  },
  "canvas.costs": { agents: ["finance"], sections: ["Business Model Canvas", "Financial Modeling"] },
  "canvas.revenues": { agents: ["finance"], sections: ["Business Model Canvas", "Financial Modeling"] },
};

/**
 * Returns field dependencies (agents that need re-execution and sections that are affected)
 */
export function getFieldDependency(section: string, field: string): FieldDependency {
  const key = `${section}.${field}`;
  return DEPENDENCY_MAP[key] || { agents: [], sections: [section] };
}
