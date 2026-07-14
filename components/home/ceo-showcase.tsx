"use client";

import { motion } from "framer-motion";
import { Bot, BrainCircuit, FileStack, Route, Sparkles } from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";

const ceoSteps = [
  { icon: BrainCircuit, title: "Coordinates every agent", copy: "Delegates the right work at the right time." },
  { icon: Route, title: "Creates startup strategy", copy: "Turns scattered signals into clear decisions." },
  { icon: FileStack, title: "Maintains startup memory", copy: "Keeps every artifact connected to your context." },
  { icon: Sparkles, title: "Generates investor package", copy: "Makes your work ready for its next conversation." },
];

export function CeoShowcase() {
  return (
    <section id="ceo" className="relative py-24 sm:py-32">
      <div className="absolute inset-x-0 top-1/2 -z-10 h-[520px] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(90,72,255,0.15),transparent_68%)]" />
      <div className="section-shell grid items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
        <div className="order-2 lg:order-1">
          <SectionHeading eyebrow="One strategic brain" title={<>Meet your <span className="text-gradient">AI CEO.</span></>} description="It does not replace your judgment. It gives your judgment an always-on team that understands where you are, what changed, and what matters next." />
          <div className="mt-9 space-y-3">
            {ceoSteps.map((step, index) => {
              const Icon = step.icon;
              return <motion.div key={step.title} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.45, delay: index * 0.07 }} className="group flex gap-4 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 transition hover:border-violet-300/30 hover:bg-violet-500/[0.05]">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-violet-400/10 text-violet-200 ring-1 ring-violet-300/15"><Icon className="size-4" /></span>
                <div><h3 className="text-sm font-semibold text-white">{step.title}</h3><p className="mt-1 text-sm text-slate-400">{step.copy}</p></div>
              </motion.div>;
            })}
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto grid aspect-square max-w-[470px] place-items-center">
            <div className="absolute inset-[8%] rounded-full border border-dashed border-violet-300/25" />
            <div className="absolute inset-[19%] rounded-full border border-blue-300/15" />
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 38, ease: "linear" }} className="absolute inset-[3%] rounded-full border border-dashed border-cyan-300/15" />
            {[{ label: "Research", position: "left-0 top-[24%]", color: "border-cyan-300/30 text-cyan-100" }, { label: "Finance", position: "right-0 top-[24%]", color: "border-blue-300/30 text-blue-100" }, { label: "Product", position: "left-[8%] bottom-[11%]", color: "border-violet-300/30 text-violet-100" }, { label: "Marketing", position: "right-[5%] bottom-[11%]", color: "border-fuchsia-300/30 text-fuchsia-100" }].map((agent, index) => <motion.div key={agent.label} animate={{ y: [0, index % 2 === 0 ? -7 : 7, 0] }} transition={{ duration: 3.5 + index * 0.3, repeat: Infinity, ease: "easeInOut" }} className={`absolute ${agent.position} rounded-lg border ${agent.color} bg-[#0a1024]/90 px-3 py-2 text-[10px] font-semibold shadow-lg backdrop-blur-md`}>{agent.label}</motion.div>)}
            <div className="absolute size-40 rounded-full bg-violet-500/25 blur-[52px]" />
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative grid size-28 place-items-center rounded-[30px] border border-white/20 bg-gradient-to-br from-[#202d61] via-[#121b3b] to-[#1b1140] shadow-[0_0_70px_rgba(103,83,255,0.5)]">
              <div className="absolute inset-2 rounded-[23px] border border-white/10" /><Bot className="size-12 text-cyan-200" strokeWidth={1.6} /><span className="absolute -bottom-4 rounded-full border border-violet-300/25 bg-[#12152b] px-3 py-1 text-[10px] font-semibold text-violet-100">AI CEO</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
