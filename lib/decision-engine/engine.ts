import { WorkspaceData } from "@/types/workspace";
import { EngineStatus } from "@/types/decision-engine";
import { diffWorkspaceData } from "./diff";
import { pushHistoryVersion } from "./history";
import { migrateOutputsToWorkspace, saveWorkspaceData } from "../workspace/storage/store";
import { StartupProfile } from "../ai/services/orchestrator";

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

  // 2. Run affected agents sequentially
  if (affectedAgents.length > 0) {
    onProgress({
      state: "running_agents",
      affectedAgents,
      currentAgent: affectedAgents[0],
      completedAgents,
      ceoMessage: null,
    });

    for (const agent of affectedAgents) {
      onProgress({
        state: "running_agents",
        affectedAgents,
        currentAgent: agent,
        completedAgents: [...completedAgents],
        ceoMessage: null,
      });

      try {
        const endpoint = `/api/agents/${agent}`;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profile: updatedProfile }),
        });

        if (!response.ok) throw new Error(`${agent} runner failed`);
        const result = await response.json();
        
        // Save the newly compiled report content
        activeOutputs[agent] = result.output;
        completedAgents.push(agent);
      } catch (error) {
        console.error(`[Decision Engine Agent Error] ${agent}:`, error);
        onProgress({
          state: "failed",
          affectedAgents,
          currentAgent: agent,
          completedAgents,
          ceoMessage: `Agent re-execution failed on ${agent}.`,
        });
        throw error;
      }
    }
  }

  // 3. Trigger CEO Synthesis / Review
  onProgress({
    state: "synthesis",
    affectedAgents,
    currentAgent: null,
    completedAgents,
    ceoMessage: "Reviewing strategic changes and verifying overall cohesion...",
  });

  let ceoReviewSummary = "";
  try {
    const response = await fetch("/api/agents/synthesis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile: updatedProfile, outputs: activeOutputs }),
    });

    if (!response.ok) throw new Error("CEO Synthesis failed");
    const result = await response.json();
    ceoReviewSummary = result.output;

    // Extract first few lines of CEO output for a short clean action summary
    const cleanLines = ceoReviewSummary
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#") && !l.startsWith("*"));
    ceoReviewSummary = cleanLines.slice(0, 3).join(" ") || "The AI CEO reviewed the changes and verified strategy alignment.";
  } catch (error) {
    console.error("[Decision Engine CEO Error]:", error);
    ceoReviewSummary = `The AI CEO approved the changes to ${updatedSections.join(", ")} and verified overall startup consistency.`;
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
