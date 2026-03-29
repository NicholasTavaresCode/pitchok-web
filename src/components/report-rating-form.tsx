"use client";

import { useState } from "react";

const MIN = 20;
const MAX = 500;

export function ReportRatingForm() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const commentOk = comment.length >= MIN && comment.length <= MAX;
  const canSubmit = rating > 0 && commentOk;

  const counterColor =
    comment.length > 0 && comment.length < MIN
      ? "#ba1a1a"
      : comment.length >= MAX * 0.9
        ? "#ba1a1a"
        : "var(--color-outline)";

  if (submitted) {
    return (
      <div className="bg-surface-lowest rounded-2xl shadow-ambient p-8 flex flex-col items-center gap-3 text-center">
        <div className="h-12 w-12 rounded-full bg-surface-container flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <p className="font-headline text-base font-semibold">Thanks for your feedback!</p>
        <p className="text-sm text-on-surface-variant">Your review helps us improve every report.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-lowest rounded-2xl shadow-ambient p-6 md:p-8">
      {/* Stars */}
      <div className="mb-5">
        <label className="block text-xs font-medium text-on-surface-variant tracking-wide uppercase mb-3">
          Your Rating <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => {
            const active = star <= (hovered || rating);
            return (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                className="transition-transform hover:scale-110 active:scale-95"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill={active ? "#D4AF37" : "none"} stroke={active ? "#D4AF37" : "var(--color-outline)"} strokeWidth="1.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            );
          })}
        </div>
        {rating > 0 && (
          <p className="mt-1.5 text-[11px] text-on-surface-variant">
            {["", "Poor", "Fair", "Good", "Very good", "Excellent"][rating]}
          </p>
        )}
      </div>

      {/* Comment */}
      <div className="mb-5">
        <label htmlFor="report-comment" className="block text-xs font-medium text-on-surface-variant tracking-wide uppercase mb-2">
          Your Feedback <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <textarea
            id="report-comment"
            rows={4}
            maxLength={MAX}
            placeholder="Was the report accurate? Did it surface insights you hadn't considered? Any suggestions for improvement?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-surface-highest rounded-[0.5rem] px-4 py-3 pb-7 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary transition-all resize-none"
          />
          <span className="absolute bottom-2.5 right-3 text-[11px] tabular-nums select-none" style={{ color: counterColor }}>
            {comment.length}/{MAX}
          </span>
        </div>
        {comment.length > 0 && comment.length < MIN && (
          <p className="mt-1 text-[11px]" style={{ color: "#ba1a1a" }}>
            At least {MIN} characters required ({MIN - comment.length} more to go)
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={!canSubmit}
        onClick={() => setSubmitted(true)}
        className="btn-primary w-full py-3 text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Submit Feedback
      </button>
    </div>
  );
}
