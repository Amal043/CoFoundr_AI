"use client";

import { motion } from "framer-motion";
import { Search, Megaphone, DollarSign, Boxes, Brain, ShieldCheck } from "lucide-react";

interface WarRoomProps {
  workspaceComplete: boolean;
  onSelectAgent?: (id: string) => void;
}

export function WarRoom({ workspaceComplete, onSelectAgent }: WarRoomProps) {
  const agents = [
    {
      id: "research",
      name: "Research Agent",
      role: "Market & SWOT Analysis",
      icon: Search,
      time: "1.2s",
      color: "from-blue-500 to-indigo-500",
      glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
      borderColor: "hover:border-blue-500/40",
    },
    {
      id: "finance",
      name: "Finance Agent",
      role: "Pricing & MRR Forecast",
      icon: DollarSign,
      time: "1.5s",
      color: "from-indigo-500 to-violet-500",
      glow: "hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]",
      borderColor: "hover:border-indigo-500/40",
    },
    {
      id: "marketing",
      name: "Marketing Agent",
      role: "GTM Channels & Funnel",
      icon: Megaphone,
      time: "0.9s",
      color: "from-violet-500 to-fuchsia-500",
      glow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]",
      borderColor: "hover:border-violet-500/40",
    },
  ];

  return (
    <section className="rounded-3xl border border-white/5 bg-slate-950/20 p-6 md:p-8 backdrop-blur-xl shadow-glow overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-white/[0.04] pb-4 mb-6">
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Brain className="size-4 text-cyan-300 animate-pulse" />
            AI Founding Boardroom
          </h3>
          <p className="text-[9px] text-slate-500 font-semibold mt-1">
            Real-time coordinates flow of specialized agent nodes
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider border ${
            workspaceComplete
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-amber-500/10 border-amber-500/20 text-amber-300 animate-pulse"
          }`}
        >
          {workspaceComplete ? "Orchestration Synced" : "Onboarding Interview"}
        </span>
      </div>

      {/* COMMAND GRAPH AREA */}
      {/* 1. Desktop & Laptop Layout (Horizontal / Symmetrical View) */}
      <div className="hidden md:block relative w-full h-[470px] select-none">
        
        {/* SVG Connectors Canvas */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 470" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cyanPulse" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="indigoPulse" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* BACKGROUND GUIDES (Subtle grey lines) */}
          {/* CEO -> Agents */}
          <line x1="500" y1="50" x2="180" y2="200" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
          <line x1="500" y1="50" x2="500" y2="200" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
          <line x1="500" y1="50" x2="820" y2="200" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
          {/* Agents -> Product */}
          <line x1="180" y1="200" x2="500" y2="350" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
          <line x1="500" y1="200" x2="500" y2="350" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
          <line x1="820" y1="200" x2="500" y2="350" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
          {/* Product -> Ready */}
          <line x1="500" y1="350" x2="500" y2="440" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />

          {/* ACTIVE GLOW PARTICLES (Only if workspace is complete) */}
          {workspaceComplete && (
            <>
              {/* CEO -> Agents */}
              <path d="M 500 50 L 180 200" fill="none" stroke="url(#cyanPulse)" strokeWidth="2" strokeDasharray="8 80">
                <animate attributeName="stroke-dashoffset" values="88;0" dur="2.2s" repeatCount="indefinite" />
              </path>
              <path d="M 500 50 L 500 200" fill="none" stroke="url(#cyanPulse)" strokeWidth="2" strokeDasharray="8 80">
                <animate attributeName="stroke-dashoffset" values="88;0" dur="1.8s" repeatCount="indefinite" />
              </path>
              <path d="M 500 50 L 820 200" fill="none" stroke="url(#cyanPulse)" strokeWidth="2" strokeDasharray="8 80">
                <animate attributeName="stroke-dashoffset" values="88;0" dur="2.2s" repeatCount="indefinite" />
              </path>

              {/* Agents -> Product */}
              <path d="M 180 200 L 500 350" fill="none" stroke="url(#indigoPulse)" strokeWidth="2" strokeDasharray="8 80">
                <animate attributeName="stroke-dashoffset" values="88;0" dur="2s" repeatCount="indefinite" />
              </path>
              <path d="M 500 200 L 500 350" fill="none" stroke="url(#indigoPulse)" strokeWidth="2" strokeDasharray="8 80">
                <animate attributeName="stroke-dashoffset" values="88;0" dur="1.6s" repeatCount="indefinite" />
              </path>
              <path d="M 820 200 L 500 350" fill="none" stroke="url(#indigoPulse)" strokeWidth="2" strokeDasharray="8 80">
                <animate attributeName="stroke-dashoffset" values="88;0" dur="2s" repeatCount="indefinite" />
              </path>

              {/* Product -> Ready */}
              <path d="M 500 350 L 500 440" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="8 60">
                <animate attributeName="stroke-dashoffset" values="68;0" dur="1.2s" repeatCount="indefinite" />
              </path>
            </>
          )}
        </svg>

        {/* NODES HTML LAYOUT (Absolute Positioning matching SVG centers) */}
        
        {/* Node 1: AI CEO */}
        <div className="absolute top-[50px] left-[50%] -translate-x-[50%] -translate-y-[50%] z-10">
          <motion.div
            whileHover={{ scale: 1.04 }}
            onClick={() => onSelectAgent?.("ceo")}
            className={`rounded-2xl border border-cyan-500/35 bg-[#070b1a]/95 px-6 py-3 flex items-center gap-3.5 shadow-lg select-none cursor-pointer hover:border-cyan-400 transition-all duration-300 ${
              workspaceComplete
                ? "shadow-[0_0_25px_rgba(103,232,249,0.3)] border-cyan-400"
                : "border-cyan-500/20"
            }`}
          >
            {/* Pulsing Status Dot */}
            <span className="relative flex size-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-300"></span>
            </span>
            <div className="text-left">
              <h4 className="text-xs font-extrabold text-white tracking-wider uppercase flex items-center gap-1.5">
                <Brain className="size-4 text-cyan-300" />
                AI CEO
              </h4>
              <p className="text-[9px] font-bold text-cyan-300/80 mt-0.5">Coordinating Founding Team</p>
            </div>
          </motion.div>
        </div>

        {/* Row 2: 3 parallel foundation nodes */}
        {agents.map((agent, i) => {
          const Icon = agent.icon;
          const leftOffsets = ["left-[18%]", "left-[50%]", "left-[82%]"];
          return (
            <div
              key={agent.id}
              className={`absolute top-[200px] ${leftOffsets[i]} -translate-x-[50%] -translate-y-[50%] z-10 w-[210px]`}
            >
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => onSelectAgent?.(agent.id)}
                className={`rounded-2xl border bg-[#060815]/90 p-4 text-left transition-all duration-300 flex flex-col gap-3 shadow-sm cursor-pointer ${
                  workspaceComplete
                    ? `border-white/10 ${agent.glow} ${agent.borderColor}`
                    : "border-white/5 opacity-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`grid size-8.5 place-items-center rounded-xl bg-gradient-to-br ${agent.color} text-white`}>
                    <Icon className="size-4" />
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
                      workspaceComplete
                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                        : "bg-slate-800 border border-white/5 text-slate-500"
                    }`}
                  >
                    {workspaceComplete ? "Active" : "Locked"}
                  </span>
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-slate-200">{agent.name}</h5>
                  <p className="text-[9px] text-slate-500 font-semibold mt-0.5 leading-relaxed truncate">
                    {agent.role}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/[0.03] pt-2.5 text-[9px] font-bold text-slate-600">
                  <span>Time: {workspaceComplete ? agent.time : "--"}</span>
                  <span className={workspaceComplete ? "text-cyan-300 animate-pulse" : "text-slate-700"}>
                    ●
                  </span>
                </div>
              </motion.div>
            </div>
          );
        })}

        {/* Row 3: Product Agent */}
        <div className="absolute top-[350px] left-[50%] -translate-x-[50%] -translate-y-[50%] z-10 w-[210px]">
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => onSelectAgent?.("product")}
            className={`rounded-2xl border bg-[#060815]/90 p-4 text-left transition-all duration-300 flex flex-col gap-3 shadow-sm cursor-pointer ${
              workspaceComplete
                ? "border-indigo-500/20 hover:border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                : "border-white/5 opacity-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="grid size-8.5 place-items-center rounded-xl bg-indigo-500/10 text-indigo-300">
                <Boxes className="size-4" />
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
                  workspaceComplete
                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                    : "bg-slate-800 border border-white/5 text-slate-500"
                }`}
              >
                {workspaceComplete ? "Active" : "Locked"}
              </span>
            </div>
            <div>
              <h5 className="text-[11px] font-bold text-slate-200">Product Agent</h5>
              <p className="text-[9px] text-slate-500 font-semibold mt-0.5 leading-relaxed truncate">
                Strategy Scoping & Roadmap
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-white/[0.03] pt-2.5 text-[9px] font-bold text-slate-600">
              <span>Time: {workspaceComplete ? "1.8s" : "--"}</span>
              <span className={workspaceComplete ? "text-indigo-400 animate-pulse" : "text-slate-700"}>
                ●
              </span>
            </div>
          </motion.div>
        </div>

        {/* Row 4: Final Success Destination */}
        <div className="absolute top-[440px] left-[50%] -translate-x-[50%] -translate-y-[50%] z-10">
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={workspaceComplete ? { scale: [1, 1.02, 1], opacity: 1 } : {}}
            transition={{ repeat: Infinity, duration: 3.5 }}
            className={`rounded-xl border px-4 py-2 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 transition duration-300 ${
              workspaceComplete
                ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                : "border-white/5 bg-slate-950/20 text-slate-600"
            }`}
          >
            <ShieldCheck className="size-3.5" />
            <span>Startup Strategy Ready</span>
          </motion.div>
        </div>
      </div>

      {/* 2. Mobile Layout (Vertical Stacked view) */}
      <div className="md:hidden relative flex flex-col items-center gap-10 py-6 select-none">
        {/* SVG connection running straight down the center */}
        <svg className="absolute inset-y-0 left-[50%] -translate-x-[50%] w-2 h-full pointer-events-none" preserveAspectRatio="none">
          <line x1="4" y1="20" x2="4" y2="600" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
          {workspaceComplete && (
            <line
              x1="4"
              y1="20"
              x2="4"
              y2="600"
              stroke="#67e8f9"
              strokeWidth="2"
              strokeDasharray="6 40"
            >
              <animate attributeName="stroke-dashoffset" values="46;0" dur="1.5s" repeatCount="indefinite" />
            </line>
          )}
        </svg>

        {/* CEO Node */}
        <div className="z-10">
          <div onClick={() => onSelectAgent?.("ceo")} className="rounded-2xl border border-cyan-500/25 bg-[#070b1a] px-5 py-2.5 flex items-center gap-2.5 shadow-md cursor-pointer hover:border-cyan-400 transition">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300"></span>
            </span>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
              <Brain className="size-3.5 text-cyan-300" /> AI CEO
            </span>
          </div>
        </div>

        {/* 3 Agents */}
        {agents.map((agent) => {
          const Icon = agent.icon;
          return (
            <div key={agent.id} className="z-10 w-full max-w-[240px]">
              <div
                onClick={() => onSelectAgent?.(agent.id)}
                className={`rounded-2xl border bg-[#060815]/95 p-4 flex items-center gap-3.5 text-left cursor-pointer hover:border-white/20 transition ${
                  workspaceComplete ? "border-white/10" : "border-white/5 opacity-55"
                }`}
              >
                <span className={`grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${agent.color} text-white`}>
                  <Icon className="size-3.5" />
                </span>
                <div>
                  <h5 className="text-[10px] font-bold text-slate-200">{agent.name}</h5>
                  <p className="text-[8px] text-slate-500 font-semibold leading-relaxed mt-0.5">{agent.role}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Product Agent */}
        <div className="z-10 w-full max-w-[240px]">
          <div
            onClick={() => onSelectAgent?.("product")}
            className={`rounded-2xl border bg-[#060815]/95 p-4 flex items-center gap-3.5 text-left cursor-pointer hover:border-white/20 transition ${
              workspaceComplete ? "border-indigo-500/20" : "border-white/5 opacity-55"
            }`}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-indigo-500/10 text-indigo-300">
              <Boxes className="size-3.5" />
            </span>
            <div>
              <h5 className="text-[10px] font-bold text-slate-200">Product Agent</h5>
              <p className="text-[8px] text-slate-500 font-semibold leading-relaxed mt-0.5">Strategy Scoping & Roadmap</p>
            </div>
          </div>
        </div>

        {/* Success Destination Node */}
        <div className="z-10">
          <div
            className={`rounded-xl border px-4 py-2 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${
              workspaceComplete
                ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
                : "border-white/5 bg-slate-950/20 text-slate-600"
            }`}
          >
            <ShieldCheck className="size-3.5" />
            <span>Startup Strategy Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
}
