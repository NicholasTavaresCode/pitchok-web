import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroBackground } from "@/components/hero-background";
import { PitchFeedbackForm } from "@/components/dashboard/pitch-feedback-form";
import { PitchReportView, PitchSummaryCard } from "@/components/dashboard/pitch-report-view";
import { MOCK_PITCHES } from "@/lib/mock-pitches";
import { MOCK_REPORTS } from "@/lib/mock-report";
import type { PitchStatus } from "@/components/dashboard/pitch-card";

export function generateStaticParams() {
  return MOCK_PITCHES.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pitch = MOCK_PITCHES.find((p) => p.id === id);
  return { title: pitch?.title ?? "Pitch Detail", robots: { index: false } };
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
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PitchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pitch = MOCK_PITCHES.find((p) => p.id === id);
  if (!pitch) notFound();

  const cfg = STATUS_CONFIG[pitch.status];
  const report = MOCK_REPORTS[pitch.id];

  return (
    <div className="relative pt-28 pb-20 px-6 min-h-screen overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 mx-auto max-w-2xl">

        {/* ── Back navigation ── */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-on-surface transition-colors mb-8 group"
        >
          <svg
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            className="transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Dashboard
        </Link>

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cfg.badgeClass}`}
              >
                {cfg.icon !== null ? (
                  <svg
                    width="11" height="11" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5"
                    aria-hidden="true"
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
              <span className="text-xs text-on-surface-variant">
                Submitted {formatDate(pitch.createdAt)}
              </span>
            </div>
            <h1 className="font-headline text-2xl md:text-3xl font-bold tracking-[-0.02em]">
              {pitch.title}
            </h1>
          </div>
        </div>

        {/* ── Status section ── */}
        {pitch.status === "PROCESSING" && (
          <>
            <div className="relative bg-surface-lowest rounded-[2rem] shadow-ambient ghost-border p-7 mb-6">
              <div className="absolute top-0 left-10 right-10 h-px rounded-full gradient-primary opacity-40" aria-hidden="true" />
              <p className="text-xs font-medium text-on-surface-variant tracking-wide uppercase mb-3">Your Idea</p>
              <p className="text-sm text-on-surface leading-relaxed whitespace-pre-wrap">{pitch.idea}</p>
            </div>
            <div className="bg-surface-lowest rounded-[1.5rem] shadow-ambient ghost-border p-5">
              <p className="text-sm font-medium text-on-surface mb-3">Analysis in progress</p>
              <div className="flex items-center gap-3">
                <div className="h-1.5 flex-1 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full w-2/5 bg-primary rounded-full animate-pulse" />
                </div>
                <span className="text-xs text-on-surface-variant whitespace-nowrap">~12 min remaining</span>
              </div>
              <p className="mt-3 text-xs text-on-surface-variant">
                Our AI agents are researching your idea. You'll find the report here once it's ready.
              </p>
            </div>
          </>
        )}

        {pitch.status === "PENDING" && (
          <>
            <div className="relative bg-surface-lowest rounded-[2rem] shadow-ambient ghost-border p-7 mb-6">
              <div className="absolute top-0 left-10 right-10 h-px rounded-full gradient-primary opacity-40" aria-hidden="true" />
              <p className="text-xs font-medium text-on-surface-variant tracking-wide uppercase mb-3">Your Idea</p>
              <p className="text-sm text-on-surface leading-relaxed whitespace-pre-wrap">{pitch.idea}</p>
            </div>
            <div className="bg-surface-lowest rounded-[1.5rem] shadow-ambient ghost-border p-5">
              <p className="text-sm font-medium text-on-surface mb-1">Queued for analysis</p>
              <p className="text-xs text-on-surface-variant">
                Your pitch is in the queue. Analysis takes ~12 minutes once it starts.
              </p>
            </div>
          </>
        )}

        {pitch.status === "COMPLETED" && (
          <>
            {report && (
              <PitchSummaryCard
                idea={pitch.idea}
                report={report}
                reportPdfPath={pitch.reportPdfPath}
                reportMdPath={pitch.reportMdPath}
              />
            )}
            {report && <div className="mt-4"><PitchReportView report={report} /></div>}

            {/* ── Feedback ── */}
            <div className="bg-surface-lowest rounded-[1.5rem] shadow-ambient ghost-border p-5 mt-4">
              <PitchFeedbackForm pitchId={pitch.id} />
            </div>
          </>
        )}

      </div>
    </div>
  );
}
