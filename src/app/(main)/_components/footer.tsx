import Link from "next/link";
import { Logo } from "~/components/logo";
import { siteConfig } from "~/config/site";
import { ROUTES } from "~/config/routes";
import { SUPPORT_CONTACT_EMAIL } from "~/config/constants";

const links = {
  Product: [
    { label: "Features", href: `${ROUTES.HOME}#features` },
    { label: "Pricing", href: `${ROUTES.HOME}#pricing` },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: `mailto:${SUPPORT_CONTACT_EMAIL}` },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <Logo size="sm" />
            <p className="text-xs text-muted-foreground leading-relaxed max-w-44">
              {siteConfig.description}
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {group}
              </p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.title}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js &amp; Supabase
          </p>
        </div>
      </div>
    </footer>
  );
}
