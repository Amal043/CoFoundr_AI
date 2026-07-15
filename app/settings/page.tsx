"use client";

import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Settings,
  Presentation,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  Info,
} from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/shared/brand-mark";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [apiKeyStatus, setApiKeyStatus] = useState<"loading" | "configured" | "fallback">("loading");
  const [resetting, setResetting] = useState(false);

  // Fetch API status on mount
  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch("/api/status");
        if (res.ok) {
          const data = await res.json();
          setApiKeyStatus(data.apiStatus);
        } else {
          setApiKeyStatus("fallback");
        }
      } catch {
        setApiKeyStatus("fallback");
      }
    }
    checkStatus();
  }, []);

  const handleResetWorkspace = () => {
    if (
      confirm(
        "Are you sure you want to reset your workspace? This will delete all edited fields, versions, and change history logs. This action is permanent."
      )
    ) {
      setResetting(true);
      localStorage.removeItem("cofoundr_chat_profile");
      localStorage.removeItem("cofoundr_chat_progress");
      localStorage.removeItem("cofoundr_workspace_outputs");
      localStorage.removeItem("cofoundr_workspace_data");
      localStorage.removeItem("cofoundr_workspace_history");
      localStorage.removeItem("cofoundr_workspace_versions");

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  };

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
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 hover:bg-white/[0.02] hover:text-white transition"
          >
            <FileText className="size-4.5" />
            <span>Workspace</span>
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
            className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition"
          >
            <Settings className="size-4.5 text-cyan-300" />
            <span>Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Settings Panel */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <header className="border-b border-white/[0.06] pb-5">
            <h1 className="text-xl font-bold text-white">Application Settings</h1>
            <p className="text-xs text-slate-500 mt-1">
              Configure system themes, verify API endpoint status, and reset data nodes.
            </p>
          </header>

          <div className="mt-8 space-y-6">
            {/* API Status Section */}
            <section className="rounded-3xl border border-white/5 bg-slate-950/20 p-6 shadow-card backdrop-blur-xl">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <ShieldCheck className="size-4 text-cyan-300" />
                OpenAI Integration Status
              </h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed font-semibold">
                Checks if the server `.env` configuration contains a valid OpenAI API key.
              </p>

              <div className="mt-5 flex items-center gap-3">
                {apiKeyStatus === "loading" ? (
                  <span className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                    <RefreshCw className="size-4 animate-spin text-slate-500" /> Checking server keys...
                  </span>
                ) : apiKeyStatus === "configured" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3.5 py-1 text-xs font-bold text-emerald-300">
                    <ShieldCheck className="size-4" /> OpenAI Key: Active (Operational)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 px-3.5 py-1 text-xs font-bold text-amber-300">
                    <ShieldAlert className="size-4" /> Offline Sandbox Mode: Active (Simulated Workspace)
                  </span>
                )}
              </div>
            </section>

            {/* Themes / Language */}
            <section className="rounded-3xl border border-white/5 bg-slate-950/20 p-6 shadow-card backdrop-blur-xl space-y-4.5">
              <h3 className="text-sm font-bold text-slate-200">Preference Defaults</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Theme Model</label>
                  <select
                    disabled
                    className="w-full mt-2 rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2.5 text-xs text-slate-400 focus:outline-none"
                  >
                    <option>Premium Slate Dark (Active)</option>
                    <option>SaaS Light (Coming Soon)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Default Language</label>
                  <select
                    disabled
                    className="w-full mt-2 rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2.5 text-xs text-slate-400 focus:outline-none"
                  >
                    <option>English (United States)</option>
                    <option>Spanish (Coming Soon)</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Danger Zone Resets */}
            <section className="rounded-3xl border border-rose-500/10 bg-rose-950/5 p-6 shadow-card backdrop-blur-xl">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <ShieldAlert className="size-4 text-rose-400" />
                Danger Zone
              </h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed font-semibold">
                Instantly purges all localStorage startup profiles, workspace edits, and history logs.
              </p>

              <div className="mt-5">
                <Button
                  onClick={handleResetWorkspace}
                  disabled={resetting}
                  className="bg-rose-500/10 border border-rose-500/25 hover:bg-rose-500 text-rose-300 hover:text-white"
                >
                  {resetting ? "Resetting..." : "Reset Workspace Profile"}
                </Button>
              </div>
            </section>

            {/* About / Version Info */}
            <section className="flex items-start gap-3 rounded-2xl border border-white/[0.04] bg-white/[0.01] p-4.5">
              <Info className="size-4.5 text-cyan-300 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-200">About CoFoundr AI</h4>
                <p className="mt-1 text-[11px] text-slate-500 leading-relaxed font-medium">
                  CoFoundr AI Version 1.0.0. Designed as an AI Operating System for validating and building startups using coordinating agent teams.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
