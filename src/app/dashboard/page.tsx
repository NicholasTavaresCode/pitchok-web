import { NewPitchForm } from "@/components/dashboard/new-pitch-form";
import { PitchList } from "@/components/dashboard/pitch-list";
import { HeroBackground } from "@/components/hero-background";
import { MOCK_USER, MOCK_PITCHES, MAX_PITCHES } from "@/lib/mock-pitches";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  const used = MOCK_PITCHES.length;
  const canSubmit = used < MAX_PITCHES;
  const firstName = MOCK_USER.name.split(" ")[0];

  return (
    <div className="relative pt-28 pb-20 px-6 min-h-screen overflow-hidden">
      <HeroBackground />
      <div className="mx-auto max-w-5xl">

        {/* ── Page header ── */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <p className="text-sm text-on-surface-variant mb-1">
                Welcome back, <span className="font-medium text-on-surface">{firstName}</span>
              </p>
              <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Your Pitches
              </h1>
              <p className="mt-2 text-sm text-on-surface-variant max-w-md">
                The richer the context you provide, the sharper the AI analysis will be.
              </p>
            </div>

            {/* Pitch slots indicator */}
            <div className="flex items-center gap-3 shrink-0 bg-surface-lowest rounded-full px-4 py-2.5 shadow-ambient self-start sm:self-auto ghost-border">
              <div className="flex gap-1.5" aria-label={`${used} of ${MAX_PITCHES} pitch slots used`}>
                {Array.from({ length: MAX_PITCHES }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full transition-colors ${i < used ? "bg-primary" : "bg-surface-high"
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm text-on-surface-variant">
                <span className="font-semibold text-on-surface">{used}</span>
                {" "}of {MAX_PITCHES}
              </span>
            </div>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 items-start">

          {/* Left — New pitch form card */}
          <div className="relative bg-surface-lowest rounded-[2rem] shadow-ambient ghost-border p-7 lg:sticky lg:top-24">
            {/* Gradient accent line */}
            <div
              className="absolute top-0 left-10 right-10 h-px rounded-full gradient-primary opacity-40"
              aria-hidden="true"
            />

            {/* Card header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-2xl bg-surface-container flex items-center justify-center shrink-0">
                <svg
                  width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="text-primary"
                >
                  <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
                  <path d="M10 21h4" />
                </svg>
              </div>
              <div>
                <h2 className="font-headline font-semibold text-base leading-tight">New Pitch</h2>
                <p className="text-xs text-on-surface-variant">Be as detailed as possible</p>
              </div>
            </div>

            <NewPitchForm disabled={!canSubmit} />
          </div>

          {/* Right — Pitch history */}
          <PitchList pitches={MOCK_PITCHES} />
        </div>

      </div>
    </div>
  );
}
