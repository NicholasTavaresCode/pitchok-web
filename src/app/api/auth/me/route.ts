import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const userCookie = (await cookies()).get("pitchok_user");
  if (!userCookie) return NextResponse.json(null);
  try {
    return NextResponse.json(JSON.parse(userCookie.value));
  } catch {
    return NextResponse.json(null);
  }
}
