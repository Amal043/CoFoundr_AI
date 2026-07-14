"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Award,
  Clock,
  Compass,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

interface AnalyticsProps {
  workspaceComplete: boolean;
}

export function AnalyticsCockpit({ workspaceComplete }: AnalyticsProps) {
  // Statistics items
  const stats = [
    {
      title: "Startup Health",
      value: workspaceComplete ? "88" : "--",
      unit: "/100",
      change: "+12% this week",
      icon: Activity,
      color: "from-emerald-500 to-teal-500",
      sparkline: [20, 35, 30, 45, 60, 55, 75, 70, 88],
    },
    {
      title: "Funding Readiness",
      value: workspaceComplete ? "74" : "--",
      unit: "%",
      change: "Ready for Pitching",
      icon: Award,
      color: "from-cyan-500 to-blue-500",
      sparkline: [10, 20, 25, 40, 50, 48, 65, 70, 74],
    },
    {
      title: "Market Opportunity",
      value: workspaceComplete ? "92" : "--",
      unit: "/100",
      change: "Strong Demand Score",
      icon: Compass,
      color: "from-indigo-500 to-violet-500",
      sparkline: [30, 40, 55, 60, 68, 75, 82, 88, 92],
    },
    {
      title: "Revenue Projection",
      value: workspaceComplete ? "$58k" : "--",
      unit: "MRR",
      change: "Month 12 Target",
      icon: TrendingUp,
      color: "from-fuchsia-500 to-pink-500",
      sparkline: [5, 10, 15, 22, 29, 36, 42, 50, 58],
    },
  ];

  // Detailed Health Scores
  const healthScores = [
    { label: "Market Fit", score: 92, max: 100, color: "bg-emerald-500" },
    { label: "Financial Sustainability", score: 81, max: 100, color: "bg-cyan-500" },
    { label: "Execution Speed", score: 87, max: 100, color: "bg-indigo-500" },
    { label: "Competitor Resilience", score: 74, max: 100, color: "bg-violet-500" },
    { label: "Funding Attractiveness", score: 85, max: 100, color: "bg-fuchsia-500" },
  ];

  // Timeline checkpoints
  const timelineSteps = [
    { label: "Startup Blueprint Initiated", desc: "Foundry profile initialized", done: true },
    { label: "AI CEO Interview Completed", desc: "Boardroom alignment set", done: true },
    { label: "Market Research Orchestrated", desc: "SWOT matrices compiled", done: workspaceComplete },
    { label: "Financial Modeling Projected", desc: "Runways and MRR finalized", done: workspaceComplete },
    { label: "Workspace Blueprint Updated", desc: "Notion-cards autosaved", done: workspaceComplete },
    { label: "Investor Deck Active", desc: "Presentation slides compiled", done: workspaceComplete },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Statistics Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-950/20 p-4.5 backdrop-blur-md shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {stat.title}
                </span>
                <span className={`grid size-7 place-items-center rounded-lg bg-gradient-to-br ${stat.color} text-white shadow-sm`}>
                  <Icon className="size-3.5" />
                </span>
              </div>

              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs font-bold text-slate-500">{stat.unit}</span>
              </div>

              {/* Sparkline chart */}
              <div className="mt-3.5 h-7 w-full">
                <svg className="h-full w-full overflow-visible" viewBox="0 0 100 30">
                  <defs>
                    <linearGradient id={`grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {workspaceComplete ? (
                    <>
                      <path
                        d={`M ${stat.sparkline
                          .map((val, i) => `${(i / (stat.sparkline.length - 1)) * 100} ${30 - (val / 95) * 25}`)
                          .join(" L ")}`}
                        fill="none"
                        stroke={idx % 2 === 0 ? "#67e8f9" : "#6366f1"}
                        strokeWidth="1.5"
                      />
                      <path
                        d={`M 0 30 L ${stat.sparkline
                          .map((val, i) => `${(i / (stat.sparkline.length - 1)) * 100} ${30 - (val / 95) * 25}`)
                          .join(" L ")} L 100 30 Z`}
                        fill={`url(#grad-${idx})`}
                      />
                    </>
                  ) : (
                    <line x1="0" y1="15" x2="100" y2="15" stroke="rgba(255,255,255,0.05)" strokeDasharray="3, 3" />
                  )}
                </svg>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[9px] font-bold">
                <span className="text-slate-500">{stat.change}</span>
                {workspaceComplete && <span className="text-emerald-400">Stable ✓</span>}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 2. Middle Row: Health Score & Activity Timeline */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Startup Health Score */}
        <section className="rounded-3xl border border-white/5 bg-slate-950/20 p-6 backdrop-blur-xl flex flex-col justify-between shadow-glow">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-3 mb-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-emerald-300" />
              Startup Health Analysis
            </h3>
            <span className="text-[10px] font-bold text-slate-500">Workspace Audit</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
            {/* Round radial score */}
            <div className="relative size-24 shrink-0 flex items-center justify-center">
              <svg className="absolute inset-0 size-full -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.03)" strokeWidth="6.5" fill="none" />
                {workspaceComplete && (
                  <motion.circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#10b981"
                    strokeWidth="6.5"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (88 / 100) * 251.2 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    fill="none"
                  />
                )}
              </svg>
              <div className="text-center">
                <span className="text-2xl font-extrabold text-white tracking-tight">
                  {workspaceComplete ? "88" : "--"}
                </span>
                <p className="text-[9px] font-bold text-slate-500 uppercase">Health</p>
              </div>
            </div>

            {/* List of metrics with animated progress bars */}
            <div className="flex-1 w-full space-y-2.5">
              {healthScores.map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-slate-200">
                      {workspaceComplete ? `${item.score}/${item.max}` : "--"}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-950 overflow-hidden border border-white/[0.02]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: workspaceComplete ? `${(item.score / item.max) * 100}%` : "0%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activity Timeline */}
        <section className="rounded-3xl border border-white/5 bg-slate-950/20 p-6 backdrop-blur-xl shadow-glow">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-3 mb-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="size-4 text-cyan-300" />
              Startup Milestones Timeline
            </h3>
            <span className="text-[10px] font-bold text-slate-500">Onboarding Route</span>
          </div>

          <div className="relative pl-5.5 space-y-3.5 mt-2 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-white/[0.04]">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-3 text-left">
                {/* Node Dot */}
                <span
                  className={`absolute -left-[27px] top-1 grid size-4 place-items-center rounded-full border text-[8px] font-bold ${
                    step.done
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-slate-950 border-white/10 text-slate-600"
                  }`}
                >
                  {step.done ? "✓" : idx + 1}
                </span>

                <div>
                  <h4 className={`text-xs font-bold ${step.done ? "text-slate-200" : "text-slate-600"}`}>
                    {step.label}
                  </h4>
                  <p className="text-[9px] text-slate-500 font-medium mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 3. Floating AI CEO Insights Recommendation Card */}
      {workspaceComplete && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-cyan-500/15 bg-gradient-to-br from-[#0c1328]/60 via-[#070b19]/60 to-[#070b1a] p-5 shadow-lg backdrop-blur-md flex items-start gap-4"
        >
          {/* Decorative glowing gradient behind card */}
          <div className="absolute -left-12 -top-12 size-36 rounded-full bg-cyan-600/5 blur-2xl" />

          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 mt-0.5">
            <Lightbulb className="size-4.5 animate-pulse" />
          </span>

          <div className="text-left">
            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-widest">
              💡 AI CEO Strategic Recommendation
            </h4>
            <p className="mt-2 text-xs text-slate-300 leading-6 font-semibold">
              Your developers and accelerators customer segmentation shows high immediate conversion probability. 
              <span className="text-cyan-300 font-bold ml-1">
                Consider launching a community waitlist program early (e.g. Week 1) with an annual subscription pre-sale option
              </span>
              . This will lock in pre-launch MRR validation loops and double your operational cash runway before pitch targeting!
            </p>
          </div>
        </motion.section>
      )}
    </div>
  );
}
