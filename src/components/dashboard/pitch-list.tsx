"use client";

import { useState } from "react";
import { PitchCard, type Pitch, type PitchStatus } from "./pitch-card";

const STATUS_FILTERS: { label: string; value: PitchStatus | "ALL" }[] = [
  { label: "All",       value: "ALL"        },
  { label: "Pending",   value: "PENDING"    },
  { label: "Analyzing", value: "PROCESSING" },
  { label: "Completed", value: "COMPLETED"  },
];

export function PitchList({ pitches }: { pitches: Pitch[] }) {
  const [query, setQuery]             = useState("");
  const [activeStatus, setActiveStatus] = useState<PitchStatus | "ALL">("ALL");

  const filtered = pitches.filter((p) => {
    const matchesStatus = activeStatus === "ALL" || p.status === activeStatus;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.idea.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const countFor = (value: PitchStatus | "ALL") =>
    value === "ALL" ? pitches.length : pitches.filter((p) => p.status === value).length;

  if (pitches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4 bg-surface-lowest rounded-[2rem] shadow-ambient ghost-border">
        <div className="h-16 w-16 rounded-2xl bg-surface-container flex items-center justify-center">
          <svg
            width="28" height="28" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1.5"
            className="text-on-surface-variant"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </div>
        <div>
          <p className="font-headline font-semibold text-on-surface">No pitches yet</p>
          <p className="text-sm text-on-surface-variant mt-1 max-w-[260px]">
            Submit your first idea on the left and our AI agents will get to work in minutes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* ── Filter controls ── */}
      <div className="space-y-3">

        {/* Text search */}
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              className="text-outline"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Filter ideas…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-surface-lowest rounded-full pl-9 pr-9 py-2.5 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary shadow-ambient ghost-border transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
              aria-label="Clear search"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Status pills */}
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map(({ label, value }) => {
            const count   = countFor(value);
            const isActive = activeStatus === value;
            return (
              <button
                key={value}
                onClick={() => setActiveStatus(value)}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
                  isActive
                    ? "bg-primary text-on-primary shadow-ambient"
                    : "bg-surface-lowest text-on-surface-variant ghost-border hover:bg-surface-high"
                }`}
              >
                {label}
                <span className={`tabular-nums ${isActive ? "opacity-70" : "opacity-50"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Results ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center gap-3 bg-surface-lowest rounded-[1.5rem] shadow-ambient ghost-border">
          <svg
            width="22" height="22" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1.5"
            className="text-outline"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <div>
            <p className="font-headline font-semibold text-sm text-on-surface">No matches</p>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Try adjusting your search or filter.
            </p>
          </div>
        </div>
      ) : (
        filtered.map((pitch) => <PitchCard key={pitch.id} pitch={pitch} />)
      )}
    </div>
  );
}
