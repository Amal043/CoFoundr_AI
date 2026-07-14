"use client";

import { motion } from "framer-motion";
import { ArrowDown, BriefcaseBusiness, ClipboardCheck, Lightbulb, MessageSquareMore, SearchCheck, Workflow as WorkflowIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";

type WorkflowStep = { title: string; description: string; icon: LucideIcon; tone: string };

const steps: WorkflowStep[] = [
  { title: "Idea", description: "Bring the spark.", icon: Lightbulb, tone: "text-cyan-200 bg-cyan-400/10 ring-cyan-300/20" },
  { title: "AI Interview", description: "Find the real problem.", icon: MessageSquareMore, tone: "text-blue-200 bg-blue-400/10 ring-blue-300/20" },
  { title: "Research", description: "Test the opportunity.", icon: SearchCheck, tone: "text-indigo-200 bg-indigo-400/10 ring-indigo-300/20" },
  { title: "Planning", description: "Make decisive moves.", icon: ClipboardCheck, tone: "text-violet-200 bg-violet-400/10 ring-violet-300/20" },
  { title: "Workspace", description: "Keep it all connected.", icon: WorkflowIcon, tone: "text-fuchsia-200 bg-fuchsia-400/10 ring-fuchsia-300/20" },
  { title: "Investor Package", description: "Be ready to tell the story.", icon: BriefcaseBusiness, tone: "text-cyan-200 bg-cyan-400/10 ring-cyan-300/20" },
];

export function Workflow() {
  return (
    <section id="workflow" className="border-y border-white/[0.07] bg-[#080b1a]/55 py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading centered eyebrow="One continuous workflow" title={<>From a first thought to an <span className="text-gradient">investor conversation.</span></>} description="No disconnected generators. One intelligent loop that compounds context and makes every next step more useful." />
        <div className="relative mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-2">
          <div className="absolute left-[8%] right-[8%] top-10 hidden h-px bg-gradient-to-r from-cyan-400/0 via-violet-400/50 to-cyan-400/0 xl:block" />
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.4, delay: index * 0.07 }} className="relative text-center">
                <div className="mx-auto grid size-20 place-items-center rounded-2xl border border-white/10 bg-[#0c1124] shadow-card">
                  <span className={`grid size-11 place-items-center rounded-xl ring-1 ${step.tone}`}><Icon className="size-5" /></span>
                </div>
                <div className="mt-4"><p className="text-sm font-semibold text-white">{step.title}</p><p className="mx-auto mt-1 max-w-[145px] text-xs leading-5 text-slate-500">{step.description}</p></div>
                {index < steps.length - 1 && <ArrowDown className="mx-auto mt-4 size-4 text-violet-300/50 xl:hidden" />}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
