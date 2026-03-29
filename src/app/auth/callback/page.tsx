"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";
// JWT_EXPIRES_IN on the API is 7d — keep cookie alive for the same duration.
const SESSION_MAX_AGE = 7 * 24 * 60 * 60;

function CallbackContent() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      router.replace("/");
      return;
    }

    (async () => {
      try {
        const profileRes = await fetch(`${API}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = profileRes.ok ? await profileRes.json() : null;

        await fetch("/api/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, expiresIn: SESSION_MAX_AGE, user }),
        });
      } catch {
        // Proceed to dashboard even if profile fetch fails;
        // the middleware and API calls will surface auth errors there.
      }
      window.location.replace("/dashboard");
    })();
  }, [params, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="h-9 w-9 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-sm text-on-surface-variant">Signing you in…</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-9 w-9 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
