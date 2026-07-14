"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users } from "lucide-react";

export function DashboardCharts() {
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; val: string; label: string } | null>(null);

  // 1. Revenue Projections Data (12 Months)
  const revenueData = [2500, 4500, 8000, 14000, 19000, 25000, 31000, 38000, 44000, 49000, 53000, 58000];
  const months = ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12"];

  // SVG dimensions for Line Chart
  const svgWidth = 500;
  const svgHeight = 200;
  const padding = 30;

  const chartWidth = svgWidth - padding * 2;
  const chartHeight = svgHeight - padding * 2;
  const maxVal = Math.max(...revenueData);

  // Generate points
  const points = revenueData.map((val, i) => {
    const x = padding + (i / (revenueData.length - 1)) * chartWidth;
    const y = padding + chartHeight - (val / maxVal) * chartHeight;
    return { x, y, val: `$${val.toLocaleString()}`, label: `Month ${i + 1}` };
  });

  // Compile SVG path string
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${svgHeight - padding} L ${points[0].x} ${svgHeight - padding} Z`;

  // 2. Acquisition Funnel Data
  const funnelData = [
    { step: "Awareness", count: "10,000", pct: 100, color: "from-blue-500 to-indigo-500" },
    { step: "Interest", count: "4,500", pct: 45, color: "from-indigo-500 to-violet-500" },
    { step: "Consideration", count: "2,000", pct: 20, color: "from-violet-500 to-fuchsia-500" },
    { step: "Acquisition", count: "500", pct: 5, color: "from-fuchsia-500 to-pink-500" },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Chart 1: 12-Month Revenue Curve */}
      <section className="rounded-3xl border border-white/5 bg-slate-950/20 p-5 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/[0.04] pb-3 mb-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="size-4 text-cyan-300" />
            12-Month Revenue Forecast
          </h3>
          <span className="text-[10px] font-bold text-cyan-300">Targeting $58k MRR</span>
        </div>

        <div className="relative w-full">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible select-none">
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((p, idx) => {
              const y = padding + chartHeight * p;
              return (
                <line
                  key={idx}
                  x1={padding}
                  y1={y}
                  x2={svgWidth - padding}
                  y2={y}
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Fill Area */}
            <path d={areaPath} fill="url(#areaGradient)" />

            {/* Line Trail */}
            <motion.path
              d={linePath}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* Scatter Dots */}
            {points.map((p, idx) => (
              <circle
                key={idx}
                cx={p.x}
                cy={p.y}
                r="3.5"
                className="fill-slate-950 stroke-cyan-400 stroke-2 hover:r-5 cursor-pointer transition-all"
                onMouseEnter={() => setHoveredPoint(p)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            ))}

            {/* X Axis Labels */}
            {points.map((p, idx) => {
              if (idx % 2 === 0) {
                return (
                  <text
                    key={idx}
                    x={p.x}
                    y={svgHeight - 10}
                    textAnchor="middle"
                    className="text-[9px] font-bold fill-slate-600 uppercase"
                  >
                    {months[idx]}
                  </text>
                );
              }
              return null;
            })}
          </svg>

          {/* Tooltip Overlay */}
          {hoveredPoint && (
            <div
              className="absolute pointer-events-none rounded-xl border border-cyan-400/25 bg-[#0b0e22]/90 p-2 shadow-xl z-20"
              style={{
                left: `${(hoveredPoint.x / svgWidth) * 100}%`,
                top: `${(hoveredPoint.y / svgHeight) * 100 - 30}%`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                {hoveredPoint.label}
              </p>
              <p className="text-xs font-bold text-white mt-0.5">{hoveredPoint.val} MRR</p>
            </div>
          )}
        </div>
      </section>

      {/* Chart 2: Marketing Funnel */}
      <section className="rounded-3xl border border-white/5 bg-slate-950/20 p-5 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/[0.04] pb-3 mb-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="size-4 text-violet-300" />
            Acquisition Growth Funnel
          </h3>
          <span className="text-[10px] font-bold text-violet-300">Conversion Audit</span>
        </div>

        <div className="space-y-4">
          {funnelData.map((bar) => (
            <div key={bar.step} className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="text-slate-400">{bar.step}</span>
                <span className="text-slate-200">
                  {bar.count} <span className="text-slate-500">({bar.pct}%)</span>
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-950/80 overflow-hidden border border-white/[0.02]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${bar.pct}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full bg-gradient-to-r ${bar.color} shadow-sm`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
