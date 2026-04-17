import {
  Card,
  CardContent,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Section } from "./section";

export function TypographySection() {
  return (
    <Section
      id="typography"
      title="Typography"
      description="Font families and default text styles."
    >
      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground">
                Sans (Geist Sans)
              </p>
              <p className="font-sans text-lg">
                The quick brown fox jumps over the lazy dog. 0123456789
              </p>
            </div>
            <Separator />
            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground">
                Mono (Geist Mono)
              </p>
              <p className="font-mono text-lg">
                The quick brown fox jumps over the lazy dog. 0123456789
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}
