import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/shared/brand-mark";


export function Footer() {
  return (
    <footer id="about" className="border-t border-white/10 bg-[#050713]/70">
      <div className="section-shell py-12 sm:py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-sm">
            <BrandMark />
            <p className="mt-4 text-sm leading-6 text-slate-400">
              AI-powered startup workspace helping founders validate ideas, plan products, and build investor-ready businesses.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-400">
            <Link href="/about" className="transition hover:text-white">About</Link>
            <Link href="/privacy" className="transition hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="transition hover:text-white">Terms & Conditions</Link>
            <a href="mailto:support@cofoundr.ai" className="transition hover:text-white">Contact</a>
          </div>
        </div>
        <div className="mt-10 flex flex-col-reverse gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} CoFoundr AI. Your AI Founding Team. Built for founders with conviction.</p>
          <div className="flex items-center gap-3">
            {[Github, Twitter, Linkedin].map((Icon, index) => (
              <a key={index} href="#" aria-label="Social link" className="grid size-8 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:border-violet-400/40 hover:bg-violet-400/10 hover:text-violet-200"><Icon className="size-4" /></a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
