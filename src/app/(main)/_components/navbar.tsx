import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Logo } from "~/components/logo";
import { ThemeToggleButton } from "~/components/theme-toggle-button";
import { ROUTES } from "~/config/routes";
import { UserButton } from "~/app/(auth)/_components/user-button";
import { createClient } from "~/lib/supabase/server";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />

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

        {user ? (
          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            <Button size="sm" asChild>
              <Link href={ROUTES.DASHBOARD.USER}>Dashboard</Link>
            </Button>
            <UserButton />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            <Button variant="ghost" size="sm" asChild>
              <Link href={ROUTES.AUTH.LOGIN}>Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={ROUTES.AUTH.SIGNUP}>Get started</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
