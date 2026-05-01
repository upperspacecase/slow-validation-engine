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

export type VentureHypothesis = SentenceData & {
  version: number;
  createdAt: string;
  scorecard: Record<ScorecardKey, boolean>;
};

export type Basics = {
  customer: string;
  problem: string;
};

export const EMPTY_BASICS: Basics = {
  customer: "",
  problem: "",
};

export type AppState = {
  basics: Basics;
  hypotheses: VentureHypothesis[];
};

export const EMPTY_SENTENCE: SentenceData = {
  customer: "",
  problem: "",
  approach: "",
  competitors: "",
  differentiation: "",
};
