"use client";
import { useState } from "react";
import type {
  Advantage,
  Basics,
  Founder,
  Venture,
} from "@/lib/types";
import {
  TheBasicsWorksheet,
  type BasicsSection,
} from "./TheBasicsWorksheet";

type Props = {
  venture: Venture;
  founder: Founder;
  updateActiveVenture: (updater: (v: Venture) => Venture) => void;
  updateFounder: (updater: (f: Founder) => Founder) => void;
};

const SUB_TABS: { id: BasicsSection; label: string; index: number }[] = [
  { id: "customer", label: "Customer", index: 1 },
  { id: "advantage", label: "Advantage", index: 2 },
  { id: "competition", label: "Competition", index: 3 },
];

export function StepBasics({
  venture,
  founder,
  updateActiveVenture,
  updateFounder,
}: Props) {
  const [active, setActive] = useState<BasicsSection>("customer");

  function setBasics(updater: (b: Basics) => Basics) {
    updateActiveVenture((v) => ({ ...v, basics: updater(v.basics) }));
  }
  function setAdvantage(updater: (a: Advantage) => Advantage) {
    updateFounder((f) => ({ ...f, advantage: updater(f.advantage) }));
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Basics</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Identify your customer and a real problem you can solve. Take advantage
          of your advantages. Get real about the competition.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
        <div className="space-y-4">
          <SubTabs active={active} onChange={setActive} />
          {active === "customer" && (
            <CustomerForm basics={venture.basics} setBasics={setBasics} />
          )}
          {active === "advantage" && (
            <AdvantageForm
              advantage={founder.advantage}
              setAdvantage={setAdvantage}
            />
          )}
          {active === "competition" && (
            <CompetitionForm basics={venture.basics} setBasics={setBasics} />
          )}
        </div>

        <TheBasicsWorksheet
          basics={venture.basics}
          advantage={founder.advantage}
          active={active}
        />
      </div>
    </div>
  );
}

