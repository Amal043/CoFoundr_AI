"use client";

import { Search, Boxes, PenTool, Rocket, Sparkles } from "lucide-react";
import { WorkspaceRoadmapNode } from "@/types/workspace";
import { useState } from "react";

interface RoadmapProps {
  roadmap: WorkspaceRoadmapNode[];
  onSaveNode: (id: string, newTask: string) => void;
}

const milestoneIcons = [Search, Boxes, PenTool, Rocket];
const iconColors = [
  "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
  "text-blue-300 bg-blue-400/10 border-blue-400/20",
  "text-violet-300 bg-violet-400/10 border-violet-400/20",
  "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
];

export function Roadmap({ roadmap, onSaveNode }: RoadmapProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleStartEdit = (node: WorkspaceRoadmapNode) => {
    setEditingId(node.id);
    setEditValue(node.task);
  };

  const handleSave = (id: string) => {
    setEditingId(null);
    if (editValue.trim() !== "") {
      onSaveNode(id, editValue);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="size-5 text-cyan-300" />
          Interactive Visual Roadmap
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          The 4-week pre-launch sequence. Click any description to edit milestones.
        </p>
      </div>

      <div className="relative pl-6 mt-8">
        {/* Connecting Vertical Line */}
        <div className="absolute left-[34px] top-6 bottom-6 w-px bg-white/[0.08]" />

        <div className="space-y-10">
          {roadmap.map((node, index) => {
            const IconComponent = milestoneIcons[index % milestoneIcons.length];
            const colorClass = iconColors[index % iconColors.length];
            const isEditing = editingId === node.id;

            return (
              <div key={node.id} className="relative flex gap-6 z-10 items-start group">
                {/* Timeline node icon bubble */}
                <div
                  className={`grid size-10 place-items-center rounded-xl border shrink-0 transition-transform group-hover:scale-105 ${colorClass}`}
                >
                  <IconComponent className="size-4.5" />
                </div>

                {/* Milestone details card */}
                <div className="flex-1 rounded-2xl border border-white/5 bg-[#080d20]/40 p-5 transition hover:border-white/10 hover:bg-[#0b122e]/60">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {node.week}
                    </span>
                    {isEditing ? (
                      <button
                        onClick={() => handleSave(node.id)}
                        className="text-[9px] font-bold text-emerald-400 hover:text-white transition"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStartEdit(node)}
                        className="opacity-0 group-hover:opacity-100 text-[9px] font-bold text-cyan-400 hover:text-white transition"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  <div className="mt-2.5">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() => handleSave(node.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSave(node.id);
                          if (e.key === "Escape") setEditingId(null);
                        }}
                        className="w-full rounded-lg border border-white/15 bg-[#050712] px-3 py-1.5 text-xs text-slate-100 focus:border-violet-500 focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <p
                        onClick={() => handleStartEdit(node)}
                        className="text-xs text-slate-300 leading-6 cursor-text"
                      >
                        {node.task}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
