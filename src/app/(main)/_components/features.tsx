import {
  ShieldCheck,
  CreditCard,
  Database,
  Palette,
  Zap,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";

const features = [
  {
    icon: ShieldCheck,
    title: "Authentication",
    description:
      "Email/password, magic links, OAuth with Google & GitHub — all powered by Supabase Auth out of the box.",
  },
  {
    icon: CreditCard,
    title: "Stripe Payments",
    description:
      "Subscription billing, one-time payments, and webhooks pre-configured. Start accepting payments in minutes.",
  },
  {
    icon: Database,
    title: "Supabase Database",
    description:
      "Postgres database with row-level security, real-time subscriptions, and auto-generated TypeScript types.",
  },
  {
    icon: Palette,
    title: "Beautiful UI",
    description:
      "50+ accessible shadcn/ui components, dark/light mode, and a full design system ready to customize.",
  },
  {
    icon: Zap,
    title: "Next.js 16 App Router",
    description:
      "Server components, streaming, route handlers, and edge-ready deployment on Vercel or any platform.",
  },
  {
    icon: BarChart3,
    title: "Analytics Ready",
    description:
      "Dashboard scaffolding with Recharts, pre-built metrics cards, and hooks to wire up your own data.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Everything included</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Stop rebuilding the same foundation
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            We have assembled all the pieces every SaaS needs so you can focus
            on what makes your product unique.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="group transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="text-base font-semibold">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
