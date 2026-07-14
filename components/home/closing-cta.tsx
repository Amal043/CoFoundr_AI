import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function ClosingCta() {
  return (
    <section className="pb-24 sm:pb-32">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-3xl border border-violet-300/20 bg-gradient-to-br from-[#14184a] via-[#10142e] to-[#090b1b] px-6 py-14 text-center shadow-[0_25px_80px_rgba(18,22,78,0.4)] sm:px-12 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(90,115,255,0.26),transparent_45%),radial-gradient(circle_at_0%_100%,rgba(140,72,255,0.17),transparent_35%)]" />
          <div className="relative mx-auto max-w-2xl"><span className="inline-flex size-11 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-100"><Sparkles className="size-5" /></span><h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-5xl">Your next co-founder is ready when you are.</h2><p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-300">Bring the idea. CoFoundr AI will help you give it direction, evidence, a plan, and a story worth backing.</p><Link href="/dashboard" className="mt-8 inline-block"><Button size="lg">Start Building <ArrowRight className="size-4" /></Button></Link></div>
        </div>
      </div>
    </section>
  );
}
