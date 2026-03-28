"use client";

import { useState } from "react";

const MAX_COMMENT = 500;

export function PitchFeedbackForm({ pitchId }: { pitchId: string }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const canSubmit = rating > 0 && status === "idle";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("loading");
    // Placeholder — replace with real API call
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
        <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center shadow-ambient">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <div>
          <p className="font-headline font-semibold text-on-surface">Thanks for your feedback!</p>
          <p className="text-xs text-on-surface-variant mt-1">It helps us improve the reports.</p>
        </div>
      </div>
    );
  }

  const active = hovered || rating;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Stars */}
      <div>
        <p className="text-xs font-medium text-on-surface-variant tracking-wide uppercase mb-3">
          Rate this report
        </p>
        <div
          className="flex gap-1.5"
          onMouseLeave={() => setHovered(0)}
          role="radiogroup"
          aria-label="Rating"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={rating === star}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              onMouseEnter={() => setHovered(star)}
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              <svg
                width="28" height="28" viewBox="0 0 24 24"
                fill={star <= active ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.5"
                className={star <= active ? "text-primary" : "text-surface-high"}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="relative">
        <textarea
          rows={3}
          maxLength={MAX_COMMENT}
          placeholder="Anything you'd like to share about this report? (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={status === "loading"}
          className="w-full bg-surface-highest rounded-[0.75rem] px-4 py-3 pb-6 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary transition-all resize-none disabled:opacity-60"
        />
        <span className="absolute bottom-2 right-3 text-[11px] tabular-nums text-outline select-none">
          {comment.length}/{MAX_COMMENT}
        </span>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full py-3 rounded-full gradient-primary text-white text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-ambient"
      >
        {status === "loading" ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting…
          </>
        ) : (
          "Submit Feedback"
        )}
      </button>
    </form>
  );
}
