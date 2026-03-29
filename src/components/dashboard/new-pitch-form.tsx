"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const MIN = 20;
const MAX = 1000;

const TIPS = [
  { heading: "What problem does it solve?", body: "Be specific about the pain point your users face every day." },
  { heading: "How does it work?", body: "Explain the core mechanism or approach of your solution." },
  { heading: "Don't worry, we help you", body: "We can research and provide additional insights to strengthen your pitch (like target audience, market trends, and competitive analysis). But you need to describe well what problem you're solving.", calm: true },
];

/* ── Inline tips tooltip ── */
function PitchTips() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Tips for a great pitch"
        className="h-4 w-4 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-high flex items-center justify-center transition-colors cursor-pointer"
      >
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-6 z-30 w-72 bg-surface-lowest rounded-2xl shadow-ambient border border-surface-container p-4">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-primary mb-3">
            Tips for a great pitch report
          </p>
          <ul className="space-y-2.5">
            {TIPS.map((t) => (
              <li key={t.heading}>
                <p className="text-[12px] font-semibold" style={{ color: t.calm ? "#15803d" : undefined }}
                >{t.heading}</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ── Confirmation modal ── */
function ConfirmModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [checked, setChecked] = useState(false);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div className="relative bg-surface-lowest rounded-2xl shadow-ambient w-full max-w-md p-6">
        {/* Accent line */}
        <div className="absolute top-0 left-10 right-10 h-px rounded-full gradient-primary opacity-40" aria-hidden="true" />

        <h3 className="font-headline text-base font-bold mb-1">Before you submit</h3>
        <p className="text-xs text-on-surface-variant mb-5">
          A richer description leads to a sharper report. Make sure your pitch covers:
        </p>

        <ul className="space-y-3 mb-6">
          {TIPS.map((t) => (
            <li key={t.heading} className="flex gap-3">
              <div className="shrink-0 h-5 w-5 rounded-full bg-surface-container flex items-center justify-center mt-0.5">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
              </div>
              <div>
                <p className="text-[12px] font-semibold" style={{ color: t.calm ? "#15803d" : undefined }}>{t.heading}</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">{t.body}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer mb-5 group">
          <div className="relative shrink-0 mt-0.5">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="sr-only"
            />
            <div className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition-colors ${checked ? "gradient-primary border-transparent" : "border-surface-high group-hover:border-primary"}`}>
              {checked && (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-[12px] text-on-surface-variant leading-relaxed">
            My pitch has a well <strong className="text-on-surface">defined problem context</strong> and a <strong className="text-on-surface">solution approach</strong>.
          </span>
        </label>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-full text-sm font-medium text-on-surface-variant bg-surface-container hover:bg-surface-high transition-colors cursor-pointer"
          >
            Go back
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!checked}
            className="flex-1 py-2.5 rounded-full gradient-primary text-white text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed enabled:cursor-pointer shadow-ambient"
          >
            Confirm & Validate →
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ── Main form ── */
interface Props {
  disabled: boolean;
}

export function NewPitchForm({ disabled }: Props) {
  const [idea, setIdea] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [showModal, setShowModal] = useState(false);

  const ideaOk = idea.length >= MIN && idea.length <= MAX;
  const canSubmit = ideaOk && !disabled && status === "idle";

  const counterColor =
    idea.length >= MAX * 0.9
      ? "#ba1a1a"
      : idea.length > 0 && idea.length < MIN
        ? "#ba1a1a"
        : "var(--color-outline)";

  async function submit() {
    if (!canSubmit) return;
    setShowModal(false);
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-on-surface-variant">
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
    <>
      {showModal && (
        <ConfirmModal
          onConfirm={submit}
          onCancel={() => setShowModal(false)}
        />
      )}

      <form onSubmit={(e) => { e.preventDefault(); setShowModal(true); }} className="space-y-5">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <label
              htmlFor="idea"
              className="text-xs font-medium text-on-surface-variant tracking-wide uppercase"
            >
              Your Pitch
            </label>
            <PitchTips />
          </div>
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
          className="w-full py-3.5 rounded-full gradient-primary text-white text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed enabled:cursor-pointer flex items-center justify-center gap-2 shadow-ambient"
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
            { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", text: "Your idea is private — only you see your reports." },
            { icon: "M12 8v4l3 3M12 2a10 10 0 100 20A10 10 0 0012 2z", text: "Analysis takes ~12 minutes via multi-agent AI." },
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
    </>
  );
}
