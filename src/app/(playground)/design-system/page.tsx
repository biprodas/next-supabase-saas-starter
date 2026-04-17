"use client";

import { TooltipProvider } from "~/components/ui/tooltip";
import {
  DesignSystemHeader,
  SectionNav,
  ColorsSection,
  TypographySection,
  RadiusSection,
  ButtonsSection,
  BadgesSection,
  CardsSection,
  FormElementsSection,
  AlertsSection,
  TabsSection,
  ProgressSkeletonSection,
  AvatarTooltipSection,
} from "./_components";

export default function DesignSystemPage() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <DesignSystemHeader />

        <div className="container flex gap-8 px-4">
          <aside className="hidden border-r border-border pr-6 lg:block">
            <SectionNav />
          </aside>

          <main className="min-w-0 max-w-5xl flex-1 space-y-16 py-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Design System
              </h1>
              <p className="text-muted-foreground">
                Components, colors, and theme tokens used across the application.
                Toggle light/dark above to see theme behavior.
              </p>
            </div>

            <ColorsSection />
            <TypographySection />
            <RadiusSection />
            <ButtonsSection />
            <BadgesSection />
            <CardsSection />
            <FormElementsSection />
            <AlertsSection />
            <TabsSection />
            <ProgressSkeletonSection />
            <AvatarTooltipSection />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
