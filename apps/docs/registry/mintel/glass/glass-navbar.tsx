import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Sticky frosted navigation bar. Pads for the iOS notch / Dynamic Island via
 * env(safe-area-inset-top) — requires `viewport-fit=cover` in the viewport meta.
 */
function GlassNavbar({
  className,
  floating = false,
  ...props
}: React.ComponentProps<"header"> & {
  /** Rounded pill that floats below the top edge instead of a full-width bar. */
  floating?: boolean
}) {
  return (
    <header
      data-slot="glass-navbar"
      className={cn(
        "sticky top-0 z-40 border-glass-border bg-glass text-glass-foreground backdrop-blur-glass backdrop-saturate-180",
        "not-supports-[backdrop-filter:blur(1px)]:bg-background [@media(prefers-reduced-transparency:reduce)]:bg-background",
        floating
          ? "mx-auto mt-[max(env(safe-area-inset-top),0.75rem)] w-[min(100%-1.5rem,64rem)] rounded-full border shadow-[inset_0_1px_0_0_var(--glass-highlight),0_12px_40px_-12px_var(--glass-shadow)]"
          : "border-b pt-[env(safe-area-inset-top)]",
        className
      )}
      {...props}
    />
  )
}

export { GlassNavbar }
