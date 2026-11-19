import { CheckIcon, MessageCircleIcon, UserRoundIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Timeline, TimelineItem } from "@/registry/mintel/ui/timeline"

const TONES = {
  brand: "text-brand bg-brand/12",
  success: "text-success bg-success/14",
  warning: "text-warning bg-warning/14",
  destructive: "text-destructive bg-destructive/14",
  neutral: "text-muted-foreground bg-muted",
} as const

function Pill({ tone, children, solid }: { tone: keyof typeof TONES; children: string; solid?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold leading-5",
        solid ? "bg-success text-white dark:text-background" : TONES[tone]
      )}
    >
      <span aria-hidden className={cn("size-2 rounded-full", solid ? "bg-current opacity-80" : "bg-current")} />
      {children}
    </span>
  )
}

/** Mirrors mintelStatusBadge's soft and solid looks, for the Salesforce guide preview. */
export function StatusBadgePreview() {
  return (
    <div className="flex max-w-xs flex-wrap justify-center gap-2">
      <Pill tone="brand">Working</Pill>
      <Pill tone="warning">On Hold</Pill>
      <Pill tone="destructive">Escalated</Pill>
      <Pill tone="neutral">Unknown</Pill>
      <Pill tone="success" solid>
        Closed
      </Pill>
    </div>
  )
}

/** React twin of mintelTimeline, for the Salesforce guide preview. */
export function TimelinePreview() {
  return (
    <Timeline aria-label="Case history" className="w-full max-w-xs">
      <TimelineItem title="Case created" time="09:12" icon={<MessageCircleIcon />}>
        From LINE OA
      </TimelineItem>
      <TimelineItem title="Assigned to Nina" time="09:15" icon={<UserRoundIcon />} variant="brand" />
      <TimelineItem title="Resolved" time="12:05" icon={<CheckIcon />} variant="success" current />
    </Timeline>
  )
}
