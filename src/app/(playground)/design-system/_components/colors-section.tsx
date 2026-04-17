import { Section } from "./section";
import { ColorSwatch } from "./color-swatch";

const colorTokens: Array<{
  name: string;
  token: string;
  fg?: string;
}> = [
  { name: "Background", token: "background", fg: "foreground" },
  { name: "Foreground", token: "foreground" },
  { name: "Card", token: "card", fg: "card-foreground" },
  { name: "Popover", token: "popover", fg: "popover-foreground" },
  { name: "Primary", token: "primary", fg: "primary-foreground" },
  { name: "Secondary", token: "secondary", fg: "secondary-foreground" },
  { name: "Muted", token: "muted", fg: "muted-foreground" },
  { name: "Accent", token: "accent", fg: "accent-foreground" },
  { name: "Destructive", token: "destructive" },
  { name: "Info", token: "info", fg: "info-foreground" },
  { name: "Success", token: "success", fg: "success-foreground" },
  { name: "Warning", token: "warning", fg: "warning-foreground" },
  { name: "Error", token: "error", fg: "error-foreground" },
  { name: "Border", token: "border" },
  { name: "Input", token: "input" },
  { name: "Ring", token: "ring" },
];

const chartColors = [
  { name: "Chart 1", token: "chart-1" },
  { name: "Chart 2", token: "chart-2" },
  { name: "Chart 3", token: "chart-3" },
  { name: "Chart 4", token: "chart-4" },
  { name: "Chart 5", token: "chart-5" },
] as const;

export function ColorsSection() {
  return (
    <Section
      id="colors"
      title="Colors"
      description="Semantic color tokens. Values adapt in light and dark mode."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {colorTokens.map(({ name, token, fg }) => (
          <ColorSwatch key={token} token={token} label={name} showFg={fg} />
        ))}
      </div>
      <div className="mt-6">
        <h3 className="mb-3 text-sm font-medium">Chart palette</h3>
        <div className="flex flex-wrap gap-3">
          {chartColors.map(({ name, token }) => (
            <div key={token} className="flex items-center gap-2">
              <div
                className="h-8 w-8 rounded-md border border-border"
                style={{ backgroundColor: `var(--${token})` }}
              />
              <span className="text-sm text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
