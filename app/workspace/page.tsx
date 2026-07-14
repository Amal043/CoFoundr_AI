"use client";

import { useEffect, useState, useRef } from "react";
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  ChevronDown,
  ChevronUp,
  FileText,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Play,
  RefreshCw,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/shared/brand-mark";
import { Button } from "@/components/ui/button";

interface StartupProfile {
  name: string;
  audience: string;
  pricing: string;
  country: string;
  businessType: string;
  timeline: string;
  teamSize: string;
}

type AgentKey = "research" | "product" | "finance" | "marketing" | "synthesis";

export default function WorkspacePage() {
  const [profile, setProfile] = useState<StartupProfile | null>(null);
  const [completedCount, setCompletedCount] = useState(0);

  // Orchestration state: 'idle' | 'running' | 'completed'
  const [orchestrationState, setOrchestrationState] = useState<"idle" | "running" | "completed">("idle");
  const [ceoLog, setCeoLog] = useState("AI CEO standing by. Awaiting launch command...");
  
  const [agentStatuses, setAgentStatuses] = useState<{ [key in AgentKey]: "pending" | "running" | "completed" | "failed" }>({
    research: "pending",
    product: "pending",
    finance: "pending",
    marketing: "pending",
    synthesis: "pending",
  });

  const [agentTimers, setAgentTimers] = useState<{ [key in AgentKey]: number }>({
    research: 0,
    product: 0,
    finance: 0,
    marketing: 0,
    synthesis: 0,
  });

  const [agentOutputs, setAgentOutputs] = useState<{ [key: string]: string }>({
    research: "",
    product: "",
    finance: "",
    marketing: "",
    synthesis: "",
  });

  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("summary");

  // Timer intervals references
  const timerRefs = useRef<{ [key in AgentKey]?: NodeJS.Timeout }>({});

  // Load profile and saved workspace outputs from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("cofoundr_chat_profile");
    const savedProgress = localStorage.getItem("cofoundr_chat_progress");
    const savedOutputs = localStorage.getItem("cofoundr_workspace_outputs");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      const count = Object.values(parsed).filter((v) => v === "completed").length;
      setCompletedCount(count);
    }

    if (savedOutputs) {
      const parsed = JSON.parse(savedOutputs);
      setAgentOutputs(parsed);
      setOrchestrationState("completed");
    }
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    const currentTimers = timerRefs.current;
    return () => {
      Object.values(currentTimers).forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  // Start timer for a specific agent
  const startTimer = (agent: AgentKey) => {
    // Reset timer
    setAgentTimers((prev) => ({ ...prev, [agent]: 0 }));
    
    // Clear existing timer if any
    if (timerRefs.current[agent]) {
      clearInterval(timerRefs.current[agent]);
    }

    // Start interval
    timerRefs.current[agent] = setInterval(() => {
      setAgentTimers((prev) => ({ ...prev, [agent]: +(prev[agent] + 0.1).toFixed(1) }));
    }, 100);
  };

  // Stop timer for a specific agent
  const stopTimer = (agent: AgentKey) => {
    if (timerRefs.current[agent]) {
      clearInterval(timerRefs.current[agent]);
    }
  };

  // Run a single agent request
  const executeAgent = async (
    agent: AgentKey,
    endpoint: string,
    body: { profile: StartupProfile; outputs?: Record<string, string> }
  ): Promise<string> => {
    setAgentStatuses((prev) => ({ ...prev, [agent]: "running" }));
    startTimer(agent);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Agent execution failed with status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setAgentStatuses((prev) => ({ ...prev, [agent]: "completed" }));
      stopTimer(agent);
      
      return data.output || "";
    } catch (err) {
      setAgentStatuses((prev) => ({ ...prev, [agent]: "failed" }));
      stopTimer(agent);
      throw err;
    }
  };

  // Run the full orchestration pipeline
  const runOrchestrator = async () => {
    if (!profile) return;
    setOrchestrationState("running");

    const outputs = { ...agentOutputs };

    // Step 1: Research Agent
    if (agentStatuses.research !== "completed") {
      try {
        setCeoLog("AI CEO: Launching Research Agent to analyze market indicators and direct competitors...");
        const res = await executeAgent("research", "/api/agents/research", { profile });
        outputs.research = res;
        setAgentOutputs((prev) => ({ ...prev, research: res }));
      } catch {
        setCeoLog("AI CEO ERROR: The Research Agent encountered an error. Please retry to continue.");
        return;
      }
    }

    // Step 2: Product Agent
    if (agentStatuses.product !== "completed") {
      try {
        setCeoLog("AI CEO: Research complete. Running Product Agent to define the MVP scope and tech stack...");
        const res = await executeAgent("product", "/api/agents/product", { profile });
        outputs.product = res;
        setAgentOutputs((prev) => ({ ...prev, product: res }));
      } catch {
        setCeoLog("AI CEO ERROR: The Product Agent encountered an error. Please retry to continue.");
        return;
      }
    }

    // Step 3: Finance Agent
    if (agentStatuses.finance !== "completed") {
      try {
        setCeoLog("AI CEO: Product roadmap mapped. Dispatching Finance Agent to model pricing and budget forecast...");
        const res = await executeAgent("finance", "/api/agents/finance", { profile });
        outputs.finance = res;
        setAgentOutputs((prev) => ({ ...prev, finance: res }));
      } catch {
        setCeoLog("AI CEO ERROR: The Finance Agent encountered an error. Please retry to continue.");
        return;
      }
    }

    // Step 4: Marketing Agent
    if (agentStatuses.marketing !== "completed") {
      try {
        setCeoLog("AI CEO: Financial parameters calculated. Running Marketing Agent to frame customer acquisition channels...");
        const res = await executeAgent("marketing", "/api/agents/marketing", { profile });
        outputs.marketing = res;
        setAgentOutputs((prev) => ({ ...prev, marketing: res }));
      } catch {
        setCeoLog("AI CEO ERROR: The Marketing Agent encountered an error. Please retry to continue.");
        return;
      }
    }

    // Step 5: CEO Synthesis
    if (agentStatuses.synthesis !== "completed") {
      try {
        setCeoLog("AI CEO: Specialized agent reports compiled. Initiating synthesis to remove contradictions and build the Executive Summary...");
        const res = await executeAgent("synthesis", "/api/agents/synthesis", { profile, outputs });
        outputs.synthesis = res;
        setAgentOutputs((prev) => ({ ...prev, synthesis: res }));
      } catch {
        setCeoLog("AI CEO ERROR: Core synthesis failed. Click retry to complete the workspace.");
        return;
      }
    }

    setCeoLog("AI CEO: Orchestration complete. Workspace strategy is compiled and ready!");
    setOrchestrationState("completed");

    // Save final reports to localStorage
    localStorage.setItem("cofoundr_workspace_outputs", JSON.stringify(outputs));
  };

  // Retry logic for a specific failed agent
  const handleRetryAgent = async (agent: AgentKey) => {
    if (!profile) return;
    setCeoLog(`AI CEO: Retrying the ${agent.charAt(0).toUpperCase() + agent.slice(1)} Agent...`);

    const outputs = { ...agentOutputs };

    try {
      if (agent === "research") {
        const res = await executeAgent("research", "/api/agents/research", { profile });
        outputs.research = res;
        setAgentOutputs((prev) => ({ ...prev, research: res }));
      } else if (agent === "product") {
        const res = await executeAgent("product", "/api/agents/product", { profile });
        outputs.product = res;
        setAgentOutputs((prev) => ({ ...prev, product: res }));
      } else if (agent === "finance") {
        const res = await executeAgent("finance", "/api/agents/finance", { profile });
        outputs.finance = res;
        setAgentOutputs((prev) => ({ ...prev, finance: res }));
      } else if (agent === "marketing") {
        const res = await executeAgent("marketing", "/api/agents/marketing", { profile });
        outputs.marketing = res;
        setAgentOutputs((prev) => ({ ...prev, marketing: res }));
      } else if (agent === "synthesis") {
        const res = await executeAgent("synthesis", "/api/agents/synthesis", { profile, outputs: agentOutputs });
        outputs.synthesis = res;
        setAgentOutputs((prev) => ({ ...prev, synthesis: res }));
      }

      // Resume pipeline
      await runOrchestrator();
    } catch {
      setCeoLog(`AI CEO ERROR: ${agent.charAt(0).toUpperCase() + agent.slice(1)} Agent failed again. Check connection.`);
    }
  };

  // Helper to extract specific headers from Markdown
  const extractMarkdownSection = (md: string, heading: string): string => {
    if (!md) return "";
    const lines = md.split("\n");
    const result: string[] = [];
    let capture = false;

    for (const line of lines) {
      const cleanLine = line.trim();
      // Start capturing if line is a header and matches our heading key
      if (cleanLine.startsWith("#") && cleanLine.toLowerCase().includes(heading.toLowerCase())) {
        capture = true;
        result.push(line);
        continue;
      }
      // Stop capturing if we hit another header of the same or higher weight
      if (capture && cleanLine.startsWith("#")) {
        break;
      }
      if (capture) {
        result.push(line);
      }
    }

    // Fallback if section header not found
    return result.length > 0 ? result.join("\n").trim() : md;
  };

  // Format markdown helper
  const renderMarkdown = (text: string) => {
    if (!text) return null;
    const blocks = text.split("```");
    return blocks.map((block, index) => {
      if (index % 2 === 1) {
        const lines = block.split("\n");
        const code = lines.slice(1).join("\n").trim();
        return (
          <pre
            key={index}
            className="my-4 overflow-x-auto rounded-xl border border-white/10 bg-[#04060f] p-4 text-xs font-mono text-cyan-300"
          >
            <code>{code || block}</code>
          </pre>
        );
      }

      const lines = block.split("\n");
      return lines.map((line, lineIndex) => {
        const trimmed = line.trim();
        
        // Handle markdown main headers
        if (trimmed.startsWith("# ")) {
          return (
            <h2 key={`${index}-${lineIndex}`} className="mt-8 mb-4 text-xl font-bold tracking-tight text-white border-b border-white/5 pb-2">
              {renderBold(trimmed.replace(/^#\s+/, ""))}
            </h2>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h3 key={`${index}-${lineIndex}`} className="mt-6 mb-3 text-base font-bold tracking-tight text-cyan-300">
              {renderBold(trimmed.replace(/^##\s+/, ""))}
            </h3>
          );
        }

        // Handle bullet points
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const content = trimmed.replace(/^[-*]\s+/, "");
          return (
            <li key={`${index}-${lineIndex}`} className="ml-4 list-disc text-sm text-slate-300 mb-2">
              {renderBold(content)}
            </li>
          );
        }

        return (
          <p key={`${index}-${lineIndex}`} className="text-sm text-slate-300 leading-7 mb-3.5 min-h-[1.2rem]">
            {renderBold(line)}
          </p>
        );
      });
    });
  };

  const renderBold = (text: string) => {
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, idx) => {
      if (idx % 2 === 1) {
        return (
          <strong key={idx} className="font-bold text-white">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  // Get active tab content
  const getTabContent = () => {
    switch (activeTab) {
      case "summary":
        return agentOutputs.synthesis;
      case "market":
        return extractMarkdownSection(agentOutputs.research, "Market Summary");
      case "competitors":
        return extractMarkdownSection(agentOutputs.research, "Competitor Analysis") + "\n\n" + extractMarkdownSection(agentOutputs.research, "SWOT");
      case "business":
        return extractMarkdownSection(agentOutputs.finance, "Pricing Strategy") + "\n\n" + extractMarkdownSection(agentOutputs.finance, "Financial Summary");
      case "revenue":
        return extractMarkdownSection(agentOutputs.finance, "Revenue Projection") + "\n\n" + extractMarkdownSection(agentOutputs.finance, "Funding Need");
      case "product":
        return agentOutputs.product;
      case "marketing":
        return agentOutputs.marketing;
      default:
        return "";
    }
  };

  // Calculate overall orchestration progress percentage
  const getOrchestrationPercent = () => {
    const statuses = Object.values(agentStatuses);
    const complete = statuses.filter((v) => v === "completed").length;
    return Math.round((complete / statuses.length) * 100);
  };

  const agentCards = [
    {
      key: "research",
      name: "Research Agent",
      desc: "Market summary, demand, and SWOT",
      icon: Search,
      output: agentOutputs.research,
    },
    {
      key: "product",
      name: "Product Agent",
      desc: "MVP features, roadmap, and stack",
      icon: Boxes,
      output: agentOutputs.product,
    },
    {
      key: "finance",
      name: "Finance Agent",
      desc: "Pricing, margins, and cost modeling",
      icon: BarChart3,
      output: agentOutputs.finance,
    },
    {
      key: "marketing",
      name: "Marketing Agent",
      desc: "Go-to-market channels and campaigns",
      icon: Megaphone,
      output: agentOutputs.marketing,
    },
  ];

  return (
    <div className="flex min-h-screen bg-ink">
      {/* Navigation Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#070a19]/90 p-5 lg:flex lg:flex-col">
        <Link href="/">
          <BrandMark />
        </Link>

        <nav className="mt-8 flex-1 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 hover:bg-white/[0.02] hover:text-white transition"
          >
            <LayoutDashboard className="size-4.5" />
            <span>Overview</span>
          </Link>
          <Link
            href="/chat"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 hover:bg-white/[0.02] hover:text-white transition"
          >
            <MessageSquare className="size-4.5" />
            <span>AI CEO Chat</span>
          </Link>
          <Link
            href="/workspace"
            className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition"
          >
            <FileText className="size-4.5 text-cyan-300" />
            <span>Workspace</span>
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

      {/* Main Workspace Frame */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-white/[0.06] pb-5">
            <div>
              <p className="text-xs font-semibold text-slate-500">Boardroom Synthesis</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-white">
                {profile?.name && profile.name !== "-" ? `${profile.name} Workspace` : "Startup Workspace"}
              </h1>
            </div>
            {orchestrationState === "completed" && (
              <button
                onClick={() => {
                  if (confirm("Do you want to re-run the agent boardroom orchestration?")) {
                    localStorage.removeItem("cofoundr_workspace_outputs");
                    setOrchestrationState("idle");
                    setAgentStatuses({
                      research: "pending",
                      product: "pending",
                      finance: "pending",
                      marketing: "pending",
                      synthesis: "pending",
                    });
                    setAgentOutputs({ research: "", product: "", finance: "", marketing: "", synthesis: "" });
                  }
                }}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-slate-400 hover:text-white transition"
              >
                <RefreshCw className="size-3.5" /> Re-run Orchestrator
              </button>
            )}
          </header>

          {/* 1. STATE: Idle - Launch Dashboard */}
          {orchestrationState === "idle" && (
            <div className="mt-8 rounded-3xl border border-white/10 bg-[#070b19]/60 p-6 text-center shadow-xl sm:p-12">
              <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-violet-500/10 text-violet-300 ring-1 ring-violet-400/25">
                <Sparkles className="size-8" />
              </div>
              <h2 className="mt-6 text-xl font-bold tracking-tight text-white sm:text-2xl">
                Ready to compile your AI Founding Team report?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
                {completedCount < 6
                  ? "Your CEO discovery interview is not yet completed. We recommend finishing your chat onboarding to compile full workspace parameters."
                  : "We have mapped your core startup blueprint. The AI CEO is ready to launch specialized Research, Product, Finance, and Marketing agents to construct your strategy."}
              </p>

              {completedCount < 6 ? (
                <div className="mt-8 flex justify-center gap-4">
                  <Link href="/chat">
                    <Button>
                      Complete Interview <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="mt-8 flex flex-col items-center gap-4">
                  <Button size="lg" onClick={runOrchestrator} className="group">
                    <Play className="size-4.5 fill-current" /> Launch AI Founding Team
                  </Button>
                  <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                    Requires ~15 seconds to execute agent compilation
                  </span>
                </div>
              )}

              {/* Summary of Agents */}
              <div className="mt-12 grid gap-4 border-t border-white/[0.06] pt-10 text-left sm:grid-cols-4">
                {agentCards.map((agent) => {
                  const Icon = agent.icon;
                  return (
                    <div key={agent.key} className="rounded-2xl border border-white/[0.04] bg-white/[0.015] p-5">
                      <span className="grid size-8 place-items-center rounded-lg bg-white/[0.04] text-slate-400">
                        <Icon className="size-4" />
                      </span>
                      <h3 className="mt-4 text-xs font-bold text-slate-300">{agent.name}</h3>
                      <p className="mt-1.5 text-[11px] leading-5 text-slate-500">{agent.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. STATE: Running - Progress Monitor */}
          {orchestrationState === "running" && (
            <div className="mt-8 space-y-6">
              {/* CEO Status Log */}
              <div className="flex items-start gap-4 rounded-3xl border border-violet-500/20 bg-gradient-to-r from-violet-600/10 to-transparent p-5 backdrop-blur-sm">
                <span className="grid size-10 place-items-center rounded-xl bg-violet-400/20 text-violet-200 ring-1 ring-violet-300/30">
                  <Bot className="size-5.5 text-cyan-200" />
                </span>
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                    CEO Coordination Log
                  </span>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-100 italic">
                    &quot;{ceoLog}&quot;
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span>Overall Orchestration Pipeline</span>
                    <span className="font-mono text-cyan-300">{getOrchestrationPercent()}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                      style={{ width: `${getOrchestrationPercent()}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Agent Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {agentCards.map((agent) => {
                  const Icon = agent.icon;
                  const status = agentStatuses[agent.key as AgentKey];
                  const timer = agentTimers[agent.key as AgentKey];
                  const isExpanded = expandedAgent === agent.key;

                  const isRunning = status === "running";
                  const isCompleted = status === "completed";
                  const isFailed = status === "failed";

                  return (
                    <div
                      key={agent.key}
                      className={`flex flex-col rounded-2xl border transition duration-300 p-5 ${
                        isRunning
                          ? "border-cyan-500/40 bg-cyan-950/10 shadow-[0_0_30px_rgba(34,211,238,0.06)]"
                          : isFailed
                          ? "border-rose-500/40 bg-rose-950/10"
                          : isCompleted
                          ? "border-white/10 bg-[#080d20]/50"
                          : "border-white/5 bg-[#060815]/30 opacity-60"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={`grid size-10 place-items-center rounded-xl ring-1 ${
                              isRunning
                                ? "bg-cyan-500/10 text-cyan-300 ring-cyan-400/25"
                                : isFailed
                                ? "bg-rose-500/10 text-rose-300 ring-rose-400/25"
                                : isCompleted
                                ? "bg-emerald-500/10 text-emerald-300 ring-emerald-400/25"
                                : "bg-white/[0.02] text-slate-500 ring-white/5"
                            }`}
                          >
                            <Icon className="size-4.5" />
                          </span>
                          <div>
                            <h3 className="text-sm font-bold text-white">{agent.name}</h3>
                            <p className="text-[10px] text-slate-500">{agent.desc}</p>
                          </div>
                        </div>

                        {/* Badges / Timers */}
                        <div className="text-right">
                          <span className="block text-[10px] font-mono font-semibold text-slate-500">
                            {timer > 0 ? `${timer.toFixed(1)}s` : "0.0s"}
                          </span>
                          <span
                            className={`mt-1.5 inline-block rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
                              isRunning
                                ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-300 animate-pulse"
                                : isFailed
                                ? "border-rose-500/20 bg-rose-500/10 text-rose-300"
                                : isCompleted
                                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                                : "border-white/5 bg-white/[0.02] text-slate-600"
                            }`}
                          >
                            {isRunning ? "Running" : isFailed ? "Failed" : isCompleted ? "Complete" : "Pending"}
                          </span>
                        </div>
                      </div>

                      {/* Expand Button for finished agents */}
                      {isCompleted && (
                        <div className="mt-4 border-t border-white/[0.05] pt-3 flex justify-between items-center">
                          <span className="text-[10px] text-slate-500 font-semibold">Report Generated</span>
                          <button
                            onClick={() => setExpandedAgent(isExpanded ? null : agent.key)}
                            className="flex items-center gap-1 text-[10px] font-bold text-cyan-300 hover:text-white transition"
                          >
                            {isExpanded ? (
                              <>
                                Hide Report <ChevronUp className="size-3" />
                              </>
                            ) : (
                              <>
                                Inspect Report <ChevronDown className="size-3" />
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Retry Button for failed agents */}
                      {isFailed && (
                        <div className="mt-4 border-t border-white/[0.05] pt-3 flex justify-between items-center">
                          <span className="text-[10px] text-rose-400 font-semibold flex items-center gap-1">
                            <AlertCircle className="size-3" /> Failed to compile
                          </span>
                          <button
                            onClick={() => handleRetryAgent(agent.key as AgentKey)}
                            className="flex items-center gap-1.5 rounded-lg bg-rose-500 px-3 py-1.5 text-[10px] font-bold text-white hover:bg-rose-600 transition"
                          >
                            <RefreshCw className="size-3" /> Retry Agent
                          </button>
                        </div>
                      )}

                      {/* Collapsible Content Area */}
                      {isExpanded && isCompleted && (
                        <div className="mt-4 max-h-60 overflow-y-auto rounded-xl border border-white/5 bg-slate-950/40 p-4 text-xs shadow-inner">
                          {renderMarkdown(agent.output)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Synthesis Loader */}
              <div
                className={`rounded-2xl border p-5 ${
                  agentStatuses.synthesis === "running"
                    ? "border-violet-500/40 bg-violet-950/10 shadow-[0_0_30px_rgba(139,92,246,0.06)]"
                    : agentStatuses.synthesis === "completed"
                    ? "border-white/10 bg-[#080d20]/50"
                    : "border-white/5 bg-[#060815]/30 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid size-10 place-items-center rounded-xl ring-1 ${
                        agentStatuses.synthesis === "running"
                          ? "bg-violet-500/10 text-violet-300 ring-violet-400/25"
                          : agentStatuses.synthesis === "completed"
                          ? "bg-emerald-500/10 text-emerald-300 ring-emerald-400/25"
                          : "bg-white/[0.02] text-slate-500 ring-white/5"
                      }`}
                    >
                      <Bot className="size-4.5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white">CEO Synthesis</h3>
                      <p className="text-[10px] text-slate-500">Compiles Executive Strategy & removes contradictions</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="block text-[10px] font-mono font-semibold text-slate-500">
                      {agentTimers.synthesis > 0 ? `${agentTimers.synthesis.toFixed(1)}s` : "0.0s"}
                    </span>
                    <span
                      className={`mt-1.5 inline-block rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
                        agentStatuses.synthesis === "running"
                          ? "border-violet-500/20 bg-violet-500/10 text-violet-300 animate-pulse"
                          : agentStatuses.synthesis === "failed"
                          ? "border-rose-500/20 bg-rose-500/10 text-rose-300"
                          : agentStatuses.synthesis === "completed"
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                          : "border-white/5 bg-white/[0.02] text-slate-600"
                      }`}
                    >
                      {agentStatuses.synthesis === "running"
                        ? "Running"
                        : agentStatuses.synthesis === "failed"
                        ? "Failed"
                        : agentStatuses.synthesis === "completed"
                        ? "Complete"
                        : "Pending"}
                    </span>
                  </div>
                </div>

                {agentStatuses.synthesis === "failed" && (
                  <div className="mt-4 border-t border-white/[0.05] pt-3 flex justify-between items-center">
                    <span className="text-[10px] text-rose-400 font-semibold flex items-center gap-1">
                      <AlertCircle className="size-3" /> Synthesis failure
                    </span>
                    <button
                      onClick={() => handleRetryAgent("synthesis")}
                      className="flex items-center gap-1.5 rounded-lg bg-rose-500 px-3 py-1.5 text-[10px] font-bold text-white hover:bg-rose-600 transition"
                    >
                      <RefreshCw className="size-3" /> Retry Synthesis
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. STATE: Completed - Tabbed Workspace View */}
          {orchestrationState === "completed" && (
            <div className="mt-8 grid gap-6 md:grid-cols-[240px_1fr]">
              {/* Workspace Navigation Tabs */}
              <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#070b19]/80 p-3 shadow-xl backdrop-blur-xl h-fit">
                <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  Workspace Tabs
                </span>

                {[
                  { key: "summary", label: "Executive Summary" },
                  { key: "market", label: "Market Analysis" },
                  { key: "competitors", label: "Competitor & SWOT" },
                  { key: "business", label: "Business Model" },
                  { key: "revenue", label: "Revenue Forecast" },
                  { key: "product", label: "MVP Roadmap" },
                  { key: "marketing", label: "GTM Marketing" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition ${
                      activeTab === tab.key
                        ? "bg-gradient-to-r from-blue-600/10 to-violet-600/10 text-cyan-300 ring-1 ring-cyan-400/20"
                        : "text-slate-400 hover:bg-white/[0.02] hover:text-white"
                    }`}
                  >
                    <span>{tab.label}</span>
                    {activeTab === tab.key && <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />}
                  </button>
                ))}
              </div>

              {/* Workspace Active Tab View Panel */}
              <div className="min-h-[500px] rounded-3xl border border-white/10 bg-[#070b19]/80 p-6 shadow-2xl backdrop-blur-xl md:p-8">
                {renderMarkdown(getTabContent())}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
