"use client";

import { useEffect, useState } from "react";
import {
  Bot,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Sparkles,
  ArrowRight,
  Clock3,
  CheckCircle2,
  FileText,
  Presentation,
} from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/shared/brand-mark";
import { Button } from "@/components/ui/button";
import { preloadDemoStartup } from "@/lib/demo/preloader";
import { listStartups, switchStartup, Startup } from "@/lib/demo/startup-manager";
import { DashboardCharts } from "@/components/dashboard/charts";
import { WarRoom } from "@/components/dashboard/war-room";
import { AnalyticsCockpit } from "@/components/dashboard/analytics-cockpit";
import { AgentInspector } from "@/components/dashboard/agent-inspector";
import { ResearchAgent } from "@/lib/agents/research";
import { FinanceAgent } from "@/lib/agents/finance";
import { MarketingAgent } from "@/lib/agents/marketing";
import { ProductAgent } from "@/lib/agents/product";
import { CeoAgent } from "@/lib/agents/ceo";
import { AgentConfig } from "@/lib/agents/types";

const agentsMap: Record<string, AgentConfig> = {
  research: ResearchAgent,
  finance: FinanceAgent,
  marketing: MarketingAgent,
  product: ProductAgent,
  ceo: CeoAgent,
};

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
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [startups, setStartups] = useState<Startup[]>([]);
  const [showProjectsDropdown, setShowProjectsDropdown] = useState(false);

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

    // Load actual workflow logs if they exist
    const savedWorkflowLogs = localStorage.getItem("cofoundr_workflow_logs");
    if (savedWorkflowLogs) {
      try {
        const parsed = JSON.parse(savedWorkflowLogs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          logs.push(...parsed);
        }
      } catch (e) {
        console.error("Failed to parse workflow logs:", e);
      }
    }

    if (logs.length === 0) {
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
    }
    setActivities(logs);
    setStartups(listStartups());
  }, []);

  const overallProgress = workspaceComplete ? 100 : percentage > 0 ? Math.round(percentage * 0.5) : 0;

  return (
    <div className="flex min-h-screen bg-ink">
      {/* Navigation Sidebar (Desktop) */}
      <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#070a19]/90 p-5 lg:flex lg:flex-col">
        <Link href="/">
          <BrandMark />
        </Link>

        {/* Startup Switcher */}
        <div className="mt-6 px-1 relative">
          <label className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5 pl-1 text-left">
            Active Project
          </label>
          <div
            onClick={() => setShowProjectsDropdown(!showProjectsDropdown)}
            className="w-full rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] px-3.5 py-2.5 text-xs font-semibold text-slate-200 cursor-pointer flex items-center justify-between transition"
          >
            <span className="truncate">{startupName !== "-" ? startupName : "Select Startup"}</span>
            <span className="text-[10px] text-slate-500 font-bold ml-1.5">▼</span>
          </div>

          {showProjectsDropdown && (
            <div className="absolute left-0 right-0 mt-1 z-40 rounded-xl border border-white/10 bg-slate-950 p-2 shadow-glow max-h-48 overflow-y-auto space-y-1">
              {startups.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    switchStartup(s.id);
                    window.location.reload();
                  }}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-medium cursor-pointer transition flex items-center justify-between text-left ${
                    s.name === startupName 
                      ? "bg-violet-600/20 border border-violet-500/30 text-violet-300"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <span className="truncate">{s.name}</span>
                  {s.workspaceData && <span className="text-[8px] font-bold text-emerald-400 uppercase">Strategy Ready</span>}
                </div>
              ))}
              <Link href="/new-startup" className="block border-t border-white/5 pt-1.5 mt-1.5 text-left">
                <div className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-cyan-300 hover:bg-white/5 cursor-pointer transition text-center flex items-center justify-center gap-1">
                  + New Startup
                </div>
              </Link>
            </div>
          )}
        </div>

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
                  Explore Demo Startup
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

          {/* Analytics Cockpit (Statistics, Health, Timeline, AI CEO Insight) */}
          <div className="mt-8">
            <AnalyticsCockpit workspaceComplete={workspaceComplete} />
          </div>

          {/* SVG Analytics Charts (Only visible if workspace is complete) */}
          {workspaceComplete && (
            <section className="mt-12">
              <DashboardCharts />
            </section>
          )}

          {/* Active Modules Section (AI War Room Command Center) */}
          <div className="mt-12">
            <WarRoom workspaceComplete={workspaceComplete} onSelectAgent={(id) => setSelectedAgentId(id)} />
          </div>

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

      <AgentInspector
        agent={selectedAgentId ? agentsMap[selectedAgentId] : null}
        onClose={() => setSelectedAgentId(null)}
        workspaceComplete={workspaceComplete}
      />
    </div>
  );
}
