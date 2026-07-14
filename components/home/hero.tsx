"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { HeroIllustration } from "@/components/home/hero-illustration";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-24 pt-36 sm:pb-32 sm:pt-44 lg:pb-40">
      <div className="absolute inset-0 -z-20 bg-hero-grid bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      <div className="absolute left-1/2 top-24 -z-10 h-[460px] w-[750px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="section-shell">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/[0.07] px-3 py-1.5 text-xs font-medium text-violet-200">
              <Sparkles className="size-3.5 text-cyan-300" /> The operating system for ambitious founders
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }} className="mt-6 text-5xl font-bold leading-[1.04] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              CoFoundr AI.<br />
              <span className="text-gradient">Your AI Founding Team.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.16 }} className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Turn startup ideas into investor-ready businesses with an intelligent AI CEO coordinating specialized agents for research, product strategy, finance, marketing, and fundraising.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard"><Button size="lg" className="w-full sm:w-auto">Start Building <ArrowRight className="size-4" /></Button></Link>
              <a href="#ceo" className="w-full sm:w-auto"><Button variant="outline" size="lg" className="w-full"><Play className="size-4 fill-current" /> View Demo</Button></a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.45 }} className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
              {["Idea to investor-ready", "Always connected", "Built for momentum"].map((value) => <span key={value} className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />{value}</span>)}
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.12 }} className="pt-3 lg:pt-0"><HeroIllustration /></motion.div>
        </div>
      </div>
    </section>
  );
}
