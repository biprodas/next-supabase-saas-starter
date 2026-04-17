"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const DESIGN_SYSTEM_SECTIONS = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "radius", label: "Border radius" },
  { id: "buttons", label: "Buttons" },
  { id: "badges", label: "Badges" },
  { id: "cards", label: "Cards" },
  { id: "form-elements", label: "Form elements" },
  { id: "alerts", label: "Alerts" },
  { id: "tabs", label: "Tabs" },
  { id: "progress-skeleton", label: "Progress & Skeleton" },
  { id: "avatar-tooltip", label: "Avatar & Tooltip" },
] as const;

export function SectionNav() {
  const pathname = usePathname();

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `${pathname}#${id}`);
  }

  return (
    <nav
      aria-label="Design system sections"
      className="sticky top-14 shrink-0 w-48 space-y-1 py-6"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Sections
      </p>
      <ul className="space-y-0.5">
        {DESIGN_SYSTEM_SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <Link
              href={`${pathname}#${id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
              }}
              className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
