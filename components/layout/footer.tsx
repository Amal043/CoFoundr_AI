import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/shared/brand-mark";

const footerLinks = ["About", "Privacy", "Terms"];

export function Footer() {
  return (
    <footer id="about" className="border-t border-white/10 bg-[#050713]/70">
      <div className="section-shell py-12 sm:py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-sm">
            <BrandMark />
            <p className="mt-4 text-sm leading-6 text-slate-400">The AI founding team that turns ambitious ideas into investor-ready startups.</p>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-400">
            {footerLinks.map((link) => <Link key={link} href="#" className="transition hover:text-white">{link}</Link>)}
            <a href="https://github.com" target="_blank" rel="noreferrer" className="transition hover:text-white">GitHub</a>
            <a href="https://openai.com" target="_blank" rel="noreferrer" className="transition hover:text-white">OpenAI Build Week</a>
          </div>
        </div>
        <div className="mt-10 flex flex-col-reverse gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} CoFoundr AI. Built for founders with conviction.</p>
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
