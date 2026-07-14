"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  LayoutDashboard,
  MessageSquare,
  FileText,
  Settings,
  AlertCircle,
  Presentation,
  Mail,
  FileText as SummaryIcon,
  Download,
  Printer,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { BrandMark } from "@/components/shared/brand-mark";
import { Button } from "@/components/ui/button";
import { WorkspaceData } from "@/types/workspace";
import { loadWorkspaceData } from "@/lib/workspace/storage/store";
import { DeckViewer } from "@/components/investor/deck-viewer";
import { EmailTemplates } from "@/components/investor/email-templates";

type InvestorTab = "deck" | "summary" | "emails";

export default function InvestorPage() {
  const [workspace, setWorkspace] = useState<WorkspaceData | null>(null);
  const [activeTab, setActiveTab] = useState<InvestorTab>("deck");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load store data on mount
  useEffect(() => {
    const data = loadWorkspaceData();
    if (data) {
      setWorkspace(data);
    }
  }, []);

  // Exporters: 1. Markdown compiler
  const handleExportMarkdown = () => {
    if (!workspace) return;

    const mdContent = `# CoFoundr AI Startup Blueprint: ${workspace.overview.name}
Generated on: ${new Date().toLocaleDateString()}

==================================================
1. STARTUP OVERVIEW
==================================================
- **Startup Name**: ${workspace.overview.name}
- **Tagline**: ${workspace.overview.tagline}
- **Problem**: ${workspace.overview.problem}
- **Solution**: ${workspace.overview.solution}
- **Mission**: ${workspace.overview.mission}
- **Vision**: ${workspace.overview.vision}
- **Target Users**: ${workspace.overview.targetUsers}
- **Industry**: ${workspace.overview.industry}
- **Business Model**: ${workspace.overview.businessModel}

==================================================
2. MARKET RESEARCH & SWOT
==================================================
- **Market Summary**: ${workspace.research.marketSummary}
- **Competitors**: ${workspace.research.competitors}
- **Market Demand Score**: ${workspace.research.marketDemand}
- **Full SWOT Matrix**: 
${workspace.research.swotAnalysis}
- **Opportunities**: ${workspace.research.opportunities}
- **Risks**: ${workspace.research.risks}
- **CEO Recommendations**: ${workspace.research.recommendations}

==================================================
3. PRODUCT MVP STRATEGY
==================================================
- **Phase 1 MVP Features**: ${workspace.product.mvpFeatures}
- **Future Features Roadmap**: ${workspace.product.futureFeatures}
- **Recommended Tech Stack**: ${workspace.product.techStack}
- **Development Roadmap**: ${workspace.product.devRoadmap}
- **Timeline Milestones**: ${workspace.product.timeline}

==================================================
4. FINANCIAL MODELING & PRICING
==================================================
- **Pricing Plan**: ${workspace.finance.pricing}
- **Revenue Model**: ${workspace.finance.revenueModel}
- **12-Month Projections**: ${workspace.finance.revenueProjection}
- **Required Funding Ask**: ${workspace.finance.fundingNeed}
- **Startup Launch Costs**: ${workspace.finance.startupCost}
- **Break-even Forecast**: ${workspace.finance.breakEven}

==================================================
5. GO-TO-MARKET MARKETING
==================================================
- **Go-To-Market Plan**: ${workspace.marketing.gtmPlan}
- **Acquisition Channels**: ${workspace.marketing.channels}
- **Target Audience**: ${workspace.marketing.targetAudience}
- **Social Strategy Loops**: ${workspace.marketing.socialStrategy}
- **Viral Referral Growth**: ${workspace.marketing.growthPlan}

==================================================
6. 4-WEEK LAUNCH ROADMAP
==================================================
${workspace.roadmap.map((node) => `- ${node.week}: ${node.task}`).join("\n")}

==================================================
7. BUSINESS MODEL CANVAS (9-BOX)
==================================================
- **Key Partners**: ${workspace.canvas.partners}
- **Key Activities**: ${workspace.canvas.activities}
- **Key Resources**: ${workspace.canvas.resources}
- **Value Propositions**: ${workspace.canvas.valuePropositions}
- **Customer Relationships**: ${workspace.canvas.relationships}
- **Channels**: ${workspace.canvas.channels}
- **Customer Segments**: ${workspace.canvas.segments}
- **Cost Structure**: ${workspace.canvas.costs}
- **Revenue Streams**: ${workspace.canvas.revenues}
`;

    const blob = new Blob([mdContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${workspace.overview.name.toLowerCase().replace(/\s+/g, "-")}-blueprint.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Exporters: 2. JSON exporter
  const handleExportJSON = () => {
    if (!workspace) return;
    const blob = new Blob([JSON.stringify(workspace, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${workspace.overview.name.toLowerCase().replace(/\s+/g, "-")}-workspace.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Exporters: 3. PDF print trigger
  const handlePrintPDF = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

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
      {/* Navigation Sidebar (Desktop) */}
      <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#070a19]/90 p-5 lg:flex lg:flex-col print:hidden">
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
            className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition"
          >
            <Presentation className="size-4.5 text-cyan-300" />
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

      {/* Main Investor Package Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8 print:p-0 print:bg-white print:text-black">
        <div className="mx-auto max-w-5xl">
          {/* Header Panel */}
          <div className="flex flex-col gap-4 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-center sm:justify-between print:hidden">
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                Investor Package
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Pitch decks, email campaigns, and executive blueprints compiled dynamically.
              </p>
            </div>

            {/* Export triggers */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-slate-400 hover:text-white transition lg:hidden"
                aria-label="Toggle Navigation Categories"
              >
                <Menu className="size-4.5" />
              </button>

              <button
                onClick={handleExportMarkdown}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2 text-xs font-bold text-slate-300 hover:border-cyan-500/30 hover:text-white transition"
              >
                <Download className="size-3.5" />
                <span>Markdown</span>
              </button>
              <button
                onClick={handleExportJSON}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2 text-xs font-bold text-slate-300 hover:border-cyan-500/30 hover:text-white transition"
              >
                <Download className="size-3.5" />
                <span>JSON</span>
              </button>
              <button
                onClick={handlePrintPDF}
                className="flex items-center gap-1.5 rounded-lg border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 px-3.5 py-2 text-xs font-bold text-cyan-300 hover:text-white transition"
              >
                <Printer className="size-3.5" />
                <span>PDF Print</span>
              </button>
            </div>
          </div>

          {/* Mobile Category Navigation Drawer */}
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
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-400 hover:bg-white/[0.02] hover:text-white transition"
                    >
                      <LayoutDashboard className="size-4" />
                      <span>Overview</span>
                    </Link>
                    <Link
                      href="/chat"
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-400 hover:bg-white/[0.02] hover:text-white transition"
                    >
                      <MessageSquare className="size-4" />
                      <span>AI CEO Chat</span>
                    </Link>
                    <Link
                      href="/workspace"
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-400 hover:bg-white/[0.02] hover:text-white transition"
                    >
                      <FileText className="size-4" />
                      <span>Workspace</span>
                    </Link>
                    <Link
                      href="/investor"
                      className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white transition"
                    >
                      <Presentation className="size-4 text-cyan-300" />
                      <span>Investor Package</span>
                    </Link>
                  </nav>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Sub-tabs selection */}
          <div className="mt-8 flex gap-2 border-b border-white/5 pb-4 print:hidden">
            {[
              { key: "deck", label: "Pitch Presentation Deck", icon: Presentation },
              { key: "summary", label: "Executive Summary", icon: SummaryIcon },
              { key: "emails", label: "Investor Outreach Emails", icon: Mail },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as InvestorTab)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-bold transition ${
                    activeTab === tab.key
                      ? "bg-white/[0.04] text-white border border-white/10 shadow-sm"
                      : "text-slate-400 hover:bg-white/[0.01] hover:text-slate-200"
                  }`}
                >
                  <Icon className="size-4 text-cyan-300" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TABS BODY CONTENT */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* A. Pitch Presentation Deck */}
                {activeTab === "deck" && <DeckViewer workspace={workspace} />}

                {/* B. Executive Summary Brief */}
                {activeTab === "summary" && (
                  <div className="space-y-6 print:space-y-8 print:text-black">
                    {/* Header for print only */}
                    <div className="hidden print:block border-b border-slate-300 pb-4 text-center">
                      <h1 className="text-3xl font-extrabold">{workspace.overview.name}</h1>
                      <p className="text-sm text-slate-600 mt-1 italic">{workspace.overview.tagline}</p>
                      <p className="text-xs text-slate-500 mt-2">Executive Summary Brief Proposal</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3 print:grid-cols-3">
                      <div className="rounded-2xl border border-white/5 bg-slate-950/20 p-5 print:border-slate-200 print:bg-white">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 print:text-slate-600">
                          Industry Sector
                        </span>
                        <p className="mt-2 text-sm font-bold text-white print:text-black">
                          {workspace.overview.industry}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/5 bg-slate-950/20 p-5 print:border-slate-200 print:bg-white">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 print:text-slate-600">
                          Business Model
                        </span>
                        <p className="mt-2 text-sm font-bold text-white print:text-black">
                          {workspace.overview.businessModel}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-cyan-500/10 bg-cyan-950/5 p-5 print:border-slate-200 print:bg-white">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-300 print:text-slate-600">
                          Funding Ask Target
                        </span>
                        <p className="mt-2 text-sm font-bold text-cyan-300 print:text-black">
                          {workspace.finance.fundingNeed}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-[#080d20]/30 p-6 print:border-slate-200 print:bg-white">
                      <h3 className="text-sm font-bold text-white print:text-black border-b border-white/5 pb-2">
                        Company Overview
                      </h3>
                      <p className="mt-3 text-xs text-slate-300 leading-relaxed font-medium print:text-slate-800">
                        {workspace.overview.name} is building {workspace.overview.tagline.toLowerCase()} Our vision is: {workspace.overview.vision}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 print:grid-cols-2">
                      <div className="rounded-2xl border border-white/5 bg-slate-950/20 p-6 print:border-slate-200 print:bg-white">
                        <h3 className="text-sm font-bold text-white print:text-black border-b border-white/5 pb-2">
                          The Core Market Pain
                        </h3>
                        <p className="mt-3 text-xs text-slate-300 leading-relaxed font-medium print:text-slate-800">
                          {workspace.overview.problem}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/5 bg-slate-950/20 p-6 print:border-slate-200 print:bg-white">
                        <h3 className="text-sm font-bold text-white print:text-black border-b border-white/5 pb-2">
                          Our Proposed Solution
                        </h3>
                        <p className="mt-3 text-xs text-slate-300 leading-relaxed font-medium print:text-slate-800">
                          {workspace.overview.solution}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-[#080d20]/30 p-6 print:border-slate-200 print:bg-white">
                      <h3 className="text-sm font-bold text-white print:text-black border-b border-white/5 pb-2">
                        Target Market Size & Segment
                      </h3>
                      <p className="mt-3 text-xs text-slate-300 leading-relaxed font-medium print:text-slate-800">
                        {workspace.research.marketSummary} Target segment covers: {workspace.overview.targetUsers}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 print:grid-cols-2">
                      <div className="rounded-2xl border border-white/5 bg-slate-950/20 p-6 print:border-slate-200 print:bg-white">
                        <h3 className="text-sm font-bold text-white print:text-black border-b border-white/5 pb-2">
                          Revenue Model Details
                        </h3>
                        <p className="mt-3 text-xs text-slate-300 leading-relaxed font-medium print:text-slate-800">
                          {workspace.finance.revenueModel} Pricing tiers structure: {workspace.finance.pricing}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/5 bg-slate-950/20 p-6 print:border-slate-200 print:bg-white">
                        <h3 className="text-sm font-bold text-white print:text-black border-b border-white/5 pb-2">
                          Future Product Milestones
                        </h3>
                        <p className="mt-3 text-xs text-slate-300 leading-relaxed font-medium print:text-slate-800">
                          {workspace.product.futureFeatures} Dev timeline roadmap: {workspace.product.devRoadmap}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* C. Investor Outreach Emails */}
                {activeTab === "emails" && <EmailTemplates workspace={workspace} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
