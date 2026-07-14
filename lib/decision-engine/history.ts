import { WorkspaceData } from "@/types/workspace";
import { HistoryRecord, WorkspaceVersion } from "@/types/decision-engine";

const HISTORY_KEY = "cofoundr_workspace_history";
const VERSIONS_KEY = "cofoundr_workspace_versions";
const MAX_VERSIONS = 10;

/**
 * Loads history records from LocalStorage
 */
export function getHistory(): HistoryRecord[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}

/**
 * Loads the version stack from LocalStorage
 */
export function getVersions(): WorkspaceVersion[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(VERSIONS_KEY);
  return raw ? JSON.parse(raw) : [];
}

/**
 * Pushes a new snapshot onto the version stack and appends a history log record.
 */
export function pushHistoryVersion(
  currentWorkspace: WorkspaceData,
  userAction: string,
  affectedAgents: string[],
  updatedSections: string[],
  ceoSummary: string
): void {
  if (typeof window === "undefined") return;

  const logId = Math.random().toString(36).substring(2, 9);
  const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  // 1. Append history log record
  const history = getHistory();
  const newRecord: HistoryRecord = {
    id: logId,
    timestamp,
    userAction,
    affectedAgents,
    updatedSections,
    ceoSummary,
  };
  localStorage.setItem(HISTORY_KEY, JSON.stringify([newRecord, ...history]));

  // 2. Push state snapshot
  const versions = getVersions();
  const newVersion: WorkspaceVersion = {
    id: Math.random().toString(36).substring(2, 9),
    workspaceData: JSON.parse(JSON.stringify(currentWorkspace)), // deep copy
    timestamp,
    logId,
  };

  const updatedVersions = [newVersion, ...versions].slice(0, MAX_VERSIONS);
  localStorage.setItem(VERSIONS_KEY, JSON.stringify(updatedVersions));
}

/**
 * Reverts the workspace data to the previous snapshot.
 * Pops the top version from the stack and returns the restored WorkspaceData.
 */
export function undoLastVersion(): { restoredData: WorkspaceData; undoneAction: string } | null {
  if (typeof window === "undefined") return null;

  const versions = getVersions();
  if (versions.length < 2) return null; // Must have at least 1 backup version and 1 current version

  // Pop the active (latest) version
  const [activeVersion, previousVersion, ...remainingVersions] = versions;

  // Restore previous data
  const restoredData = previousVersion.workspaceData;

  // Save the popped versions stack
  localStorage.setItem(VERSIONS_KEY, JSON.stringify([previousVersion, ...remainingVersions]));

  // Log rollback in history
  const history = getHistory();
  const activeRecord = history.find((h) => h.id === activeVersion.logId);
  const undoneAction = activeRecord ? activeRecord.userAction : "Last edit";

  const rollbackRecord: HistoryRecord = {
    id: Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    userAction: `Undone: ${undoneAction}`,
    affectedAgents: [],
    updatedSections: ["All restored"],
    ceoSummary: "Reverted workspace to previous stable state snapshot.",
  };
  localStorage.setItem(HISTORY_KEY, JSON.stringify([rollbackRecord, ...history]));

  return { restoredData, undoneAction };
}

/**
 * Clears the history stack (useful for developer resets)
 */
export function clearHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
  localStorage.removeItem(VERSIONS_KEY);
}
