"use client";

export type Tab<Id extends string = string> = { id: Id; label: string };

type Props<Id extends string> = {
  tabs: readonly Tab<Id>[];
  active: Id;
  onChange: (id: Id) => void;
};

export function Tabs<Id extends string>({ tabs, active, onChange }: Props<Id>) {
  return (
    <nav className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-6">
        {tabs.map((t, i) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              <span className="mr-2 text-xs text-neutral-400">{i + 1}.</span>
              {t.label}
              {isActive && (
                <span className="absolute inset-x-3 bottom-0 h-0.5 bg-neutral-900" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
