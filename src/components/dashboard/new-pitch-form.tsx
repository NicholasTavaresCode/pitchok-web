"use client";

import { useState } from "react";

const MIN = 20;
const MAX = 1000;

interface Props {
  disabled: boolean;
}

export function NewPitchForm({ disabled }: Props) {
  const [idea, setIdea] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const ideaOk = idea.length >= MIN && idea.length <= MAX;
  const canSubmit = ideaOk && !disabled && status === "idle";

  const counterColor =
    idea.length >= MAX * 0.9
      ? "#ba1a1a"
      : idea.length > 0 && idea.length < MIN
        ? "#ba1a1a"
        : "var(--color-outline)";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("loading");
    // Placeholder — replace with real API call
    await new Promise((r) => setTimeout(r, 1600));
    setStatus("success");
    setTimeout(() => {
      setIdea("");
      setStatus("idle");
    }, 2800);
  }

  if (disabled) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-surface-container flex items-center justify-center">
          <svg
            width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1.5"
            className="text-on-surface-variant"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div>
          <p className="font-headline font-semibold text-on-surface">All slots used</p>
          <p className="text-sm text-on-surface-variant mt-1 max-w-[240px]">
            You&apos;ve used all 5 pitch slots. Download your reports to free up space.
          </p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
        <div className="h-14 w-14 rounded-full gradient-primary flex items-center justify-center shadow-ambient">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <div>
          <p className="font-headline font-semibold text-on-surface">Pitch submitted!</p>
          <p className="text-sm text-on-surface-variant mt-1">
            Our AI agents are on it. Reports take ~12 minutes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="idea"
          className="block text-xs font-medium text-on-surface-variant tracking-wide uppercase mb-2"
        >
          Your Pitch
        </label>
        <div className="relative">
          <textarea
            id="idea"
            rows={10}
            maxLength={MAX}
            placeholder="e.g. An app that helps freelancers find co-working buddies in their city — describe your idea in detail, who it's for, the problem it solves, and how it works."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            disabled={status === "loading"}
            className="w-full bg-surface-highest rounded-[0.5rem] px-4 py-3 pb-7 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary transition-all resize-none disabled:opacity-60"
          />
          <span
            className="absolute bottom-2.5 right-3 text-[11px] tabular-nums select-none"
            style={{ color: counterColor }}
          >
            {idea.length}/{MAX}
          </span>
        </div>
        {idea.length > 0 && idea.length < MIN && (
          <p className="mt-1 text-[11px]" style={{ color: "#ba1a1a" }}>
            At least {MIN} characters required ({MIN - idea.length} more to go)
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full py-3.5 rounded-full gradient-primary text-white text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-ambient"
      >
        {status === "loading" ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting…
          </>
        ) : (
          "Validate My Idea →"
        )}
      </button>

      <ul className="space-y-2 pt-1">
        {[
          {
            icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
            text: "Your idea is private — only you see your reports.",
          },
          {
            icon: "M12 8v4l3 3M12 2a10 10 0 100 20A10 10 0 0012 2z",
            text: "Analysis takes ~12 minutes via multi-agent AI.",
          },
        ].map(({ icon, text }) => (
          <li key={text} className="flex items-center gap-2">
            <svg
              width="13" height="13" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              className="shrink-0 text-primary opacity-70"
            >
              <path d={icon} />
            </svg>
            <span className="text-[11px] text-on-surface-variant">{text}</span>
          </li>
        ))}
      </ul>
    </form>
  );
}
