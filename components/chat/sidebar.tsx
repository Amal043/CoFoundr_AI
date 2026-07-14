"use client";

import { motion } from "framer-motion";
import { Briefcase, Building2, Globe, Users2, Calendar, DollarSign, Target } from "lucide-react";

export interface StartupProfile {
  name: string;
  audience: string;
  pricing: string;
  country: string;
  businessType: string;
  timeline: string;
  teamSize: string;
}

interface SidebarProps {
  profile: StartupProfile;
  className?: string;
}

export function Sidebar({ profile, className = "" }: SidebarProps) {
  const fields = [
    { label: "Startup Name", value: profile.name, icon: Building2, color: "text-cyan-300" },
    { label: "Audience", value: profile.audience, icon: Target, color: "text-blue-300" },
    { label: "Pricing / Revenue", value: profile.pricing, icon: DollarSign, color: "text-violet-300" },
    { label: "Country / Market", value: profile.country, icon: Globe, color: "text-emerald-300" },
    { label: "Business Type", value: profile.businessType, icon: Briefcase, color: "text-fuchsia-300" },
    { label: "Timeline", value: profile.timeline, icon: Calendar, color: "text-amber-300" },
    { label: "Team Size", value: profile.teamSize, icon: Users2, color: "text-rose-300" },
  ];

  return (
    <div className={`flex flex-col h-full rounded-3xl border border-white/10 bg-[#070b19]/80 p-5 shadow-2xl backdrop-blur-xl ${className}`}>
      <div>
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <span className="size-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
          Startup Blueprint
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          CEO-compiled profile data, extracted in real time.
        </p>
      </div>

      <div className="mt-6 flex-1 space-y-3.5 overflow-y-auto pr-1">
        {fields.map((field) => {
          const Icon = field.icon;
          const hasValue = field.value && field.value !== "-";

          return (
            <div
              key={field.label}
              className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-3.5 transition duration-300 hover:border-white/10 hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                <Icon className={`size-3.5 ${field.color}`} />
                <span>{field.label}</span>
              </div>
              <motion.div
                key={field.value} // Triggers animation on value change
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-1.5"
              >
                <span
                  className={`text-sm font-semibold tracking-tight ${
                    hasValue ? "text-slate-100" : "text-slate-600 italic"
                  }`}
                >
                  {hasValue ? field.value : "Waiting for info..."}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
