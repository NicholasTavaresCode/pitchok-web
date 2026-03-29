import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_BASE = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function POST(req: NextRequest) {
  const { token, expiresIn, user } = await req.json();
  const res = NextResponse.json({ ok: true });
  res.cookies.set("pitchok_token", token, { ...COOKIE_BASE, maxAge: expiresIn });
  if (user) {
    res.cookies.set("pitchok_user", JSON.stringify(user), {
      ...COOKIE_BASE,
      maxAge: expiresIn,
    });
  }
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("pitchok_token");
  res.cookies.delete("pitchok_user");
  return res;
}
