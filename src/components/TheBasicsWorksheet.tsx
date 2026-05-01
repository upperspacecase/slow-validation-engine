"use client";
import type { Advantage, Basics } from "@/lib/types";

export type BasicsSection = "customer" | "advantage" | "competition";

type Props = {
  basics: Basics;
  advantage: Advantage;
  active: BasicsSection;
};

export function TheBasicsWorksheet({ basics, advantage, active }: Props) {
  return (
    <aside className="rounded-2xl bg-neutral-200/80 p-6 text-neutral-800">
      <SectionHeader label="The Basics" size="lg" highlighted={active === "customer"} />
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <Slot
          label="Customer"
          value={basics.customer}
          highlighted={active === "customer"}
        />
        <Slot
          label="Problem"
          value={basics.problem}
          highlighted={active === "customer"}
        />
      </div>

      <div className="mt-7">
        <SectionHeader
          label="Advantage"
          size="md"
          highlighted={active === "advantage"}
        />
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Slot
            label="Capability"
            value={advantage.capability}
            highlighted={active === "advantage"}
          />
          <Slot
            label="Insight"
            value={advantage.insight}
            highlighted={active === "advantage"}
          />
          <Slot
            label="Motivation"
            value={advantage.motivation}
            highlighted={active === "advantage"}
          />
        </div>
      </div>

      <div className="mt-7">
        <SectionHeader
          label="Competition"
          size="md"
          highlighted={active === "competition"}
        />
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <Slot
            label="800-pound gorilla"
            value={basics.competition.gorilla}
            highlighted={active === "competition"}
          />
          <Slot
            label="Top alternatives"
            value={basics.competition.alternatives}
            highlighted={active === "competition"}
          />
        </div>
      </div>
    </aside>
  );
}

function SectionHeader({
  label,
  size,
  highlighted,
}: {
  label: string;
  size: "lg" | "md";
  highlighted: boolean;
}) {
  const sz = size === "lg" ? "text-2xl" : "text-lg";
  return (
    <h3
      className={`font-bold tracking-tight ${sz} ${
        highlighted ? "text-neutral-900" : "text-neutral-700"
      }`}
    >
      {label}
    </h3>
  );
}

function Slot({
  label,
  value,
  highlighted,
}: {
  label: string;
  value: string;
  highlighted: boolean;
}) {
  const trimmed = value.trim();
  return (
    <div
      className={`rounded-xl bg-white p-3 transition-colors ${
        highlighted ? "ring-2 ring-neutral-900/15" : "ring-0"
      }`}
    >
      <div className="text-[10px] font-medium uppercase tracking-wide text-neutral-500">
        {label}
      </div>
      {trimmed ? (
        <p className="mt-1 whitespace-pre-wrap break-words text-sm text-neutral-900">
          {trimmed}
        </p>
      ) : (
        <p className="mt-1 text-sm italic text-neutral-400">empty</p>
      )}
    </div>
  );
}
