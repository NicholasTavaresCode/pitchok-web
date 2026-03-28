import type {
  PitchReport,
  PainPoint,
  Competitor,
  DifferentiationOpportunity,
  Risk,
  UseCase,
} from "@/lib/report.types";

// ── Style helpers ────────────────────────────────────────────────────────────

function scorePotentialLabel(score: number) {
  if (score >= 8) return "Strong Potential";
  if (score >= 6) return "Moderate Potential";
  return "Low Potential";
}

function scoreBadgeClass(score: number) {
  if (score >= 8) return "bg-tertiary-container text-on-tertiary-container";
  if (score >= 6) return "bg-primary-fixed text-on-primary-container";
  return "bg-surface-container text-on-surface-variant";
}

const EVIDENCE_CLASS: Record<string, string> = {
  HIGH: "bg-tertiary-container text-on-tertiary-container",
  MODERATE: "bg-primary-fixed text-on-primary-container",
  WEAK: "bg-surface-container text-on-surface-variant",
};

const RATING_CLASS: Record<string, string> = {
  HIGH: "bg-tertiary-container text-on-tertiary-container",
  MEDIUM: "bg-primary-fixed text-on-primary-container",
  LOW: "bg-surface-container text-on-surface-variant",
};

// ── Layout helpers ───────────────────────────────────────────────────────────

function Section({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface-lowest rounded-[1.5rem] shadow-ambient ghost-border p-5">
      <p className={`text-xs font-medium text-on-surface-variant tracking-wide uppercase ${description ? "mb-1" : "mb-4"}`}>
        {label}
      </p>
      {description && (
        <p className="text-xs text-on-surface-variant leading-relaxed mb-4">{description}</p>
      )}
      {children}
    </div>
  );
}

// Inner cards use surface-lowest + border so text sits on the same white base as the outer card,
// avoiding the gray-on-gray contrast issue.
function InnerCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface-lowest rounded-xl p-4 ghost-border">{children}</div>
  );
}

// ── Exported summary card (idea + score + scorecard) ─────────────────────────

