"use client";
import { useEffect, useState } from "react";
import type { AppState } from "./types";

const KEY = "sve.state.v1";
const INITIAL: AppState = { hypotheses: [] };

export function useAppState() {
  const [state, setState] = useState<AppState>(INITIAL);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        setState(JSON.parse(raw) as AppState);
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
