"use client";

import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Checkbox } from "~/components/ui/checkbox";
import { Switch } from "~/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";
import { Section } from "./section";

export function FormElementsSection() {
  return (
    <Section
      id="form-elements"
      title="Form elements"
      description="Inputs, labels, switches, checkboxes, select."
    >
      <Card className="max-w-md">
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="ds-input">Input</Label>
            <Input id="ds-input" placeholder="Placeholder text" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ds-textarea">Textarea</Label>
            <Textarea
              id="ds-textarea"
              placeholder="Multi-line placeholder"
              rows={3}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="ds-check" />
            <Label htmlFor="ds-check">Checkbox</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="ds-switch" defaultChecked />
            <Label htmlFor="ds-switch">Switch</Label>
          </div>
          <div className="space-y-2">
            <Label>Select</Label>
            <Select defaultValue="option1">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Slider</Label>
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}
