"use client";

import { useState } from "react";

const MIN = 20;
const MAX = 1000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function TryItNowForm() {
  const [idea, setIdea] = useState("");
  const [email, setEmail] = useState("");

  const ideaOk = idea.length >= MIN && idea.length <= MAX;
  const emailOk = EMAIL_RE.test(email);
  const canSubmit = ideaOk && emailOk;

  const counterColor =
    idea.length >= MAX * 0.9
      ? "#ba1a1a"
      : idea.length > 0 && idea.length < MIN
        ? "#ba1a1a"
        : "var(--color-outline)";

  return (
    <form className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="idea"
          className="block text-xs font-medium text-on-surface-variant tracking-wide uppercase mb-2"
        >
          Your Idea
        </label>
        <div className="relative">
          <textarea
            id="idea"
            rows={5}
            maxLength={MAX}
            placeholder="e.g. An app that helps freelancers find co-working buddies — describe your idea in detail, who it's for, the problem it solves, and how it works."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="w-full bg-surface-highest rounded-[0.5rem] px-4 py-3 pb-7 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary transition-all resize-none"
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
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-medium text-on-surface-variant tracking-wide uppercase mb-2"
        >
          Your Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-surface-highest rounded-[0.5rem] px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary transition-all"
        />
      </div>
      <button
        type="submit"
        disabled={!canSubmit}
        className="btn-primary w-full py-3 text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Get Report
      </button>

      <ul className="space-y-2 pt-1">
        {[
          { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", text: "Your idea is private. Only you can see your reports." },
          { icon: "M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3", text: "Never shared with third parties or other users." }
        ].map(({ icon, text }) => (
          <li key={text} className="flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-primary opacity-70">
              <path d={icon} />
            </svg>
            <span className="text-[11px] text-on-surface-variant">{text}</span>
          </li>
        ))}
      </ul>
    </form>
  );
}
