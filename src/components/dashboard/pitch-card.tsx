import Link from "next/link";

export type PitchStatus = "PENDING" | "PROCESSING" | "COMPLETED";

export interface Pitch {
  id: string;
  title: string;
  idea: string;
  status: PitchStatus;
  createdAt: string;
  reportPdfPath?: string;
  reportMdPath?: string;
}

const STATUS_CONFIG: Record<
  PitchStatus,
  { label: string; badgeClass: string; icon: string | null }
> = {
  PENDING: {
    label: "Pending",
    badgeClass: "bg-surface-container text-on-surface-variant",
    icon: "M12 8v4l3 3M12 2a10 10 0 100 20A10 10 0 0012 2z",
  },
  PROCESSING: {
    label: "Analyzing",
    badgeClass: "bg-primary-fixed text-on-primary-container",
    icon: null,
  },
  COMPLETED: {
    label: "Completed",
    badgeClass: "bg-tertiary-container text-on-tertiary-container",
    icon: "M20 6L9 17l-5-5",
  },

};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function SeeDetailsLink({ id, title }: { id: string; title: string }) {
  return (
    <Link
      href={`/dashboard/pitches/${id}`}
      aria-label={`See details for ${title}`}
      className="relative z-10 inline-flex items-center gap-1 text-xs font-medium text-on-surface-variant bg-surface-container hover:bg-surface-high px-2.5 py-1 rounded-full transition-colors shrink-0"
    >
      See details
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </Link>
  );
}

export function PitchCard({ pitch }: { pitch: Pitch }) {
  const cfg = STATUS_CONFIG[pitch.status];

  return (
    /*
     * Stretched-link card pattern:
     * - The card is `relative` so the Link's ::after can fill it.
     * - The Link's ::after covers the whole card as the click target.
     * - Download buttons use `relative z-10` to stay above the overlay.
     * - `has-[a:focus-visible]` surfaces a ring on the card when the Link is focused,
     *   giving keyboard users a clear visual indicator without double outlines.
     */
    <div className="relative bg-surface-lowest rounded-[1.5rem] shadow-ambient p-5 ghost-border transition-colors hover:bg-surface-low has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-primary has-[a:focus-visible]:ring-offset-1">
      {/* Header row — status badge + date */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cfg.badgeClass}`}
        >
          {cfg.icon !== null ? (
            <svg
              width="11" height="11" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
            >
              <path d={cfg.icon} />
            </svg>
          ) : (
            <svg className="animate-spin h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3.5" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {cfg.label}
        </span>
        <span className="text-xs text-on-surface-variant shrink-0 mt-0.5">
          {formatDate(pitch.createdAt)}
        </span>
      </div>

      {/* Title — the Link stretches via ::after to make the whole card clickable */}
      <h3 className="font-headline font-semibold text-sm text-on-surface mb-1.5">
        <Link
          href={`/dashboard/pitches/${pitch.id}`}
          className="after:content-[''] after:absolute after:inset-0 after:rounded-[1.5rem] focus-visible:outline-none"
        >
          {pitch.title}
        </Link>
      </h3>
      <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2">
        {pitch.idea}
      </p>

      {/* ── Card footer ── */}
      {pitch.status === "PROCESSING" && (
        <div className="relative z-10 mt-3 flex items-center justify-between gap-2">
          <span className="text-[11px] text-on-surface-variant">Analyzing your pitch…</span>
          <SeeDetailsLink id={pitch.id} title={pitch.title} />
        </div>
      )}

      {pitch.status === "PENDING" && (
        <div className="relative z-10 mt-3 flex items-center justify-between gap-2">
          <span className="text-[11px] text-on-surface-variant">Queued for analysis</span>
          <SeeDetailsLink id={pitch.id} title={pitch.title} />
        </div>
      )}

      {pitch.status === "COMPLETED" && (
        <div className="relative z-10 mt-4 space-y-2">
          <div className="flex flex-wrap gap-2">
            <a
              href={pitch.reportPdfPath}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-on-primary-container bg-primary-fixed rounded-full hover:bg-primary-container transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M12 11v7M9 15l3 3 3-3" />
              </svg>
              PDF Report
            </a>
            <a
              href={pitch.reportMdPath}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-on-surface-variant bg-surface-container rounded-full hover:bg-surface-high transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6" />
              </svg>
              Markdown
            </a>
          </div>
          <div className="flex justify-end">
            <SeeDetailsLink id={pitch.id} title={pitch.title} />
          </div>
        </div>
      )}
    </div>
  );
}
