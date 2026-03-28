import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface-container">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center gap-4">
          <img src="/logo.svg" alt="PitchOK" style={{ height: 36, width: "auto", opacity: 0.6 }} />
          <p className="text-sm text-on-surface-variant text-center">
            &copy; {new Date().getFullYear()} PitchOK. Built with optimism for the
            next generation of founders.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#support"
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Support
            </Link>
            <a
              href="#twitter"
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
