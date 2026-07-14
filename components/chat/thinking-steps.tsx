"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function ThinkingSteps() {
  const steps = [
    "Understanding startup concept",
    "Researching market context",
    "Structuring revenue mechanics",
    "Designing MVP scope",
    "Preparing strategic blueprint",
    "Resolving CEO validation checks",
  ];

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 900); // cycle step every 900ms

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="space-y-2 py-2 px-1 min-w-[210px]">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
        AI CEO Reasoning Pipeline
      </p>
      {steps.map((step, idx) => {
        const isCompleted = idx < activeStep;
        const isCurrent = idx === activeStep;

        if (idx > activeStep + 1) return null; // Only show active and near steps

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs font-semibold"
          >
            {isCompleted ? (
              <span className="grid size-4 shrink-0 place-items-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Check className="size-2.5" />
              </span>
            ) : isCurrent ? (
              <Loader2 className="size-3.5 text-cyan-300 animate-spin shrink-0" />
            ) : (
              <span className="size-1.5 rounded-full bg-slate-800 shrink-0 ml-1" />
            )}
            <span
              className={
                isCompleted
                  ? "text-slate-500 line-through"
                  : isCurrent
                  ? "text-cyan-300 font-bold"
                  : "text-slate-600"
              }
            >
              {step}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
