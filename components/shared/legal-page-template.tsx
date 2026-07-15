"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Printer, 
  Copy, 
  Check, 
  Search, 
  X, 
  ArrowUp, 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Calendar, 
  Lock,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/shared/brand-mark";
import { Button } from "@/components/ui/button";

export interface LegalSection {
  id: string;
  title: string;
  searchText: string; // Plain text version for searching
  content: React.ReactNode;
}

interface LegalPageTemplateProps {
  title: string;
  lastUpdated: string;
  tagline: string;
  estimatedReadingTime: string;
  sections: LegalSection[];
  type: "privacy" | "terms";
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function LegalPageTemplate({
  title,
  lastUpdated,
  tagline,
  estimatedReadingTime,
  sections,
  type
}: LegalPageTemplateProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [activeSectionId, setActiveSectionId] = useState("");
  
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Initialize all sections as expanded
  useEffect(() => {
    const initial: Record<string, boolean> = {};
    sections.forEach((s) => {
      initial[s.id] = true;
    });
    setExpandedSections(initial);
  }, [sections]);

  // Track scroll progress and active section for TOC
  useEffect(() => {
    const handleScroll = () => {
      // 1. Scroll Progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.pageYOffset / totalScroll) * 100);
      } else {
        setScrollProgress(0);
      }

      // 2. Back to Top visibility
      if (window.pageYOffset > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // 3. Active Section Detection
      let currentActiveId = "";
      const scrollPosition = window.pageYOffset + 200; // Offset for trigger

      for (const section of sections) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentActiveId = section.id;
            break;
          }
        }
      }

      if (currentActiveId && currentActiveId !== activeSectionId) {
        setActiveSectionId(currentActiveId);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger initial calculation
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, activeSectionId]);

  // Copy Link Handler
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Print Handler
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      // Offset for sticky headers
      const yOffset = -90; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      
      // Make sure it is expanded on mobile if clicked from TOC
      setExpandedSections((prev) => ({ ...prev, [id]: true }));
      setActiveSectionId(id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const updated: Record<string, boolean> = {};
    sections.forEach((s) => {
      updated[s.id] = true;
    });
    setExpandedSections(updated);
  };

  const collapseAll = () => {
    const updated: Record<string, boolean> = {};
    sections.forEach((s) => {
      updated[s.id] = false;
    });
    setExpandedSections(updated);
  };

