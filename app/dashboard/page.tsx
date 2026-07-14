"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Search,
  Settings,
  Sparkles,
  ArrowRight,
  Clock3,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/shared/brand-mark";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [startupName, setStartupName] = useState("-");
  const [completedCount, setCompletedCount] = useState(0);
  const [percentage, setPercentage] = useState(0);

  // Load progress from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("cofoundr_chat_profile");
    const savedProgress = localStorage.getItem("cofoundr_chat_progress");

    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      if (parsed.name && parsed.name !== "-") {
        setStartupName(parsed.name);
      }
    }

    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      const count = Object.values(parsed).filter((status) => status === "completed").length;
      setCompletedCount(count);
      setPercentage(Math.round((count / 6) * 100));
    }
  }, []);

  const agents = [
    {
      name: "Research Agent",
      desc: "Analyze market indicators, customer friction points, and competitive intelligence.",
      icon: Search,
      badgeColor: "text-cyan-300 bg-cyan-500/10 border-cyan-400/20",
    },
    {
      name: "Finance Agent",
      desc: "Structure pricing formulas, calculate revenue goals, and build an investor pitch narrative.",
      icon: BarChart3,
      badgeColor: "text-blue-300 bg-blue-500/10 border-blue-400/20",
    },
    {
      name: "Product Agent",
      desc: "Scope feature backlogs, design MVP user journeys, and sequence product roadmap milestones.",
      icon: Boxes,
      badgeColor: "text-violet-300 bg-violet-500/10 border-violet-400/20",
    },
    {
      name: "Marketing Agent",
      desc: "Construct marketing strategies, GTM distribution, and brand engagement parameters.",
      icon: Megaphone,
      badgeColor: "text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-400/20",
    },
  ];

  return (
    <div className="flex min-h-screen bg-ink">
      {/* Navigation Sidebar (Desktop) */}
      <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#070a19]/90 p-5 lg:flex lg:flex-col">
        <Link href="/">
          <BrandMark />
        </Link>

        <nav className="mt-8 flex-1 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition"
          >
            <LayoutDashboard className="size-4.5 text-cyan-300" />
            <span>Overview</span>
          </Link>
          <Link
            href="/chat"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 hover:bg-white/[0.02] hover:text-white transition"
          >
            <MessageSquare className="size-4.5" />
            <span>AI CEO Chat</span>
            {percentage > 0 && percentage < 100 && (
              <span className="ml-auto size-2 rounded-full bg-cyan-300" />
            )}
          </Link>

          <div className="pt-4 pb-2">
            <span className="px-4 text-[10px] font-bold uppercase tracking-wider text-slate-600">
              Future Modules
            </span>
          </div>

          {agents.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.name}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 cursor-not-allowed"
              >
                <Icon className="size-4.5 opacity-40" />
                <span>{agent.name.split(" ")[0]} Module</span>
              </div>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 pt-4">
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 hover:bg-white/[0.02] hover:text-white transition"
          >
            <Settings className="size-4.5" />
            <span>Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-white/[0.06] pb-5">
            <div>
              <p className="text-xs font-semibold text-slate-500">CoFoundr Workspace</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-white">
                {startupName !== "-" ? `${startupName} Overview` : "Welcome back"}
              </h1>
            </div>
            <div className="flex items-center gap-2.5">
              <Link href="/chat">
                <Button size="sm" variant="outline">
                  CEO Chatroom
                </Button>
              </Link>
            </div>
          </header>

          {/* AI CEO Discovery Card */}
          <section className="mt-8">
            <div className="relative overflow-hidden rounded-3xl border border-violet-500/25 bg-gradient-to-br from-[#12163b] via-[#0c0e25] to-[#070b1a] p-6 shadow-2xl sm:p-8">
              <div className="absolute -right-8 -top-8 size-48 rounded-full bg-violet-600/10 blur-3xl" />
              <div className="absolute -left-8 -bottom-8 size-48 rounded-full bg-cyan-600/5 blur-3xl" />

              <div className="relative grid gap-6 md:grid-cols-[1.3fr_0.7fr] md:gap-12">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-400/5 px-3 py-1 text-xs font-medium text-violet-300">
                    <Sparkles className="size-3.5 text-cyan-300 animate-pulse" /> Core Discovery
                  </div>
                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {percentage === 100
                      ? "Interview Completed"
                      : percentage > 0
                      ? "Discovery in Progress"
                      : "Build your founding blueprint"}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {percentage === 100
                      ? "Your strategic foundation is compiled! Review your profile or update assumptions at any time in the CEO Chatroom."
                      : "Engage with your AI CEO in an interactive discovery interview. We will clarify your value proposition, revenue mechanics, target customers, and launch roadmap."}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link href="/chat">
                      <Button className="group">
                        {percentage === 100 ? "Review Profile" : percentage > 0 ? "Resume Interview" : "Start Interview"}{" "}
                        <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Progress Circle or Meter */}
                <div className="flex flex-col justify-center rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    <span>CEO Progress</span>
                    <span className="text-cyan-300 font-mono">{percentage}%</span>
                  </div>
                  <div className="mt-3.5 h-2 w-full rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="mt-3.5 text-[11px] leading-4 text-slate-500 flex items-center gap-1.5">
                    {percentage === 100 ? (
                      <>
                        <CheckCircle2 className="size-3.5 text-emerald-400" />
                        Complete startup blueprint generated.
                      </>
                    ) : (
                      <>
                        <Clock3 className="size-3.5 text-cyan-300" />
                        {completedCount} of 6 onboarding milestones answered.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Future Modules Section */}
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Future Agency Modules</h3>
              <span className="text-xs text-slate-500">Unlocks after CEO alignment</span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {agents.map((agent) => {
                const Icon = agent.icon;
                return (
                  <div
                    key={agent.name}
                    className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#080d20]/40 p-5 shadow-card"
                  >
                    <div className="flex items-start justify-between">
                      <div className="grid size-10 place-items-center rounded-xl bg-white/[0.02] text-slate-400">
                        <Icon className="size-4.5" />
                      </div>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${agent.badgeColor}`}
                      >
                        Available in Phase 3
                      </span>
                    </div>
                    <h4 className="mt-5 text-sm font-bold text-slate-200">{agent.name}</h4>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{agent.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
