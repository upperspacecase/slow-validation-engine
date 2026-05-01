"use client";
import { useState } from "react";
import { Tabs, type Tab } from "@/components/Tabs";
import { StepBasics } from "@/components/StepBasics";
import { StepDifferentiation } from "@/components/StepDifferentiation";
import { StepApproach } from "@/components/StepApproach";
import { StepTinyLoops } from "@/components/StepTinyLoops";
import { VentureHypothesis } from "@/components/VentureHypothesis";
import { VentureSwitcher } from "@/components/VentureSwitcher";
import { useAppState } from "@/lib/useAppState";

type TabId =
  | "basics"
  | "differentiation"
  | "approach"
  | "tinyloops"
  | "hypothesis";

const TABS: readonly Tab<TabId>[] = [
  { id: "basics", label: "Basics" },
  { id: "differentiation", label: "Differentiation" },
  { id: "approach", label: "Approach" },
  { id: "tinyloops", label: "Tiny Loops" },
  { id: "hypothesis", label: "Venture Hypothesis" },
] as const;

export default function Home() {
  const [active, setActive] = useState<TabId>("basics");
  const {
    state,
    setState,
    loaded,
    activeVenture,
    updateActiveVenture,
    updateFounder,
  } = useAppState();

  return (
    <main className="min-h-screen text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <h1 className="text-xl font-semibold tracking-tight">
            Slow Validation Engine
          </h1>
          <p className="text-sm text-neutral-500">
            Idea to validation, one click at a time.
          </p>
        </div>
        {loaded && activeVenture && (
          <div className="mx-auto max-w-5xl">
            <VentureSwitcher
              ventures={state.ventures}
              activeVentureId={state.activeVentureId}
              onSelect={(id) =>
                setState((s) => ({ ...s, activeVentureId: id }))
              }
            />
          </div>
        )}
      </header>
      <Tabs tabs={TABS} active={active} onChange={setActive} />
      <div className="mx-auto max-w-5xl px-6 py-8">
        {!loaded || !activeVenture ? (
          <p className="text-sm text-neutral-500">Loading...</p>
        ) : (
          <>
            {active === "basics" && (
              <StepBasics
                venture={activeVenture}
                founder={state.founder}
                updateActiveVenture={updateActiveVenture}
                updateFounder={updateFounder}
              />
            )}
            {active === "differentiation" && <StepDifferentiation />}
            {active === "approach" && <StepApproach />}
            {active === "tinyloops" && <StepTinyLoops />}
            {active === "hypothesis" && (
              <VentureHypothesis
                venture={activeVenture}
                updateActiveVenture={updateActiveVenture}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}
