"use client";
import type { AppState } from "@/lib/types";

type Props = {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
};

export function StepBasics({ state, setState }: Props) {
  const { customer, problem } = state.basics;

  function setBasics<K extends keyof typeof state.basics>(
    k: K,
    v: string,
  ) {
    setState((s) => ({ ...s, basics: { ...s.basics, [k]: v } }));
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

      <BasicsSummary basics={state.basics} />

      <CustomerSection
        customer={customer}
        problem={problem}
        onChange={setBasics}
      />

      <PlaceholderSection
        title="Advantage"
        subtitle="Take advantage of your advantages."
      />
      <PlaceholderSection
        title="Competition"
        subtitle="Get real about the competition."
      />
    </div>
  );
}

function BasicsSummary({ basics }: { basics: AppState["basics"] }) {
  const filled = (s: string) => (s.trim() ? s : null);
  return (
    <section className="rounded-lg border border-neutral-200 bg-neutral-100/60 p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
        The Basics
      </h3>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <Slot label="Customer" value={filled(basics.customer)} />
        <Slot label="Problem" value={filled(basics.problem)} />
      </div>
      <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Slot label="Advantage" value={null} pending />
        <Slot label="Competition" value={null} pending />
      </div>
    </section>
  );
}

function Slot({
  label,
  value,
  pending,
}: {
  label: string;
  value: string | null;
  pending?: boolean;
}) {
  return (
    <div className="rounded-md border border-neutral-200 bg-white p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
        {label}
      </div>
      {value ? (
        <p className="mt-1 whitespace-pre-wrap text-sm text-neutral-800">
          {value}
        </p>
      ) : (
        <p className="mt-1 text-sm italic text-neutral-400">
          {pending ? "Pending" : "Empty"}
        </p>
      )}
    </div>
  );
}

function CustomerSection({
  customer,
  problem,
  onChange,
}: {
  customer: string;
  problem: string;
  onChange: (k: "customer" | "problem", v: string) => void;
}) {
  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-6">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-medium">Customer</h3>
        <span className="text-xs uppercase tracking-wide text-neutral-400">
          Sub-step 1 of 3
        </span>
      </div>
      <p className="mt-1 text-sm text-neutral-500">
        Start by identifying your customer and a real problem you can solve.
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
        Customer means guest. Teams who treat customers as a pair of eyeballs
        and a wallet struggle. A product can only click if you care about the
        person it&apos;s supposed to click with. If you&apos;re playing the
        odds, bet on respect.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <Field label="Customer" hint="Who, specifically?">
          <input
            value={customer}
            onChange={(e) => onChange("customer", e.target.value)}
            placeholder="e.g. Independent UX consultants"
            className="block w-full rounded border border-neutral-200 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
          />
        </Field>
        <Field label="Problem" hint="A real one. In their words.">
          <textarea
            value={problem}
            onChange={(e) => onChange("problem", e.target.value)}
            placeholder="e.g. They lose pitches because they can't show the client real proof an idea will work."
            rows={4}
            className="block w-full resize-y rounded border border-neutral-200 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
          />
        </Field>
      </div>
    </section>
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

function PlaceholderSection({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <section className="rounded-lg border border-dashed border-neutral-300 bg-white p-6">
      <h3 className="text-lg font-medium text-neutral-700">{title}</h3>
      <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
      <p className="mt-4 text-xs uppercase tracking-wide text-neutral-400">
        Screen pending
      </p>
    </section>
  );
}
