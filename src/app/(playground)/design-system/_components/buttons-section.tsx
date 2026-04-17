import { Button } from "~/components/ui/button";
import { InfoIcon } from "lucide-react";
import { Section } from "./section";

export function ButtonsSection() {
  return (
    <Section id="buttons" title="Buttons" description="Variants and sizes.">
      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-sm font-medium">Semantic variants</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary">Primary</Button>
            <Button variant="info">Info</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="error">Error</Button>
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium">Other variants</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium">Sizes</h3>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Icon">
              <InfoIcon className="size-4" />
            </Button>
            <Button size="icon-sm" aria-label="Icon sm">
              <InfoIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
