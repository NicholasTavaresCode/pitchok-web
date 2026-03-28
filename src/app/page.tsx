import { HeroBackground } from "@/components/hero-background";
import { TryItNowForm } from "@/components/try-it-now-form";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PitchOK",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "AI-powered idea validation platform. Get clear, actionable insights on your startup idea in seconds.",
    url: "https://pitchok.com",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
      { "@type": "Offer", price: "29", priceCurrency: "USD", name: "Pro" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1240",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <h1 className="font-headline text-5xl md:text-7xl font-bold leading-tight tracking-[-0.02em]">
            Got a pitch?{" "}
            <span className="italic">Let's get deep!</span>
          </h1>
          <p className="mt-6 text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            <b>Stop</b> <span style={{ fontWeight: 700, color: "#c0392b" }}>guessing</span>. We research your idea, validate what people actually want, and flag what could go wrong <span style={{ fontWeight: 700, color: "#D4AF37" }}>before</span> you <b>invest your time and money</b>.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="flex items-center gap-2.5 px-6 py-3 bg-surface-lowest text-on-surface rounded-full shadow-ambient hover:bg-surface-high transition-colors text-sm font-medium">
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              Continue with Google
            </button>
            <a
              href="#showcase"
              className="px-6 py-3 text-sm font-medium text-primary hover:text-primary-dim transition-colors"
            >
              Watch How It Works
            </a>
          </div>
        </div>

        {/* Hero illustration placeholder */}
        <div className="relative z-10 mx-auto max-w-4xl mt-16 rounded-[2rem] gradient-primary overflow-hidden aspect-[16/7] flex items-center justify-center">
          <p className="text-on-primary text-sm opacity-60">
            Hero illustration
          </p>
        </div>
      </section>

      {/* ── Process: Simple as 1, 2, 3 ── */}
      <section className="py-20 px-6 bg-surface-low" id="features">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-[-0.02em]">
            Simple as 1, 2, 3
          </h2>
          <p className="mt-3 text-on-surface-variant">
            Validation doesn&apos;t have to be a headache.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-surface-container flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                  <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
                  <path d="M10 21h4" />
                </svg>
              </div>
              <h3 className="font-headline text-lg font-semibold">Input Idea</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Just type your idea in simple words. No business jargon required.
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-surface-container flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <h3 className="font-headline text-lg font-semibold">AI Analyzes</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Our multiple AI agents analyze the market, trends, and risks for you.
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-surface-container flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <h3 className="font-headline text-lg font-semibold">Get Your Result</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Receive a clean, easy-to-read score and actionable next steps.
              </p>
            </div>
          </div>

          {/* Bracket */}
          <div className="mt-8 hidden md:block">
            <svg viewBox="0 0 900 80" fill="none" className="w-full" preserveAspectRatio="none">
              <path d="M 20,4 C 20,64 420,74 450,74" stroke="var(--color-on-surface-variant)" strokeWidth="2.5" strokeOpacity="0.4" />
              <path d="M 880,4 C 880,64 480,74 450,74" stroke="var(--color-on-surface-variant)" strokeWidth="2.5" strokeOpacity="0.4" />
              <path d="M 450,74 L 450,80" stroke="var(--color-on-surface-variant)" strokeWidth="2.5" strokeOpacity="0.4" />
            </svg>

            <div className="flex justify-center">
              <div className="bg-surface-container rounded-2xl px-8 py-6 grid grid-cols-2 gap-x-10 gap-y-3">

                {/* Left col — AI sophistication */}
                <div className="flex flex-col gap-3">
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-1">How the AI works</p>
                  {[
                    { d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", text: "Multi-agent architecture — not a single prompt" },
                    { d: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z", text: "Dedicated agents to filter huge amount of market data" },
                    { d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75", text: "Separate agent maps competitors & gaps" },
                    { d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6", text: "Synthesis agent compiles a coherent report" },
                  ].map(({ d, text }) => (
                    <div key={text} className="flex items-center gap-2.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary shrink-0">
                        <path d={d} />
                      </svg>
                      <span className="text-[12px] text-on-surface-variant">{text}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="absolute" />

                {/* Right col — Privacy */}
                <div className="flex flex-col gap-3 border-l border-on-surface-variant/10 pl-10">
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-1">Your privacy</p>
                  {[
                    { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", text: "Only you can access your reports" },
                    { d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75", text: "Never shared with third parties" },
                    { d: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z", text: "No human ever reads your idea" },
                    { d: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3", text: "You own your data — delete anytime" }
                  ].map(({ d, text }) => (
                    <div key={text} className="flex items-center gap-2.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary shrink-0">
                        <path d={d} />
                      </svg>
                      <span className="text-[12px] text-on-surface-variant">{text}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What's inside every report ── */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-[-0.02em]">
              What&apos;s inside every report
            </h2>
            <p className="mt-3 text-on-surface-variant max-w-xl mx-auto">
              <b>Eight</b> research layers, so you know exactly what you&apos;re walking into <span style={{ fontWeight: 700, color: "#D4AF37" }}>before</span> you commit a single hour to building.
            </p>
          </div>

          {/* 6-item 2-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="bg-surface-lowest rounded-2xl shadow-ambient p-6 flex gap-4">
              <div className="shrink-0 h-10 w-10 rounded-xl bg-surface-container flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-headline text-sm font-semibold">Pain Points Discovered</h3>
                <p className="mt-1 text-sm text-on-surface-variant leading-relaxed">
                  The real frustrations people express in your target market in their own words, not market-research jargon.
                </p>
              </div>
            </div>

            <div className="bg-surface-lowest rounded-2xl shadow-ambient p-6 flex gap-4">
              <div className="shrink-0 h-10 w-10 rounded-xl bg-surface-container flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <div>
                <h3 className="font-headline text-sm font-semibold">Known Competitors</h3>
                <p className="mt-1 text-sm text-on-surface-variant leading-relaxed">
                  A map of existing solutions and alternatives, including what they do well and where they fall short.
                </p>
              </div>
            </div>

            <div className="bg-surface-lowest rounded-2xl shadow-ambient p-6 flex gap-4">
              <div className="shrink-0 h-10 w-10 rounded-xl bg-surface-container flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-headline text-sm font-semibold">Differentiation Opportunities</h3>
                <p className="mt-1 text-sm text-on-surface-variant leading-relaxed">
                  The specific gaps competitors leave open. Your clearest paths to standing out and winning early adopters.
                </p>
              </div>
            </div>

            <div className="bg-surface-lowest rounded-2xl shadow-ambient p-6 flex gap-4">
              <div className="shrink-0 h-10 w-10 rounded-xl bg-surface-container flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                  <path d="M18 20V10M12 20V4M6 20v-6" />
                </svg>
              </div>
              <div>
                <h3 className="font-headline text-sm font-semibold">Potential Scorecard</h3>
                <p className="mt-1 text-sm text-on-surface-variant leading-relaxed">
                  A scored breakdown across market demand, competitive intensity, differentiation potential, and execution risk.
                </p>
              </div>
            </div>

            <div className="bg-surface-lowest rounded-2xl shadow-ambient p-6 flex gap-4">
              <div className="shrink-0 h-10 w-10 rounded-xl bg-surface-container flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <path d="M12 9v4M12 17h.01" />
                </svg>
              </div>
              <div>
                <h3 className="font-headline text-sm font-semibold">Key Risks</h3>
                <p className="mt-1 text-sm text-on-surface-variant leading-relaxed">
                  The honest flags. Market timing, regulatory concerns, adoption hurdles... before you bet time and money on them.
                </p>
              </div>
            </div>

            <div className="bg-surface-lowest rounded-2xl shadow-ambient p-6 flex gap-4">
              <div className="shrink-0 h-10 w-10 rounded-xl bg-surface-container flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </div>
              <div>
                <h3 className="font-headline text-sm font-semibold">Suggested Use Cases</h3>
                <p className="mt-1 text-sm text-on-surface-variant leading-relaxed">
                  Practical scenarios where your idea fits best, helping you focus on the highest-value version to build first.
                </p>
              </div>
            </div>

            {/* Target Audience — spans full width as 7th item */}
            <div className="md:col-span-2 bg-surface-lowest rounded-2xl shadow-ambient p-6 flex gap-4">
              <div className="shrink-0 h-10 w-10 rounded-xl bg-surface-container flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div>
                <h3 className="font-headline text-sm font-semibold">Possible Target Audience</h3>
                <p className="mt-1 text-sm text-on-surface-variant leading-relaxed">
                  Based on who is actively discussing the problems related to your idea. Not assumed demographics, but real communities and personas already expressing the need your idea addresses.
                </p>
              </div>
            </div>
          </div>

          {/* Sources — full-width accent card */}
          <div className="mt-4 bg-surface-lowest rounded-2xl shadow-ambient p-6 flex gap-4 border-l-4" style={{ borderColor: "var(--color-primary)" }}>
            <div className="shrink-0 h-10 w-10 rounded-xl bg-surface-container flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <div>
              <h3 className="font-headline text-sm font-semibold">Sources</h3>
              <p className="mt-1 text-sm text-on-surface-variant leading-relaxed">
                Every finding is backed by real, clickable sources so you can go deeper, verify the data yourself, or hand it off to your team.
              </p>
            </div>
          </div>

          {/* Report formats */}
          <div className="mt-14">
            <p className="text-center text-xs font-medium text-on-surface-variant tracking-widest uppercase mb-6">
              Your report, your format
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Online viewer */}
              <div className="bg-surface-low rounded-2xl p-6 flex gap-4 items-start">
                <div className="shrink-0 h-10 w-10 rounded-xl bg-surface-container flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline text-sm font-semibold">Web Report</h3>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">Read online</span>
                  </div>
                  <p className="mt-1 text-sm text-on-surface-variant leading-relaxed">
                    Browse your full report directly in PitchOK. Formatted, navigable, and always accessible from your dashboard.
                  </p>
                </div>
              </div>

              {/* PDF */}
              <div className="bg-surface-low rounded-2xl p-6 flex gap-4 items-start">
                <div className="shrink-0 h-10 w-10 rounded-xl bg-surface-container flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline text-sm font-semibold">Professional PDF</h3>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">Download</span>
                  </div>
                  <p className="mt-1 text-sm text-on-surface-variant leading-relaxed">
                    A polished document you can drop into a pitch deck, send to investors, or file for your own records.
                  </p>
                </div>
              </div>

              {/* Markdown */}
              <div className="bg-surface-low rounded-2xl p-6 flex gap-4 items-start">
                <div className="shrink-0 h-10 w-10 rounded-xl bg-surface-container flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline text-sm font-semibold">Raw Markdown</h3>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">Download</span>
                  </div>
                  <p className="mt-1 text-sm text-on-surface-variant leading-relaxed">
                    Paste it straight into Claude, ChatGPT, Gemini or any LLM to keep refining your strategy. The data is yours to run with.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Try it Now (form) ── */}
      <section className="py-20 px-6 bg-surface-low">
        <div className="mx-auto max-w-xl">
          <div className="bg-surface-lowest rounded-[2rem] shadow-ambient p-8 md:p-10">
            <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-[-0.02em] text-center">
              Try it Now
            </h2>
            <p className="mt-2 text-sm text-on-surface-variant text-center">
              Get your first idea report.
            </p>
            <TryItNowForm />
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20 px-6" id="pricing">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-[-0.02em]">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-on-surface-variant">
            Choose the plan that&apos;s right for your stage of growth.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="bg-surface-lowest rounded-[2rem] shadow-ambient p-8 flex flex-col text-left">
              <h3 className="font-headline text-lg font-semibold">Free</h3>
              <p className="mt-2">
                <span className="font-headline text-4xl font-bold">$0</span>
                <span className="text-sm text-on-surface-variant"> /month</span>
              </p>
              <ul className="mt-8 space-y-4 flex-1">
                {["3 validations per month", "Basic Market Research", "Community Support"].map(
                  (feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-on-surface-variant">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary mt-0.5 shrink-0">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      {feature}
                    </li>
                  )
                )}
              </ul>
              <button className="btn-secondary mt-8 w-full py-3 text-sm font-medium transition-colors">
                Start for free
              </button>
            </div>

            {/* Pro */}
            <div className="bg-surface-lowest rounded-[2rem] shadow-ambient p-8 flex flex-col text-left relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-on-primary text-xs font-medium px-4 py-1 rounded-full">
                Most Popular
              </span>
              <h3 className="font-headline text-lg font-semibold">Pro</h3>
              <p className="mt-2">
                <span className="font-headline text-4xl font-bold">$29</span>
                <span className="text-sm text-on-surface-variant"> /month</span>
              </p>
              <ul className="mt-8 space-y-4 flex-1">
                {[
                  "Unlimited validations",
                  "Deep Risk & Competitor Analysis",
                  "Priority AI processing",
                  "PDF Exportable Reports",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-on-surface-variant">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary mt-0.5 shrink-0">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="btn-primary mt-8 w-full py-3 text-sm font-medium transition-colors">
                Get Pro
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-surface-lowest rounded-[2rem] shadow-ambient p-8 flex flex-col text-left">
              <h3 className="font-headline text-lg font-semibold">Enterprise</h3>
              <p className="mt-2">
                <span className="font-headline text-4xl font-bold">Custom</span>
              </p>
              <ul className="mt-8 space-y-4 flex-1">
                {[
                  "Unlimited team seats",
                  "API Access",
                  "Dedicated account manager",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-on-surface-variant">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary mt-0.5 shrink-0">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="btn-secondary mt-8 w-full py-3 text-sm font-medium transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-[-0.02em]">
            Stay ahead of the curve
          </h2>
          <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
            Join our newsletter for weekly insights on emerging markets,
            validation tactics, and early access to new AI features.
          </p>
          <form className="mt-8 flex gap-3">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 bg-surface-highest rounded-full px-5 py-3 text-sm text-on-surface shadow-ambient placeholder:text-outline focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary transition-all"
            />
            <button
              type="submit"
              className="btn-primary px-6 py-3 text-sm font-medium transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-6 gradient-primary" id="showcase">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-[-0.02em] text-on-primary leading-tight">
            Your next big idea is waiting.
          </h2>
          <p className="mt-4 text-sm text-on-primary/70">
            Join founders who use PitchOK to validate their dreams with
            clarity and confidence.
          </p>
          <button className="mt-8 flex items-center gap-2.5 mx-auto px-6 py-3 bg-surface-lowest text-on-surface rounded-full shadow-ambient hover:bg-surface-high transition-colors text-sm font-medium">
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            Continue with Google
          </button>
          <p className="mt-4 text-xs text-on-primary/50">
            Don't lose time and money. Use PitchOK to help you!
          </p>
        </div>
      </section>
    </>
  );
}
