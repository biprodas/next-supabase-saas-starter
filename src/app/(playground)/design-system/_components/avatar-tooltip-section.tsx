import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Section } from "./section";

export function AvatarTooltipSection() {
  return (
    <Section
      id="avatar-tooltip"
      title="Avatar & Tooltip"
      description="User avatar and tooltips."
    >
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex gap-2">
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>E</AvatarFallback>
          </Avatar>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">
              Hover for tooltip
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Tooltip content</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </Section>
  );
}
