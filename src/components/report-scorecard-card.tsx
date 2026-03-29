"use client";

import { useState } from "react";

function scoreColor(score: number) {
  if (score >= 7.5) return "#15803d";
  if (score >= 5) return "#b45309";
  return "#b91c1c";
}

interface Props {
  name: string;
  score: number;
  justification: string;
}

export function ReportScorecardCard({ name, score, justification }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-surface-lowest rounded-2xl shadow-ambient p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="font-headline text-sm font-semibold">{name}</span>
        <span className="font-headline text-lg font-bold tabular-nums" style={{ color: scoreColor(score) }}>
          {score.toFixed(1)}
        </span>
      </div>

      <div className="h-1.5 rounded-full bg-surface-container overflow-hidden mb-3">
        <div className="h-full rounded-full" style={{ width: `${(score / 10) * 100}%`, background: scoreColor(score) }} />
      </div>

      <p className={`text-[12px] text-on-surface-variant leading-relaxed ${!expanded ? "line-clamp-3" : ""}`}>
        {justification}
      </p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 flex items-center gap-1 text-[11px] font-medium text-primary hover:opacity-70 transition-opacity"
      >
        {expanded ? "Show less" : "Show full analysis"}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className="transition-transform" style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}
