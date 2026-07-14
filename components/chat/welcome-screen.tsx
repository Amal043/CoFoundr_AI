"use client";

import { motion } from "framer-motion";
import { BookOpen, Bot, Sparkles, Truck, Wallet } from "lucide-react";

interface WelcomeScreenProps {
  onSelectStarter: (text: string) => void;
}

const starters = [
  {
    text: "I want to build an AI tutor.",
    label: "AI Tutor",
    description: "Personalized education agent with tailored learning paths.",
    icon: BookOpen,
    color: "text-cyan-300 bg-cyan-400/10 ring-cyan-400/20",
  },
  {
    text: "I want to build a fintech app.",
    label: "Fintech Platform",
    description: "Micro-loans and smart financial planning for Gen Z.",
    icon: Wallet,
    color: "text-blue-300 bg-blue-400/10 ring-blue-400/20",
  },
  {
    text: "I want to build a logistics platform.",
    label: "Logistics Sync",
    description: "AI-driven dispatcher coordinating local delivery fleets.",
    icon: Truck,
    color: "text-violet-300 bg-violet-400/10 ring-violet-400/20",
  },
];

export function WelcomeScreen({ onSelectStarter }: WelcomeScreenProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center py-8 text-center sm:py-16">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative grid size-24 place-items-center rounded-[24px] border border-white/20 bg-gradient-to-br from-[#202d61] via-[#121b3b] to-[#1b1140] shadow-[0_0_50px_rgba(103,83,255,0.4)]"
      >
        <div className="absolute inset-1.5 rounded-[18px] border border-white/10" />
        <Bot className="size-10 text-cyan-200" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Meet your <span className="text-gradient">AI CEO</span>
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-300 sm:text-base">
          I will help guide your startup vision from an initial thought to an investor-ready business. 
          Let&apos;s evaluate your idea, target audience, pricing, and launch strategy together.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12 w-full grid gap-4 sm:grid-cols-3"
      >
        {starters.map((starter) => {
          const Icon = starter.icon;
          return (
            <button
              key={starter.label}
              onClick={() => onSelectStarter(starter.text)}
              className="group relative flex flex-col items-start rounded-2xl border border-white/10 bg-slate-950/40 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-slate-900/50 hover:shadow-glow"
            >
              <span className={`grid size-9 place-items-center rounded-lg ring-1 ${starter.color}`}>
                <Icon className="size-4.5" />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-white group-hover:text-cyan-300 transition">
                {starter.label}
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-slate-400">
                {starter.description}
              </p>
              <div className="absolute bottom-4 right-4 text-slate-600 transition group-hover:text-cyan-300">
                <Sparkles className="size-3.5" />
              </div>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
