import Link from "next/link";
import { cn } from "~/lib/utils";

interface LogoProps {
  size?: "sm" | "md";
  className?: string;
}

export const Logo = ({ size = "md", className }: LogoProps) => {
  const iconSize = size === "sm" ? "w-7 h-7 text-xs" : "w-8 h-8 text-sm";
  const textClass = size === "sm" ? "text-sm text-muted-foreground" : "text-base";

  return (
    <Link href="/" className={cn("flex items-center gap-2 w-fit", className)}>
      <div className={cn("rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", iconSize)}>
        <span className="text-primary font-mono font-semibold">V</span>
      </div>
      <span className={cn("font-medium tracking-tight", textClass)}>Next-SaaS</span>
    </Link>
  );
}
