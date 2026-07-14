"use client";

import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { BrandMark } from "@/components/shared/brand-mark";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-ink px-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(86,77,255,0.18),transparent_32rem)]" />
      <section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0c1020]/85 p-8 text-center shadow-2xl backdrop-blur-xl">
        <BrandMark className="justify-center" />
        
        <span className="mx-auto mt-10 grid size-14 place-items-center rounded-2xl bg-rose-500/10 text-rose-300 ring-1 ring-rose-450/25">
          <AlertCircle className="size-6" />
        </span>
        
        <h1 className="mt-6 text-xl font-bold tracking-tight text-white">404 — Page Not Found</h1>
        <p className="mt-3 text-xs leading-6 text-slate-400">
          The boardroom page you are looking for has been relocated or does not exist.
        </p>
        
        <Link href="/dashboard" className="mt-6 inline-block">
          <Button className="group">
            <ArrowLeft className="size-4 mr-2 transition group-hover:-translate-x-0.5" />
            Back to Dashboard
          </Button>
        </Link>
      </section>
    </div>
  );
}
