import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Section } from "./section";

export function CardsSection() {
  return (
    <Section id="cards" title="Cards" description="Content containers.">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>
              Optional description for the card content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Card body. Use CardFooter for actions.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Another card</CardTitle>
            <CardDescription>With different content.</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={60} className="mt-2" />
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
