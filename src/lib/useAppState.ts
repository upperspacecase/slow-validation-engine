"use client";
import { useEffect, useState } from "react";
import { EMPTY_BASICS, type AppState } from "./types";

const KEY = "sve.state.v1";
const INITIAL: AppState = { basics: { ...EMPTY_BASICS }, hypotheses: [] };

type RawState = Partial<AppState>;

function migrate(raw: RawState | null): AppState {
  if (!raw) return INITIAL;
  return {
    basics: {
      customer: raw.basics?.customer ?? "",
      problem: raw.basics?.problem ?? "",
    },
    hypotheses: Array.isArray(raw.hypotheses) ? raw.hypotheses : [],
  };
}

export function useAppState() {
  const [state, setState] = useState<AppState>(INITIAL);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        setState(migrate(JSON.parse(raw) as RawState));
      } catch {
        // corrupt — start fresh
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, loaded]);

  return { state, setState, loaded };
}