  // Filter sections by search query
  const filteredSections = sections.filter((section) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      section.title.toLowerCase().includes(query) ||
      section.searchText.toLowerCase().includes(query)
    );
  });

  // Helper to highlight text in titles
  const highlightTitle = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${escapeRegExp(highlight)})`, "gi");
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-violet-500/40 text-cyan-200 rounded-sm px-0.5 font-semibold">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-ink text-slate-100 flex flex-col relative overflow-x-hidden antialiased">
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 z-50 transition-all duration-100 print:hidden" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Decorative Glows */}
      <div className="absolute -left-20 top-20 size-80 rounded-full bg-violet-600/5 blur-3xl pointer-events-none print:hidden" />
      <div className="absolute -right-20 bottom-20 size-80 rounded-full bg-cyan-600/5 blur-3xl pointer-events-none print:hidden" />

      {/* Header bar */}
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-5 print:hidden">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#080c1c]/75 px-4 py-3 shadow-2xl backdrop-blur-xl sm:px-5">
          <Link href="/" className="flex items-center gap-2" aria-label="CoFoundr AI home">
            <BrandMark />
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/" passHref>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white flex items-center gap-1.5">
                <ArrowLeft className="size-3.5" />
                <span>Back to Home</span>
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 section-shell pt-28 pb-20 md:pt-36">
        <div className="max-w-5xl mx-auto">
          {/* Professional Header Banner */}
          <div className="text-center md:text-left border-b border-white/10 pb-8 mb-12 relative">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-semibold mb-4">
                  {type === "privacy" ? (
                    <Lock className="size-3.5 animate-pulse" />
                  ) : (
                    <FileText className="size-3.5 animate-pulse" />
                  )}
                  <span>Legal Document</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                  {title}
                </h1>
                <p className="mt-4 text-base text-slate-400 font-medium leading-relaxed">
                  {tagline}
                </p>
              </div>

              <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  <Calendar className="size-3.5" />
                  <span>Last Updated: {lastUpdated}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  <Clock className="size-3.5" />
                  <span>{estimatedReadingTime}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions (Print, Copy, etc.) */}
            <div className="mt-8 flex flex-wrap gap-2.5 justify-center md:justify-start print:hidden">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrint}
                className="text-xs border-white/10 bg-white/[0.02]"
                aria-label="Print this document"
              >
                <Printer className="size-3.5" />
                <span>Print Document</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopyLink}
                className="text-xs border-white/10 bg-white/[0.02]"
                aria-label="Copy page link"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-green-400 animate-scale-up" />
                    <span className="text-green-400">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy Document Link</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Search bar inside page */}
          <div className="mb-8 print:hidden">
            <div className="relative max-w-lg">
              <Search className="absolute left-4 top-3.5 size-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search legal clauses..."
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-3 pl-11 pr-10 text-sm text-slate-200 placeholder:text-slate-500 focus:border-violet-500/80 focus:outline-none focus:ring-1 focus:ring-violet-500/80"
                aria-label="Search within page content"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 grid size-7 place-items-center rounded-lg hover:bg-white/5 text-slate-400 hover:text-white"
                  aria-label="Clear search query"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-2 text-xs text-slate-400">
                Found {filteredSections.length} matching sections
              </p>
            )}
          </div>

          {/* Grid Layout: Sidebar TOC + Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
            
            {/* Sticky Table of Contents (Desktop Only) */}
            <aside className="lg:col-span-1 lg:sticky lg:top-24 h-auto max-h-[calc(100vh-140px)] overflow-y-auto pr-4 hidden lg:block print:hidden scrollbar-thin">
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Table of Contents
                </p>
                <nav className="flex flex-col gap-1.5" aria-label="Table of Contents Navigation">
                  {filteredSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={cn(
                        "text-left text-xs font-semibold py-2 px-3.5 rounded-lg transition-all duration-200 border border-transparent",
                        activeSectionId === section.id
                          ? "bg-violet-500/10 text-violet-300 border-violet-500/20 font-bold"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                      )}
                      aria-label={`Jump to section ${section.title}`}
                    >
                      {section.title}
                    </button>
                  ))}
                  {filteredSections.length === 0 && (
                    <span className="text-xs text-slate-500 italic">No sections match filter</span>
                  )}
                </nav>
              </div>
            </aside>

            {/* Document Content List */}
            <div className="lg:col-span-3 space-y-6 print:w-full">
              
              {/* Beta informational warning banner */}
              <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-blue-300 text-xs leading-relaxed flex items-start gap-3 print:hidden">
                <div className="grid size-6 place-items-center rounded bg-blue-500/10 shrink-0 font-bold">i</div>
                <div>
                  <span className="font-bold text-white uppercase tracking-wider block mb-1">Beta Platform Disclaimer</span>
                  This document serves as an informational outline for the CoFoundr AI platform currently operating in beta. The terms and policies described here are subject to updates before full production release.
                </div>
              </div>

              {/* Mobile controls for collapse/expand all */}
              <div className="flex items-center justify-between lg:hidden print:hidden border-b border-white/5 pb-4 mb-2">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Clauses & Sections
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={expandAll}
                    className="text-[10px] font-bold text-violet-400 hover:text-violet-300 bg-violet-500/5 hover:bg-violet-500/10 border border-violet-500/20 rounded px-2.5 py-1 transition"
                  >
                    Expand All
                  </button>
                  <button 
                    onClick={collapseAll}
                    className="text-[10px] font-bold text-slate-400 hover:text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded px-2.5 py-1 transition"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* Legal Clauses List */}
              <div className="space-y-6 print:space-y-8">
                {filteredSections.map((section, index) => {
                  const isExpanded = expandedSections[section.id] !== false;
                  
                  return (
                    <section
                      key={section.id}
                      id={section.id}
                      ref={(el) => {
                        sectionRefs.current[section.id] = el;
                      }}
                      className="glass rounded-2xl border border-white/10 p-6 md:p-8 hover:border-white/15 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-400 print:border-none print:bg-transparent print:p-0 print:m-0 print:shadow-none"
                      tabIndex={0}
                      aria-labelledby={`heading-${section.id}`}
                    >
                      {/* Section Heading with mobile collapse trigger */}
                      <div 
                        className="flex items-center justify-between cursor-pointer lg:cursor-default"
                        onClick={() => toggleSection(section.id)}
                      >
                        <h2 
                          id={`heading-${section.id}`}
                          className="text-lg md:text-xl font-extrabold text-white flex items-center gap-3.5 select-none"
                        >
                          <span className="text-xs font-mono font-bold text-slate-500 bg-slate-900 border border-white/5 size-6 rounded flex items-center justify-center shrink-0">
                            {index + 1}
                          </span>
                          <span>{highlightTitle(section.title, searchQuery)}</span>
                        </h2>

                        {/* Expand/Collapse arrow on mobile */}
                        <button 
                          className="lg:hidden grid size-8 place-items-center rounded-lg hover:bg-white/5 text-slate-400 print:hidden"
                          aria-expanded={isExpanded}
                          aria-label={isExpanded ? "Collapse section" : "Expand section"}
                        >
                          {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                        </button>
                      </div>

                      {/* Section Content */}
                      <div 
                        className={cn(
                          "mt-4 text-sm text-slate-300 leading-relaxed font-normal space-y-4 print:block print:opacity-100",
                          isExpanded ? "block animate-fade-in" : "hidden lg:block"
                        )}
                      >
                        {section.content}
                      </div>
                    </section>
                  );
                })}

                {filteredSections.length === 0 && (
                  <div className="glass rounded-2xl border border-white/10 p-12 text-center">
                    <p className="text-slate-400 font-semibold">
                      No sections match your search query: &quot;{searchQuery}&quot;
                    </p>
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="mt-4 text-xs text-violet-400 font-bold hover:underline"
                    >
                      Reset Search
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </main>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 z-40 grid size-11 place-items-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 print:hidden cursor-pointer",
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
        aria-label="Scroll back to top"
      >
        <ArrowUp className="size-5" />
      </button>

      {/* Simple Legal Footer */}
      <footer className="border-t border-white/10 bg-[#050713]/80 py-10 mt-auto print:hidden">
        <div className="section-shell flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2">
            <BrandMark compact />
          </Link>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            © {new Date().getFullYear()} CoFoundr AI. Your AI Founding Team.
          </p>
        </div>
      </footer>
    </div>
  );
}
