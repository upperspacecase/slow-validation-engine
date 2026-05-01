type Section = { title: string; subtitle: string };

export function StepShell({
  title,
  intro,
  sections,
}: {
  title: string;
  intro?: string;
  sections: Section[];
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {intro && <p className="mt-1 text-sm text-neutral-500">{intro}</p>}
      </div>
      <div className="space-y-4">
        {sections.map((s) => (
          <div
            key={s.title}
            className="rounded-lg border border-neutral-200 bg-white p-6"
          >
            <h3 className="text-lg font-medium">{s.title}</h3>
            <p className="mt-1 text-sm text-neutral-500">{s.subtitle}</p>
            <p className="mt-4 text-xs uppercase tracking-wide text-neutral-400">
              Screen pending
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
