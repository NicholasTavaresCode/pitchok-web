"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-ambient backdrop-blur-[20px]" style={{ background: "rgba(255,255,255,0.45)" }}>
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" aria-label="PitchOK">
          <img src="/logo.svg" alt="PitchOK" style={{ height: 32, width: "auto", display: "block", marginTop: -4 }} />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Pricing
          </a>
          <a
            href="#showcase"
            className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Showcase
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-on-surface bg-surface-lowest rounded-full shadow-ambient hover:bg-surface-high transition-colors">
            <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            Continue with Google
          </button>
        </div>

        <button
          className="md:hidden text-on-surface"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-surface-lowest px-6 pb-6 space-y-4">
          <a
            href="#features"
            className="block text-sm text-on-surface-variant"
            onClick={() => setMobileOpen(false)}
          >
            Features
          </a>
          <a
            href="#pricing"
            className="block text-sm text-on-surface-variant"
            onClick={() => setMobileOpen(false)}
          >
            Pricing
          </a>
          <a
            href="#showcase"
            className="block text-sm text-on-surface-variant"
            onClick={() => setMobileOpen(false)}
          >
            Showcase
          </a>
          <button className="w-full flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-on-surface bg-surface-lowest rounded-full shadow-ambient">
            <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            Continue with Google
          </button>
        </div>
      )}
    </nav>
  );
}
