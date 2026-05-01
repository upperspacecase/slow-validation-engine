export type ScorecardKey =
  | "rightCustomer"
  | "rightProblem"
  | "rightApproach"
  | "willSwitch"
  | "rightDifferentiation"
  | "doesItClick";

export const SCORECARD_QUESTIONS: { key: ScorecardKey; label: string }[] = [
  { key: "rightCustomer", label: "Right customer?" },
  { key: "rightProblem", label: "Right problem?" },
  { key: "rightApproach", label: "Right approach?" },
  { key: "willSwitch", label: "Will they switch?" },
  { key: "rightDifferentiation", label: "Right differentiation?" },
  { key: "doesItClick", label: "Does it click?" },
];

export const EMPTY_SCORECARD: Record<ScorecardKey, boolean> = {
  rightCustomer: false,
  rightProblem: false,
  rightApproach: false,
  willSwitch: false,
  rightDifferentiation: false,
  doesItClick: false,
};

export type SentenceData = {
  customer: string;
  problem: string;
  approach: string;
  competitors: string;
  differentiation: string;
};

export const EMPTY_SENTENCE: SentenceData = {
  customer: "",
  problem: "",
  approach: "",
  competitors: "",
  differentiation: "",
};

export type VentureHypothesis = SentenceData & {
  version: number;
  createdAt: string;
  scorecard: Record<ScorecardKey, boolean>;
};

export type Competition = {
  gorilla: string;
  alternatives: string;
};

export type Basics = {
  customer: string;
  problem: string;
  competition: Competition;
};

export const EMPTY_BASICS: Basics = {
  customer: "",
  problem: "",
  competition: { gorilla: "", alternatives: "" },
};

export type Advantage = {
  capability: string;
  insight: string;
  motivation: string;
};

export const EMPTY_ADVANTAGE: Advantage = {
  capability: "",
  insight: "",
  motivation: "",
};

export type Founder = {
  advantage: Advantage;
};

export type Venture = {
  id: string;
  name: string;
  createdAt: string;
  basics: Basics;
  hypotheses: VentureHypothesis[];
};

export type AppState = {
  founder: Founder;
  ventures: Venture[];
  activeVentureId: string;
};
