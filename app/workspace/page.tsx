"use client";

import { useEffect, useState, useRef } from "react";
import {
  ArrowLeft,
  LayoutDashboard,
  MessageSquare,
  FileText,
  Settings,
  Search,
  Download,
  CheckCircle2,
  AlertCircle,
  Menu,
  RotateCcw,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { BrandMark } from "@/components/shared/brand-mark";
import { Button } from "@/components/ui/button";
import { WorkspaceData, WorkspaceCanvas } from "@/types/workspace";
import { loadWorkspaceData, saveWorkspaceData } from "@/lib/workspace/storage/store";
import { Summary } from "@/components/workspace/dashboard/summary";
import { FieldCard } from "@/components/workspace/editor/field-card";
import { CanvasGrid } from "@/components/workspace/canvas/canvas-grid";
import { Roadmap } from "@/components/workspace/timeline/roadmap";

// Phase 5 Decision Engine Imports
import { EngineStatus } from "@/types/decision-engine";
import { runWorkspaceDecisionEngine } from "@/lib/decision-engine/engine";
import { getVersions, undoLastVersion, pushHistoryVersion } from "@/lib/decision-engine/history";
import { ToastProvider, useToast } from "@/components/workspace/notifications/toast-provider";
import { UpdatePanel } from "@/components/workspace/activity/update-panel";
import { HistoryTab } from "@/components/workspace/history/history-tab";

type SectionTab = "overview" | "research" | "product" | "finance" | "marketing" | "roadmap" | "canvas" | "history";

interface SearchResult {
  section: SectionTab;
  field: string;
  label: string;
  excerpt: string;
  elementId: string;
}

export default function WorkspacePage() {
  return (
    <ToastProvider>
      <WorkspaceContent />
    </ToastProvider>
  );
}

function WorkspaceContent() {
  const { toast } = useToast();
  const [workspace, setWorkspace] = useState<WorkspaceData | null>(null);
  const [activeSection, setActiveSection] = useState<SectionTab>("overview");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Phase 5 Decision Engine State
  const [engineStatus, setEngineStatus] = useState<EngineStatus>({
    state: "idle",
    affectedAgents: [],
    currentAgent: null,
    completedAgents: [],
    ceoMessage: null,
  });
  const [hasUndoBackup, setHasUndoBackup] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [highlightFieldId, setHighlightFieldId] = useState<string | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);

  // Load store data on mount
  useEffect(() => {
    const data = loadWorkspaceData();
    if (data) {
      setWorkspace(data);
      // Initialize first version backup if stack is empty
      const versions = getVersions();
      if (versions.length === 0) {
        pushHistoryVersion(data, "Baseline generated", [], [], "Initial blueprint approved by AI CEO.");
      }
      setHasUndoBackup(versions.length >= 2);
    }
  }, []);

  // Update undo availability periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setHasUndoBackup(getVersions().length >= 2);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Click outside search listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle field update and trigger decision engine re-execution
  const handleUpdateField = async (
    section: keyof Omit<WorkspaceData, "roadmap" | "canvas">,
    field: string,
    newValue: string
  ) => {
    if (!workspace) return;

    setSaveStatus("saving");

    const tempWorkspace = {
      ...workspace,
      [section]: {
        ...workspace[section],
        [field]: newValue,
      },
    };

    setWorkspace(tempWorkspace);
    saveWorkspaceData(tempWorkspace);

    toast(`Change detected in ${field.replace(/([A-Z])/g, " $1")}. Running dependencies check...`, "info");

    try {
      const originalProfileStr = localStorage.getItem("cofoundr_chat_profile") || "{}";
      const originalProfile = JSON.parse(originalProfileStr);
      const rawOutputsStr = localStorage.getItem("cofoundr_workspace_outputs") || "{}";
      const rawOutputs = JSON.parse(rawOutputsStr);

      const result = await runWorkspaceDecisionEngine({
        prevWorkspace: workspace,
        currentWorkspace: tempWorkspace,
        originalProfile,
        rawOutputs,
        onProgress: (status) => setEngineStatus(status),
      });

      if (result) {
        setWorkspace(result.updatedWorkspace);
        toast(`Decision Engine complete. ${result.summary}`, "success");
      }
      setSaveStatus("saved");
      setTimeout(() => {
        setSaveStatus("idle");
        setEngineStatus((prev) => ({ ...prev, state: "idle" }));
      }, 1500);
    } catch {
      setSaveStatus("idle");
      setEngineStatus((prev) => ({ ...prev, state: "idle" }));
      toast("Decision engine execution aborted. Reverting field.", "error");
      setWorkspace(workspace); // revert
    }
  };

  // Handle Business Model Canvas edits
  const handleUpdateCanvas = async (field: keyof WorkspaceCanvas, newValue: string) => {
    if (!workspace) return;

    setSaveStatus("saving");

    const tempCanvas = {
      ...workspace.canvas,
      [field]: newValue,
    };

    const tempWorkspace = {
      ...workspace,
      canvas: tempCanvas,
    };

    setWorkspace(tempWorkspace);
    saveWorkspaceData(tempWorkspace);

    toast(`Change detected in Canvas ${field.replace(/([A-Z])/g, " $1")}. Running dependencies check...`, "info");

    try {
      const originalProfileStr = localStorage.getItem("cofoundr_chat_profile") || "{}";
      const originalProfile = JSON.parse(originalProfileStr);
      const rawOutputsStr = localStorage.getItem("cofoundr_workspace_outputs") || "{}";
      const rawOutputs = JSON.parse(rawOutputsStr);

      const result = await runWorkspaceDecisionEngine({
        prevWorkspace: workspace,
        currentWorkspace: tempWorkspace,
        originalProfile,
        rawOutputs,
        onProgress: (status) => setEngineStatus(status),
      });

      if (result) {
        setWorkspace(result.updatedWorkspace);
        toast(`Decision Engine complete. ${result.summary}`, "success");
      }
      setSaveStatus("saved");
      setTimeout(() => {
        setSaveStatus("idle");
        setEngineStatus((prev) => ({ ...prev, state: "idle" }));
      }, 1500);
    } catch {
      setSaveStatus("idle");
      setEngineStatus((prev) => ({ ...prev, state: "idle" }));
      toast("Decision engine execution aborted. Reverting field.", "error");
      setWorkspace(workspace); // revert
    }
  };

  // Handle roadmap updates
  const handleUpdateRoadmap = async (id: string, newTask: string) => {
    if (!workspace) return;

    setSaveStatus("saving");

    const tempRoadmap = workspace.roadmap.map((node) =>
      node.id === id ? { ...node, task: newTask } : node
    );

    const tempWorkspace = {
      ...workspace,
      roadmap: tempRoadmap,
    };

    setWorkspace(tempWorkspace);
    saveWorkspaceData(tempWorkspace);

    toast("Milestone updated. Running cohesion check...", "info");

    try {
      const originalProfileStr = localStorage.getItem("cofoundr_chat_profile") || "{}";
      const originalProfile = JSON.parse(originalProfileStr);
      const rawOutputsStr = localStorage.getItem("cofoundr_workspace_outputs") || "{}";
      const rawOutputs = JSON.parse(rawOutputsStr);

      const result = await runWorkspaceDecisionEngine({
        prevWorkspace: workspace,
        currentWorkspace: tempWorkspace,
        originalProfile,
        rawOutputs,
        onProgress: (status) => setEngineStatus(status),
      });

      if (result) {
        setWorkspace(result.updatedWorkspace);
        toast(`Decision Engine complete. ${result.summary}`, "success");
      }
      setSaveStatus("saved");
      setTimeout(() => {
        setSaveStatus("idle");
        setEngineStatus((prev) => ({ ...prev, state: "idle" }));
      }, 1500);
    } catch {
      setSaveStatus("idle");
      setEngineStatus((prev) => ({ ...prev, state: "idle" }));
      toast("Decision engine execution aborted. Reverting field.", "error");
      setWorkspace(workspace); // revert
    }
  };

  // Rollback to specific history version
  const handleRollbackToVersion = (versionId: string) => {
    const versions = getVersions();
    const targetVersion = versions.find((v) => v.id === versionId);
    if (targetVersion) {
      setWorkspace(targetVersion.workspaceData);
      saveWorkspaceData(targetVersion.workspaceData);
      toast("Workspace restored to selected history snapshot.", "success");
    }
  };

  // Pop undo system
  const handleUndo = () => {
    const result = undoLastVersion();
    if (result) {
      setWorkspace(result.restoredData);
      toast(`Restored previous version: undone "${result.undoneAction}"`, "success");
    } else {
      toast("No previous versions found in local history.", "warning");
    }
  };

  // Search logic querying across all 32 workspace fields
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!workspace || query.trim() === "") {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // 1. Search Overview Section
    Object.entries(workspace.overview).forEach(([field, val]) => {
      if (val.toLowerCase().includes(lowerQuery) || field.toLowerCase().includes(lowerQuery)) {
        results.push({
          section: "overview",
          field,
          label: `Overview > ${field.replace(/([A-Z])/g, " $1")}`,
          excerpt: val.length > 50 ? `${val.substring(0, 50)}...` : val,
          elementId: `overview-${field}`,
        });
      }
    });

    // 2. Search Research Section
    Object.entries(workspace.research).forEach(([field, val]) => {
      if (val.toLowerCase().includes(lowerQuery) || field.toLowerCase().includes(lowerQuery)) {
        results.push({
          section: "research",
          field,
          label: `Research > ${field.replace(/([A-Z])/g, " $1")}`,
          excerpt: val.length > 50 ? `${val.substring(0, 50)}...` : val,
          elementId: `research-${field}`,
        });
      }
    });

    // 3. Search Product Section
    Object.entries(workspace.product).forEach(([field, val]) => {
      if (val.toLowerCase().includes(lowerQuery) || field.toLowerCase().includes(lowerQuery)) {
        results.push({
          section: "product",
          field,
          label: `Product > ${field.replace(/([A-Z])/g, " $1")}`,
          excerpt: val.length > 50 ? `${val.substring(0, 50)}...` : val,
          elementId: `product-${field}`,
        });
      }
    });

    // 4. Search Finance Section
    Object.entries(workspace.finance).forEach(([field, val]) => {
      if (val.toLowerCase().includes(lowerQuery) || field.toLowerCase().includes(lowerQuery)) {
        results.push({
          section: "finance",
          field,
          label: `Finance > ${field.replace(/([A-Z])/g, " $1")}`,
          excerpt: val.length > 50 ? `${val.substring(0, 50)}...` : val,
          elementId: `finance-${field}`,
        });
      }
    });

    // 5. Search Marketing Section
    Object.entries(workspace.marketing).forEach(([field, val]) => {
      if (val.toLowerCase().includes(lowerQuery) || field.toLowerCase().includes(lowerQuery)) {
        results.push({
          section: "marketing",
          field,
          label: `Marketing > ${field.replace(/([A-Z])/g, " $1")}`,
          excerpt: val.length > 50 ? `${val.substring(0, 50)}...` : val,
          elementId: `marketing-${field}`,
        });
      }
    });

    // 6. Search Canvas
    Object.entries(workspace.canvas).forEach(([field, val]) => {
      if (val.toLowerCase().includes(lowerQuery) || field.toLowerCase().includes(lowerQuery)) {
        results.push({
          section: "canvas",
          field,
          label: `BMC > ${field.replace(/([A-Z])/g, " $1")}`,
          excerpt: val.length > 50 ? `${val.substring(0, 50)}...` : val,
          elementId: `canvas-${field}`,
        });
      }
    });

    // 7. Search Roadmap Nodes
    workspace.roadmap.forEach((node) => {
      if (node.task.toLowerCase().includes(lowerQuery) || node.week.toLowerCase().includes(lowerQuery)) {
        results.push({
          section: "roadmap",
          field: node.week,
          label: `Roadmap > ${node.week}`,
          excerpt: node.task.length > 50 ? `${node.task.substring(0, 50)}...` : node.task,
          elementId: `roadmap-${node.id}`,
        });
      }
    });

    setSearchResults(results.slice(0, 5)); // Limit to top 5 results
    setShowSearchDropdown(results.length > 0);
  };

  const handleSelectSearchResult = (result: SearchResult) => {
    setShowSearchDropdown(false);
    setSearchQuery("");
    setActiveSection(result.section);

    setTimeout(() => {
      const element = document.getElementById(result.elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightFieldId(result.elementId);
        setTimeout(() => setHighlightFieldId(null), 3000);
      }
    }, 100);
  };

  const navItems = [
    { key: "overview", label: "Startup Overview" },
    { key: "research", label: "Research Report" },
    { key: "product", label: "Product MVP Strategy" },
    { key: "finance", label: "Financial Modeling" },
    { key: "marketing", label: "Marketing Channels" },
    { key: "roadmap", label: "Launch Roadmap" },
    { key: "canvas", label: "Business Model Canvas" },
    { key: "history", label: "Change History" },
  ];

  if (!workspace) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink px-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(86,77,255,0.18),transparent_32rem)]" />
        <section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0c1020]/80 p-8 text-center shadow-2xl backdrop-blur-xl">
          <BrandMark className="justify-center" />
          <span className="mx-auto mt-10 grid size-14 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/25">
            <AlertCircle className="size-6" />
          </span>
          <h1 className="mt-6 text-xl font-bold tracking-tight text-white">Startup Blueprint Not Found</h1>
          <p className="mt-3 text-xs leading-6 text-slate-400">
            You must complete the onboarding discovery interview with the AI CEO to generate your startup workspace profile.
          </p>
          <Link href="/chat" className="mt-6 inline-block">
            <Button>
              Enter Boardroom Chat <ArrowLeft className="size-4" />
            </Button>
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-ink">
      {/* Update Timeline cockpit overlay */}
      <UpdatePanel status={engineStatus} />

      {/* Navigation Sidebar (Desktop) */}
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

          <div className="pt-6 pb-2 border-t border-white/5 mt-4">
            <span className="px-4 text-[9px] font-bold uppercase tracking-wider text-slate-600">
              Workspace Sections
            </span>
          </div>

          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key as SectionTab)}
              className={`w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-xs font-semibold transition ${
                activeSection === item.key
                  ? "bg-gradient-to-r from-blue-600/10 to-violet-600/10 text-cyan-300 ring-1 ring-cyan-400/20"
                  : "text-slate-400 hover:bg-white/[0.01] hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2">
                {item.key === "history" && <Clock className="size-3.5 text-slate-500" />}
                {item.label}
              </span>
              {activeSection === item.key && (
                <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
              )}
            </button>
          ))}
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

      {/* Main Workspace Panel */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto max-w-5xl">
          {/* Header Panel */}
          <div className="relative flex flex-col gap-4 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Search index input */}
            <div ref={searchRef} className="relative w-full max-w-sm">
              <span className="absolute inset-y-0 left-3 grid place-items-center text-slate-500">
                <Search className="size-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search workspace (e.g. pricing, SWOT)..."
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-2.5 pl-9 pr-4 text-xs text-slate-300 placeholder:text-slate-500 focus:border-violet-500/80 focus:outline-none"
              />

              {/* Search dropdown suggestions */}
              <AnimatePresence>
                {showSearchDropdown && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute inset-x-0 top-12 z-50 rounded-xl border border-white/10 bg-[#0b1022] p-2.5 shadow-2xl backdrop-blur-xl"
                  >
                    {searchResults.map((res, index) => (
                      <button
                        key={`${res.elementId}-${index}`}
                        onClick={() => handleSelectSearchResult(res)}
                        className="w-full flex flex-col items-start rounded-lg p-2 text-left hover:bg-white/5 transition"
                      >
                        <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-300">
                          {res.label}
                        </span>
                        <span className="mt-0.5 text-xs text-slate-400 truncate w-full">
                          {res.excerpt}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions: Undo, Autosave status, Exports */}
            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-slate-400 hover:text-white transition lg:hidden"
                aria-label="Toggle Navigation Categories"
              >
                <Menu className="size-4.5" />
              </button>

              <div className="flex items-center gap-4">
                {/* Undo System button */}
                {hasUndoBackup && (
                  <button
                    onClick={handleUndo}
                    className="flex items-center gap-1.5 rounded-lg border border-amber-500/25 bg-amber-500/5 hover:bg-amber-500/10 px-3 py-1.5 text-[10px] font-bold text-amber-300 transition"
                  >
                    <RotateCcw className="size-3" />
                    <span>Undo Last Edit</span>
                  </button>
                )}

                {/* Autosave status indicator */}
                <div className="w-20 text-center select-none">
                  {saveStatus === "saving" ? (
                    <span className="text-[10px] font-semibold text-slate-400 animate-pulse">
                      Saving...
                    </span>
                  ) : saveStatus === "saved" ? (
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center justify-center gap-1">
                      <CheckCircle2 className="size-3" /> Saved ✓
                    </span>
                  ) : null}
                </div>

                {/* Exports triggers */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[10px] font-bold text-slate-400 hover:border-cyan-500/30 hover:text-white transition"
                  >
                    <Download className="size-3" />
                    <span>PDF</span>
                  </button>
                  <Link
                    href="/investor"
                    className="flex items-center gap-1.5 rounded-lg border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 px-3 py-1.5 text-[10px] font-bold text-cyan-300 hover:text-white transition"
                  >
                    <Download className="size-3" />
                    <span>Pitch Deck</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Categories Navigation Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="fixed inset-0 z-40 bg-black lg:hidden"
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 left-0 z-50 w-[270px] p-5 bg-ink lg:hidden border-r border-white/10 flex flex-col"
                >
                  <BrandMark />
                  <nav className="mt-8 space-y-1">
                    {navItems.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => {
                          setActiveSection(item.key as SectionTab);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-xs font-semibold transition ${
                          activeSection === item.key
                            ? "bg-gradient-to-r from-blue-600/10 to-violet-600/10 text-cyan-300 ring-1 ring-cyan-400/20"
                            : "text-slate-400 hover:bg-white/[0.01] hover:text-white"
                        }`}
                      >
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Metrics summary widgets */}
          <div className="mt-8">
            <Summary data={workspace} />
          </div>

          {/* MAIN EDITABLE VIEWS PANEL */}
          <section className="mt-6 min-h-[500px] rounded-3xl border border-white/10 bg-[#070b19]/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {/* VIEW: Startup Overview */}
                {activeSection === "overview" && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2.5">
                      Startup Overview
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FieldCard
                        id="overview-name"
                        label="Startup Name"
                        value={workspace.overview.name}
                        onSave={(val) => handleUpdateField("overview", "name", val)}
                        type="input"
                        highlight={highlightFieldId === "overview-name"}
                      />
                      <FieldCard
                        id="overview-tagline"
                        label="Tagline"
                        value={workspace.overview.tagline}
                        onSave={(val) => handleUpdateField("overview", "tagline", val)}
                        type="input"
                        highlight={highlightFieldId === "overview-tagline"}
                      />
                    </div>
                    <FieldCard
                      id="overview-problem"
                      label="The Problem"
                      value={workspace.overview.problem}
                      onSave={(val) => handleUpdateField("overview", "problem", val)}
                      highlight={highlightFieldId === "overview-problem"}
                    />
                    <FieldCard
                      id="overview-solution"
                      label="The Solution"
                      value={workspace.overview.solution}
                      onSave={(val) => handleUpdateField("overview", "solution", val)}
                      highlight={highlightFieldId === "overview-solution"}
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FieldCard
                        id="overview-mission"
                        label="Mission Statement"
                        value={workspace.overview.mission}
                        onSave={(val) => handleUpdateField("overview", "mission", val)}
                        highlight={highlightFieldId === "overview-mission"}
                      />
                      <FieldCard
                        id="overview-vision"
                        label="Vision Statement"
                        value={workspace.overview.vision}
                        onSave={(val) => handleUpdateField("overview", "vision", val)}
                        highlight={highlightFieldId === "overview-vision"}
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <FieldCard
                        id="overview-targetUsers"
                        label="Target Users"
                        value={workspace.overview.targetUsers}
                        onSave={(val) => handleUpdateField("overview", "targetUsers", val)}
                        type="input"
                        highlight={highlightFieldId === "overview-targetUsers"}
                      />
                      <FieldCard
                        id="overview-industry"
                        label="Industry"
                        value={workspace.overview.industry}
                        onSave={(val) => handleUpdateField("overview", "industry", val)}
                        type="input"
                        highlight={highlightFieldId === "overview-industry"}
                      />
                      <FieldCard
                        id="overview-businessModel"
                        label="Business Model"
                        value={workspace.overview.businessModel}
                        onSave={(val) => handleUpdateField("overview", "businessModel", val)}
                        type="input"
                        highlight={highlightFieldId === "overview-businessModel"}
                      />
                    </div>
                  </div>
                )}

                {/* VIEW: Research Section */}
                {activeSection === "research" && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2.5">
                      Market Research & SWOT
                    </h2>
                    <FieldCard
                      id="research-marketSummary"
                      label="Market Summary"
                      value={workspace.research.marketSummary}
                      onSave={(val) => handleUpdateField("research", "marketSummary", val)}
                      highlight={highlightFieldId === "research-marketSummary"}
                    />
                    <FieldCard
                      id="research-competitors"
                      label="Direct & Indirect Competitors"
                      value={workspace.research.competitors}
                      onSave={(val) => handleUpdateField("research", "competitors", val)}
                      highlight={highlightFieldId === "research-competitors"}
                    />
                    <div className="grid gap-4 sm:grid-cols-3">
                      <FieldCard
                        id="research-marketDemand"
                        label="Market Demand Score"
                        value={workspace.research.marketDemand}
                        onSave={(val) => handleUpdateField("research", "marketDemand", val)}
                        type="input"
                        highlight={highlightFieldId === "research-marketDemand"}
                      />
                      <FieldCard
                        id="research-opportunities"
                        label="Key Opportunities"
                        value={workspace.research.opportunities}
                        onSave={(val) => handleUpdateField("research", "opportunities", val)}
                        highlight={highlightFieldId === "research-opportunities"}
                      />
                      <FieldCard
                        id="research-risks"
                        label="Primary Risks"
                        value={workspace.research.risks}
                        onSave={(val) => handleUpdateField("research", "risks", val)}
                        highlight={highlightFieldId === "research-risks"}
                      />
                    </div>
                    <FieldCard
                      id="research-swotAnalysis"
                      label="Full SWOT Matrix"
                      value={workspace.research.swotAnalysis}
                      onSave={(val) => handleUpdateField("research", "swotAnalysis", val)}
                      highlight={highlightFieldId === "research-swotAnalysis"}
                    />
                    <FieldCard
                      id="research-recommendations"
                      label="CEO Core Recommendations"
                      value={workspace.research.recommendations}
                      onSave={(val) => handleUpdateField("research", "recommendations", val)}
                      highlight={highlightFieldId === "research-recommendations"}
                    />
                  </div>
                )}

                {/* VIEW: Product Section */}
                {activeSection === "product" && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2.5">
                      MVP & Tech Stack Scoping
                    </h2>
                    <FieldCard
                      id="product-mvpFeatures"
                      label="Phase 1 MVP Features"
                      value={workspace.product.mvpFeatures}
                      onSave={(val) => handleUpdateField("product", "mvpFeatures", val)}
                      highlight={highlightFieldId === "product-mvpFeatures"}
                    />
                    <FieldCard
                      id="product-futureFeatures"
                      label="Phase 2 & 3 Roadmap features"
                      value={workspace.product.futureFeatures}
                      onSave={(val) => handleUpdateField("product", "futureFeatures", val)}
                      highlight={highlightFieldId === "product-futureFeatures"}
                    />
                    <FieldCard
                      id="product-techStack"
                      label="Recommended Tech Stack"
                      value={workspace.product.techStack}
                      onSave={(val) => handleUpdateField("product", "techStack", val)}
                      highlight={highlightFieldId === "product-techStack"}
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FieldCard
                        id="product-devRoadmap"
                        label="Development Roadmap Overview"
                        value={workspace.product.devRoadmap}
                        onSave={(val) => handleUpdateField("product", "devRoadmap", val)}
                        highlight={highlightFieldId === "product-devRoadmap"}
                      />
                      <FieldCard
                        id="product-timeline"
                        label="Timeline Milestones"
                        value={workspace.product.timeline}
                        onSave={(val) => handleUpdateField("product", "timeline", val)}
                        highlight={highlightFieldId === "product-timeline"}
                      />
                    </div>
                  </div>
                )}

                {/* VIEW: Finance Section */}
                {activeSection === "finance" && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2.5">
                      Financial Models & Forecasts
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FieldCard
                        id="finance-pricing"
                        label="Pricing Structure Tiers"
                        value={workspace.finance.pricing}
                        onSave={(val) => handleUpdateField("finance", "pricing", val)}
                        highlight={highlightFieldId === "finance-pricing"}
                      />
                      <FieldCard
                        id="finance-revenueModel"
                        label="Revenue Model Mechanics"
                        value={workspace.finance.revenueModel}
                        onSave={(val) => handleUpdateField("finance", "revenueModel", val)}
                        highlight={highlightFieldId === "finance-revenueModel"}
                      />
                    </div>
                    <FieldCard
                      id="finance-revenueProjection"
                      label="12-Month Projections"
                      value={workspace.finance.revenueProjection}
                      onSave={(val) => handleUpdateField("finance", "revenueProjection", val)}
                      highlight={highlightFieldId === "finance-revenueProjection"}
                    />
                    <div className="grid gap-4 sm:grid-cols-3">
                      <FieldCard
                        id="finance-startupCost"
                        label="Launch Startup Costs"
                        value={workspace.finance.startupCost}
                        onSave={(val) => handleUpdateField("finance", "startupCost", val)}
                        type="input"
                        highlight={highlightFieldId === "finance-startupCost"}
                      />
                      <FieldCard
                        id="finance-breakEven"
                        label="Break-even Forecast"
                        value={workspace.finance.breakEven}
                        onSave={(val) => handleUpdateField("finance", "breakEven", val)}
                        type="input"
                        highlight={highlightFieldId === "finance-breakEven"}
                      />
                      <FieldCard
                        id="finance-fundingNeed"
                        label="Required Funding Target"
                        value={workspace.finance.fundingNeed}
                        onSave={(val) => handleUpdateField("finance", "fundingNeed", val)}
                        type="input"
                        highlight={highlightFieldId === "finance-fundingNeed"}
                      />
                    </div>
                  </div>
                )}

                {/* VIEW: Marketing Section */}
                {activeSection === "marketing" && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2.5">
                      Launch & GTM Marketing Strategy
                    </h2>
                    <FieldCard
                      id="marketing-gtmPlan"
                      label="Go-to-market plan"
                      value={workspace.marketing.gtmPlan}
                      onSave={(val) => handleUpdateField("marketing", "gtmPlan", val)}
                      highlight={highlightFieldId === "marketing-gtmPlan"}
                    />
                    <FieldCard
                      id="marketing-channels"
                      label="Acquisition Channels"
                      value={workspace.marketing.channels}
                      onSave={(val) => handleUpdateField("marketing", "channels", val)}
                      highlight={highlightFieldId === "marketing-channels"}
                    />
                    <div className="grid gap-4 sm:grid-cols-3">
                      <FieldCard
                        id="marketing-targetAudience"
                        label="Target Marketing Audience"
                        value={workspace.marketing.targetAudience}
                        onSave={(val) => handleUpdateField("marketing", "targetAudience", val)}
                        type="input"
                        highlight={highlightFieldId === "marketing-targetAudience"}
                      />
                      <FieldCard
                        id="marketing-socialStrategy"
                        label="Social Strategy Loops"
                        value={workspace.marketing.socialStrategy}
                        onSave={(val) => handleUpdateField("marketing", "socialStrategy", val)}
                        highlight={highlightFieldId === "marketing-socialStrategy"}
                      />
                      <FieldCard
                        id="marketing-growthPlan"
                        label="Viral Referral Growth Plan"
                        value={workspace.marketing.growthPlan}
                        onSave={(val) => handleUpdateField("marketing", "growthPlan", val)}
                        highlight={highlightFieldId === "marketing-growthPlan"}
                      />
                    </div>
                  </div>
                )}

                {/* VIEW: Roadmap Timeline */}
                {activeSection === "roadmap" && (
                  <Roadmap roadmap={workspace.roadmap} onSaveNode={handleUpdateRoadmap} />
                )}

                {/* VIEW: Business Model Canvas */}
                {activeSection === "canvas" && (
                  <CanvasGrid canvas={workspace.canvas} onSaveField={handleUpdateCanvas} />
                )}

                {/* VIEW: Workspace History Logs */}
                {activeSection === "history" && (
                  <HistoryTab onRollback={handleRollbackToVersion} />
                )}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </main>
    </div>
  );
}
