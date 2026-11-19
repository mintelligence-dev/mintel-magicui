import { CheckIcon, MessageCircleIcon, TriangleAlertIcon, UserRoundIcon } from "lucide-react"

import { Timeline, TimelineItem } from "@/registry/mintel/ui/timeline"

export default function TimelineExample() {
  return (
    <div className="grid w-full max-w-3xl gap-10 sm:grid-cols-2">
      {/* Case history with icons */}
      <Timeline aria-label="Case history">
        <TimelineItem title="Case created" time="09:12" icon={<MessageCircleIcon />}>
          From LINE OA · “Where is my order?”
        </TimelineItem>
        <TimelineItem title="Assigned to Nina" time="09:15" icon={<UserRoundIcon />} variant="brand">
          Auto-routed by skill: Delivery
        </TimelineItem>
        <TimelineItem title="SLA at risk" time="11:40" icon={<TriangleAlertIcon />} variant="warning">
          No reply for 2 hours
        </TimelineItem>
        <TimelineItem title="Resolved" time="12:05" icon={<CheckIcon />} variant="success" />
      </Timeline>

      {/* Compact dots with a live current step */}
      <Timeline aria-label="Order">
        <TimelineItem title="Order placed" time="Mon" variant="success" />
        <TimelineItem title="Packed" time="Tue" variant="success" />
        <TimelineItem title="Out for delivery" time="Today" variant="brand" current>
          Arriving between 14:00 and 16:00
        </TimelineItem>
        <TimelineItem title="Delivered" />
      </Timeline>
    </div>
  )
}
