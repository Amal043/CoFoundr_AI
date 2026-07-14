"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Bot, Check, CircleDollarSign, Compass, FileText, LayoutDashboard, LineChart, Sparkles, Target, Users } from "lucide-react";

const chartPoints = "0,58 17,49 35,54 50,37 68,42 82,21 100,6";

function MiniMetric({ label, value, icon: Icon, accent, detail }: { label: string; value: string; icon: typeof Target; accent: string; detail: string }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.035] p-3.5">
      <div className="flex items-center justify-between text-[10px] text-slate-400"><span>{label}</span><Icon className={`size-3.5 ${accent}`} /></div>
      <p className="mt-2 text-xl font-semibold tracking-tight text-white">{value}</p>
      <p className={`mt-1 text-[10px] ${accent}`}>{detail}</p>
    </div>
  );
}

export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[630px] lg:ml-auto">
      <div className="absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle,rgba(61,127,255,0.25),transparent_62%)] blur-2xl" />
      <motion.div animate={{ y: [0, -10, 0], rotate: [-1.5, 0.5, -1.5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="relative overflow-hidden rounded-[28px] border border-indigo-300/20 bg-[#090e20]/90 p-2.5 shadow-[0_30px_100px_rgba(0,0,0,0.55),0_0_90px_rgba(76,93,255,0.16)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(67,109,255,0.18),transparent_31%),linear-gradient(130deg,transparent_50%,rgba(117,89,255,0.09))]" />
        <div className="relative overflow-hidden rounded-[21px] border border-white/[0.07] bg-[#070b19]">
          <div className="flex h-10 items-center gap-1.5 border-b border-white/[0.07] px-4">
            <span className="size-2 rounded-full bg-violet-400" /><span className="size-2 rounded-full bg-blue-400" /><span className="size-2 rounded-full bg-cyan-300" />
            <span className="ml-3 text-[10px] font-medium tracking-wide text-slate-500">cofoundr.ai / workspace</span>
          </div>
          <div className="grid min-h-[332px] grid-cols-[106px_1fr]">
            <aside className="hidden border-r border-white/[0.07] bg-white/[0.015] p-2.5 sm:block">
              <div className="mb-5 flex items-center gap-1.5 px-1 text-[9px] font-semibold text-white"><Sparkles className="size-3 text-violet-300" />CoFoundr</div>
              {[[LayoutDashboard, "Overview"], [FileText, "Workspace"], [Users, "Agents"], [LineChart, "Investor"]].map(([Icon, label], index) => {
                const NavIcon = Icon as typeof LayoutDashboard;
                return <div key={label as string} className={`mb-1 flex items-center gap-2 rounded-md px-2 py-2 text-[9px] ${index === 0 ? "bg-violet-500/20 text-violet-100" : "text-slate-500"}`}><NavIcon className="size-3" />{label as string}</div>;
              })}
            </aside>
            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between">
                <div><p className="text-[10px] text-slate-500">Tuesday, 14 July</p><h3 className="mt-1 text-base font-semibold text-white">Startup overview</h3></div>
                <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500"><Sparkles className="size-3.5 text-white" /></div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                <MiniMetric label="Startup score" value="82" icon={Target} accent="text-cyan-300" detail="+12 this week" />
                <MiniMetric label="Market signal" value="High" icon={Compass} accent="text-blue-300" detail="Strong opportunity" />
                <MiniMetric label="Funding fit" value="74%" icon={CircleDollarSign} accent="text-violet-300" detail="Investor-ready" />
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-[1.25fr_0.85fr]">
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.035] p-3.5">
                  <div className="flex items-center justify-between"><p className="text-[10px] text-slate-400">Revenue trajectory</p><span className="text-[10px] text-cyan-300">↑ 18.4%</span></div>
                  <svg viewBox="0 0 100 65" className="mt-3 h-16 w-full overflow-visible" preserveAspectRatio="none"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#55d9ff" stopOpacity=".25"/><stop offset="1" stopColor="#55d9ff" stopOpacity="0"/></linearGradient></defs><polygon points={`${chartPoints} 100,65 0,65`} fill="url(#chartFill)"/><polyline points={chartPoints} fill="none" stroke="#61dcff" strokeWidth="1.5" vectorEffect="non-scaling-stroke"/></svg>
                  <div className="mt-1 flex justify-between text-[8px] text-slate-600"><span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span></div>
                </div>
                <div className="rounded-xl border border-white/[0.07] bg-gradient-to-br from-violet-500/15 to-blue-500/5 p-3.5">
                  <div className="flex items-center gap-2"><span className="grid size-6 place-items-center rounded-lg bg-violet-400/20"><Bot className="size-3.5 text-violet-200" /></span><p className="text-[10px] font-medium text-slate-200">AI CEO</p></div>
                  <p className="mt-3 text-[11px] leading-4 text-slate-300">Your launch plan is ready for review.</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-[9px] font-medium text-violet-200">Open strategy <ArrowUpRight className="size-3" /></div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.035] px-3.5 py-2.5">
                <div className="flex -space-x-1.5">{["Research", "Finance", "Product", "Marketing"].map((agent, index) => <span key={agent} className={`grid size-5 place-items-center rounded-full border border-[#0a0e1e] text-[7px] font-bold text-white ${["bg-cyan-500", "bg-blue-500", "bg-violet-500", "bg-fuchsia-500"][index]}`}>{agent[0]}</span>)}</div>
                <span className="flex items-center gap-1 text-[9px] text-slate-400"><Check className="size-3 text-cyan-300" />4 agents aligned</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} className="absolute -bottom-6 -left-3 hidden rounded-xl border border-cyan-300/20 bg-[#0b1328]/90 px-3.5 py-2.5 shadow-xl backdrop-blur-md sm:flex sm:items-center sm:gap-2"><span className="grid size-7 place-items-center rounded-lg bg-cyan-400/15"><LineChart className="size-3.5 text-cyan-200" /></span><span><span className="block text-[9px] text-slate-400">Investor readiness</span><span className="text-xs font-semibold text-white">74% and rising</span></span></motion.div>
    </div>
  );
}
