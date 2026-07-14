"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  Bot,
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
  Lock,
  FileText,
  Presentation,
} from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/shared/brand-mark";
import { Button } from "@/components/ui/button";
import { preloadDemoStartup } from "@/lib/demo/preloader";
import { DashboardCharts } from "@/components/dashboard/charts";

interface ActivityItem {
  id: string;
  agent: string;
  action: string;
  time: string;
}

export default function DashboardPage() {
  const [startupName, setStartupName] = useState("-");
  const [completedCount, setCompletedCount] = useState(0); // Interview progress (0 to 6)
  const [percentage, setPercentage] = useState(0); // Interview progress percent
  const [workspaceComplete, setWorkspaceComplete] = useState(false);
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  const handleTryDemo = () => {
    preloadDemoStartup();
    window.location.reload();
  };

  // Load progress and workspace status from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("cofoundr_chat_profile");
    const savedProgress = localStorage.getItem("cofoundr_chat_progress");
    const savedOutputs = localStorage.getItem("cofoundr_workspace_outputs");

    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      if (parsed.name && parsed.name !== "-") {
        setStartupName(parsed.name);
      }
    }

    let isInterviewComplete = false;
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      const count = Object.values(parsed).filter((status) => status === "completed").length;
      setCompletedCount(count);
      setPercentage(Math.round((count / 6) * 100));
      isInterviewComplete = count === 6;
    }

    const hasOutputs = !!savedOutputs;
    setWorkspaceComplete(hasOutputs);

    // Build Activity Log dynamically based on status
    const logs: ActivityItem[] = [];
    const today = "Today";

    if (hasOutputs) {
      logs.push(
        { id: "5", agent: "AI CEO", action: "Synthesized executive strategy & combined reports", time: `${today} at 2:32 PM` },
        { id: "4", agent: "Marketing Agent", action: "Drafted go-to-market channels & acquisition plan", time: `${today} at 2:32 PM` },
        { id: "3", agent: "Finance Agent", action: "Completed pricing matrix & 12-month MRR projections", time: `${today} at 2:31 PM` },
        { id: "2", agent: "Product Agent", action: "Designed MVP feature scope & developer tech stack", time: `${today} at 2:31 PM` },
        { id: "1", agent: "Research Agent", action: "Compiled market analysis & competitor SWOT matrices", time: `${today} at 2:30 PM` }
      );
    } else if (isInterviewComplete) {
      logs.push(
        { id: "2", agent: "AI CEO", action: "Onboarding interview complete. Blueprint locked.", time: `${today} at 2:15 PM` },
        { id: "1", agent: "System", action: "Startup discovery profile initialized", time: `${today} at 2:02 PM` }
      );
    } else if (savedProgress) {
      logs.push(
        { id: "1", agent: "System", action: "Discovery interview initiated in boardroom", time: `${today} at 1:45 PM` }
      );
    } else {
      logs.push(
        { id: "0", agent: "System", action: "Workspace waiting for CEO initialization", time: `${today}` }
      );
    }
    setActivities(logs);
  }, []);

  const agents = [
    {
      name: "Research Agent",
      desc: "Analyze market indicators, customer friction points, and competitive intelligence.",
      icon: Search,
      badgeColor: workspaceComplete
        ? "text-emerald-300 bg-emerald-500/10 border-emerald-400/20"
        : "text-slate-400 bg-slate-500/10 border-slate-400/10",
      status: workspaceComplete ? "Complete" : "Orchestration Pending",
    },
    {
      name: "Product Agent",
      desc: "Scope feature backlogs, design MVP user journeys, and sequence product roadmap milestones.",
      icon: Boxes,
      badgeColor: workspaceComplete
        ? "text-emerald-300 bg-emerald-500/10 border-emerald-400/20"
        : "text-slate-400 bg-slate-500/10 border-slate-400/10",
      status: workspaceComplete ? "Complete" : "Orchestration Pending",
    },
    {
      name: "Finance Agent",
      desc: "Structure pricing formulas, calculate revenue goals, and build an investor pitch narrative.",
      icon: BarChart3,
      badgeColor: workspaceComplete
        ? "text-emerald-300 bg-emerald-500/10 border-emerald-400/20"
        : "text-slate-400 bg-slate-500/10 border-slate-400/10",
      status: workspaceComplete ? "Complete" : "Orchestration Pending",
    },
    {
      name: "Marketing Agent",
      desc: "Construct marketing strategies, GTM distribution, and brand engagement parameters.",
      icon: Megaphone,
      badgeColor: workspaceComplete
        ? "text-emerald-300 bg-emerald-500/10 border-emerald-400/20"
        : "text-slate-400 bg-slate-500/10 border-slate-400/10",
      status: workspaceComplete ? "Complete" : "Orchestration Pending",
    },
  ];

  const overallProgress = workspaceComplete ? 100 : percentage > 0 ? Math.round(percentage * 0.5) : 0;

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
          <Link
            href="/workspace"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 hover:bg-white/[0.02] hover:text-white transition"
          >
            <FileText className="size-4.5" />
            <span>Workspace</span>
            {workspaceComplete && (
              <span className="ml-auto size-2 rounded-full bg-emerald-400" />
            )}
          </Link>
          <Link
            href="/investor"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 hover:bg-white/[0.02] hover:text-white transition"
          >
            <Presentation className="size-4.5" />
            <span>Investor Package</span>
          </Link>
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
              {!workspaceComplete && (
                <Button size="sm" variant="outline" className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10" onClick={handleTryDemo}>
                  Try Demo Mode
                </Button>
              )}
              <Link href={workspaceComplete ? "/workspace" : "/chat"}>
                <Button size="sm" variant={workspaceComplete ? "default" : "outline"}>
                  {workspaceComplete ? "Enter Workspace" : "CEO Chatroom"}
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
                    {workspaceComplete
                      ? "Startup Strategy Generated"
                      : percentage === 100
                      ? "Interview Complete — Launch Team"
                      : percentage > 0
                      ? "Discovery in Progress"
                      : "Build your founding blueprint"}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {workspaceComplete
                      ? "Your AI CEO and specialized agents have compiled the full startup strategy report. You can now access detailed roadmaps, SWAT studies, pricing tiers, and acquisition plans."
                      : percentage === 100
                      ? "Your interview blueprint is locked. Proceed to the Workspace to assemble your specialized AI co-founders and orchestrate the strategy report."
                      : "Engage with your AI CEO in an interactive discovery interview. We will clarify your value proposition, revenue mechanics, target customers, and launch roadmap."}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4">
                    {workspaceComplete ? (
                      <Link href="/workspace">
                        <Button className="group">
                          View Startup Workspace{" "}
                          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    ) : percentage === 100 ? (
                      <Link href="/workspace">
                        <Button className="group">
                          Launch AI Founding Team{" "}
                          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/chat">
                        <Button className="group">
                          {percentage > 0 ? "Resume Interview" : "Start Interview"}{" "}
                          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Progress Circle or Meter */}
                <div className="flex flex-col justify-center rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    <span>Overall Project Progress</span>
                    <span className="text-cyan-300 font-mono">{overallProgress}%</span>
                  </div>
                  <div className="mt-3.5 h-2 w-full rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                  <p className="mt-3.5 text-[11px] leading-4 text-slate-500 flex items-center gap-1.5">
                    {workspaceComplete ? (
                      <>
                        <CheckCircle2 className="size-3.5 text-emerald-400" />
                        Strategy generated. Open Workspace to inspect.
                      </>
                    ) : percentage === 100 ? (
                      <>
                        <CheckCircle2 className="size-3.5 text-cyan-300 animate-pulse" />
                        CEO alignment complete. Launch agents.
                      </>
                    ) : (
                      <>
                        <Clock3 className="size-3.5 text-slate-500" />
                        {completedCount} of 6 onboarding milestones complete.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SVG Analytics Charts (Only visible if workspace is complete) */}
          {workspaceComplete && (
            <section className="mt-12">
              <DashboardCharts />
            </section>
          )}

          {/* Active Modules Section */}
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">AI Agency Modules</h3>
              <span className="text-xs text-slate-500">
                {workspaceComplete ? "All reports active" : "Unlock via Workspace orchestration"}
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {agents.map((agent) => {
                return (
                  <div
                    key={agent.name}
                    className={`relative overflow-hidden rounded-2xl border p-5 shadow-card ${
                      workspaceComplete
                        ? "border-white/10 bg-[#080d20]/50"
                        : "border-white/5 bg-[#080d20]/20 opacity-60"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`grid size-10 place-items-center rounded-xl ${
                          workspaceComplete ? "bg-emerald-500/10 text-emerald-300" : "bg-white/[0.02] text-slate-500"
                        }`}
                      >
                        {workspaceComplete ? <CheckCircle2 className="size-4.5" /> : <Lock className="size-4" />}
                      </div>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${agent.badgeColor}`}
                      >
                        {agent.status}
                      </span>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-200">{agent.name}</h4>
                      {workspaceComplete && (
                        <Link
                          href="/workspace"
                          className="text-[10px] font-bold text-cyan-300 hover:text-white transition flex items-center gap-1"
                        >
                          View Report <ArrowRight className="size-3" />
                        </Link>
                      )}
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{agent.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Recent Agent Activity Section */}
          <section className="mt-12 border-t border-white/[0.06] pt-10">
            <h3 className="text-lg font-bold text-white">Recent Agent Activity</h3>
            <div className="mt-6 space-y-4">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.01] px-4 py-3.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-lg bg-white/[0.03] text-slate-400">
                      <Bot className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">
                        <span className="text-cyan-300">{act.agent}</span> — {act.action}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono font-medium shrink-0 ml-4">
                    {act.time}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
