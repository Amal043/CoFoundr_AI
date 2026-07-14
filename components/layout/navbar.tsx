"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { BrandMark } from "@/components/shared/brand-mark";
import { Button } from "@/components/ui/button";
import type { NavigationItem } from "@/types/navigation";

const navigation: NavigationItem[] = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#080c1c]/75 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-5">
        <Link href="#home" aria-label="CoFoundr AI home" onClick={closeMenu}>
          <BrandMark />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate-400 transition hover:text-white">
              {item.label}
            </Link>
          ))}
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-slate-400 transition hover:text-white">
            GitHub
          </a>
        </div>

        <div className="hidden sm:block">
          <Link href="/dashboard"><Button size="sm">Get Started</Button></Link>
        </div>

        <button
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 sm:hidden"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-[#090d1e]/95 p-3 shadow-2xl backdrop-blur-xl sm:hidden"
          >
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMenu} className="block rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link href="/dashboard" onClick={closeMenu} className="mt-2 block"><Button className="w-full">Get Started</Button></Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
