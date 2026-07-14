import { StartupProfile } from "@/lib/ai/services/orchestrator";

export type AgentLifecycleStatus =
  | "waiting"
  | "preparing"
  | "running"
  | "reviewing"
  | "completed"
  | "failed"
  | "ready";

export interface AgentConfig {
  id: string;
  name: string;
  role: string;
  description: string;
  inputSchema: string[];
  outputSchema: string[];
  promptTemplate: string;
  status: AgentLifecycleStatus;
  dependencies: string[];
  startedAt?: string;
  completedAt?: string;
  duration?: string;
  lastUpdated?: string;
  execute: (profile: StartupProfile, inputs: Record<string, string>) => Promise<string>;
}
