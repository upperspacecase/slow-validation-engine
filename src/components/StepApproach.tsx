import { StepShell } from "./StepShell";

export function StepApproach() {
  return (
    <StepShell
      title="Approach"
      sections={[
        {
          title: "Options",
          subtitle: "Seek alternatives to your first idea.",
        },
        {
          title: "Lenses",
          subtitle:
            "Consider conflicting opinions before you commit to an approach. (Magic Lenses integration pending.)",
        },
      ]}
    />
  );
}
