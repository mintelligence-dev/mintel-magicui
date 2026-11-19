import * as React from "react"

import { cn } from "@/lib/utils"

type TimelineVariant = "default" | "brand" | "success" | "warning" | "destructive"

const DOT: Record<TimelineVariant, string> = {
  default: "border-border bg-background text-muted-foreground",
  brand: "border-transparent bg-[image:var(--brand-gradient)] text-brand-foreground",
  success: "border-transparent bg-success text-white",
  warning: "border-transparent bg-warning text-white",
  destructive: "border-transparent bg-destructive text-white",
}

const RING: Record<TimelineVariant, string> = {
  default: "bg-muted-foreground/30",
  brand: "bg-brand/40",
  success: "bg-success/40",
  warning: "bg-warning/40",
  destructive: "bg-destructive/40",
}

/** Vertical list of events, newest or oldest first — the order is yours. */
function Timeline({ className, ...props }: React.ComponentProps<"ol">) {
  return <ol data-slot="timeline" className={cn("relative grid [&>li:nth-child(2)]:[animation-delay:70ms] [&>li:nth-child(3)]:[animation-delay:140ms] [&>li:nth-child(4)]:[animation-delay:210ms] [&>li:nth-child(5)]:[animation-delay:280ms] [&>li:nth-child(6)]:[animation-delay:350ms]", className)} {...props} />
}

/**
 * One event. `icon` replaces the dot's content; `current` adds a soft pulse (off under reduced motion).
 * Children are the event's description.
 */
function TimelineItem({
  title,
  time,
  icon,
  variant = "default",
  current = false,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"li">, "title"> & {
  title: React.ReactNode
  time?: React.ReactNode
  icon?: React.ReactNode
  variant?: TimelineVariant
  current?: boolean
}) {
  return (
    <li
      data-slot="timeline-item"
      aria-current={current ? "step" : undefined}
      className={cn("group/timeline relative grid grid-cols-[2rem_1fr] gap-x-3 pb-6 last:pb-0 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-left-2 motion-safe:fill-mode-both motion-safe:duration-500 motion-safe:ease-spring-smooth", className)}
      {...props}
    >
      {/* connector to the next item */}
      <span aria-hidden className="absolute top-8 bottom-0 left-4 w-px -translate-x-1/2 bg-border group-last/timeline:hidden" />
      <span className="relative flex size-8 items-center justify-center">
        {current && (
          <span aria-hidden className={cn("absolute inset-0 rounded-full motion-safe:animate-ping", RING[variant])} />
        )}
        <span
          className={cn(
            "relative flex items-center justify-center rounded-full border-2 [&_svg]:size-3.5",
            icon ? "size-8" : "size-3.5",
            DOT[variant]
          )}
        >
          {icon}
        </span>
      </span>
      <div className="min-w-0 pt-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <p className="font-medium leading-snug">{title}</p>
          {time && <time className="text-xs text-muted-foreground tabular-nums">{time}</time>}
        </div>
        {children && <div className="mt-1 text-sm text-muted-foreground">{children}</div>}
      </div>
    </li>
  )
}

export { Timeline, TimelineItem, type TimelineVariant }
