"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Page header with a big title that scrolls away; once it slides under the bar, a compact title fades
 * into the bar and the bar turns translucent. Works with the window or any scrolling ancestor.
 * Under reduced motion the swap is instant.
 */
function CollapsingHeader({
  title,
  leading,
  trailing,
  className,
  children,
}: {
  title: React.ReactNode
  /** Left of the bar, e.g. a back button. */
  leading?: React.ReactNode
  /** Right of the bar, e.g. actions. */
  trailing?: React.ReactNode
  className?: string
  /** Optional content under the big title, e.g. a search field. */
  children?: React.ReactNode
}) {
  const barRef = React.useRef<HTMLDivElement>(null)
  const titleRef = React.useRef<HTMLHeadingElement>(null)
  const [collapsed, setCollapsed] = React.useState(false)

  React.useEffect(() => {
    let frame = 0
    const check = () => {
      frame = 0
      const bar = barRef.current?.getBoundingClientRect()
      const big = titleRef.current?.getBoundingClientRect()
      if (bar && big) setCollapsed(big.bottom <= bar.bottom + 4)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    check()
    // Capture catches scrolling in any ancestor, not just the window.
    window.addEventListener("scroll", onScroll, { capture: true, passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true })
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header data-slot="collapsing-header" data-collapsed={collapsed || undefined} className={cn("contents", className)}>
      <div
        ref={barRef}
        className={cn(
          "sticky top-0 z-20 grid h-12 grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 transition-[background-color,box-shadow] duration-300 motion-reduce:transition-none",
          collapsed ? "material-thick shadow-[0_1px_0_var(--border)]" : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-start gap-1">{leading}</div>
        <p
          aria-hidden={!collapsed}
          className={cn(
            "truncate text-center text-sm font-semibold transition-[opacity,translate] duration-300 ease-spring-snappy motion-reduce:transition-none",
            collapsed ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
          )}
        >
          {title}
        </p>
        <div className="flex items-center justify-end gap-1">{trailing}</div>
      </div>
      <div className="px-4 pt-1 pb-3">
        <h1 ref={titleRef} className="text-display font-bold">
          {title}
        </h1>
        {children && <div className="mt-3">{children}</div>}
      </div>
    </header>
  )
}

export { CollapsingHeader }
