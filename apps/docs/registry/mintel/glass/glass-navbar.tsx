"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/** Nearest scrolling ancestor, or null for the window. */
function scrollParent(el: HTMLElement | null): HTMLElement | null {
  for (let node = el?.parentElement; node; node = node.parentElement) {
    const { overflowY } = getComputedStyle(node)
    if ((overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight) return node
  }
  return null
}

/**
 * Sticky frosted navigation bar. Pads for the iOS notch / Dynamic Island via
 * env(safe-area-inset-top) — requires `viewport-fit=cover` in the viewport meta.
 * `hideOnScroll` slides it away while scrolling down and brings it back on the way up.
 */
function GlassNavbar({
  className,
  floating = false,
  hideOnScroll = false,
  ...props
}: React.ComponentProps<"header"> & {
  /** Rounded pill that floats below the top edge instead of a full-width bar. */
  floating?: boolean
  /** Hide while scrolling down, show again when scrolling up (or near the top). */
  hideOnScroll?: boolean
}) {
  const ref = React.useRef<HTMLElement>(null)
  const [hidden, setHidden] = React.useState(false)

  React.useEffect(() => {
    if (!hideOnScroll) return
    const target = scrollParent(ref.current)
    const read = () => (target ? target.scrollTop : window.scrollY)
    let last = read()
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const y = read()
        // Ignore tiny moves so it doesn't flicker; always show near the top.
        if (y < 64) setHidden(false)
        else if (Math.abs(y - last) > 6) setHidden(y > last)
        last = y
      })
    }
    const source: HTMLElement | Window = target ?? window
    source.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      source.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [hideOnScroll])

  return (
    <header
      ref={ref}
      data-slot="glass-navbar"
      data-hidden={hidden || undefined}
      className={cn(
        "sticky z-40 border-glass-border bg-glass text-glass-foreground backdrop-blur-glass backdrop-saturate-180",
        "not-supports-[backdrop-filter:blur(1px)]:bg-background [@media(prefers-reduced-transparency:reduce)]:bg-background",
        "transition-[translate,opacity] duration-500 ease-spring-smooth motion-reduce:transition-none",
        floating
          ? // The sticky offset repeats the margin, so the pill keeps its gap (and clears the notch) once it sticks.
            "top-[max(env(safe-area-inset-top),0.75rem)] mx-auto mt-[max(env(safe-area-inset-top),0.75rem)] w-[min(100%-1.5rem,64rem)] rounded-full border shadow-[inset_0_1px_0_0_var(--glass-highlight),0_12px_40px_-12px_var(--glass-shadow)] data-hidden:-translate-y-[calc(100%+1.5rem)]"
          : "top-0 border-b pt-[env(safe-area-inset-top)] data-hidden:-translate-y-full",
        "data-hidden:pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

export { GlassNavbar }
