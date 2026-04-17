import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ROUTES } from "~/config/routes";

export function CtaBanner() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 size-64 rounded-full bg-white/10 blur-3xl" />

          <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
            Start building today
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-base text-primary-foreground/80">
            Join hundreds of developers who are shipping faster with this
            starter kit. No credit card required.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 px-6"
              asChild
            >
              <Link href={ROUTES.AUTH.SIGNUP}>
                Create free account
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
