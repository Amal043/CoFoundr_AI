import { WorkspaceData } from "@/types/workspace";
import { getFieldDependency } from "./dependencies";

export interface WorkspaceDiff {
  section: string;
  field: string;
  prevValue: string;
  newValue: string;
}

export interface DiffResult {
  diffs: WorkspaceDiff[];
  affectedAgents: ("research" | "product" | "finance" | "marketing")[];
  updatedSections: string[];
}

/**
 * Compares two workspace datasets to detect modified fields,
 * and compiles the list of affected agents and sections.
 */
export function diffWorkspaceData(prev: WorkspaceData, current: WorkspaceData): DiffResult {
  const diffs: WorkspaceDiff[] = [];
  const agentSet = new Set<"research" | "product" | "finance" | "marketing">();
  const sectionSet = new Set<string>();

  const sections: (keyof Omit<WorkspaceData, "roadmap">)[] = [
    "overview",
    "research",
    "product",
    "finance",
    "marketing",
    "canvas",
  ];

  for (const section of sections) {
    const prevSection = prev[section];
    const currentSection = current[section];

    if (!prevSection || !currentSection) continue;

    for (const [field, val] of Object.entries(currentSection)) {
      const prevVal = (prevSection as unknown as Record<string, string>)[field] || "";
      if (prevVal.trim() !== (val as string).trim()) {
        diffs.push({
          section,
          field,
          prevValue: prevVal,
          newValue: val as string,
        });

        const deps = getFieldDependency(section, field);
        deps.agents.forEach((agent) => agentSet.add(agent));
        deps.sections.forEach((sec) => sectionSet.add(sec));
      }
    }
  }

  // Handle roadmap nodes comparison
  if (prev.roadmap && current.roadmap) {
    current.roadmap.forEach((node) => {
      const prevNode = prev.roadmap.find((n) => n.id === node.id);
      if (prevNode && prevNode.task.trim() !== node.task.trim()) {
        diffs.push({
          section: "roadmap",
          field: node.week,
          prevValue: prevNode.task,
          newValue: node.task,
        });
        sectionSet.add("Launch Roadmap");
      }
    });
  }

  return {
    diffs,
    affectedAgents: Array.from(agentSet),
    updatedSections: Array.from(sectionSet),
  };
}