function SubTabs({
  active,
  onChange,
}: {
  active: BasicsSection;
  onChange: (id: BasicsSection) => void;
}) {
  return (
    <div className="flex gap-1 rounded-lg border border-neutral-200 bg-white p-1">
      {SUB_TABS.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-neutral-900 text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            <span className="mr-1 text-xs opacity-60">{t.index}.</span>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function SectionFrame({
  title,
  badge,
  intro,
  blurb,
  children,
}: {
  title: string;
  badge?: string;
  intro: string;
  blurb?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="mt-1 text-sm text-neutral-500">{intro}</p>
        </div>
        {badge && (
          <span className="shrink-0 rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-neutral-500">
            {badge}
          </span>
        )}
      </div>
      {blurb && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
          {blurb}
        </p>
      )}
      <div className="mt-6">{children}</div>
      <div className="mt-6 flex items-center gap-2 border-t border-neutral-100 pt-4">
        <StubButton title="Coming soon">Save</StubButton>
        <StubButton title="Coming soon">Reset</StubButton>
        <StubButton title="Coming soon" tone="danger">
          Delete
        </StubButton>
        <span className="ml-auto text-xs text-neutral-400">
          Auto-saving as you type
        </span>
      </div>
    </section>
  );
}

function StubButton({
  children,
  title,
  tone,
}: {
  children: React.ReactNode;
  title: string;
  tone?: "danger";
}) {
  return (
    <button
      disabled
      title={title}
      className={`cursor-not-allowed rounded border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
        tone === "danger"
          ? "border-red-200 text-red-600"
          : "border-neutral-200 text-neutral-600"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-sm font-medium text-neutral-800">{label}</span>
        {hint && <span className="text-xs text-neutral-400">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

const inputCls =
  "block w-full rounded border border-neutral-200 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none";

function CustomerForm({
  basics,
  setBasics,
}: {
  basics: Basics;
  setBasics: (updater: (b: Basics) => Basics) => void;
}) {
  return (
    <SectionFrame
      title="Customer"
      badge="Per venture"
      intro="Start by identifying your customer and a real problem you can solve."
      blurb="Customer means guest. Teams who treat customers as a pair of eyeballs and a wallet struggle. A product can only click if you care about the person it's supposed to click with. If you're playing the odds, bet on respect."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <Field label="Customer" hint="Who, specifically?">
          <input
            value={basics.customer}
            onChange={(e) =>
              setBasics((b) => ({ ...b, customer: e.target.value }))
            }
            placeholder="e.g. Independent UX consultants"
            className={inputCls}
          />
        </Field>
        <Field label="Problem" hint="In their words.">
          <textarea
            value={basics.problem}
            onChange={(e) =>
              setBasics((b) => ({ ...b, problem: e.target.value }))
            }
            placeholder="e.g. They lose pitches because they can't show the client real proof an idea will work."
            rows={4}
            className={`${inputCls} resize-y`}
          />
        </Field>
      </div>
    </SectionFrame>
  );
}

function AdvantageForm({
  advantage,
  setAdvantage,
}: {
  advantage: Advantage;
  setAdvantage: (updater: (a: Advantage) => Advantage) => void;
}) {
  return (
    <SectionFrame
      title="Advantage"
      badge="Reusable across ventures"
      intro="Take advantage of your advantages."
      blurb="What you and your founders bring that others can't easily copy. Capability is what you can do. Insight is what you uniquely understand. Motivation is why you'll keep going when it's hard."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Capability" hint="What you can do.">
          <textarea
            value={advantage.capability}
            onChange={(e) =>
              setAdvantage((a) => ({ ...a, capability: e.target.value }))
            }
            placeholder="e.g. 10 years shipping consumer iOS"
            rows={3}
            className={`${inputCls} resize-y`}
          />
        </Field>
        <Field label="Insight" hint="What you uniquely see.">
          <textarea
            value={advantage.insight}
            onChange={(e) =>
              setAdvantage((a) => ({ ...a, insight: e.target.value }))
            }
            placeholder="e.g. Pros need proof, not polish"
            rows={3}
            className={`${inputCls} resize-y`}
          />
        </Field>
        <Field label="Motivation" hint="Why you'll persist.">
          <textarea
            value={advantage.motivation}
            onChange={(e) =>
              setAdvantage((a) => ({ ...a, motivation: e.target.value }))
            }
            placeholder="e.g. Lived the pain for 5 years"
            rows={3}
            className={`${inputCls} resize-y`}
          />
        </Field>
      </div>
    </SectionFrame>
  );
}

function CompetitionForm({
  basics,
  setBasics,
}: {
  basics: Basics;
  setBasics: (updater: (b: Basics) => Basics) => void;
}) {
  return (
    <SectionFrame
      title="Competition"
      badge="Per venture"
      intro="Get real about the competition."
      blurb="The 800-pound gorilla is the dominant incumbent the customer would compare you to. Top alternatives are the other realistic things they're doing today, including spreadsheets, doing nothing, or duct-taped workflows."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <Field label="800-pound gorilla" hint="The big incumbent.">
          <input
            value={basics.competition.gorilla}
            onChange={(e) =>
              setBasics((b) => ({
                ...b,
                competition: { ...b.competition, gorilla: e.target.value },
              }))
            }
            placeholder="e.g. Figma"
            className={inputCls}
          />
        </Field>
        <Field
          label="Top alternatives"
          hint="What they actually do today."
        >
          <textarea
            value={basics.competition.alternatives}
            onChange={(e) =>
              setBasics((b) => ({
                ...b,
                competition: {
                  ...b.competition,
                  alternatives: e.target.value,
                },
              }))
            }
            placeholder="e.g. Loom walkthroughs, static mocks in Keynote, doing nothing."
            rows={3}
            className={`${inputCls} resize-y`}
          />
        </Field>
      </div>
    </SectionFrame>
  );
}
