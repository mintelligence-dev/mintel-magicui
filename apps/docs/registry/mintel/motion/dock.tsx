"use client"

import * as React from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"

import { cn } from "@/lib/utils"

// Same values as tokens.motion.spring.bouncy (softened) in @m-intelligence/tokens.
const SPRING = { stiffness: 300, damping: 22, mass: 0.6 }

type DockContextValue = { mouseX: MotionValue<number>; size: number; magnification: number; distance: number; enabled: boolean }
const DockContext = React.createContext<DockContextValue | null>(null)

/**
 * Magnifying icon dock. Icons magnify near a mouse pointer; on touch screens magnification is off
 * (there is no hover) and items get a spring press instead. Each item is a 44px+ touch target.
 */
function Dock({
  children,
  className,
  size = 44,
  magnification = 68,
  distance = 140,
}: {
  children: React.ReactNode
  className?: string
  /** Resting icon size in px (≥ 44 recommended for touch). */
  size?: number
  /** Icon size directly under the pointer. */
  magnification?: number
  /** Pointer distance (px) that still affects an icon. */
  distance?: number
}) {
  const mouseX = useMotionValue(Infinity)
  const reduceMotion = useReducedMotion()

  return (
    <DockContext.Provider value={{ mouseX, size, magnification, distance, enabled: !reduceMotion }}>
      <div
        role="toolbar"
        onPointerMove={(e) => {
          if (e.pointerType === "mouse") mouseX.set(e.clientX)
        }}
        onPointerLeave={() => mouseX.set(Infinity)}
        className={cn(
          "mx-auto flex w-max items-end gap-2 rounded-2xl border border-glass-border bg-glass px-2 pb-2 pt-2 backdrop-blur-glass backdrop-saturate-180",
          "shadow-[inset_0_1px_0_0_var(--glass-highlight),0_12px_40px_-12px_var(--glass-shadow)]",
          "not-supports-[backdrop-filter:blur(1px)]:bg-card",
          className
        )}
      >
        {children}
      </div>
    </DockContext.Provider>
  )
}

function DockItem({
  children,
  label,
  className,
  onClick,
  href,
}: {
  children: React.ReactNode
  label: string
  className?: string
  onClick?: () => void
  href?: string
}) {
  const ctx = React.useContext(DockContext)
  if (!ctx) throw new Error("DockItem must be used inside <Dock>")
  const ref = React.useRef<HTMLDivElement>(null)

  const dist = useTransform(ctx.mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect()
    return b ? x - b.left - b.width / 2 : Infinity
  })
  const target = useTransform(
    dist,
    [-ctx.distance, 0, ctx.distance],
    [ctx.size, ctx.enabled ? ctx.magnification : ctx.size, ctx.size]
  )
  const width = useSpring(target, SPRING)

  const Comp = href ? motion.a : motion.button
  return (
    <motion.div ref={ref} style={{ width, height: width }} className="relative flex items-end">
      <Comp
        {...(href ? { href } : { type: "button" as const, onClick })}
        aria-label={label}
        title={label}
        whileTap={ctx.enabled ? { scale: 0.88 } : undefined}
        className={cn(
          "group flex size-full items-center justify-center rounded-[28%] bg-background/80 text-foreground shadow-sm outline-none touch-manipulation focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-white/10 [&_svg]:size-[45%]",
          className
        )}
      >
        {children}
        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md border bg-popover px-2 py-0.5 text-xs whitespace-nowrap text-popover-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100 pointer-coarse:hidden">
          {label}
        </span>
      </Comp>
    </motion.div>
  )
}

export { Dock, DockItem }
