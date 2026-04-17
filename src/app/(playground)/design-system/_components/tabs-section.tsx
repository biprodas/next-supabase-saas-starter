"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "~/components/ui/tabs";
import { Section } from "./section";

export function TabsSection() {
  return (
    <Section id="tabs" title="Tabs" description="Tabbed content.">
      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-sm font-medium">Default (pill)</h3>
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="mt-4 rounded-lg border p-4">
              Content for tab 1.
            </TabsContent>
            <TabsContent value="tab2" className="mt-4 rounded-lg border p-4">
              Content for tab 2.
            </TabsContent>
            <TabsContent value="tab3" className="mt-4 rounded-lg border p-4">
              Content for tab 3.
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium">Line variant</h3>
          <Tabs defaultValue="a">
            <TabsList variant="line">
              <TabsTrigger value="a">Line A</TabsTrigger>
              <TabsTrigger value="b">Line B</TabsTrigger>
            </TabsList>
            <TabsContent value="a" className="mt-4 rounded-lg border p-4">
              Line tab content A.
            </TabsContent>
            <TabsContent value="b" className="mt-4 rounded-lg border p-4">
              Line tab content B.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Section>
  );
}
