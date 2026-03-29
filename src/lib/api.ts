import aiFinancial from "@/data/reports/ai-financial-management-platform.json";
import exchangeMarketplace from "@/data/reports/reusable-material-exchange-marketplace.json";
import exchangePlatform from "@/data/reports/reusable-material-exchange-platform.json";

export type Report = typeof aiFinancial & {
  submitted_at: string;
  status: string;
};

const REPORTS = {
  "ai-financial-management-platform": aiFinancial,
  "reusable-material-exchange-marketplace": exchangeMarketplace,
  "reusable-material-exchange-platform": exchangePlatform,
  // mock aliases for dashboard pitch IDs
  "1": aiFinancial,
} as const;

const METADATA: Record<string, { submitted_at: string; status: string }> = {
  "ai-financial-management-platform":       { submitted_at: "2026-03-28T20:31:05", status: "Completed" },
  "reusable-material-exchange-marketplace": { submitted_at: "2026-03-28T20:22:12", status: "Completed" },
  "reusable-material-exchange-platform":    { submitted_at: "2026-03-28T19:56:42", status: "Completed" },
};

/**
 * Returns a report by ID.
 *
 * Mock implementation — swap for a real fetch in production:
 *   const res = await fetch(`${process.env.API_URL}/reports/${id}`);
 *   return res.ok ? (res.json() as Promise<Report>) : null;
 */
export async function getReport(id: string): Promise<Report | null> {
  const data = REPORTS[id as keyof typeof REPORTS] ?? null;
  if (!data) return null;
  const meta = METADATA[id] ?? { submitted_at: new Date().toISOString(), status: "Completed" };
  return { ...data, ...meta };
}

export async function getReportIds(): Promise<string[]> {
  return Object.keys(REPORTS);
}
