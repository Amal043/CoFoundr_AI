"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Brain, ArrowRight, Globe, Users, Briefcase } from "lucide-react";
import { BrandMark } from "@/components/shared/brand-mark";
import { Button } from "@/components/ui/button";
import { createStartup } from "@/lib/demo/startup-manager";

const INDUSTRIES = [
  "AI / Machine Learning",
  "EdTech",
  "FinTech",
  "HealthTech",
  "SaaS / Cloud",
  "Marketplace",
  "E-commerce",
  "Productivity",
  "Other",
];

const STAGES = [
  { value: "Idea", label: "Idea / Pre-seed" },
  { value: "Prototype", label: "Prototype / Proof of Concept" },
  { value: "MVP", label: "Minimum Viable Product (MVP)" },
  { value: "Launched", label: "Launched / Early Growth" },
];

const TEAM_SIZES = [
  { value: "Solo Founder", label: "Solo Founder" },
  { value: "2-5", label: "2 – 5 members" },
  { value: "5-10", label: "5 – 10 members" },
  { value: "10+", label: "10+ members" },
];

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "India",
  "Singapore",
  "Australia",
  "France",
  "Japan",
  "Netherlands",
  "Brazil",
  "South Africa",
  "Other",
];

export default function NewStartupPage() {
  const router = useRouter();
  
  // State
  const [idea, setIdea] = useState("");
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("AI / Machine Learning");
  const [country, setCountry] = useState("United States");
  const [stage, setStage] = useState("Idea");
  const [teamSize, setTeamSize] = useState("Solo Founder");
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const filteredCountries = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    createStartup({
      name,
      idea,
      industry,
      country,
      stage,
      teamSize,
    });

    router.push("/chat");
  };

  return (
    <div className="min-h-screen bg-ink flex flex-col justify-between py-10 relative overflow-hidden select-none">
      {/* Decorative Glows */}
      <div className="absolute -left-20 top-20 size-80 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 bottom-20 size-80 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-6 flex items-center justify-between">
        <BrandMark />
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="text-xs border-white/5 bg-white/[0.02] text-slate-400 hover:text-white"
        >
          Cancel
        </Button>
      </header>

      {/* Onboarding Form */}
      <main className="w-full max-w-xl mx-auto px-6 py-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-white/10 bg-[#070b1a]/65 p-6 md:p-8 backdrop-blur-xl shadow-glow text-left"
        >
          <div className="flex items-center gap-3 border-b border-white/[0.04] pb-4 mb-6">
            <span className="grid size-10 place-items-center rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/25">
              <Brain className="size-5" />
            </span>
            <div>
              <h1 className="text-base font-extrabold text-white uppercase tracking-wider">
                Create New Startup
              </h1>
              <p className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5 tracking-wider">
                Initialize your founding roadmap
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5.5">
            {/* Startup Idea */}
            <div className="space-y-1.5">
              <label htmlFor="idea" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Startup Idea (Required)
              </label>
              <textarea
                id="idea"
                required
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                rows={3.5}
                placeholder="Describe your startup concept (e.g. 'I want to build an AI platform that helps college students prepare for technical interviews.')"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-xs text-slate-200 placeholder:text-slate-500 focus:border-violet-500/80 focus:outline-none focus:ring-1 focus:ring-violet-500/80 leading-relaxed"
              />
            </div>

            {/* Two Column Grid */}
            <div className="grid gap-4.5 sm:grid-cols-2">
              {/* Startup Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Startup Name (Optional)
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. InterviewAI"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:border-violet-500/80 focus:outline-none focus:ring-1 focus:ring-violet-500/80"
                />
              </div>

              {/* Industry Dropdown */}
              <div className="space-y-1.5">
                <label htmlFor="industry" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Industry Focus
                </label>
                <select
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/65 px-3 py-2.5 text-xs text-slate-200 focus:border-violet-500 focus:outline-none"
                >
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind} className="bg-slate-950 text-slate-200">
                      {ind}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Country Dropdown with Search */}
            <div className="space-y-1.5 relative">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Country / Target Market
              </label>
              <div
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3.5 py-2.5 text-xs text-slate-200 cursor-pointer flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Globe className="size-3.5 text-slate-500" />
                  {country}
                </span>
                <span className="text-[10px] text-slate-500 font-bold">▼</span>
              </div>

              {showCountryDropdown && (
                <div className="absolute left-0 right-0 mt-1 z-35 rounded-xl border border-white/10 bg-slate-950 p-2 shadow-glow">
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder="Search country..."
                    className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:outline-none mb-2"
                  />
                  <div className="max-h-36 overflow-y-auto space-y-1">
                    {filteredCountries.map((c) => (
                      <div
                        key={c}
                        onClick={() => {
                          setCountry(c);
                          setShowCountryDropdown(false);
                        }}
                        className="rounded px-2.5 py-1.5 text-xs text-slate-300 hover:bg-white/5 cursor-pointer transition"
                      >
                        {c}
                      </div>
                    ))}
                    {filteredCountries.length === 0 && (
                      <div className="text-slate-600 text-xs py-1.5 px-2.5 italic">No matches</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Grid Stage and Team */}
            <div className="grid gap-4.5 sm:grid-cols-2">
              {/* Stage dropdown */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                  <Briefcase className="size-3" /> Startup Stage
                </label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/65 px-3 py-2.5 text-xs text-slate-200 focus:border-violet-500 focus:outline-none"
                >
                  {STAGES.map((stg) => (
                    <option key={stg.value} value={stg.value} className="bg-slate-950 text-slate-200">
                      {stg.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Team Size dropdown */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                  <Users className="size-3" /> Team Size
                </label>
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/65 px-3 py-2.5 text-xs text-slate-200 focus:border-violet-500 focus:outline-none"
                >
                  {TEAM_SIZES.map((ts) => (
                    <option key={ts.value} value={ts.value} className="bg-slate-950 text-slate-200">
                      {ts.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={!idea.trim()}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold py-3 hover:-translate-y-0.5 transition flex items-center justify-center gap-2 group shadow-sm disabled:opacity-40"
            >
              Continue with AI CEO
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </form>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center text-[10px] text-slate-600 font-semibold uppercase tracking-wider">
        CoFoundr AI © 2026. All strategy details are processed locally.
      </footer>
    </div>
  );
}
