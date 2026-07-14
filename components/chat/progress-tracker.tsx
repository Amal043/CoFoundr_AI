"use client";

import { Check, CircleDot, Circle } from "lucide-react";

export interface InterviewProgress {
  idea: "pending" | "in_progress" | "completed";
  problem: "pending" | "in_progress" | "completed";
  audience: "pending" | "in_progress" | "completed";
  businessModel: "pending" | "in_progress" | "completed";
  revenue: "pending" | "in_progress" | "completed";
  launch: "pending" | "in_progress" | "completed";
}

interface ProgressTrackerProps {
  progress: InterviewProgress;
  className?: string;
}

export function ProgressTracker({ progress, className = "" }: ProgressTrackerProps) {
  const steps = [
    { key: "idea", label: "Startup Idea", status: progress.idea },
    { key: "problem", label: "Problem", status: progress.problem },
    { key: "audience", label: "Target Audience", status: progress.audience },
    { key: "businessModel", label: "Business Model", status: progress.businessModel },
    { key: "revenue", label: "Revenue Plan", status: progress.revenue },
    { key: "launch", label: "Launch Target", status: progress.launch },
  ];

  const completedCount = steps.filter((step) => step.status === "completed").length;
  const percentage = Math.round((completedCount / steps.length) * 100);

  return (
    <div className={`flex flex-col h-full rounded-3xl border border-white/10 bg-[#070b19]/80 p-5 shadow-2xl backdrop-blur-xl ${className}`}>
      <div>
        <h2 className="text-base font-bold text-white flex items-center justify-between">
          <span>Interview Progress</span>
          <span className="text-xs font-mono text-cyan-300">{percentage}%</span>
        </h2>
        <div className="mt-3.5 h-1.5 w-full rounded-full bg-white/[0.04] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="mt-8 flex-1 relative flex flex-col justify-between">
        {/* Connecting Line */}
        <div className="absolute left-3.5 top-3 bottom-3 w-px bg-white/[0.08]" />

        {steps.map((step) => {
          const isCompleted = step.status === "completed";
          const isInProgress = step.status === "in_progress";

          return (
            <div key={step.key} className="flex items-center gap-3.5 z-10 py-1.5">
              <div className="flex items-center justify-center">
                {isCompleted ? (
                  <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                ) : isInProgress ? (
                  <span className="grid size-7 place-items-center rounded-full bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/30 animate-pulse">
                    <CircleDot className="size-4" strokeWidth={2.5} />
                  </span>
                ) : (
                  <span className="grid size-7 place-items-center rounded-full bg-[#0a0e20] text-slate-600 ring-1 ring-white/10">
                    <Circle className="size-3.5" />
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-sm font-semibold tracking-tight ${
                    isCompleted
                      ? "text-slate-300"
                      : isInProgress
                      ? "text-cyan-300"
                      : "text-slate-500"
                  }`}
                >
                  {step.label}
                </span>
                <span className="text-[10px] text-slate-600 font-medium">
                  {isCompleted
                    ? "Completed"
                    : isInProgress
                    ? "Reviewing details"
                    : "Not started"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
