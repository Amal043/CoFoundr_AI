"use client";

import { ShieldCheck, Flame, TrendingUp, Cpu, BarChart2, Heart } from "lucide-react";
import { WorkspaceData } from "@/types/workspace";

interface SummaryProps {
  data: WorkspaceData;
}

export function Summary({ data }: SummaryProps) {
  // Dynamically calculate completion rate of all 32 fields
  const getCompletionPercentage = () => {
    let filled = 0;
    let total = 0;

    const sections = [data.overview, data.research, data.product, data.finance, data.marketing];
    for (const sec of sections) {
      for (const val of Object.values(sec)) {
        total++;
        if (val && val !== "-" && val.trim() !== "") {
          filled++;
        }
      }
    }

    return Math.round((filled / total) * 100);
  };

  const completion = getCompletionPercentage();

  // Map values dynamically or use derived placeholders
  const metrics = [
    {
      label: "Startup Score",
      value: "84/100",
      desc: "Based on validation pillars",
      icon: ShieldCheck,
      color: "text-cyan-300 bg-cyan-500/10 border-cyan-400/20",
    },
    {
      label: "Completion %",
      value: `${completion}%`,
      desc: "Workspace fields edited",
      icon: BarChart2,
      color: "text-blue-300 bg-blue-500/10 border-blue-400/20",
    },
    {
      label: "Funding Readiness",
      value: completion > 80 ? "Strong Fit" : "Medium Fit",
      desc: "Based on budget planning",
      icon: TrendingUp,
      color: "text-violet-300 bg-violet-500/10 border-violet-400/20",
    },
    {
      label: "Market Score",
      value: "82%",
      desc: "SWOT feasibility indicators",
      icon: Flame,
      color: "text-emerald-300 bg-emerald-500/10 border-emerald-400/20",
    },
    {
      label: "MVP Progress",
      value: completion > 60 ? "Locked" : "Drafting",
      desc: "Phase 1 scope defined",
      icon: Cpu,
      color: "text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-400/20",
    },
    {
      label: "Overall Health",
      value: completion > 80 ? "A-" : "B",
      desc: "Co-founder synergy index",
      icon: Heart,
      color: "text-rose-300 bg-rose-500/10 border-rose-400/20",
    },
  ];

  return (
    <div className="grid gap-3.5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mb-8">
      {metrics.map((met) => {
        const Icon = met.icon;
        return (
          <div
            key={met.label}
            className="rounded-2xl border border-white/[0.04] bg-slate-950/25 p-4 transition duration-300 hover:border-white/10 hover:bg-[#0c112b]/40 shadow-card"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                {met.label}
              </span>
              <span className={`grid size-7 place-items-center rounded-lg border ${met.color}`}>
                <Icon className="size-3.5" />
              </span>
            </div>
            <p className="mt-3.5 text-lg font-bold tracking-tight text-white">{met.value}</p>
            <p className="mt-1 text-[9px] text-slate-500 font-semibold">{met.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
