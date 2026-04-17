import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { ROUTES } from "~/config/routes";

const techStack = ["Next.js 16", "Supabase", "Stripe", "Tailwind CSS v4", "shadcn/ui"];

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 text-center">
        <Badge variant="outline" className="mb-6 gap-1.5 px-3 py-1 text-xs">
          <span className="size-1.5 rounded-full bg-primary" />
          Open source SaaS starter kit
        </Badge>

        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Ship your SaaS product{" "}
          <span className="text-primary">10x faster</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
          A production-ready starter kit with authentication, payments, and a
          beautiful UI — everything you need to launch your next big idea.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="gap-2 px-6" asChild>
            <Link href={ROUTES.AUTH.SIGNUP}>
              Get started for free
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2 px-6" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-4" />
              View on GitHub
            </a>
          </Button>
        </div>

        {/* Tech stack badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-muted-foreground">Built with</span>
          {techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Hero visual */}
        <div className="relative mt-16 overflow-hidden rounded-xl border border-border/50 bg-muted/30 shadow-2xl">
          <div className="flex h-8 items-center gap-1.5 border-b border-border/50 bg-muted/50 px-4">
            <div className="size-2.5 rounded-full bg-destructive/60" />
            <div className="size-2.5 rounded-full bg-yellow-500/60" />
            <div className="size-2.5 rounded-full bg-green-500/60" />
            <span className="ml-2 text-xs text-muted-foreground">
              localhost:3000/dashboard
            </span>
          </div>
          <div className="grid min-h-64 place-items-center p-8 sm:min-h-80">
            <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-3">
              {[
                { label: "Total Revenue", value: "$12,456", change: "+12%" },
                { label: "Active Users", value: "1,234", change: "+8%" },
                { label: "Subscriptions", value: "89", change: "+24%" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border/50 bg-card p-4 text-left shadow-xs"
                >
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-green-500">{stat.change} this month</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
