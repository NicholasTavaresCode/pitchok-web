import { notFound } from "next/navigation";
import { ReportScorecardCard } from "@/components/report-scorecard-card";
import { ReportRatingForm } from "@/components/report-rating-form";
import { ScorecardInfo } from "@/components/scorecard-info";
import { HeroBackground } from "@/components/hero-background";
import Link from "next/link";
import aiFinancial from "@/data/reports/ai-financial-management-platform.json";
import exchangeMarketplace from "@/data/reports/reusable-material-exchange-marketplace.json";
import exchangePlatform from "@/data/reports/reusable-material-exchange-platform.json";

const REPORTS: Record<string, typeof aiFinancial> = {
  "ai-financial-management-platform": aiFinancial,
  "reusable-material-exchange-marketplace": exchangeMarketplace,
  "reusable-material-exchange-platform": exchangePlatform,
};

const METADATA: Record<string, { submitted_at: string; status: string }> = {
  "ai-financial-management-platform":        { submitted_at: "2026-03-28T20:31:05", status: "Completed" },
  "reusable-material-exchange-marketplace":  { submitted_at: "2026-03-28T20:22:12", status: "Completed" },
  "reusable-material-exchange-platform":     { submitted_at: "2026-03-28T19:56:42", status: "Completed" },
};

export function generateStaticParams() {
  return Object.keys(REPORTS).map((id) => ({ id }));
}

/* ── helpers ── */
function verdictColor(verdict: string) {
  if (verdict.includes("HIGH") || verdict.includes("STRONG")) return { bg: "#dcfce7", text: "#15803d" };
  if (verdict.includes("MODERATE")) return { bg: "#fef9c3", text: "#854d0e" };
  return { bg: "#fee2e2", text: "#b91c1c" };
}

function scoreColor(score: number) {
  if (score >= 7.5) return "#15803d";
  if (score >= 5) return "#b45309";
  return "#b91c1c";
}

function sentimentColor(s: string) {
  if (s === "Recommended") return { bg: "#dcfce7", text: "#15803d" };
  if (s === "Negative") return { bg: "#fee2e2", text: "#b91c1c" };
  return { bg: "#f1f5f9", text: "#475569" };
}

function strengthColor(s: string) {
  if (s === "strong") return { bg: "#dbeafe", text: "#1d4ed8" };
  if (s === "moderate") return { bg: "#fef9c3", text: "#854d0e" };
  return { bg: "#f1f5f9", text: "#475569" };
}

function ratingColor(r: string) {
  if (r === "HIGH") return { bg: "#dcfce7", text: "#15803d" };
  if (r === "MEDIUM") return { bg: "#fef9c3", text: "#854d0e" };
  return { bg: "#fee2e2", text: "#b91c1c" };
}

function likelihoodColor(l: string) {
  if (l === "High") return { bg: "#fee2e2", text: "#b91c1c" };
  if (l === "Medium") return { bg: "#fef9c3", text: "#854d0e" };
  return { bg: "#dcfce7", text: "#15803d" };
}

function Badge({ label, colors }: { label: string; colors: { bg: string; text: string } }) {
  return (
    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: colors.bg, color: colors.text }}>
      {label}
    </span>
  );
}

function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h2 className="font-headline text-xl font-bold tracking-tight">{children}</h2>
      {subtitle && <p className="mt-1 text-sm text-on-surface-variant">{subtitle}</p>}
    </div>
  );
}

function Card({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`bg-surface-lowest rounded-2xl shadow-ambient p-6 ${className}`} style={style}>
      {children}
    </div>
  );
}

