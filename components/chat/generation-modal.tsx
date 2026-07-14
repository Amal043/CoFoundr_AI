"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Check, Loader2 } from "lucide-react";
import { WorkflowOrchestrator, WorkflowLog } from "@/lib/agents/orchestrator";
import { StartupProfile } from "@/lib/ai/services/orchestrator";
import { AgentLifecycleStatus } from "@/lib/agents/types";
import { migrateOutputsToWorkspace } from "@/lib/workspace/storage/store";
import { WorkspaceData } from "@/types/workspace";

interface GenerationModalProps {
  profile: StartupProfile;
  onComplete: (outputs: Record<string, string>, workspace: WorkspaceData) => void;
}

export function GenerationModal({ profile, onComplete }: GenerationModalProps) {
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [completedAgents, setCompletedAgents] = useState<string[]>([]);
  const [logs, setLogs] = useState<WorkflowLog[]>([]);
  const [state, setState] = useState<AgentLifecycleStatus>("waiting");

  const agentLabels: Record<string, string> = {
    research: "Research Agent",
    finance: "Finance Agent",
    marketing: "Marketing Agent",
    product: "Product Agent",
    ceo: "AI CEO Review",
  };

  useEffect(() => {
    const orchestrator = new WorkflowOrchestrator();

    const startGeneration = async () => {
      try {
        const outputs = await orchestrator.runOrchestrator(
          profile,
          ["research", "finance", "marketing", "product"],
          (agentId, status, updatedLogs) => {
            setCurrentAgent(agentId);
            setState(status);
            setLogs([...updatedLogs]);
            
            // Track completed agents
            const completed = orchestrator.getAgents()
              .filter((a) => a.status === "completed")
              .map((a) => a.id);
            setCompletedAgents(completed);
          }
        );

        // Compile finalized workspace from outputs
        const synthesizedWorkspace = migrateOutputsToWorkspace(
          profile.name,
          profile.audience,
          outputs
        );

        // Success wait for transition
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onComplete(outputs, synthesizedWorkspace);
      } catch (err) {
        console.error("Strategy generation failed:", err);
      }
    };

    startGeneration();
  }, [profile, onComplete]);

  const activeLogMessage = logs.length > 0 ? logs[logs.length - 1].message : "Orchestrating agents...";

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 backdrop-blur-xl px-5">
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg rounded-3xl border border-cyan-500/20 bg-[#070b19]/90 p-8 shadow-glow backdrop-blur-2xl text-left"
      >
        {/* Header */}
        <div className="flex items-center gap-3.5 border-b border-white/[0.04] pb-4 mb-6">
          <span className="grid size-11 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
            <Brain className="size-5.5 animate-pulse" />
          </span>
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Orchestrating AI Founding Team
            </h3>
            <p className="text-[9px] text-slate-500 font-semibold uppercase mt-0.5 tracking-widest">
              Compiling market blueprint variables
            </p>
          </div>
        </div>

        {/* Live Logs Subheading */}
        <div className="rounded-2xl border border-white/[0.03] bg-slate-950/40 p-4.5 mb-6">
          <p className="text-xs text-cyan-300 font-semibold tracking-wide animate-pulse">
            {activeLogMessage}
          </p>
        </div>

        {/* Agent Grid checklist */}
        <div className="space-y-4 mb-2">
          {["research", "finance", "marketing", "product", "ceo"].map((agentId) => {
            const isCompleted = completedAgents.includes(agentId);
            const isRunning = currentAgent === agentId && state !== "completed";
            const label = agentLabels[agentId];
            
            const agentTasks: Record<string, string> = {
              research: "SWOT analysis & competitor indices...",
              finance: "MRR modeling & cash projections...",
              marketing: "GTM acquisition loops...",
              product: "MVP backlog & roadmap sequencing...",
              ceo: "Cohesion review & strategy audit...",
            };

            return (
              <div key={agentId} className="border-b border-white/[0.02] pb-3 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold ${
                      isRunning
                        ? "text-cyan-300 font-bold"
                        : isCompleted
                        ? "text-slate-500 line-through"
                        : "text-slate-600"
                    }`}
                  >
                    {label}
                  </span>
                  <div>
                    {isCompleted ? (
                      <span className="grid size-5 place-items-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Check className="size-3" />
                      </span>
                    ) : isRunning ? (
                      <Loader2 className="size-4 text-cyan-300 animate-spin" />
                    ) : (
                      <span className="size-2 rounded-full bg-slate-800 shrink-0 mr-1.5" />
                    )}
                  </div>
                </div>

                {isRunning && (
                  <div className="w-full mt-2.5 space-y-1 bg-slate-950/40 p-2.5 rounded-xl border border-cyan-500/10">
                    <div className="flex items-center justify-between text-[9px] font-bold text-cyan-300">
                      <span>{agentTasks[agentId]}</span>
                      <span className="animate-pulse font-mono">Running</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}
