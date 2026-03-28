"use client";

import { useState, useEffect } from "react";

/* ──────────────────────────────────────────────
   50-idea pool — max 5 words each,
   shuffled on mount so every page load is fresh.
   ────────────────────────────────────────────── */

const IDEAS: string[] = [
  "AI lawyer for founders",
  "Rent parking spots instantly",
  "Netflix for board games",
  "Match mentors via video",
  "Airbnb for recording studios",
  "Social network for readers",
  "AR mirror styles outfits",
  "Artisan subscription box delivered",
  "Gamified language for commuters",
  "Smart trash sorts recycling",
  "Virtual assistant for elderly",
  "Peer lending for farmers",
  "AI builds your resume",
  "Secondhand designer baby clothes",
  "Live dog walking streams",
  "Book electricians in seconds",
  "Vitamins based on DNA",
  "VR gym classes home",
  "Rent community garden plots",
  "AI meal plans families",
  "Crowdfund local restaurants now",
  "Contracts translated in seconds",
  "Insurance for gig workers",
  "Predict appliance failures early",
  "Social detox accountability app",
  "Handmade pet accessories marketplace",
  "AI writes bedtime stories",
  "Shared e-bikes for campuses",
  "Remote teams mental health",
  "Move furniture on demand",
  "Zero-waste grocery delivery",
  "Split bills with roommates",
  "Smart bottle tracks hydration",
  "Marketplace for retired pros",
  "AI travel shopping assistant",
  "Community renewable energy co-op",
  "Virtual tour guide app",
  "Notary via video call",
  "Chefs for private dinners",
  "AI-curated news digest",
  "Invest spare change daily",
  "AI negotiates utility bills",
  "Suburban shared office spaces",
  "Language exchange native speakers",
  "Legal templates one click",
  "Crowdfund urban community pools",
  "Home exchange skip hotels",
  "AI monitors crops remotely",
  "Rent designer handbags monthly",
  "Emergency dental booked instantly",
];

/* ──────────────────────────────────────────────
   Stickman SVG Poses
   viewBox="0 0 40 46"
   ────────────────────────────────────────────── */

type Pose = "pitch" | "excited" | "think" | "point" | "wave";

