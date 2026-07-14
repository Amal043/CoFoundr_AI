import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

export function BrandMark({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-violet-600 shadow-[0_0_24px_rgba(76,119,255,0.45)]">
        <span className="absolute inset-[3px] rounded-[9px] border border-white/35" />
        <Sparkles className="relative size-4.5 text-white" strokeWidth={2.4} />
      </span>
      {!compact && <span className="font-display text-lg font-bold tracking-tight text-white">CoFoundr <span className="text-gradient">AI</span></span>}
    </div>
  );
}
