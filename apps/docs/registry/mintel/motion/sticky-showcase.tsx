"use client"

import * as React from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

// Same values as tokens.motion.spring.smooth in @mintelligence-dev/tokens.
const SPRING = { type: "spring", stiffness: 170, damping: 26, mass: 1 } as const

export type ShowcaseItem = {
  title: React.ReactNode
  description?: React.ReactNode
  visual: React.ReactNode
}

function Step({
  item,
  index,
  active,
  onActive,
}: {
  item: ShowcaseItem
  index: number
  active: boolean
  onActive: (i: number) => void
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  // "Active" when the step crosses the middle band of the viewport.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" })
  React.useEffect(() => {
    if (inView) onActive(index)
  }, [inView, index, onActive])

  return (
    <div ref={ref} className="flex flex-col justify-center py-10 lg:min-h-[70svh] lg:py-0">
      {/* Mobile: visual inline above the text (no sticky column). */}
      <div className="mb-6 overflow-hidden rounded-2xl border bg-muted/40 lg:hidden">{item.visual}</div>
      <h3
        className={cn(
          "font-heading text-2xl font-semibold tracking-tight transition-opacity duration-500 sm:text-3xl",
          active ? "opacity-100" : "lg:opacity-30"
        )}
      >
        {item.title}
      </h3>
      {item.description && (
        <p
          className={cn(
            "mt-3 max-w-md text-muted-foreground transition-opacity duration-500",
            active ? "opacity-100" : "lg:opacity-30"
          )}
        >
          {item.description}
        </p>
      )}
    </div>
  )
}

/**
 * Sticky storytelling: a sticky visual on one side while feature copy scrolls past.
 * Below `lg` it becomes a simple stacked list (visual above each step), which reads better on phones.
 */
function StickyShowcase({ items, className }: { items: ShowcaseItem[]; className?: string }) {
  const [active, setActive] = React.useState(0)
  const reduceMotion = useReducedMotion()
  const onActive = React.useCallback((i: number) => setActive(i), [])

  return (
    <div className={cn("grid gap-x-16 lg:grid-cols-2", className)}>
      <div>
        {items.map((item, i) => (
          <Step key={i} item={item} index={i} active={active === i} onActive={onActive} />
        ))}
      </div>
      <div className="hidden lg:block">
        <div className="sticky top-[15svh] h-[70svh] overflow-hidden rounded-3xl border bg-muted/40">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02, y: -24 }}
              transition={reduceMotion ? { duration: 0.15 } : SPRING}
            >
              {items[active]?.visual}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export { StickyShowcase }
