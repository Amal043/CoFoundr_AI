import { ArrowLeft, Clock3, Sparkles } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/shared/brand-mark";
import { Button } from "@/components/ui/button";

export function PhasePlaceholder({ title }: { title: string }) {
  return (
    <main className="grid min-h-screen place-items-center overflow-hidden bg-ink px-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(86,77,255,0.2),transparent_30rem)]" />
      <section className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0c1020]/80 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-12">
        <BrandMark className="justify-center" />
        <span className="mx-auto mt-10 grid size-14 place-items-center rounded-2xl bg-violet-400/10 text-violet-200 ring-1 ring-violet-300/20"><Clock3 className="size-6" /></span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">{title}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">Coming in Phase X</h1>
        <p className="mt-4 text-sm leading-6 text-slate-400">This area is being prepared as part of the CoFoundr AI foundation. More capability will arrive in a future phase.</p>
        <Link href="/" className="mt-8 inline-block"><Button variant="outline"><ArrowLeft className="size-4" /> Back to home</Button></Link>
        <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-500"><Sparkles className="size-3.5 text-violet-300" /> CoFoundr AI foundation</div>
      </section>
    </main>
  );
}
