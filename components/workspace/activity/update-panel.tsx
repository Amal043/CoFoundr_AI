"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, Brain } from "lucide-react";
import { EngineStatus } from "@/types/decision-engine";

interface UpdatePanelProps {
  status: EngineStatus;
}

export function UpdatePanel({ status }: UpdatePanelProps) {
  if (status.state === "idle" || status.state === "completed") return null;

  const agentLabels: Record<string, string> = {
    research: "Research Agent",
    product: "Product Agent",
    finance: "Finance Agent",
    marketing: "Marketing Agent",
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-md px-5">
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0a0e22]/90 p-8 shadow-glow backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/25">
              <Brain className="size-5 animate-pulse" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">AI Decision Engine Active</h3>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                Analyzing Workspace Diffs
              </p>
            </div>
          </div>

          {/* Subheading / Logs */}
          <div className="mt-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] p-4.5">
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              {status.state === "diffing" && "Analyzing changes in startup variables..."}
              {status.state === "running_agents" && `Updating dependent plan: running ${agentLabels[status.currentAgent || ""] || "agent"}...`}
              {status.state === "synthesis" && "Finalizing review: AI CEO resolving business strategy conflicts..."}
              {status.state === "failed" && "Update compilation interrupted. Connection lost."}
            </p>
          </div>

          {/* Execution Checklist */}
          <div className="mt-6 space-y-4">
            {status.affectedAgents.map((agent) => {
              const isCompleted = status.completedAgents.includes(agent);
              const isRunning = status.currentAgent === agent && status.state === "running_agents";
              const label = agentLabels[agent] || agent;
              const agentTasks: Record<string, string> = {
                research: "Finding competitors...",
                product: "Scoping MVP features...",
                finance: "Forecasting revenue model...",
                marketing: "Creating GTM channels...",
              };

              return (
                <div key={agent} className="border-b border-white/[0.02] pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${isRunning ? "text-violet-400 font-bold" : isCompleted ? "text-slate-400" : "text-slate-600"}`}>
                      {label}
                    </span>
                    <div>
                      {isCompleted ? (
                        <span className="grid size-5 place-items-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <Check className="size-3" />
                        </span>
                      ) : isRunning ? (
                        <Loader2 className="size-4 text-violet-400 animate-spin" />
                      ) : (
                        <span className="size-2 rounded-full bg-slate-800" />
                      )}
                    </div>
                  </div>

                  {isRunning && (
                    <div className="w-full mt-2.5 space-y-1 bg-slate-950/40 p-2.5 rounded-xl border border-white/5">
                      <div className="flex items-center justify-between text-[9px] font-bold text-violet-400">
                        <span>{agentTasks[agent] || "Compiling report..."}</span>
                        <span className="animate-pulse font-mono">Running</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* CEO Review Step */}
            {status.affectedAgents.length > 0 && (
              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2">
                <span className={`text-xs font-semibold ${status.state === "synthesis" ? "text-cyan-400" : "text-slate-600"}`}>
                  AI CEO Cohesion Review
                </span>
                <div>
                  {status.state === "synthesis" ? (
                    <Loader2 className="size-4 text-cyan-400 animate-spin" />
                  ) : (
                    <span className="size-2 rounded-full bg-slate-800" />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* CEO Logs Summary */}
          {status.ceoMessage && (
            <div className="mt-6 rounded-2xl bg-cyan-950/10 border border-cyan-500/15 p-4.5">
              <p className="text-[10px] uppercase font-bold text-cyan-300 tracking-wider">CEO Verdict</p>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed font-medium italic">
                &ldquo;{status.ceoMessage}&rdquo;
              </p>
            </div>
          )}
        </motion.section>
      </div>
    </AnimatePresence>
  );
}
