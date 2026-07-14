"use client";

import { motion } from "framer-motion";
import { BotMessageSquare, CircleCheck, DatabaseZap, Handshake, LayoutPanelTop } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";

type Benefit = { title: string; copy: string; icon: LucideIcon };
const benefits: Benefit[] = [
  { title: "Not another chatbot", copy: "A system that guides work forward, instead of returning isolated answers.", icon: BotMessageSquare },
  { title: "Persistent startup memory", copy: "Your assumptions and decisions stay in context as the startup evolves.", icon: DatabaseZap },
  { title: "Multi-agent collaboration", copy: "Every specialist brings depth; the CEO brings alignment.", icon: Handshake },
  { title: "Investor-ready outputs", copy: "Turn your workspace into a coherent story when the opportunity arrives.", icon: CircleCheck },
  { title: "Interactive planning", copy: "Change a key assumption and see the strategy move with you.", icon: LayoutPanelTop },
];

export function Advantages() {
  return (
    <section className="py-24 sm:py-32">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <SectionHeading eyebrow="Why CoFoundr AI" title={<>Built for the <span className="text-gradient">messy middle.</span></>} description="The hardest part of building is not getting an answer. It is keeping the thousand small decisions pointed in the same direction." />
        <div className="grid gap-3 sm:grid-cols-2">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isLast = index === benefits.length - 1;
            return <motion.article key={benefit.title} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.38, delay: index * 0.05 }} className={`rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.015] p-5 shadow-card ${isLast ? "sm:col-span-2" : ""}`}>
              <span className="grid size-10 place-items-center rounded-lg bg-violet-400/10 text-violet-200 ring-1 ring-violet-300/15"><Icon className="size-4.5" /></span>
              <h3 className="mt-5 text-sm font-semibold text-white">{benefit.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{benefit.copy}</p>
            </motion.article>;
          })}
        </div>
      </div>
    </section>
  );
}