function StickmanSvg({ pose, flip }: { pose: Pose; flip?: boolean }) {
  const s = { strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  const arms: Record<Pose, React.ReactNode> = {
    pitch:   <><line x1="20" y1="21" x2="11" y2="27" {...s} /><line x1="20" y1="21" x2="31" y2="13" {...s} /></>,
    excited: <><line x1="20" y1="21" x2="11" y2="13" {...s} /><line x1="20" y1="21" x2="29" y2="13" {...s} /></>,
    think:   <><line x1="20" y1="21" x2="12" y2="27" {...s} /><line x1="20" y1="21" x2="25" y2="14" {...s} /></>,
    point:   <><line x1="20" y1="21" x2="9"  y2="25" {...s} /><line x1="20" y1="21" x2="35" y2="19" {...s} /></>,
    wave:    <><line x1="20" y1="21" x2="12" y2="26" {...s} /><line x1="20" y1="21" x2="30" y2="14" {...s} /><circle cx="30" cy="13" r="1.2" fill="currentColor" /></>,
  };

  return (
    <svg
      viewBox="0 0 40 46"
      fill="none"
      stroke="currentColor"
      className="w-full h-auto"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <circle cx="20" cy="8" r="5.5" fill="currentColor" strokeWidth={0} />
      <line x1="20" y1="13.5" x2="20" y2="31" {...s} />
      {arms[pose]}
      <line x1="20" y1="31" x2="13" y2="44" {...s} />
      <line x1="20" y1="31" x2="27" y2="44" {...s} />
      {/* ✦ sparkle — above and right of head */}
      <path
        d="M28,0.2 L28.28,2.1 L30.6,2.4 L28.28,2.7 L28,4.8 L27.72,2.7 L25.4,2.4 L27.72,2.1 Z"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Speech Bubble
   ────────────────────────────────────────────── */

function SpeechBubble({ text, duration, delay }: { text: string; duration: number; delay: number }) {
  return (
    <div
      className="flex flex-col items-center mb-1"
      style={{ animation: `bubble-pop ${duration}s ease-out ${delay}s infinite both`, transformOrigin: "bottom center" }}
    >
      <div
        className="bg-white rounded-lg px-2.5 py-1.5 text-[10px] leading-snug font-medium text-on-surface whitespace-nowrap"
        style={{ border: "1.5px solid #D4AF37", boxShadow: "0 2px 8px rgba(45,47,49,0.08)" }}
      >
        {text}
      </div>
      <svg viewBox="0 0 14 8" className="w-3 h-[6px] -mt-px" aria-hidden="true">
        <path d="M0 0L7 8L14 0Z" fill="#D4AF37" />
        <path d="M1.5 0L7 6.5L12.5 0Z" fill="white" />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────
   14 stickmen arranged around the periphery —
   center stays clear for hero text.
   ────────────────────────────────────────────── */

interface StickmanData {
  id: number;
  x: number;
  y: number;
  size: number;
  pose: Pose;
  delay: number;
  duration: number;
  flip?: boolean;
  mdOnly?: boolean;
}

const STICKMEN: StickmanData[] = [
  // ── Left column ──
  { id: 1,  x: 4,  y: 8,  size: 38, pose: "pitch",   delay: 0,   duration: 11 },
  { id: 2,  x: 13, y: 30, size: 32, pose: "excited",  delay: 3.2, duration: 13 },
  { id: 3,  x: 6,  y: 54, size: 36, pose: "think",    delay: 1.5, duration: 10 },
  { id: 4,  x: 15, y: 76, size: 30, pose: "point",    delay: 5.5, duration: 12, flip: true },
  { id: 5,  x: 3,  y: 92, size: 34, pose: "wave",     delay: 7,   duration: 14 },

  // ── Right column ──
  { id: 6,  x: 83, y: 6,  size: 36, pose: "pitch",   delay: 2,   duration: 12, flip: true },
  { id: 7,  x: 91, y: 28, size: 30, pose: "excited",  delay: 4.5, duration: 11, flip: true },
  { id: 8,  x: 80, y: 50, size: 40, pose: "think",    delay: 1,   duration: 13, flip: true },
  { id: 9,  x: 89, y: 72, size: 32, pose: "point",    delay: 6.5, duration: 10 },
  { id: 10, x: 85, y: 91, size: 36, pose: "wave",     delay: 3.8, duration: 14, flip: true },

  // ── Top / bottom scattered (md+ only) ──
  { id: 11, x: 28, y: 3,  size: 30, pose: "pitch",   delay: 8,   duration: 11, mdOnly: true },
  { id: 12, x: 66, y: 2,  size: 32, pose: "excited",  delay: 2.5, duration: 13, mdOnly: true },
  { id: 13, x: 24, y: 93, size: 34, pose: "wave",     delay: 5,   duration: 12, mdOnly: true },
  { id: 14, x: 70, y: 94, size: 30, pose: "think",    delay: 9,   duration: 10, flip: true, mdOnly: true },
];

/* ──────────────────────────────────────────────
   HeroBackground
   ────────────────────────────────────────────── */

export function HeroBackground() {
  const [ideas, setIdeas] = useState<string[]>(() => IDEAS.slice(0, STICKMEN.length));

  useEffect(() => {
    const shuffled = [...IDEAS].sort(() => Math.random() - 0.5);
    setIdeas(shuffled.slice(0, STICKMEN.length));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {STICKMEN.map((s, i) => (
        <div
          key={s.id}
          className={`absolute ${s.mdOnly ? "hidden md:block" : ""}`}
          style={{
            color: "#12151c",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            animation: `stickman-cycle ${s.duration}s ease-in-out ${s.delay}s infinite both`,
          }}
        >
          <SpeechBubble text={ideas[i] ?? ""} duration={s.duration} delay={s.delay} />
          <StickmanSvg pose={s.pose} flip={s.flip} />
        </div>
      ))}
    </div>
  );
}
