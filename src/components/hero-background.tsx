"use client";

import { useState, useEffect } from "react";

/* ──────────────────────────────────────────────
   80-idea pool — max 5 words each,
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
  "AI detects food allergies",
  "Micro-loans for students",
  "Carbon footprint tracker app",
  "On-demand tutors for kids",
  "Telemedicine for rural areas",
  "Resell unused software licenses",
  "AI optimizes sleep schedules",
  "Peer storage in neighborhoods",
  "Skills bartering platform online",
  "Smart parking guidance system",
  "Remote physiotherapy via video",
  "Crowdfund medical treatments now",
  "AI screens job candidates",
  "Personalized wine subscription club",
  "Marketplace for local honey",
  "Book sports courts instantly",
  "AI tracks medication adherence",
  "Freelancer health insurance pooling",
  "Virtual staging for realtors",
  "On-demand moving labor",
  "Noise cancellation for offices",
  "AI drafts investor updates",
  "Repair café booking app",
  "Shared lab equipment rentals",
  "Personalized kids book creator",
  "Local food waste exchange",
  "AI monitors posture remotely",
  "Subscription for home repairs",
  "Instant background check service",
  "Community childcare swapping app",
];

/* ──────────────────────────────────────────────
   Random helpers
   ────────────────────────────────────────────── */

function rf(min: number, max: number) { return Math.random() * (max - min) + min; }
function ri(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

/* ──────────────────────────────────────────────
   Stickman SVG Poses
   viewBox="0 0 40 46"
   ────────────────────────────────────────────── */

type Pose = "pitch" | "excited" | "think" | "point" | "wave";

function StickmanSvg({ pose, flip }: { pose: Pose; flip?: boolean }) {
  const s = { strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  const arms: Record<Pose, React.ReactNode> = {
    pitch: <><line x1="20" y1="21" x2="11" y2="27" {...s} /><line x1="20" y1="21" x2="31" y2="13" {...s} /></>,
    excited: <><line x1="20" y1="21" x2="11" y2="13" {...s} /><line x1="20" y1="21" x2="29" y2="13" {...s} /></>,
    think: <><line x1="20" y1="21" x2="12" y2="27" {...s} /><line x1="20" y1="21" x2="25" y2="14" {...s} /></>,
    point: <><line x1="20" y1="21" x2="9" y2="25" {...s} /><line x1="20" y1="21" x2="35" y2="19" {...s} /></>,
    wave: <><line x1="20" y1="21" x2="12" y2="26" {...s} /><line x1="20" y1="21" x2="30" y2="14" {...s} /><circle cx="30" cy="13" r="1.2" fill="currentColor" /></>,
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
   Stickmen — randomised on every mount.
   Zones keep the centre clear for hero text:
   Left x 2–16 %, Right x 80–93 %, Top/Bottom y edges.
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

const POSES: Pose[] = ["pitch", "excited", "think", "point", "wave"];
const rp = () => POSES[Math.floor(Math.random() * POSES.length)];
const rb = () => Math.random() > 0.5;

function generateStickmen(): StickmanData[] {
  return [
    // ── Left column ──
    { id: 1,  x: rf(2,  14), y: rf(4,  17), size: ri(30, 42), pose: rp(), delay: rf(0, 3),  duration: ri(9,  15), flip: rb() },
    { id: 2,  x: rf(2,  16), y: rf(24, 38), size: ri(28, 38), pose: rp(), delay: rf(2, 6),  duration: ri(9,  15), flip: rb() },
    { id: 3,  x: rf(2,  14), y: rf(44, 58), size: ri(30, 42), pose: rp(), delay: rf(0, 4),  duration: ri(9,  14), flip: rb() },
    { id: 4,  x: rf(2,  16), y: rf(64, 78), size: ri(28, 38), pose: rp(), delay: rf(3, 8),  duration: ri(10, 15), flip: rb() },
    { id: 5,  x: rf(2,  14), y: rf(84, 94), size: ri(30, 40), pose: rp(), delay: rf(4, 9),  duration: ri(11, 16), flip: rb() },
    // ── Right column ──
    { id: 6,  x: rf(81, 93), y: rf(4,  17), size: ri(30, 42), pose: rp(), delay: rf(1, 4),  duration: ri(9,  15), flip: rb() },
    { id: 7,  x: rf(81, 93), y: rf(24, 36), size: ri(28, 38), pose: rp(), delay: rf(3, 7),  duration: ri(9,  14), flip: rb() },
    { id: 8,  x: rf(78, 92), y: rf(44, 58), size: ri(32, 44), pose: rp(), delay: rf(0, 3),  duration: ri(10, 15), flip: rb() },
    { id: 9,  x: rf(81, 93), y: rf(65, 78), size: ri(28, 38), pose: rp(), delay: rf(4, 8),  duration: ri(9,  14), flip: rb() },
    { id: 10, x: rf(81, 93), y: rf(84, 95), size: ri(30, 40), pose: rp(), delay: rf(2, 6),  duration: ri(11, 16), flip: rb() },
    // ── Top / bottom (md+ only) ──
    { id: 11, x: rf(22, 44), y: rf(1, 5),   size: ri(26, 36), pose: rp(), delay: rf(5, 10), duration: ri(9,  14), flip: rb(), mdOnly: true },
    { id: 12, x: rf(52, 72), y: rf(1, 5),   size: ri(26, 36), pose: rp(), delay: rf(1, 5),  duration: ri(10, 15), flip: rb(), mdOnly: true },
    { id: 13, x: rf(22, 44), y: rf(92, 96), size: ri(26, 36), pose: rp(), delay: rf(3, 8),  duration: ri(9,  14), flip: rb(), mdOnly: true },
    { id: 14, x: rf(52, 72), y: rf(92, 96), size: ri(26, 36), pose: rp(), delay: rf(6, 11), duration: ri(9,  14), flip: rb(), mdOnly: true },
  ];
}

/* ──────────────────────────────────────────────
   HeroBackground
   ────────────────────────────────────────────── */

export function HeroBackground() {
  const [stickmen, setStickmen] = useState<StickmanData[]>(() => generateStickmen());
  const [ideas, setIdeas] = useState<string[]>(() => IDEAS.slice(0, 14));

  useEffect(() => {
    const next = generateStickmen();
    setStickmen(next);
    const shuffled = [...IDEAS].sort(() => Math.random() - 0.5);
    setIdeas(shuffled.slice(0, next.length));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {stickmen.map((s, i) => (
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
