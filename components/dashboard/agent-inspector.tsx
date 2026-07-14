"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Clock,
  Layers,
  Database,
  Cpu,
  CheckCircle,
  FileText,
  AlertCircle,
} from "lucide-react";
import { AgentConfig } from "@/lib/agents/types";

interface AgentInspectorProps {
  agent: AgentConfig | null;
  onClose: () => void;
  workspaceComplete: boolean;
}

export function AgentInspector({ agent, onClose, workspaceComplete }: AgentInspectorProps) {
  if (!agent) return null;

  // Status visual styles
  const statusStyles: Record<string, { bg: string; text: string; border: string; glow: string }> = {
    waiting: {
      bg: "bg-slate-900/60",
      text: "text-slate-400",
      border: "border-slate-800",
      glow: "shadow-none",
    },
    preparing: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/20",
      glow: "shadow-[0_0_10px_rgba(59,130,246,0.15)]",
    },
    running: {
      bg: "bg-violet-500/10",
      text: "text-violet-400 border-violet-400/30",
      border: "border-violet-500/30 animate-pulse",
      glow: "shadow-[0_0_15px_rgba(139,92,246,0.25)]",
    },
    reviewing: {
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      border: "border-cyan-500/20",
      glow: "shadow-[0_0_10px_rgba(34,211,238,0.15)]",
    },
    completed: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/20",
      glow: "shadow-[0_0_15px_rgba(16,185,129,0.2)]",
    },
    failed: {
      bg: "bg-rose-500/10",
      text: "text-rose-400",
      border: "border-rose-500/20",
      glow: "shadow-[0_0_10px_rgba(244,63,94,0.15)]",
    },
    ready: {
      bg: "bg-emerald-500/10 border-emerald-500/20",
      text: "text-emerald-400",
      border: "border-emerald-500/20",
      glow: "shadow-none",
    },
  };

  const currentStatus = workspaceComplete ? "completed" : agent.status;
  const style = statusStyles[currentStatus] || statusStyles.ready;

  // Consumers mapping
  const consumers: Record<string, string[]> = {
    research: ["Finance Agent", "Marketing Agent", "Product Agent"],
    finance: ["Product Agent", "CEO Agent"],
    marketing: ["Product Agent", "CEO Agent"],
    product: ["CEO Agent"],
    ceo: ["Startup Workspace (Destination)"],
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
        {/* Backdrop Click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 cursor-pointer"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-lg h-full border-l border-white/10 bg-[#070a19]/95 p-6 md:p-8 backdrop-blur-xl shadow-glow overflow-y-auto flex flex-col justify-between"
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-md">
                  <Cpu className="size-5" />
                </span>
                <div className="text-left">
                  <h3 className="text-sm font-extrabold text-white tracking-wide uppercase">
                    {agent.name}
                  </h3>
                  <p className="text-[9px] text-cyan-300 font-bold uppercase tracking-wider mt-0.5">
                    {agent.role}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="grid size-8 place-items-center rounded-lg border border-white/5 bg-white/[0.02] text-slate-400 hover:text-white transition"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-400 leading-relaxed font-semibold mb-6 text-left">
              {agent.description}
            </p>

            {/* Grid Stats */}
            <div className="grid gap-3 grid-cols-2 mb-6">
              {/* Status Badge */}
              <div className="rounded-xl border border-white/[0.03] bg-white/[0.01] p-3 text-left">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block">
                  Agent Lifecycle
                </span>
                <span
                  className={`mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${style.bg} ${style.text} ${style.border} ${style.glow}`}
                >
                  <span className="size-1.5 rounded-full bg-current" />
                  {currentStatus}
                </span>
              </div>

              {/* Execution Duration */}
              <div className="rounded-xl border border-white/[0.03] bg-white/[0.01] p-3 text-left">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block">
                  Runtime Duration
                </span>
                <span className="mt-2 text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Clock className="size-3.5 text-cyan-300" />
                  {workspaceComplete ? agent.duration || "1.2s" : "--"}
                </span>
              </div>
            </div>

            {/* Execution Timeline Logs */}
            <section className="rounded-2xl border border-white/[0.04] bg-[#050815]/60 p-4 mb-6 text-left">
              <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <Layers className="size-3.5 text-violet-400" />
                Execution Timeline
              </h4>
              <div className="space-y-2 text-[10px] font-bold">
                <div className="flex justify-between text-slate-400">
                  <span>Started At:</span>
                  <span className="text-slate-200">
                    {workspaceComplete ? agent.startedAt || "02:14:02 PM" : "--"}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Completed At:</span>
                  <span className="text-slate-200">
                    {workspaceComplete ? agent.completedAt || "02:14:03 PM" : "--"}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Last Executed:</span>
                  <span className="text-cyan-300">
                    {workspaceComplete ? agent.lastUpdated || "02:14:03 PM" : "Pending"}
                  </span>
                </div>
              </div>
            </section>

            {/* Inputs Section */}
            <section className="mb-6 text-left">
              <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Database className="size-3.5 text-blue-400" />
                Orchestrator Input Feed
              </h4>
              <div className="flex flex-wrap gap-2">
                {agent.inputSchema.map((input, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg border border-white/5 bg-slate-950/60 px-2.5 py-1 text-[9px] font-bold text-slate-400 tracking-wide"
                  >
                    {input}
                  </span>
                ))}
              </div>
            </section>

            {/* Deliverables / Clickable Artifacts */}
            <section className="mb-6 text-left">
              <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <CheckCircle className="size-3.5 text-emerald-400" />
                Produced Artifacts
              </h4>
              <div className="grid gap-2">
                {agent.outputSchema.map((output, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] p-3 flex items-center justify-between text-left transition select-none cursor-default"
                  >
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                      <FileText className="size-3.5 text-slate-500" />
                      {output}
                    </span>
                    <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-400">
                      {workspaceComplete ? "Ready ✓" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Dependencies & Consumers */}
            <section className="rounded-2xl border border-white/[0.04] bg-[#050815]/60 p-4 mb-6 text-left">
              <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                Dependency Topology
              </h4>
              <div className="space-y-2 text-[10px] font-bold">
                <div className="flex items-start gap-1">
                  <span className="text-slate-500 w-24 block">Dependencies:</span>
                  <div className="flex flex-wrap gap-1">
                    {agent.dependencies.length > 0 ? (
                      agent.dependencies.map((dep) => (
                        <span key={dep} className="text-cyan-300 uppercase tracking-wide">
                          {dep}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-600 italic">None</span>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-slate-500 w-24 block">Consumers:</span>
                  <div className="flex flex-wrap gap-1">
                    {consumers[agent.id]?.map((cons) => (
                      <span key={cons} className="text-violet-400">
                        {cons}
                      </span>
                    )) || <span className="text-slate-600 italic">None</span>}
                  </div>
                </div>
              </div>
            </section>

            {/* Token Usage Placeholder */}
            <div className="text-left text-[9px] text-slate-500 font-semibold mb-6 flex items-center gap-1.5">
              <AlertCircle className="size-3.5" />
              <span>Token Usage Projection: ~1.2k Prompt Tokens | ~2.5k Completion Tokens (API ready)</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="border-t border-white/[0.05] pt-4 flex items-center gap-3">
            <button
              disabled
              className="flex-1 rounded-xl bg-white/[0.02] border border-white/5 py-3 text-xs font-bold text-slate-500 cursor-not-allowed flex items-center justify-center gap-1.5"
            >
              <Play className="size-3" />
              Run Again (API Pending)
            </button>
            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-slate-950 px-5 py-3 text-xs font-bold text-slate-300 hover:text-white transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
