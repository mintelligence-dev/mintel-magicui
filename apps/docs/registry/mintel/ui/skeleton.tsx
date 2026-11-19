import * as React from "react"

import { cn } from "@/lib/utils"

/** Loading placeholder with a soft light sweep (a gentle pulse under reduced motion). */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        "after:absolute after:inset-0 after:-translate-x-full after:bg-linear-to-r after:from-transparent after:via-foreground/6 after:to-transparent",
        "motion-safe:after:animate-[mintel-skeleton_1.6s_ease-in-out_infinite] motion-reduce:animate-pulse",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