export function PitchSummaryCard({
  idea,
  report,
  reportPdfPath,
  reportMdPath,
}: {
  idea: string;
  report: PitchReport;
  reportPdfPath?: string;
  reportMdPath?: string;
}) {
  const label = scorePotentialLabel(report.overallScore);
  const pct = (report.overallScore / report.maxScore) * 100;
  const total = report.scorecard.reduce((sum, item) => sum + item.weightedScore, 0);

  return (
    <div className="relative bg-surface-lowest rounded-[2rem] shadow-ambient ghost-border p-7 overflow-hidden">
      <div
        className="absolute top-0 left-10 right-10 h-px rounded-full gradient-primary opacity-40"
        aria-hidden="true"
      />

      {/* Your Idea */}
      <p className="text-xs font-medium text-on-surface-variant tracking-wide uppercase mb-3">
        Your Idea
      </p>
      <p className="text-sm text-on-surface leading-relaxed whitespace-pre-wrap mb-4">
        {idea}
      </p>

      {/* Download buttons */}
      {(reportPdfPath || reportMdPath) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {reportPdfPath && (
            <a
              href={reportPdfPath}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-on-primary-container bg-primary-fixed rounded-full hover:bg-primary-container transition-colors"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M12 11v7M9 15l3 3 3-3" />
              </svg>
              PDF Report
            </a>
          )}
          {reportMdPath && (
            <a
              href={reportMdPath}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-on-surface-variant bg-surface-container rounded-full hover:bg-surface-high transition-colors"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6" />
              </svg>
              Markdown
            </a>
          )}
        </div>
      )}

      <div className="h-px bg-surface-container mb-6" aria-hidden="true" />

      {/* Overall Score */}
      <p className="text-xs font-medium text-on-surface-variant tracking-wide uppercase mb-1">
        Overall Score
      </p>
      <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
        How this idea scored across five weighted dimensions of potential.
      </p>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-baseline gap-1.5">
          <span className="font-headline text-4xl font-bold text-on-surface">
            {report.overallScore}
          </span>
          <span className="text-base text-on-surface-variant">/{report.maxScore}</span>
        </div>
        <span
          className={`inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full shrink-0 ${scoreBadgeClass(report.overallScore)}`}
        >
          {label}
        </span>
      </div>
      <div className="h-2 bg-surface-container rounded-full overflow-hidden mb-6">
        <div
          className="h-full rounded-full gradient-primary"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={report.overallScore}
          aria-valuemin={0}
          aria-valuemax={report.maxScore}
        />
      </div>

      <div className="h-px bg-surface-container mb-5" aria-hidden="true" />

      {/* Scorecard */}
      <p className="text-xs font-medium text-on-surface-variant tracking-wide uppercase mb-1">
        Potential Scorecard
      </p>
      <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
        Each dimension is weighted by its importance to early-stage idea validation.
      </p>
      <div className="space-y-4">
        {report.scorecard.map((item) => (
          <div key={item.dimension}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-on-surface">{item.dimension}</span>
              <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                <span className="font-semibold text-on-surface tabular-nums">{item.score}/10</span>
                <span className="tabular-nums">{Math.round(item.weight * 100)}% →</span>
                <span className="font-semibold text-on-surface tabular-nums w-6 text-right">{item.weightedScore}</span>
              </div>
            </div>
            <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div
                className="h-full rounded-full gradient-primary"
                style={{ width: `${(item.score / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between pt-3 border-t border-surface-container">
          <span className="text-xs font-semibold text-on-surface uppercase tracking-wide">Overall</span>
          <span className="font-headline text-xl font-bold text-on-surface tabular-nums">
            {total.toFixed(2)}
            <span className="text-sm font-normal text-on-surface-variant">/10</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Sections ─────────────────────────────────────────────────────────────────

function ExecutiveSummarySection({ text }: { text: string }) {
  return (
    <Section
      label="Executive Summary"
      description="The single most important insight from the AI's analysis of your pitch."
    >
      <p className="text-sm text-on-surface leading-relaxed">{text}</p>
    </Section>
  );
}

function ResearchSection({
  findings,
}: {
  findings: PitchReport["researchFindings"];
}) {
  const signalBadge =
    findings.signalStrength === "strong"
      ? "bg-tertiary-container text-on-tertiary-container"
      : findings.signalStrength === "moderate"
        ? "bg-primary-fixed text-on-primary-container"
        : "bg-surface-container text-on-surface-variant";

  return (
    <Section
      label="Research Findings"
      description="Communities where we found your target audience and how strong the demand signal was."
    >
      <div className="flex items-center gap-6 mb-5">
        <div className="text-center">
          <p className="font-headline text-3xl font-bold text-on-surface">
            {findings.subredditsExplored}
          </p>
          <p className="text-xs text-on-surface-variant mt-0.5">Subreddits</p>
        </div>
        <div className="h-8 w-px bg-surface-container" aria-hidden="true" />
        <div className="text-center">
          <p className="font-headline text-3xl font-bold text-on-surface">
            {findings.threadsAnalyzed}
          </p>
          <p className="text-xs text-on-surface-variant mt-0.5">Threads</p>
        </div>
        <div className="h-8 w-px bg-surface-container" aria-hidden="true" />
        <div className="text-center">
          <span
            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${signalBadge}`}
          >
            {findings.signalStrength}
          </span>
          <p className="text-xs text-on-surface-variant mt-1">Signal</p>
        </div>
      </div>
      <p className="text-xs text-on-surface-variant mb-2">Top communities</p>
      <div className="flex flex-wrap gap-2">
        {findings.topSubreddits.map((sub) => (
          <span
            key={sub}
            className="text-xs bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-full"
          >
            {sub}
          </span>
        ))}
      </div>
    </Section>
  );
}

function PainPointsSection({ points }: { points: PainPoint[] }) {
  return (
    <Section
      label={`Pain Points · ${points.length} identified`}
      description="Real frustrations people have today that your idea directly addresses. Sourced from community discussions."
    >
      <div className="space-y-3">
        {points.map((point, i) => (
          <InnerCard key={i}>
            <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
              <p className="text-sm font-medium text-on-surface">{point.title}</p>
              <div className="flex gap-1.5 shrink-0">
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${EVIDENCE_CLASS[point.evidenceStrength]}`}
                >
                  {point.evidenceStrength}
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">
                  {point.classification}
                </span>
              </div>
            </div>
            <p className="text-xs text-on-surface leading-relaxed mb-3">
              {point.description}
            </p>
            <blockquote className="border-l-2 border-primary pl-3">
              <p className="text-xs text-on-surface italic leading-relaxed">
                &ldquo;{point.quote}&rdquo;
              </p>
              <p className="text-[11px] text-on-surface-variant mt-1">— {point.quoteSource}</p>
            </blockquote>
          </InnerCard>
        ))}
      </div>
    </Section>
  );
}

function CompetitorsSection({ competitors }: { competitors: Competitor[] }) {
  return (
    <Section
      label={`Competitive Landscape · ${competitors.length} alternatives`}
      description="What users currently rely on to solve this problem — and where each option falls short."
    >
      <div className="space-y-3">
        {competitors.map((c, i) => (
          <InnerCard key={i}>
            <p className="text-sm font-medium text-on-surface mb-1">{c.name}</p>
            <p className="text-xs text-on-surface leading-relaxed mb-3">
              {c.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              <div>
                <p className="text-[11px] font-medium text-on-surface-variant uppercase tracking-wide mb-1">
                  Strengths
                </p>
                <ul className="space-y-0.5">
                  {c.strengths.map((s, j) => (
                    <li key={j} className="flex items-start gap-1.5">
                      <svg
                        width="10" height="10" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2.5"
                        className="shrink-0 mt-0.5 text-on-tertiary-container"
                        aria-hidden="true"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className="text-[11px] text-on-surface">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-medium text-on-surface-variant uppercase tracking-wide mb-1">
                  Weaknesses
                </p>
                <ul className="space-y-0.5">
                  {c.weaknesses.map((w, j) => (
                    <li key={j} className="flex items-start gap-1.5">
                      <svg
                        width="10" height="10" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2.5"
                        className="shrink-0 mt-0.5 text-on-surface-variant"
                        aria-hidden="true"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                      <span className="text-[11px] text-on-surface">{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-[11px] text-on-surface-variant italic">
              User sentiment: {c.sentiment}
            </p>
          </InnerCard>
        ))}
      </div>
    </Section>
  );
}

function OpportunitiesSection({
  opportunities,
  marketSummary,
}: {
  opportunities: DifferentiationOpportunity[];
  marketSummary: string;
}) {
  return (
    <Section
      label={`Differentiation Opportunities · ${opportunities.length} gaps`}
      description="Specific gaps in the market where your idea can build a meaningful, defensible advantage."
    >
      <div className="space-y-3 mb-4">
        {opportunities.map((opp, i) => (
          <InnerCard key={i}>
            <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
              <p className="text-sm font-medium text-on-surface">{opp.title}</p>
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${RATING_CLASS[opp.rating]}`}
              >
                {opp.rating}
              </span>
            </div>
            <p className="text-xs text-on-surface leading-relaxed mb-2">
              <span className="font-medium">Gap: </span>
              {opp.gap}
            </p>
            <blockquote className="border-l-2 border-primary pl-3 mb-2">
              <p className="text-xs text-on-surface italic leading-relaxed">
                {opp.evidence}
              </p>
            </blockquote>
            <p className="text-xs text-on-surface leading-relaxed">
              <span className="font-medium">How to exploit: </span>
              {opp.howToExploit}
            </p>
          </InnerCard>
        ))}
      </div>
      <div className="bg-surface-container rounded-xl px-4 py-3">
        <p className="text-[11px] font-medium text-on-surface-variant uppercase tracking-wide mb-1">
          Market Position
        </p>
        <p className="text-xs text-on-surface leading-relaxed">{marketSummary}</p>
      </div>
    </Section>
  );
}

function RisksSection({ risks }: { risks: Risk[] }) {
  const likelihoodStyle: Record<string, React.CSSProperties> = {
    High: { backgroundColor: "rgba(186,26,26,0.10)", color: "#ba1a1a" },
    Moderate: {},
    Low: {},
  };
  const likelihoodClass: Record<string, string> = {
    High: "",
    Moderate: "bg-primary-fixed text-on-primary-container",
    Low: "bg-tertiary-container text-on-tertiary-container",
  };

  return (
    <Section
      label={`Key Risks · ${risks.length} identified`}
      description="The biggest challenges ahead and concrete ways to address them before they become blockers."
    >
      <div className="space-y-3">
        {risks.map((risk, i) => (
          <InnerCard key={i}>
            <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
              <p className="text-sm font-medium text-on-surface">{risk.title}</p>
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${likelihoodClass[risk.likelihood]}`}
                style={likelihoodStyle[risk.likelihood]}
              >
                {risk.likelihood} likelihood
              </span>
            </div>
            <p className="text-xs text-on-surface leading-relaxed mb-3">
              {risk.description}
            </p>
            <div className="flex items-start gap-1.5">
              <svg
                width="11" height="11" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                className="shrink-0 mt-0.5 text-primary"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <p className="text-xs text-on-surface leading-relaxed">
                <span className="font-medium">Mitigation: </span>
                {risk.mitigation}
              </p>
            </div>
          </InnerCard>
        ))}
      </div>
    </Section>
  );
}

function PivotsSection({ pivots }: { pivots: PitchReport["pivots"] }) {
  return (
    <Section
      label="Recommended Pivots & Refinements"
      description="Adjustments to sharpen your idea based on the research — small shifts that could significantly increase your chances."
    >
      <ol className="space-y-4">
        {pivots.map((pivot, i) => (
          <li key={i} className="flex gap-3">
            <span className="font-headline font-bold text-sm text-primary shrink-0 w-5 mt-0.5">
              {i + 1}.
            </span>
            <div>
              <p className="text-sm font-medium text-on-surface mb-1">{pivot.title}</p>
              <p className="text-xs text-on-surface leading-relaxed">
                {pivot.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function UseCasesSection({ useCases }: { useCases: UseCase[] }) {
  const demandClass: Record<string, string> = {
    "High Demand": "bg-tertiary-container text-on-tertiary-container",
    "Medium Demand, High Value": "bg-primary-fixed text-on-primary-container",
    "Low Demand": "bg-surface-container text-on-surface-variant",
  };

  return (
    <Section
      label={`Suggested Use Cases · ${useCases.length} scenarios`}
      description="Concrete situations where your product delivers the most value — useful for positioning and early marketing."
    >
      <div className="space-y-3">
        {useCases.map((uc, i) => (
          <InnerCard key={i}>
            <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
              <p className="text-sm font-medium text-on-surface">{uc.title}</p>
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${demandClass[uc.demand] ?? "bg-surface-container text-on-surface-variant"}`}
              >
                {uc.demand}
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant mb-2">
              <span className="font-medium">Serves:</span> {uc.whoItServes}
            </p>
            <p className="text-xs text-on-surface leading-relaxed mb-2">
              <span className="font-medium">Problem: </span>
              {uc.problemItSolves}
            </p>
            <p className="text-xs text-on-surface leading-relaxed">
              <span className="font-medium">Why it works: </span>
              {uc.whyItWouldWork}
            </p>
          </InnerCard>
        ))}
      </div>
    </Section>
  );
}

function NextStepsSection({ steps }: { steps: string[] }) {
  return (
    <Section
      label="Next Steps"
      description="Actions to take now to validate your idea and move it forward — ordered by priority."
    >
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[10px] font-semibold text-white tabular-nums">
                {i + 1}
              </span>
            </div>
            <p className="text-xs text-on-surface leading-relaxed">{step}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function SourcesSection({ sources }: { sources: PitchReport["keySources"] }) {
  return (
    <Section
      label="Key Sources"
      description="The community threads that most directly informed this analysis."
    >
      <ul className="space-y-2">
        {sources.map((source, i) => (
          <li key={i} className="flex items-start gap-2">
            <svg
              width="12" height="12" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              className="shrink-0 mt-0.5 text-on-surface-variant"
              aria-hidden="true"
            >
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
            <div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline leading-relaxed"
              >
                {source.title}
              </a>
              <p className="text-[11px] text-on-surface-variant">{source.subreddit}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function AdditionalSourcesSection({
  sources,
}: {
  sources: NonNullable<PitchReport["additionalSources"]>;
}) {
  return (
    <Section
      label={`Additional Sources · ${sources.length}`}
      description="All other community threads referenced during research."
    >
      <div className="overflow-y-auto max-h-56 pr-2 space-y-2">
        {sources.map((source, i) => (
          <div key={i} className="flex items-start gap-2">
            <svg
              width="12" height="12" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              className="shrink-0 mt-0.5 text-on-surface-variant"
              aria-hidden="true"
            >
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
            <div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline leading-relaxed"
              >
                {source.title}
              </a>
              <p className="text-[11px] text-on-surface-variant">{source.subreddit}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function PitchReportView({ report }: { report: PitchReport }) {
  return (
    <div className="space-y-4">
      <ExecutiveSummarySection text={report.executiveSummary} />
      <ResearchSection findings={report.researchFindings} />
      <PainPointsSection points={report.painPoints} />
      <CompetitorsSection competitors={report.competitors} />
      <OpportunitiesSection
        opportunities={report.differentiationOpportunities}
        marketSummary={report.marketPositionSummary}
      />
      <RisksSection risks={report.risks} />
      <PivotsSection pivots={report.pivots} />
      <UseCasesSection useCases={report.useCases} />
      <NextStepsSection steps={report.nextSteps} />
      <SourcesSection sources={report.keySources} />
      {report.additionalSources && report.additionalSources.length > 0 && (
        <AdditionalSourcesSection sources={report.additionalSources} />
      )}
    </div>
  );
}
