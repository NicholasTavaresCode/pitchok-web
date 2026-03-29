import { cookies } from "next/headers";

const BASE = process.env.API_URL ?? "http://localhost:3000/api";

async function authHeader(): Promise<Record<string, string>> {
  const token = (await cookies()).get("pitchok_token")?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiGet<T>(path: string): Promise<T | null> {
  const res = await fetch(`${BASE}${path}`, {
    headers: await authHeader(),
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function apiPost<T>(path: string, body: unknown): Promise<T | null> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(await authHeader()) },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}
