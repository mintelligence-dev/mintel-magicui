"use client"

import {
  AnimatedTabs,
  AnimatedTabsContent,
  AnimatedTabsList,
  AnimatedTabsTrigger,
} from "@/registry/mintel/motion/animated-tabs"
import { SegmentedControl } from "@/registry/mintel/glass/segmented-control"

const TABS = [
  { value: "overview", label: "Overview", body: "Account health, open cases and the latest activity." },
  { value: "cases", label: "Cases", body: "12 open cases, 3 escalated." },
  { value: "settings", label: "Settings", body: "Notification and routing preferences." },
]

/** React twin of tabs, for the Salesforce guide preview. */
export function TabsPreview() {
  return (
    <AnimatedTabs defaultValue="overview" className="w-full max-w-sm">
      <AnimatedTabsList>
        {TABS.map((t) => (
          <AnimatedTabsTrigger key={t.value} value={t.value}>
            {t.label}
          </AnimatedTabsTrigger>
        ))}
      </AnimatedTabsList>
      {TABS.map((t) => (
        <AnimatedTabsContent key={t.value} value={t.value} className="pt-3 text-sm text-muted-foreground">
          {t.body}
        </AnimatedTabsContent>
      ))}
    </AnimatedTabs>
  )
}

/** React twin of segmentedControl, for the Salesforce guide preview. */
export function SegmentedPreview() {
  return (
    <div className="flex flex-col items-center gap-3">
      <SegmentedControl
        aria-label="Range"
        defaultValue="week"
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
      />
      <SegmentedControl
        aria-label="View"
        variant="brand"
        defaultValue="list"
        options={[
          { value: "list", label: "List" },
          { value: "board", label: "Board" },
        ]}
      />
    </div>
  )
}
