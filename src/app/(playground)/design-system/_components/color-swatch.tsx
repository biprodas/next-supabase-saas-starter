export function ColorSwatch({
  token,
  label,
  showFg,
}: {
  token: string;
  label: string;
  showFg?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-14 w-full rounded-lg border border-border shadow-sm"
        style={{
          backgroundColor: `var(--${token})`,
          ...(showFg ? { color: `var(--${showFg})` } : {}),
        }}
      >
        {showFg && (
          <span className="flex h-full items-center justify-center text-sm font-medium">
            Aa
          </span>
        )}
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}
