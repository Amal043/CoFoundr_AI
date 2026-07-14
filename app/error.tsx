"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { BrandMark } from "@/components/shared/brand-mark";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global App Error Boundary]:", error);
  }, [error]);

  return (
    <div className="grid min-h-screen place-items-center bg-ink px-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(86,77,255,0.18),transparent_32rem)]" />
      <section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0c1020]/85 p-8 text-center shadow-2xl backdrop-blur-xl">
        <BrandMark className="justify-center" />
        
        <span className="mx-auto mt-10 grid size-14 place-items-center rounded-2xl bg-rose-500/10 text-rose-350 ring-1 ring-rose-450/25 animate-pulse">
          <AlertCircle className="size-6" />
        </span>
        
        <h1 className="mt-6 text-xl font-bold tracking-tight text-white">System Error Encountered</h1>
        <p className="mt-3 text-xs leading-6 text-slate-400">
          The application encountered an unexpected runtime exception in the co-founder agents sync stream.
        </p>
        
        <div className="mt-6 flex flex-col gap-2.5">
          <Button onClick={() => reset()} className="w-full">
            <RotateCcw className="size-4 mr-2" /> Re-initialize Boardroom
          </Button>
          <a href="/dashboard" className="w-full">
            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
              Return to Safety
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