/* ── page ── */
export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = REPORTS[id];
  if (!report) notFound();

  const vc = verdictColor(report.verdict);
  const meta = METADATA[id];
  const keySources = report.sources.filter((s) => s.key);
  const otherSources = report.sources.filter((s) => !s.key);

  const submittedAt = new Date(meta.submitted_at).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <main className="relative min-h-screen bg-surface pt-24 pb-20 px-4 md:px-6 overflow-hidden">
      <HeroBackground />
      <div className="relative z-10 mx-auto max-w-4xl space-y-8">

        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Back to home
        </Link>

        {/* ── Hero ── */}
        <div className="relative bg-surface-lowest rounded-2xl shadow-ambient">
          {/* Gradient accent line */}
          <div className="absolute top-0 left-10 right-10 h-px rounded-full gradient-primary opacity-40" aria-hidden="true" />

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: vc.bg, color: vc.text }}>
                    {report.verdict}
                  </span>
                  <span className="text-[11px] bg-surface-container text-on-surface-variant px-2.5 py-0.5 rounded-full font-medium">
                    {meta.status}
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    {report.subreddits_count} communities · signal: <span className="font-medium capitalize">{report.signal_quality}</span>
                  </span>
                </div>
                <h1 className="font-headline text-2xl md:text-3xl font-bold tracking-tight leading-snug">
                  {report.idea_title}
                </h1>
                <p className="mt-2 text-[11px] text-on-surface-variant flex items-center gap-1.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                  </svg>
                  Submitted {submittedAt}
                </p>
              </div>

              {/* Score */}
              <div className="shrink-0 flex flex-col items-center gap-1">
                <span className="font-headline text-5xl font-bold tabular-nums" style={{ color: scoreColor(report.overall_score) }}>
                  {report.overall_score.toFixed(1)}
                </span>
                <span className="text-[11px] text-on-surface-variant">out of 10</span>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-surface-container">
              <p className="text-sm text-on-surface-variant leading-relaxed">{report.executive_summary}</p>
            </div>

            {/* Download buttons */}
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium btn-primary transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" />
                </svg>
                Download PDF
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-surface-container text-on-surface hover:bg-surface-high transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                Download Markdown
              </a>
            </div>
          </div>
        </div>

        {/* ── Scorecard ── */}
        <section>
          <div className="flex items-center gap-1.5 mb-5">
            <h2 className="font-headline text-xl font-bold tracking-tight">Potential Scorecard</h2>
            <ScorecardInfo />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {report.dimension_scores.map((d) => (
              <ReportScorecardCard key={d.name} name={d.name} score={d.score} justification={d.justification} />
            ))}
          </div>
        </section>

        {/* ── Pain Points ── */}
        <section>
          <SectionTitle subtitle="Real frustrations surfaced from active market discussions — the problems people are vocal about right now.">Pain Points Discovered</SectionTitle>
          <div className="space-y-3">
            {report.pain_points.map((p) => (
              <Card key={p.rank} className="flex gap-4">
                <div className="shrink-0 h-8 w-8 rounded-xl bg-surface-container flex items-center justify-center font-headline text-sm font-bold text-primary">
                  {p.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-headline text-sm font-semibold">{p.title}</span>
                    <Badge label={p.evidence_strength} colors={strengthColor(p.evidence_strength)} />
                    <Badge label={p.type} colors={{ bg: "#ede9fe", text: "#6d28d9" }} />
                  </div>
                  <p className="text-[13px] text-on-surface-variant leading-relaxed mb-2">{p.description}</p>
                  <blockquote className="text-[12px] italic text-on-surface-variant border-l-2 pl-3" style={{ borderColor: "var(--color-primary-container)" }}>
                    "{p.representative_quote}"
                  </blockquote>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Competitors ── */}
        <section>
          <SectionTitle subtitle="Existing solutions and alternatives operating in your space, mapped with their strengths and blind spots.">Known Competitors</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {report.competitors.map((c) => (
              <Card key={c.name}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-headline text-sm font-semibold">{c.name}</span>
                  <Badge label={c.sentiment} colors={sentimentColor(c.sentiment)} />
                </div>
                <p className="text-[12px] text-on-surface-variant mb-4">{c.description}</p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-low rounded-xl p-3">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-green-700 mb-2">Strengths</p>
                    {c.strengths.length > 0 ? c.strengths.map((s) => (
                      <div key={s} className="flex items-start gap-1.5 text-[11px] text-on-surface-variant mb-1 last:mb-0">
                        <span className="text-green-600 shrink-0 mt-0.5">✓</span>{s}
                      </div>
                    )) : <p className="text-[11px] text-on-surface-variant italic">None identified</p>}
                  </div>

                  <div className="bg-surface-low rounded-xl p-3">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-red-600 mb-2">Weaknesses</p>
                    {c.weaknesses.length > 0 ? c.weaknesses.map((w) => (
                      <div key={w} className="flex items-start gap-1.5 text-[11px] text-on-surface-variant mb-1 last:mb-0">
                        <span className="text-red-500 shrink-0 mt-0.5">✗</span>{w}
                      </div>
                    )) : <p className="text-[11px] text-on-surface-variant italic">None identified</p>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Differentiation ── */}
        <section>
          <SectionTitle subtitle="The gaps competitors leave open and how your idea can exploit them to stand out.">Differentiation Opportunities</SectionTitle>
          <div className="space-y-3">
            {report.differentiation_opportunities.map((o) => (
              <Card key={o.gap}>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge label={o.rating} colors={ratingColor(o.rating)} />
                  <span className="text-[11px] bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full capitalize">{o.category}</span>
                </div>
                <p className="font-headline text-sm font-semibold mb-1">{o.gap}</p>
                <p className="text-[12px] text-on-surface-variant mb-2 leading-relaxed">{o.evidence}</p>
                <div className="bg-surface-low rounded-xl p-3 text-[12px] text-on-surface-variant leading-relaxed">
                  <span className="font-medium text-primary">How to exploit: </span>{o.how_to_exploit}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Market Position ── */}
        <Card>
          <h2 className="font-headline text-base font-bold mb-2">Market Position Summary</h2>
          <p className="text-sm text-on-surface-variant leading-relaxed" dangerouslySetInnerHTML={{ __html: report.market_position_summary.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
        </Card>

        {/* ── Risks ── */}
        <section>
          <SectionTitle subtitle="The most critical threats to your idea's success, each paired with a mitigation suggestion.">Key Risks</SectionTitle>
          <div className="space-y-3">
            {report.risks.map((r) => (
              <Card key={r.title} className="border-l-4" style={{ borderColor: likelihoodColor(r.likelihood).text }}>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-headline text-sm font-semibold">{r.title}</span>
                  <Badge label={`${r.likelihood} likelihood`} colors={likelihoodColor(r.likelihood)} />
                </div>
                <p className="text-[13px] text-on-surface-variant leading-relaxed mb-2">{r.description}</p>
                <div className="bg-surface-low rounded-xl p-3 text-[12px] text-on-surface-variant leading-relaxed">
                  <span className="font-medium text-primary">Mitigation: </span>{r.mitigation}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Target Audience ── */}
        <Card>
          <h2 className="font-headline text-base font-bold mb-2">Possible Target Audience</h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">{report.target_audience}</p>
        </Card>

        {/* ── Use Cases ── */}
        <section>
          <SectionTitle subtitle="The highest-value scenarios where your idea fits best, ranked by opportunity size.">Suggested Use Cases</SectionTitle>
          <div className="space-y-3">
            {report.use_cases.map((u) => (
              <Card key={u.title}>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-headline text-sm font-semibold">{u.title}</span>
                  <Badge label={u.priority} colors={ratingColor(u.priority)} />
                </div>
                <p className="text-[12px] text-on-surface-variant mb-1"><span className="font-medium">Audience:</span> {u.target_audience}</p>
                <p className="text-[12px] text-on-surface-variant mb-1 leading-relaxed"><span className="font-medium">Problem solved:</span> {u.problem_solved}</p>
                <p className="text-[12px] text-on-surface-variant leading-relaxed"><span className="font-medium">Advantage:</span> {u.competitive_advantage}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Pivots ── */}
        <section>
          <SectionTitle subtitle="Strategic adjustments to sharpen your positioning based on what the research revealed.">Suggested Pivots</SectionTitle>
          <div className="space-y-3">
            {report.pivots.map((p) => (
              <Card key={p.title}>
                <p className="font-headline text-sm font-semibold mb-1">{p.title}</p>
                <p className="text-[13px] text-on-surface-variant leading-relaxed mb-2">{p.description}</p>
                <p className="text-[12px] text-on-surface-variant italic">{p.rationale}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Next Steps ── */}
        <section>
          <SectionTitle subtitle="Concrete actions to take right now based on the validation findings.">Next Steps</SectionTitle>
          <Card>
            <ol className="space-y-3">
              {report.next_steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-on-surface-variant leading-relaxed">
                  <span className="shrink-0 h-6 w-6 rounded-full bg-surface-container flex items-center justify-center text-[11px] font-bold text-primary mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </Card>
        </section>

        {/* ── Sources ── */}
        <section>
          <SectionTitle subtitle="The real discussions and threads that informed every finding in this report.">Sources <span className="text-base font-normal text-on-surface-variant">({report.sources.length})</span></SectionTitle>
          <Card>
            {keySources.length > 0 && (
              <>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-3">
                  Key sources <span className="normal-case font-normal tracking-normal">({keySources.length})</span>
                </p>
                <div className="space-y-2 mb-5">
                  {keySources.map((s) => (
                    <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-start gap-2.5 group hover:bg-surface-low rounded-xl p-2 transition-colors">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5 text-primary">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                      <div className="min-w-0">
                        <p className="text-[13px] text-on-surface group-hover:text-primary transition-colors leading-snug">{s.title}</p>
                        <p className="text-[11px] text-on-surface-variant">r/{s.subreddit}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}
            {otherSources.length > 0 && (
              <>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-on-surface-variant mb-3">
                  Additional sources <span className="normal-case font-normal tracking-normal">({otherSources.length})</span>
                </p>
                <div className="space-y-1.5 max-h-56 overflow-y-auto overflow-x-hidden pr-2">
                  {otherSources.map((s) => (
                    <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 group hover:bg-surface-low rounded-lg px-2 py-1 transition-colors">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-on-surface-variant group-hover:text-primary transition-colors">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                      <span className="text-[12px] text-on-surface-variant group-hover:text-on-surface transition-colors truncate flex-1 min-w-0">{s.title}</span>
                      <span className="text-[10px] text-on-surface-variant shrink-0">r/{s.subreddit}</span>
                    </a>
                  ))}
                </div>
              </>
            )}
          </Card>
        </section>

        {/* ── Rate this report ── */}
        <section>
          <SectionTitle subtitle="Your feedback helps us improve the accuracy and quality of every validation.">Rate this Report</SectionTitle>
          <ReportRatingForm />
        </section>

      </div>
    </main>
  );
}
