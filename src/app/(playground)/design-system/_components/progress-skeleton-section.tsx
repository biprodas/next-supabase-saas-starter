import { Label } from "~/components/ui/label";
import { Progress } from "~/components/ui/progress";
import { Skeleton } from "~/components/ui/skeleton";
import { Section } from "./section";

export function ProgressSkeletonSection() {
  return (
    <Section
      id="progress-skeleton"
      title="Progress & Skeleton"
      description="Loading and progress indicators."
    >
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <Label>Progress</Label>
          <Progress value={33} className="h-2" />
          <Progress value={66} className="h-2" />
          <Progress value={100} className="h-2" />
        </div>
        <div className="space-y-2">
          <Label>Skeleton</Label>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    </Section>
  );
}
