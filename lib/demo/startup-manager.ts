"use client";

import { WorkspaceData } from "@/types/workspace";

export interface Startup {
  id: string;
  name: string;
  idea: string;
  industry: string;
  country: string;
  stage: string;
  teamSize: string;
  timestamp: number;
  interviewAnswers: Record<string, string>;
  workspaceData: WorkspaceData | null;
  workspaceOutputs: Record<string, string>;
  workflowLogs: unknown[];
  progress: Record<string, string>;
  percentage: number;
  chatMessages: unknown[];
}

export function listStartups(): Startup[] {
  if (typeof window === "undefined") return [];
  const list = localStorage.getItem("cofoundr_startups");
  return list ? JSON.parse(list) : [];
}

export function getActiveStartup(): Startup | null {
  if (typeof window === "undefined") return null;
  const activeId = localStorage.getItem("cofoundr_active_startup_id");
  if (!activeId) return null;
  const list = listStartups();
  return list.find((s) => s.id === activeId) || null;
}

export function createStartup(data: {
  name?: string;
  idea: string;
  industry: string;
  country: string;
  stage: string;
  teamSize: string;
}): Startup {
  const list = listStartups();
  const name = data.name && data.name.trim() ? data.name.trim() : "My Startup";
  
  const newStartup: Startup = {
    id: `startup_${Date.now()}`,
    name,
    idea: data.idea,
    industry: data.industry,
    country: data.country,
    stage: data.stage,
    teamSize: data.teamSize,
    timestamp: Date.now(),
    interviewAnswers: {},
    workspaceData: null,
    workspaceOutputs: {},
    workflowLogs: [],
    progress: {},
    percentage: 0,
    chatMessages: [],
  };

  list.push(newStartup);
  localStorage.setItem("cofoundr_startups", JSON.stringify(list));
  localStorage.setItem("cofoundr_active_startup_id", newStartup.id);
  
  // Sync to legacy keys for initial onboarding state
  syncStartupToLegacy(newStartup);
  return newStartup;
}

export function switchStartup(id: string): void {
  const list = listStartups();
  const startup = list.find((s) => s.id === id);
  if (startup) {
    localStorage.setItem("cofoundr_active_startup_id", id);
    syncStartupToLegacy(startup);
  }
}

export function saveActiveStartupWorkspace(workspace: WorkspaceData, outputs?: Record<string, string>) {
  const activeId = localStorage.getItem("cofoundr_active_startup_id");
  if (!activeId) return;

  const list = listStartups();
  const index = list.findIndex((s) => s.id === activeId);
  if (index !== -1) {
    list[index].workspaceData = workspace;
    if (outputs) {
      list[index].workspaceOutputs = outputs;
    }
    // Pull latest logs
    const logs = localStorage.getItem("cofoundr_workflow_logs");
    if (logs) {
      list[index].workflowLogs = JSON.parse(logs);
    }
    // Pull progress percent
    const progress = localStorage.getItem("cofoundr_chat_progress");
    if (progress) {
      list[index].progress = JSON.parse(progress);
    }
    localStorage.setItem("cofoundr_startups", JSON.stringify(list));
  }
}

export function syncStartupToLegacy(startup: Startup): void {
  if (typeof window === "undefined") return;

  // Build profile context
  const profile = {
    name: startup.name,
    audience: startup.interviewAnswers.targetAudience || "-",
    pricing: startup.interviewAnswers.revenueModel || "-",
    businessType: startup.industry || "-",
    timeline: "-",
    idea: startup.idea,
    industry: startup.industry,
    country: startup.country,
    stage: startup.stage,
    teamSize: startup.teamSize,
    ...startup.interviewAnswers,
  };

  localStorage.setItem("cofoundr_chat_profile", JSON.stringify(profile));
  localStorage.setItem("cofoundr_chat_progress", JSON.stringify(startup.progress));
  localStorage.setItem("cofoundr_chat_messages", JSON.stringify(startup.chatMessages || []));
  
  if (startup.workspaceData) {
    localStorage.setItem("cofoundr_workspace_data", JSON.stringify(startup.workspaceData));
  } else {
    localStorage.removeItem("cofoundr_workspace_data");
  }
  
  localStorage.setItem("cofoundr_workspace_outputs", JSON.stringify(startup.workspaceOutputs));
  localStorage.setItem("cofoundr_workflow_logs", JSON.stringify(startup.workflowLogs));
}
