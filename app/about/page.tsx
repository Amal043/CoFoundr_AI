"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Brain, 
  Sparkles, 
  Target, 
  Compass, 
  TrendingUp, 
  Code, 
  Mail,
  UserCheck
} from "lucide-react";
import { BrandMark } from "@/components/shared/brand-mark";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ink text-slate-100 flex flex-col relative overflow-x-hidden antialiased">
      {/* Decorative Glows */}
      <div className="absolute -left-20 top-20 size-96 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 bottom-20 size-96 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

      {/* Header bar */}
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#080c1c]/75 px-4 py-3 shadow-2xl backdrop-blur-xl sm:px-5">
          <Link href="/" className="flex items-center gap-2" aria-label="CoFoundr AI home">
            <BrandMark />
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/" passHref>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white flex items-center gap-1.5">
                <ArrowLeft className="size-3.5" />
                <span>Back to Home</span>
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 section-shell pt-28 pb-20 md:pt-36">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Hero Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-semibold mb-2">
              <Sparkles className="size-3.5 animate-pulse" />
              <span>AI-Native OS for Startups</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              About CoFoundr <span className="text-gradient">AI</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-400 leading-relaxed">
              Empowering entrepreneurial builders to validate startup concepts, structure strategic parameters, and orchestrate decisions at the speed of intelligence.
            </p>
          </div>

          {/* The Vision & Core Idea (Glass Card) */}
          <div className="glass rounded-3xl border border-white/10 p-8 md:p-10 shadow-glow relative overflow-hidden">
            <div className="absolute right-0 top-0 size-40 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="grid size-12 place-items-center rounded-2xl bg-violet-500/10 text-violet-400 border border-violet-500/25 shrink-0">
                <Brain className="size-6" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Our Vision & Core Concept</h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Starting a new company requires wearing dozens of hats simultaneously: researching market size, drafting business models, projection-modeling pricing structures, scoping developer timelines, and creating go-to-market strategies. For small teams and solo founders, this workload can lead to strategic bottlenecks or misaligned execution plans.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  <strong>CoFoundr AI</strong> is designed to act as an automated, highly coordinated founding team. It uses a state-of-the-art multi-agent framework that behaves like a corporate boardroom to help founders build cohesive, investable business strategies.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works Grid */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white text-center md:text-left flex items-center justify-center md:justify-start gap-2.5">
              <Compass className="size-5 text-cyan-400" />
              <span>How the Workspace Operates</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1 */}
              <div className="glass rounded-2xl border border-white/10 p-6 space-y-4">
                <div className="grid size-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <UserCheck className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-white">1. Interactive Boardroom</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A foundational onboarding interview with an experienced AI CEO. You define key parameters—such as the startup&apos;s name, target audience, pricing, timeline, and competitive positioning—through natural conversation.
                </p>
              </div>

              {/* Card 2 */}
              <div className="glass rounded-2xl border border-white/10 p-6 space-y-4">
                <div className="grid size-10 place-items-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Sparkles className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-white">2. Multi-Agent Orchestration</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Once your variables are locked, specialized agents (Research, Product, Finance, and Marketing) compile deep reports on competitors, MVP scoping, 12-month projections, and launch plans.
                </p>
              </div>

              {/* Card 3 */}
              <div className="glass rounded-2xl border border-white/10 p-6 space-y-4">
                <div className="grid size-10 place-items-center rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  <TrendingUp className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-white">3. Intelligent Decision Engine</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Manual edits in the Notion-style workspace automatically trigger the decision engine. It traces dependencies and re-runs only the affected agents (e.g. changing pricing recalculates GTM loops and projections) for maximum consistency.
                </p>
              </div>

              {/* Card 4 */}
              <div className="glass rounded-2xl border border-white/10 p-6 space-y-4">
                <div className="grid size-10 place-items-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Target className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-white">4. Investor Cockpit</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Access a fully synchronized 10-slide pitch deck presentation viewer, cold outbound email templates preloaded with your metrics, and clean Markdown, JSON, and PDF exports.
                </p>
              </div>

            </div>
          </div>

          {/* Development Info & Tech Stack */}
          <div className="glass rounded-2xl border border-white/10 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Code className="size-4.5 text-slate-400" />
              <span>Technology & Architecture</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              CoFoundr AI is constructed on modern web foundations to guarantee fast page loads and responsive design. The stack includes:
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-5">
              <li><strong>Next.js 15</strong> (App Router, static & dynamic routes, dynamic API endpoints).</li>
              <li><strong>TypeScript</strong> for type safety and code clarity.</li>
              <li><strong>Tailwind CSS & Vanilla CSS</strong> for premium dark mode glassmorphism UI layouts.</li>
              <li><strong>Framer Motion</strong> for fluid animations and page transitions.</li>
              <li><strong>OpenAI completions API (gpt-4o-mini)</strong> for streaming conversational and analysis generation.</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="text-center p-8 rounded-3xl border border-white/5 bg-white/[0.01] space-y-6">
            <h3 className="text-xl font-extrabold text-white">Ready to align your startup strategy?</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Begin a collaborative interview session with the AI CEO boardroom to formulate a cohesive business strategy blueprint.
            </p>
            <div className="flex justify-center">
              <Link href="/new-startup" passHref>
                <Button size="lg" className="rounded-xl flex items-center gap-2">
                  <span>Get Started Now</span>
                  <Sparkles className="size-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <Mail className="size-4" />
              <span>Need help? Contact us at: <a href="mailto:support@cofoundr.ai" className="text-slate-400 hover:underline">support@cofoundr.ai</a></span>
            </div>
            <div className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">
              CoFoundr AI © 2026. Your AI Founding Team.
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
