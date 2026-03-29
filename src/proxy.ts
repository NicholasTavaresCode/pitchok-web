import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("pitchok_token");
  const { pathname } = req.nextUrl;

  // Logged-in user visiting root → send to dashboard
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Unauthenticated user visiting protected routes → send to root
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
