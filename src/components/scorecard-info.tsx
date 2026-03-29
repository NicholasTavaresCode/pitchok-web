"use client";

import { useState, useRef, useEffect } from "react";

const DIMENSIONS = [
  { name: "Problem-Solution Fit", weight: 25, description: "Does the idea address a real, significant pain point and does the proposed solution actually solve it?" },
  { name: "Market Demand", weight: 20, description: "Is there sufficient volume of people experiencing this problem and actively seeking a solution?" },
  { name: "Competitive Advantage", weight: 20, description: "Can this idea differentiate meaningfully from existing solutions with a defensible, unique angle?" },
  { name: "Feasibility & Reality Check", weight: 15, description: "Can this be built with current technology and reasonable resources? Free of impossible premises?" },
  { name: "Market Saturation", weight: 10, description: "How crowded is the space? Are there entrenched incumbents with network effects or high switching costs?" },
  { name: "Risk Assessment", weight: 10, description: "What are the biggest regulatory, legal, market, or execution risks threatening success?" },
];

const VERDICTS = [
  { range: "8.0 – 10.0", label: "Strong Potential", color: "#15803d", bg: "#dcfce7" },
  { range: "6.0 – 7.9", label: "Moderate Potential", color: "#854d0e", bg: "#fef9c3" },
  { range: "4.0 – 5.9", label: "Weak Potential", color: "#b45309", bg: "#ffedd5" },
  { range: "1.0 – 3.9", label: "Low Potential", color: "#b91c1c", bg: "#fee2e2" },
];

export function ScorecardInfo() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative inline-flex items-center">
      <button
        onClick={() => setOpen(!open)}
        aria-label="How we calculate the score"
        className="h-5 w-5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-high flex items-center justify-center transition-colors flex-shrink-0"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-7 z-50 w-80 bg-surface-lowest rounded-2xl shadow-[0_8px_32px_rgba(45,47,49,0.14)] p-5 border border-surface-container">
          <p className="font-headline text-sm font-bold mb-1">How we calculate the score</p>
          <p className="text-[11px] text-on-surface-variant mb-4 leading-relaxed">
            Each idea is scored across 6 weighted dimensions by an independent AI validation agent, grounded strictly in the research data, never assumptions.
          </p>

          <p className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-2">Dimensions & weights</p>
          <div className="space-y-2 mb-4">
            {DIMENSIONS.map((d) => (
              <div key={d.name}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[12px] font-medium text-on-surface">{d.name}</span>
                  <span className="text-[11px] font-semibold text-primary">{d.weight}%</span>
                </div>
                <div className="h-1 rounded-full bg-surface-container overflow-hidden mb-1">
                  <div className="h-full rounded-full gradient-primary" style={{ width: `${d.weight * 4}%` }} />
                </div>
                <p className="text-[11px] text-on-surface-variant leading-snug">{d.description}</p>
              </div>
            ))}
          </div>

          <p className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-2">Verdict scale</p>
          <div className="space-y-1.5">
            {VERDICTS.map((v) => (
              <div key={v.label} className="flex items-center gap-2">
                <span className="text-[10px] font-medium tabular-nums w-20 shrink-0" style={{ color: v.color }}>{v.range}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: v.bg, color: v.color }}>{v.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
