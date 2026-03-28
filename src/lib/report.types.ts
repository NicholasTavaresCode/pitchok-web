export type EvidenceStrength = "HIGH" | "MODERATE" | "WEAK";
export type OpportunityRating = "HIGH" | "MEDIUM" | "LOW";
export type RiskLikelihood = "High" | "Moderate" | "Low";

export interface PainPoint {
  title: string;
  description: string;
  evidenceStrength: EvidenceStrength;
  quote: string;
  quoteSource: string;
  classification: string;
}

export interface Competitor {
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  sentiment: string;
}

export interface DifferentiationOpportunity {
  title: string;
  gap: string;
  evidence: string;
  howToExploit: string;
  rating: OpportunityRating;
}

export interface ScorecardItem {
  dimension: string;
  score: number;
  weight: number; // decimal, e.g. 0.30
  weightedScore: number;
}

export interface Risk {
  title: string;
  likelihood: RiskLikelihood;
  description: string;
  mitigation: string;
}

export interface Pivot {
  title: string;
  description: string;
}

export interface UseCase {
  title: string;
  demand: string;
  whoItServes: string;
  problemItSolves: string;
  whyItWouldWork: string;
}

export interface ReportSource {
  title: string;
  url: string;
  subreddit: string;
}

export interface PitchReport {
  overallScore: number;
  maxScore: number;
  executiveSummary: string;
  researchFindings: {
    subredditsExplored: number;
    threadsAnalyzed: number;
    signalStrength: "strong" | "moderate" | "weak";
    topSubreddits: string[];
  };
  painPoints: PainPoint[];
  competitors: Competitor[];
  differentiationOpportunities: DifferentiationOpportunity[];
  marketPositionSummary: string;
  scorecard: ScorecardItem[];
  risks: Risk[];
  pivots: Pivot[];
  useCases: UseCase[];
  nextSteps: string[];
  keySources: ReportSource[];
  additionalSources?: ReportSource[];
}
