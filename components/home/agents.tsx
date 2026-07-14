"use client";

import { motion } from "framer-motion";
import { BarChart3, Boxes, Megaphone, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";

type Agent = {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  iconStyle: string;
  note: string;
};

const agents: Agent[] = [
  { title: "Research Agent", description: "Find the market signals, customer pain points, competitors, and untapped opportunities worth pursuing.", icon: Search, gradient: "from-cyan-500/20 via-blue-500/10 to-transparent", iconStyle: "bg-cyan-400/15 text-cyan-200 ring-cyan-300/20", note: "Market intelligence" },
  { title: "Finance Agent", description: "Shape pricing, model revenue, map costs, and turn assumptions into a credible funding narrative.", icon: BarChart3, gradient: "from-blue-500/20 via-indigo-500/10 to-transparent", iconStyle: "bg-blue-400/15 text-blue-200 ring-blue-300/20", note: "Financial clarity" },
  { title: "Product Agent", description: "Translate insight into a focused MVP, ruthless feature priorities, and a roadmap built for learning.", icon: Boxes, gradient: "from-violet-500/20 via-indigo-500/10 to-transparent", iconStyle: "bg-violet-400/15 text-violet-200 ring-violet-300/20", note: "Product direction" },
  { title: "Marketing Agent", description: "Build the positioning, launch plan, and acquisition engine that gets the right people to care.", icon: Megaphone, gradient: "from-fuchsia-500/20 via-violet-500/10 to-transparent", iconStyle: "bg-fuchsia-400/15 text-fuchsia-200 ring-fuchsia-300/20", note: "Go-to-market" },
];

export function Agents() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading eyebrow="Four agents. One direction." title={<>Your founding team, <span className="text-gradient">already aligned.</span></>} description="Specialists do the deep work in their lanes. Your AI CEO keeps every decision, document, and strategy moving together." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <motion.article key={agent.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.08 }} whileHover={{ y: -7 }} className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/55 p-6 shadow-card backdrop-blur-xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-70 transition duration-500 group-hover:opacity-100`} />
                <div className="relative">
                  <div className={`grid size-12 place-items-center rounded-xl ring-1 ${agent.iconStyle}`}><Icon className="size-5" /></div>
                  <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">{agent.note}</p>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-white">{agent.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{agent.description}</p>
                </div>
                <div className="absolute bottom-5 right-5 size-12 rounded-full bg-white/[0.035] blur-xl transition group-hover:bg-violet-400/20" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
