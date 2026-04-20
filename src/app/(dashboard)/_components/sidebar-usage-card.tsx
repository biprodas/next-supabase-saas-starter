"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Progress } from "~/components/ui/progress"

type SidebarUsageCardProps = {
  title?: string
  description?: string
  used?: number
  total?: number
  upgradeHref?: string
  upgradeLabel?: string
}

export function SidebarUsageCard({
  title = "Usage",
  description = "Requests this billing period",
  used = 2160,
  total = 3000,
  upgradeHref = "/settings",
  upgradeLabel = "Upgrade plan",
}: SidebarUsageCardProps) {
  const pct = Math.min(100, Math.round((used / Math.max(total, 1)) * 100))

  return (
    <Card
      size="sm"
      className="gap-0 border-sidebar-border bg-sidebar-accent/30 py-4 shadow-none ring-1 ring-sidebar-border/60"
    >
      <CardHeader>
        <CardTitle className="text-sidebar-foreground">{title}</CardTitle>
        <CardDescription className="text-xs text-sidebar-foreground/70">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 py-2">
        <div className="flex items-baseline justify-between gap-2 text-xs text-sidebar-foreground/80 tabular-nums">
          <span>
            {used.toLocaleString()} / {total.toLocaleString()}
          </span>
          <span className="font-medium text-sidebar-foreground">{pct}%</span>
        </div>
        <Progress
          value={pct}
          className="h-2 bg-muted/80 [&>[data-slot=progress-indicator]]:bg-sidebar-primary"
        />
      </CardContent>
      <CardFooter className="border-t border-sidebar-border/60 px-4 pt-3 pb-0">
        <Button
          asChild
          variant="default"
          size="sm"
          className="w-full"
        >
          <Link href={upgradeHref}>{upgradeLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
