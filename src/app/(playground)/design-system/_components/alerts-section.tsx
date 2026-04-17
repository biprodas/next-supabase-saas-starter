import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "~/components/ui/alert";
import {
  InfoIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  XCircleIcon,
} from "lucide-react";
import { Section } from "./section";

export function AlertsSection() {
  return (
    <Section id="alerts" title="Alerts" description="Inline messages.">
      <div className="max-w-2xl space-y-4">
        <Alert>
          <InfoIcon className="size-4" />
          <AlertTitle>Default alert</AlertTitle>
          <AlertDescription>
            Neutral message with no semantic color.
          </AlertDescription>
        </Alert>
        <Alert variant="primary">
          <InfoIcon className="size-4" />
          <AlertTitle>Primary alert</AlertTitle>
          <AlertDescription>Highlighted with primary color.</AlertDescription>
        </Alert>
        <Alert variant="info">
          <InfoIcon className="size-4" />
          <AlertTitle>Info alert</AlertTitle>
          <AlertDescription>Informational message.</AlertDescription>
        </Alert>
        <Alert variant="success">
          <CheckCircleIcon className="size-4" />
          <AlertTitle>Success alert</AlertTitle>
          <AlertDescription>Operation completed successfully.</AlertDescription>
        </Alert>
        <Alert variant="warning">
          <AlertTriangleIcon className="size-4" />
          <AlertTitle>Warning alert</AlertTitle>
          <AlertDescription>Please review before continuing.</AlertDescription>
        </Alert>
        <Alert variant="error">
          <XCircleIcon className="size-4" />
          <AlertTitle>Error alert</AlertTitle>
          <AlertDescription>Something went wrong.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircleIcon className="size-4" />
          <AlertTitle>Destructive alert</AlertTitle>
          <AlertDescription>
            Use for errors or destructive actions.
          </AlertDescription>
        </Alert>
      </div>
    </Section>
  );
}
