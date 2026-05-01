"use client";
import { useEffect, useMemo, useState } from "react";
import {
  EMPTY_ADVANTAGE,
  EMPTY_BASICS,
  type AppState,
  type Founder,
  type Venture,
  type VentureHypothesis,
} from "./types";

const KEY = "sve.state.v1";

const EMPTY_STATE: AppState = {
  founder: { advantage: { ...EMPTY_ADVANTAGE } },
  ventures: [],
  activeVentureId: "",
};

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `v_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function defaultVenture(seed?: Partial<Venture>): Venture {
  return {
    id: seed?.id ?? newId(),
    name: seed?.name ?? "My First Venture",
    createdAt: seed?.createdAt ?? new Date().toISOString(),
    basics: seed?.basics ?? { ...EMPTY_BASICS, competition: { gorilla: "", alternatives: "" } },
    hypotheses: seed?.hypotheses ?? [],
  };
}

type LegacyState = {
  basics?: { customer?: string; problem?: string };
  hypotheses?: VentureHypothesis[];
};

type MaybeNewState = Partial<AppState> & LegacyState;

function migrate(raw: MaybeNewState | null): AppState {
  if (!raw) {
    const v = defaultVenture();
    return {
      founder: { advantage: { ...EMPTY_ADVANTAGE } },
      ventures: [v],
      activeVentureId: v.id,
    };
  }

  const isNewShape = Array.isArray(raw.ventures) && typeof raw.activeVentureId === "string";

  if (isNewShape) {
    const founder: Founder = {
      advantage: {
        capability: raw.founder?.advantage?.capability ?? "",
        insight: raw.founder?.advantage?.insight ?? "",
        motivation: raw.founder?.advantage?.motivation ?? "",
      },
    };
    const ventures = (raw.ventures ?? []).map((v) => ({
      id: v.id,
      name: v.name ?? "Untitled venture",
      createdAt: v.createdAt ?? new Date().toISOString(),
      basics: {
        customer: v.basics?.customer ?? "",
        problem: v.basics?.problem ?? "",
        competition: {
          gorilla: v.basics?.competition?.gorilla ?? "",
          alternatives: v.basics?.competition?.alternatives ?? "",
        },
      },
      hypotheses: Array.isArray(v.hypotheses) ? v.hypotheses : [],
    }));
    if (ventures.length === 0) {
      const v = defaultVenture();
      return { founder, ventures: [v], activeVentureId: v.id };
    }
    const activeOk = ventures.some((v) => v.id === raw.activeVentureId);
    return {
      founder,
      ventures,
      activeVentureId: activeOk ? (raw.activeVentureId as string) : ventures[0].id,
    };
  }

  // Legacy shape: { basics: { customer, problem }, hypotheses: [...] }
  const v = defaultVenture({
    basics: {
      customer: raw.basics?.customer ?? "",
      problem: raw.basics?.problem ?? "",
      competition: { gorilla: "", alternatives: "" },
    },
    hypotheses: Array.isArray(raw.hypotheses) ? raw.hypotheses : [],
  });
  return {
    founder: { advantage: { ...EMPTY_ADVANTAGE } },
    ventures: [v],
    activeVentureId: v.id,
  };
}

export function useAppState() {
  const [state, setState] = useState<AppState>(EMPTY_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    let next: AppState;
    if (raw) {
      try {
        next = migrate(JSON.parse(raw) as MaybeNewState);
      } catch {
        next = migrate(null);
      }
    } else {
      next = migrate(null);
    }
    setState(next);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, loaded]);

  const activeVenture = useMemo(
    () => state.ventures.find((v) => v.id === state.activeVentureId),
    [state.ventures, state.activeVentureId],
  );

  function updateActiveVenture(updater: (v: Venture) => Venture) {
    setState((s) => ({
      ...s,
      ventures: s.ventures.map((v) =>
        v.id === s.activeVentureId ? updater(v) : v,
      ),
    }));
  }

  function updateFounder(updater: (f: Founder) => Founder) {
    setState((s) => ({ ...s, founder: updater(s.founder) }));
  }

  return {
    state,
    setState,
    loaded,
    activeVenture,
    updateActiveVenture,
    updateFounder,
  };
}
