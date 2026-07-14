import { WorkspaceData } from "./workspace";

export interface HistoryRecord {
  id: string;
  timestamp: string;
  userAction: string;
  affectedAgents: string[];
  updatedSections: string[];
  ceoSummary: string;
}

export interface WorkspaceVersion {
  id: string;
  workspaceData: WorkspaceData;
  timestamp: string;
  logId: string | null;
}

export interface EngineStatus {
  state: "idle" | "diffing" | "running_agents" | "synthesis" | "completed" | "failed";
  affectedAgents: string[];
  currentAgent: string | null;
  completedAgents: string[];
  ceoMessage: string | null;
}
