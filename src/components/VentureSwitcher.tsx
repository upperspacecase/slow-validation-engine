"use client";
import type { Venture } from "@/lib/types";

type Props = {
  ventures: Venture[];
  activeVentureId: string;
  onSelect: (id: string) => void;
};

export function VentureSwitcher({ ventures, activeVentureId, onSelect }: Props) {
  const active = ventures.find((v) => v.id === activeVentureId);
  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-neutral-100 bg-white px-6 py-3">
      <label className="flex items-center gap-2 text-sm">
        <span className="text-xs uppercase tracking-wide text-neutral-500">
          Venture
        </span>
        <select
          value={activeVentureId}
          onChange={(e) => onSelect(e.target.value)}
          className="rounded border border-neutral-200 bg-white px-2 py-1 text-sm focus:border-neutral-900 focus:outline-none"
        >
          {ventures.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
      </label>
      <div className="flex items-center gap-2">
        <StubButton title="Coming soon">+ New venture</StubButton>
        <StubButton title="Coming soon">Rename</StubButton>
        <StubButton title="Coming soon">Duplicate</StubButton>
        <StubButton title="Coming soon" tone="danger">
          Delete
        </StubButton>
      </div>
      {active && (
        <div className="ml-auto text-xs text-neutral-400">
          Created {new Date(active.createdAt).toLocaleDateString()}
        </div>
      )}
    </div>
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
      className={`cursor-not-allowed rounded border px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
        tone === "danger"
          ? "border-red-200 text-red-600"
          : "border-neutral-200 text-neutral-600"
      }`}
    >
      {children}
    </button>
  );
}
