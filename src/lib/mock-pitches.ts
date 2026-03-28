import type { Pitch } from "@/components/dashboard/pitch-card";

export const MOCK_USER = { name: "Alex Founder" };
export const MAX_PITCHES = 5;

export const MOCK_PITCHES: Pitch[] = [
  {
    id: "1",
    title: "Freelancer Contract AI",
    idea: "An AI-powered contract negotiation assistant for freelancers. Users input their rate, project scope, and desired terms — the AI drafts a professional contract with negotiation language based on real market data and flags which clauses to push back on.",
    status: "COMPLETED",
    createdAt: "2026-03-25T14:18:00Z",
    reportPdfPath: "/api/pitches/1/report/pdf",
    reportMdPath: "/api/pitches/1/report/md",
  },
  {
    id: "2",
    title: "Urban Garden Network",
    idea: "A hyper-local community platform for urban gardeners to share garden plots, tools, seeds, and surplus produce with neighbors, with an AI planner that optimises planting seasons and watering schedules based on local climate data.",
    status: "PROCESSING",
    createdAt: "2026-03-28T09:31:00Z",
  },
  {
    id: "3",
    title: "Zero-Waste Grocery Delivery",
    idea: "Zero-waste grocery delivery that uses only reusable glass containers, coordinates neighbourhood drop-off hubs to reduce last-mile emissions, and rewards loyal customers with carbon credits they can trade or donate.",
    status: "PENDING",
    createdAt: "2026-03-28T09:47:00Z",
  },
];
