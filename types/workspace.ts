export interface WorkspaceOverview {
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  mission: string;
  vision: string;
  targetUsers: string;
  industry: string;
  businessModel: string;
}

export interface WorkspaceResearch {
  marketSummary: string;
  competitors: string;
  marketDemand: string;
  swotAnalysis: string;
  opportunities: string;
  risks: string;
  recommendations: string;
}

export interface WorkspaceProduct {
  mvpFeatures: string;
  futureFeatures: string;
  techStack: string;
  devRoadmap: string;
  timeline: string;
}

export interface WorkspaceFinance {
  pricing: string;
  revenueModel: string;
  revenueProjection: string;
  startupCost: string;
  breakEven: string;
  fundingNeed: string;
}

export interface WorkspaceMarketing {
  gtmPlan: string;
  targetAudience: string;
  channels: string;
  socialStrategy: string;
  growthPlan: string;
}

export interface WorkspaceRoadmapNode {
  id: string;
  week: string;
  task: string;
}

export interface WorkspaceCanvas {
  partners: string;
  activities: string;
  resources: string;
  valuePropositions: string;
  relationships: string;
  channels: string;
  segments: string;
  costs: string;
  revenues: string;
}

export interface WorkspaceData {
  overview: WorkspaceOverview;
  research: WorkspaceResearch;
  product: WorkspaceProduct;
  finance: WorkspaceFinance;
  marketing: WorkspaceMarketing;
  roadmap: WorkspaceRoadmapNode[];
  canvas: WorkspaceCanvas;
}
