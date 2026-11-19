"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

// Same values as tokens.motion.spring.snappy in @mintelligence-dev/tokens.
const SPRING = { type: "spring", stiffness: 400, damping: 32, mass: 1 } as const

type Option = { value: string; label: React.ReactNode }

/**
 * Segmented control: a glass track with a thumb that springs to the selected option.
 * Keyboard: arrow keys move the selection (radiogroup semantics).
 */
function SegmentedControl({
  options,
  value: controlled,
  defaultValue,
  onValueChange,
  className,
  "aria-label": ariaLabel,
}: {
  options: Option[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
  "aria-label"?: string
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue ?? options[0]?.value)
  const value = controlled ?? uncontrolled
  const layoutId = `segmented-${React.useId()}`
  const reduceMotion = useReducedMotion()
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])

  const select = (v: string) => {
    if (controlled === undefined) setUncontrolled(v)
    onValueChange?.(v)
  }

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (index + dir + options.length) % options.length
    select(options[next].value)
    refs.current[next]?.focus()
  }

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      data-slot="segmented-control"
      className={cn(
        "relative inline-flex items-center gap-0.5 rounded-full border border-glass-border bg-glass p-1 backdrop-blur-glass backdrop-saturate-180",
        "shadow-[inset_0_1px_2px_0_var(--glass-shadow)]",
        "not-supports-[backdrop-filter:blur(1px)]:bg-muted [@media(prefers-reduced-transparency:reduce)]:bg-muted",
        className
      )}
    >
      {options.map((o, i) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => select(o.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "relative z-10 min-h-9 flex-1 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors outline-none touch-manipulation focus-visible:ring-[3px] focus-visible:ring-ring/50",
              // larger hit area on touch screens without changing the visual size
              "after:absolute after:-inset-y-1.5 after:inset-x-0 pointer-fine:after:hidden",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={reduceMotion ? { duration: 0 } : SPRING}
                className="absolute inset-0 -z-10 rounded-full border border-glass-border bg-background/90 shadow-[0_2px_8px_-2px_var(--glass-shadow),inset_0_1px_0_0_var(--glass-highlight)] dark:bg-white/15"
              />
            )}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

export { SegmentedControl }
