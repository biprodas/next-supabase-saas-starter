import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ROUTES } from "~/config/routes";
import { siteConfig } from "~/config/site";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href={ROUTES.HOME} className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="font-semibold text-foreground">
            {siteConfig.title.split(" ")[0]}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href={`${ROUTES.HOME}#features`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href={`${ROUTES.HOME}#pricing`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href={`${ROUTES.HOME}#faq`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.AUTH.LOGIN}>Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={ROUTES.AUTH.SIGNUP}>Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
