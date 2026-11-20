"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

// Same values as tokens.motion.spring.snappy in @m-intelligence/tokens.
const SPRING = { type: "spring", stiffness: 400, damping: 32, mass: 1 } as const

export type TabBarItem = {
  value: string
  label: string
  icon: React.ReactNode
  /** Render as a link instead of a button. */
  href?: string
}

/**
 * Bottom tab bar for mobile web / PWA. Frosted glass, safe-area aware (home indicator),
 * 48px+ touch targets and a spring-animated active pill. Hide it on larger screens with
 * e.g. className="md:hidden". Requires `viewport-fit=cover` for the safe-area padding.
 */
function TabBar({
  items,
  value,
  onValueChange,
  className,
  "aria-label": ariaLabel = "Main",
}: {
  items: TabBarItem[]
  value: string
  onValueChange?: (value: string) => void
  className?: string
  "aria-label"?: string
}) {
  const layoutId = `tab-bar-${React.useId()}`
  const reduceMotion = useReducedMotion()

  return (
    <nav
      aria-label={ariaLabel}
      data-slot="tab-bar"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-glass-border bg-glass backdrop-blur-glass backdrop-saturate-180",
        "pb-[max(env(safe-area-inset-bottom),0.25rem)] shadow-[0_-8px_32px_-16px_var(--glass-shadow)]",
        "not-supports-[backdrop-filter:blur(1px)]:bg-background [@media(prefers-reduced-transparency:reduce)]:bg-background",
        className
      )}
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-2 pt-1.5">
        {items.map((item) => {
          const active = item.value === value
          const content = (
            <>
              <span className="relative flex h-8 w-14 items-center justify-center [&_svg]:size-5">
                {active && (
                  <motion.span
                    layoutId={layoutId}
                    transition={reduceMotion ? { duration: 0 } : SPRING}
                    className="absolute inset-0 rounded-full bg-brand/15"
                  />
                )}
                <span className="relative">{item.icon}</span>
              </span>
              <span className="text-[11px] leading-none font-medium">{item.label}</span>
            </>
          )
          const itemClass = cn(
            "flex min-h-12 w-full flex-col items-center justify-center gap-1 rounded-xl outline-none touch-manipulation select-none",
            "transition-[color,transform] duration-300 ease-spring-snappy active:scale-90 motion-reduce:active:scale-100",
            "focus-visible:ring-[3px] focus-visible:ring-ring/50",
            active ? "text-brand" : "text-muted-foreground"
          )
          return (
            <li key={item.value} className="flex-1">
              {item.href ? (
                <a
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => onValueChange?.(item.value)}
                  className={itemClass}
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => onValueChange?.(item.value)}
                  className={itemClass}
                >
                  {content}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { TabBar }
