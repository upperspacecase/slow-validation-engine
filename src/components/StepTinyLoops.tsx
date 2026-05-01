import { StepShell } from "./StepShell";

export function StepTinyLoops() {
  return (
    <StepShell
      title="Tiny Loops"
      sections={[
        {
          title: "Hypothesis",
          subtitle: "State the smallest testable belief.",
        },
        {
          title: "Experiment",
          subtitle: "Design the cheapest test that could move the score.",
        },
      ]}
    />
  );
}
