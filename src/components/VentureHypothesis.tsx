"use client";
import { useMemo, useState } from "react";
import {
  EMPTY_SCORECARD,
  EMPTY_SENTENCE,
  SCORECARD_QUESTIONS,
  type ScorecardKey,
  type SentenceData,
  type Venture,
  type VentureHypothesis as VH,
} from "@/lib/types";

type Props = {
  venture: Venture;
  updateActiveVenture: (updater: (v: Venture) => Venture) => void;
};

type Draft = SentenceData & { scorecard: Record<ScorecardKey, boolean> };

const SENTENCE_FIELDS: { key: keyof SentenceData; label: string; placeholder: string }[] = [
  { key: "customer", label: "If we help", placeholder: "customer" },
  { key: "problem", label: "solve", placeholder: "problem" },
  { key: "approach", label: "with", placeholder: "approach" },
  { key: "competitors", label: "they will choose it over", placeholder: "competitors" },
  { key: "differentiation", label: "because our solution is", placeholder: "differentiation" },
];

function seedDraftFrom(last: VH | undefined): Draft {
  if (!last) return { ...EMPTY_SENTENCE, scorecard: { ...EMPTY_SCORECARD } };
  return {
    customer: last.customer,
    problem: last.problem,
    approach: last.approach,
    competitors: last.competitors,
    differentiation: last.differentiation,
    scorecard: { ...last.scorecard },
  };
}

export function VentureHypothesis({ venture, updateActiveVenture }: Props) {
  const versions = venture.hypotheses;
  const lastVersion = versions[versions.length - 1];
  const nextVersionNumber = versions.length + 1;

  const [draft, setDraft] = useState<Draft>(() => seedDraftFrom(lastVersion));
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const isDirty = useMemo(() => {
    if (!lastVersion) {
      return Boolean(
        draft.customer ||
          draft.problem ||
          draft.approach ||
          draft.competitors ||
          draft.differentiation ||
          Object.values(draft.scorecard).some(Boolean),
      );
    }
    if (
      draft.customer !== lastVersion.customer ||
      draft.problem !== lastVersion.problem ||
      draft.approach !== lastVersion.approach ||
      draft.competitors !== lastVersion.competitors ||
      draft.differentiation !== lastVersion.differentiation
    )
      return true;
    return SCORECARD_QUESTIONS.some(
      (q) => draft.scorecard[q.key] !== lastVersion.scorecard[q.key],
    );
  }, [draft, lastVersion]);

  function lock() {
    const v: VH = {
      ...draft,
      version: nextVersionNumber,
      createdAt: new Date().toISOString(),
    };
    updateActiveVenture((venture) => ({
      ...venture,
      hypotheses: [...venture.hypotheses, v],
    }));
  }

  const viewing = selectedIdx !== null ? versions[selectedIdx] : null;
  const data: Draft = viewing
    ? {
        customer: viewing.customer,
        problem: viewing.problem,
        approach: viewing.approach,
        competitors: viewing.competitors,
        differentiation: viewing.differentiation,
        scorecard: viewing.scorecard,
      }
    : draft;
  const editable = viewing === null;

  function setField<K extends keyof SentenceData>(k: K, v: string) {
    setDraft((d) => ({ ...d, [k]: v }));
  }
  function toggle(k: ScorecardKey) {
    setDraft((d) => ({
      ...d,
      scorecard: { ...d.scorecard, [k]: !d.scorecard[k] },
    }));
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr]">
      <aside className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Versions
        </h3>
        <button
          onClick={() => setSelectedIdx(null)}
          className={`block w-full rounded px-3 py-2 text-left text-sm transition-colors ${
            selectedIdx === null
              ? "bg-neutral-900 text-white"
              : "hover:bg-neutral-100"
          }`}
        >
          <div className="font-medium">Draft (v{nextVersionNumber})</div>
          <div
            className={`text-xs ${
              selectedIdx === null ? "text-neutral-300" : "text-neutral-400"
            }`}
          >
            {isDirty ? "unsaved changes" : "no changes"}
          </div>
        </button>
        {versions
          .map((v, idx) => ({ v, idx }))
          .reverse()
          .map(({ v, idx }) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`block w-full rounded px-3 py-2 text-left text-sm transition-colors ${
                selectedIdx === idx
                  ? "bg-neutral-900 text-white"
                  : "hover:bg-neutral-100"
              }`}
            >
              <div className="font-medium">v{v.version}</div>
              <div
                className={`text-xs ${
                  selectedIdx === idx ? "text-neutral-300" : "text-neutral-400"
                }`}
              >
                {new Date(v.createdAt).toLocaleString()}
              </div>
            </button>
          ))}
      </aside>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-lg border border-neutral-200 bg-white p-6">
          <h3 className="mb-4 text-base font-semibold">
            {viewing
              ? `Founding Hypothesis — v${viewing.version}`
              : `Founding Hypothesis — Draft (v${nextVersionNumber})`}
          </h3>
          <div className="space-y-3">
            {SENTENCE_FIELDS.map((f) => (
              <div
                key={f.key}
                className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[180px_1fr] sm:gap-3"
              >
                <label className="text-sm text-neutral-600 sm:text-right">
                  {f.label}
                </label>
                <input
                  value={data[f.key]}
                  onChange={(e) => setField(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  readOnly={!editable}
                  className="block w-full rounded border border-neutral-200 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none read-only:bg-neutral-50 read-only:text-neutral-700"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-sky-300 bg-sky-100 p-6 text-sky-950">
          <h3 className="mb-4 text-base font-semibold">Scorecard</h3>
          <div className="space-y-3">
            {SCORECARD_QUESTIONS.map((q) => (
              <label
                key={q.key}
                className={`flex items-center gap-3 text-sm ${
                  editable ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <input
                  type="checkbox"
                  checked={data.scorecard[q.key]}
                  onChange={() => toggle(q.key)}
                  disabled={!editable}
                  className="h-5 w-5 rounded border border-sky-700 bg-white accent-sky-700"
                />
                {q.label}
              </label>
            ))}
          </div>
          {editable && (
            <button
              onClick={lock}
              disabled={!isDirty}
              className="mt-6 w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
            >
              Lock as v{nextVersionNumber}
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
