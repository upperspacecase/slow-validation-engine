import { StepShell } from "./StepShell";

export function StepBasics() {
  return (
    <StepShell
      title="Basics"
      sections={[
        {
          title: "Customer",
          subtitle:
            "Start by identifying your customer and a real problem you can solve.",
        },
        {
          title: "Advantage",
          subtitle: "Take advantage of your advantages.",
        },
        {
          title: "Competition",
          subtitle: "Get real about the competition.",
        },
      ]}
    />
  );
}
