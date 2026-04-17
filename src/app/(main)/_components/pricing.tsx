import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { ROUTES } from "~/config/routes";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for side projects and early-stage validation.",
    features: [
      "Up to 3 projects",
      "1,000 MAU",
      "Community support",
      "Basic analytics",
    ],
    cta: "Get started",
    href: ROUTES.AUTH.SIGNUP,
    popular: false,
    variant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "Everything you need to run a growing SaaS business.",
    features: [
      "Unlimited projects",
      "50,000 MAU",
      "Priority email support",
      "Advanced analytics",
      "Custom domain",
      "Team members (5)",
    ],
    cta: "Start free trial",
    href: ROUTES.AUTH.SIGNUP,
    popular: true,
    variant: "default" as const,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "billed annually",
    description: "Dedicated infrastructure and support for large teams.",
    features: [
      "Unlimited everything",
      "SLA guarantee",
      "Dedicated support",
      "SSO / SAML",
      "Audit logs",
      "Custom contracts",
    ],
    cta: "Contact sales",
    href: "#",
    popular: false,
    variant: "outline" as const,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Simple pricing</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pay for what you use
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            No hidden fees. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.popular
                  ? "relative overflow-visible border-primary ring-2 ring-primary/20"
                  : ""
              }
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="px-3 py-0.5 text-xs">Most popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-base font-semibold">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-2">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="ml-1 text-sm text-muted-foreground">/{plan.period}</span>
                  )}
                  {plan.price === "Custom" && (
                    <span className="ml-1 text-sm text-muted-foreground">{plan.period}</span>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="size-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button variant={plan.variant} className="w-full" asChild>
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
