"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Presentation, ShieldCheck } from "lucide-react";
import { WorkspaceData } from "@/types/workspace";

interface DeckViewerProps {
  workspace: WorkspaceData;
}

export function DeckViewer({ workspace }: DeckViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slides = [
    {
      title: "1. Executive Cover",
      label: "Cover",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <Presentation className="size-16 text-cyan-300 mb-6 animate-bounce" />
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {workspace.overview.name}
          </h2>
          <p className="mt-4 text-base text-slate-400 font-semibold max-w-lg leading-relaxed">
            {workspace.overview.tagline}
          </p>
          <div className="mt-8 rounded-full bg-cyan-500/10 px-4 py-1 text-xs font-bold text-cyan-300 border border-cyan-500/20">
            AI Pitch Deck Proposal
          </div>
        </div>
      ),
    },
    {
      title: "2. The Problem",
      label: "Problem",
      content: (
        <div className="flex flex-col justify-center h-full p-8 space-y-4">
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">The Core Market Pain</span>
          <h2 className="text-2xl font-bold text-white">Why Does This Pain Exist?</h2>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            {workspace.overview.problem}
          </p>
          <div className="rounded-2xl border border-rose-500/15 bg-rose-950/10 p-4 mt-2">
            <p className="text-[10px] font-bold text-rose-300 uppercase">Founder Core Concern</p>
            <p className="mt-1 text-xs text-slate-400">Current market alternatives are either too complex or fail to align operations.</p>
          </div>
        </div>
      ),
    },
    {
      title: "3. The Solution",
      label: "Solution",
      content: (
        <div className="flex flex-col justify-center h-full p-8 space-y-4">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Our Value Proposition</span>
          <h2 className="text-2xl font-bold text-white">Introducing {workspace.overview.name}</h2>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            {workspace.overview.solution}
          </p>
          <div className="rounded-2xl border border-emerald-500/15 bg-emerald-950/10 p-4 mt-2">
            <p className="text-[10px] font-bold text-emerald-300 uppercase">Core Architecture Value</p>
            <p className="mt-1 text-xs text-slate-400">A synchronized multi-agent reasoning panel updating startup parameters instantly.</p>
          </div>
        </div>
      ),
    },
    {
      title: "4. Market & Opportunity",
      label: "Market",
      content: (
        <div className="flex flex-col justify-center h-full p-8 space-y-4">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Target Opportunity</span>
          <h2 className="text-2xl font-bold text-white">Industry Analysis & Scale</h2>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            {workspace.research.marketSummary}
          </p>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-center">
              <span className="text-[9px] uppercase font-bold text-slate-500">Industry Sector</span>
              <p className="mt-1 text-xs font-bold text-slate-200">{workspace.overview.industry}</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-center">
              <span className="text-[9px] uppercase font-bold text-slate-500">Market Demand</span>
              <p className="mt-1 text-xs font-bold text-cyan-300">{workspace.research.marketDemand}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "5. Competitor Matrix",
      label: "Competition",
      content: (
        <div className="flex flex-col justify-center h-full p-8 space-y-4">
          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Landscape Analysis</span>
          <h2 className="text-2xl font-bold text-white">Direct & Indirect Competitors</h2>
          <div className="space-y-2.5 mt-2">
            {workspace.research.competitors.split("\n").map((comp, idx) => (
              <div key={idx} className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.01] p-3">
                <span className="grid size-5 shrink-0 place-items-center rounded bg-slate-900 text-[10px] font-bold text-slate-400">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">{comp}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "6. Business Model",
      label: "Model",
      content: (
        <div className="flex flex-col justify-center h-full p-8 space-y-4">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Revenue Streams</span>
          <h2 className="text-2xl font-bold text-white">Commercial Pricing Strategy</h2>
          <div className="grid gap-3.5 sm:grid-cols-2 mt-2">
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Model Structure</span>
              <p className="mt-1.5 text-xs text-slate-300 font-semibold">{workspace.overview.businessModel}</p>
            </div>
            <div className="rounded-2xl border border-cyan-500/10 bg-cyan-950/5 p-4">
              <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-300">Revenue Model</span>
              <p className="mt-1.5 text-xs text-slate-300 font-semibold">{workspace.finance.revenueModel}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-4 mt-2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Pricing Details</span>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed font-medium">{workspace.finance.pricing}</p>
          </div>
        </div>
      ),
    },
    {
      title: "7. MVP Feature Stack",
      label: "MVP Features",
      content: (
        <div className="flex flex-col justify-center h-full p-8 space-y-4">
          <span className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest">MVP Product Scoping</span>
          <h2 className="text-2xl font-bold text-white">Core Release Features</h2>
          <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-4.5 mt-2">
            <p className="text-xs text-slate-300 leading-7 font-medium">
              {workspace.product.mvpFeatures}
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3 mt-1">
            <span className="text-[9px] uppercase font-bold text-slate-500">Recommended Stack</span>
            <p className="mt-1 text-xs font-semibold text-slate-300 truncate">{workspace.product.techStack}</p>
          </div>
        </div>
      ),
    },
    {
      title: "8. Operational Roadmap",
      label: "Roadmap",
      content: (
        <div className="flex flex-col justify-center h-full p-8 space-y-4">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Dev Timeline</span>
          <h2 className="text-2xl font-bold text-white">Agile Launch Timeline</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
            {workspace.roadmap.slice(0, 4).map((node) => (
              <div key={node.id} className="rounded-xl border border-white/5 bg-slate-950/40 p-3.5 flex flex-col justify-between">
                <span className="text-[9px] font-bold uppercase text-cyan-300">{node.week}</span>
                <p className="mt-2 text-[10px] text-slate-400 leading-relaxed font-medium">{node.task}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "9. Financial Forecast",
      label: "Projections",
      content: (
        <div className="flex flex-col justify-center h-full p-8 space-y-4">
          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Forecasts & Runway</span>
          <h2 className="text-2xl font-bold text-white">12-Month Projections</h2>
          <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-4 mt-2">
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {workspace.finance.revenueProjection}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-center">
              <span className="text-[9px] uppercase font-bold text-slate-500">Launch Cost</span>
              <p className="mt-1 text-xs font-bold text-slate-200">{workspace.finance.startupCost}</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-center">
              <span className="text-[9px] uppercase font-bold text-slate-500">Break-even</span>
              <p className="mt-1 text-xs font-bold text-slate-200">{workspace.finance.breakEven}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "10. Funding Ask",
      label: "Funding Ask",
      content: (
        <div className="flex flex-col justify-center h-full p-8 space-y-4 text-center items-center">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Proposal Pitch</span>
          <h2 className="text-2xl font-extrabold text-white">Target Funding Requirement</h2>
          <p className="text-base font-extrabold text-cyan-300 tracking-tight mt-4">
            Required Capital: {workspace.finance.fundingNeed}
          </p>
          <p className="mt-2 text-xs text-slate-400 max-w-sm leading-6">
            Allocated primarily to core engineering scale, database integration, waitlist conversion, and cloud APIs.
          </p>
          <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <ShieldCheck className="size-4 text-emerald-400" />
            <span>Operational milestones aligned</span>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="space-y-6">
      {/* Slide Presentation Card Frame */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl border border-white/10 bg-slate-950/40 shadow-glow overflow-hidden z-10 flex flex-col justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(86,77,255,0.06),transparent_22rem)] pointer-events-none" />

        {/* Slide Title */}
        <div className="border-b border-white/[0.06] bg-slate-950/60 px-6 py-4 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <Presentation className="size-4 text-cyan-300" />
            {slides[currentSlide].title}
          </span>
          <span className="text-[10px] font-bold text-slate-500">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>

        {/* Animated Slide Body Content */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {slides[currentSlide].content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav trigger overlays */}
        <div className="border-t border-white/[0.06] bg-slate-950/40 px-6 py-4.5 flex items-center justify-between z-20">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-white transition"
          >
            <ChevronLeft className="size-4" />
            <span>Previous</span>
          </button>

          {/* Indicators dots */}
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentSlide ? 1 : -1);
                  setCurrentSlide(i);
                }}
                className={`size-2 rounded-full transition ${
                  i === currentSlide ? "bg-cyan-300 shadow-[0_0_8px_#67e8f9]" : "bg-slate-800 hover:bg-slate-700"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-white transition"
          >
            <span>Next</span>
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Grid of slides thumbnails */}
      <div className="grid grid-cols-5 gap-2.5">
        {slides.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentSlide ? 1 : -1);
              setCurrentSlide(idx);
            }}
            className={`rounded-xl border p-2.5 text-center text-[9px] font-bold uppercase tracking-wider transition ${
              idx === currentSlide
                ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-300 shadow-sm"
                : "border-white/5 bg-slate-950/20 text-slate-500 hover:border-white/10 hover:text-slate-300"
            }`}
          >
            {slide.label}
          </button>
        ))}
      </div>
    </div>
  );
}
