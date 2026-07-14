import { WorkspaceData } from "@/types/workspace";
import { EngineStatus } from "@/types/decision-engine";
import { diffWorkspaceData } from "./diff";
import { pushHistoryVersion } from "./history";
import { migrateOutputsToWorkspace, saveWorkspaceData } from "../workspace/storage/store";
import { StartupProfile } from "../ai/services/orchestrator";
import { WorkflowOrchestrator } from "../agents/orchestrator";

// Helper to map the current state of workspace back into the StartupProfile expected by APIs
export function mapWorkspaceToProfile(workspace: WorkspaceData, originalProfile: StartupProfile): StartupProfile {
  return {
    ...originalProfile,
    name: workspace.overview.name || originalProfile.name,
    audience: workspace.overview.targetUsers || originalProfile.audience,
    pricing: workspace.finance.pricing.split("\n")[0] || originalProfile.pricing,
    businessType: workspace.overview.businessModel || originalProfile.businessType,
    timeline: workspace.product.timeline.split("\n")[0] || originalProfile.timeline,
  };
}

interface RunEngineOptions {
  prevWorkspace: WorkspaceData;
  currentWorkspace: WorkspaceData;
  originalProfile: StartupProfile;
  rawOutputs: Record<string, string>;
  onProgress: (status: EngineStatus) => void;
}

/**
 * Main AI Decision Engine coordinator.
 * Detects diffs, runs only affected agents, executes CEO review, updates workspace memory, and appends to history.
 */
export async function runWorkspaceDecisionEngine({
  prevWorkspace,
  currentWorkspace,
  originalProfile,
  rawOutputs,
  onProgress,
}: RunEngineOptions): Promise<{ updatedWorkspace: WorkspaceData; summary: string } | null> {
  // 1. Detect diffs
  onProgress({
    state: "diffing",
    affectedAgents: [],
    currentAgent: null,
    completedAgents: [],
    ceoMessage: null,
  });

  const { diffs, affectedAgents, updatedSections } = diffWorkspaceData(prevWorkspace, currentWorkspace);

  if (diffs.length === 0) {
    onProgress({
      state: "idle",
      affectedAgents: [],
      currentAgent: null,
      completedAgents: [],
      ceoMessage: null,
    });
    return null;
  }

  // Generate a human-readable action summary from the diffs
  const actionText = diffs
    .map((d) => `Changed ${d.field.replace(/([A-Z])/g, " $1")} in ${d.section.toUpperCase()}`)
    .join(", ");

  const updatedProfile = mapWorkspaceToProfile(currentWorkspace, originalProfile);
  const activeOutputs = { ...rawOutputs };
  const completedAgents: string[] = [];

  const orchestrator = new WorkflowOrchestrator();
  let ceoReviewSummary = "";

  try {
    const outputs = await orchestrator.runOrchestrator(
      updatedProfile,
      affectedAgents,
      (agentId, status, logs) => {
        let engineState: "running_agents" | "synthesis" | "failed" | "diffing" | "idle" | "completed" = "running_agents";
        if (agentId === "ceo") {
          engineState = "synthesis";
        } else if (status === "failed") {
          engineState = "failed";
        }

        onProgress({
          state: engineState,
          affectedAgents,
          currentAgent: agentId,
          completedAgents: orchestrator.getAgents()
            .filter((a) => a.status === "completed")
            .map((a) => a.id),
          ceoMessage: logs.length > 0 ? logs[logs.length - 1].message : null,
        });
      }
    );

    // Save the newly compiled report contents
    Object.keys(outputs).forEach((key) => {
      if (key !== "ceo") {
        activeOutputs[key] = outputs[key];
      } else {
        ceoReviewSummary = outputs[key];
      }
    });

    // Extract first few lines of CEO output for a short clean action summary
    const cleanLines = ceoReviewSummary
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#") && !l.startsWith("*"));
    ceoReviewSummary = cleanLines.slice(0, 3).join(" ") || "The AI CEO reviewed the changes and verified strategy alignment.";
  } catch (error) {
    console.error("[Decision Engine Orchestrator Error]:", error);
    onProgress({
      state: "failed",
      affectedAgents,
      currentAgent: null,
      completedAgents: [],
      ceoMessage: "Agent re-execution pipeline failed.",
    });
    throw error;
  }

  // 4. Migrate and update workspace with newly generated agent content
  const migratedWorkspace = migrateOutputsToWorkspace(updatedProfile.name, updatedProfile.audience, activeOutputs);

  // Preserve manual user edits made in the current transaction (so they aren't overwritten by default migration)
  const finalWorkspace: WorkspaceData = {
    ...migratedWorkspace,
    // Keep user's active overview edits
    overview: {
      ...migratedWorkspace.overview,
      ...currentWorkspace.overview,
    },
    // Keep user's active canvas edits
    canvas: {
      ...migratedWorkspace.canvas,
      ...currentWorkspace.canvas,
    },
    // Keep user's active roadmap timeline
    roadmap: currentWorkspace.roadmap,
  };

  // 5. Save updated data and commit version history
  saveWorkspaceData(finalWorkspace);
  localStorage.setItem("cofoundr_workspace_outputs", JSON.stringify(activeOutputs));
  localStorage.setItem("cofoundr_chat_profile", JSON.stringify(updatedProfile));

  // Save execution logs for dashboard activity timeline feed
  try {
    const existingLogsStr = localStorage.getItem("cofoundr_workflow_logs") || "[]";
    const existingLogs = JSON.parse(existingLogsStr);
    const newLogs = orchestrator.getLogs().map((log, idx) => ({
      id: `${Date.now()}-${idx}`,
      agent: log.agentId === "ceo" ? "AI CEO" : `${log.agentId.charAt(0).toUpperCase() + log.agentId.slice(1)} Agent`,
      action: log.message,
      time: `Today at ${log.timestamp}`,
    }));
    localStorage.setItem("cofoundr_workflow_logs", JSON.stringify([...newLogs, ...existingLogs].slice(0, 15)));
  } catch (e) {
    console.error("Failed to save workflow logs:", e);
  }

  pushHistoryVersion(
    finalWorkspace,
    actionText,
    affectedAgents,
    updatedSections,
    ceoReviewSummary
  );

  onProgress({
    state: "completed",
    affectedAgents,
    currentAgent: null,
    completedAgents,
    ceoMessage: ceoReviewSummary,
  });

  return {
    updatedWorkspace: finalWorkspace,
    summary: ceoReviewSummary,
  };
}
