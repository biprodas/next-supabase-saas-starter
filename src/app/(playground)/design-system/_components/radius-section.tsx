import { Section } from "./section";

const radiusTokens = [
  "radius-sm",
  "radius-md",
  "radius-lg",
  "radius-xl",
  "radius-2xl",
  "radius-3xl",
  "radius-4xl",
] as const;

export function RadiusSection() {
  return (
    <Section
      id="radius"
      title="Border radius"
      description="Radius scale (--radius base: 0.625rem)."
    >
      <div className="flex flex-wrap items-end gap-6">
        {radiusTokens.map((r) => (
          <div key={r} className="flex flex-col items-center gap-2">
            <div
              className="h-14 w-14 bg-primary"
              style={{ borderRadius: `var(--${r})` }}
            />
            <span className="text-xs text-muted-foreground">{r}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
