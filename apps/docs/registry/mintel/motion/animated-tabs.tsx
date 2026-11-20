"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

// Same values as tokens.motion.spring.snappy in @m-intelligence/tokens.
const SPRING = { type: "spring", stiffness: 400, damping: 32, mass: 1 } as const

type Ctx = { value: string; layoutId: string; variant: "pill" | "underline"; reduceMotion: boolean }
const AnimatedTabsContext = React.createContext<Ctx | null>(null)

/**
 * Tabs whose active indicator glides between triggers with a spring (shared layout animation).
 * Built on Radix Tabs, so keyboard and ARIA behaviour are unchanged.
 */
function AnimatedTabs({
  value: controlled,
  defaultValue,
  onValueChange,
  variant = "pill",
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & { variant?: "pill" | "underline" }) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue ?? "")
  const value = controlled ?? uncontrolled
  const layoutId = `animated-tabs-${React.useId()}`
  const reduceMotion = !!useReducedMotion()

  return (
    <AnimatedTabsContext.Provider value={{ value, layoutId, variant, reduceMotion }}>
      <TabsPrimitive.Root
        data-slot="animated-tabs"
        value={value}
        onValueChange={(v) => {
          if (controlled === undefined) setUncontrolled(v)
          onValueChange?.(v)
        }}
        className={cn("flex flex-col gap-3", className)}
        {...props}
      />
    </AnimatedTabsContext.Provider>
  )
}

function AnimatedTabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  const ctx = React.useContext(AnimatedTabsContext)
  return (
    <TabsPrimitive.List
      data-slot="animated-tabs-list"
      className={cn(
        "relative inline-flex w-fit items-center",
        ctx?.variant === "underline" ? "gap-4 border-b" : "gap-1 rounded-full bg-muted p-1",
        className
      )}
      {...props}
    />
  )
}

function AnimatedTabsTrigger({
  className,
  children,
  value,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const ctx = React.useContext(AnimatedTabsContext)
  if (!ctx) throw new Error("AnimatedTabsTrigger must be used inside <AnimatedTabs>")
  const active = ctx.value === value
  const underline = ctx.variant === "underline"

  return (
    <TabsPrimitive.Trigger
      value={value}
      data-slot="animated-tabs-trigger"
      className={cn(
        "relative z-10 inline-flex min-h-9 items-center justify-center gap-1.5 text-sm font-medium whitespace-nowrap outline-none touch-manipulation transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
        underline ? "px-1 pb-2.5" : "rounded-full px-4",
        active ? (underline ? "text-brand" : "text-foreground") : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {active && (
        <motion.span
          layoutId={ctx.layoutId}
          transition={ctx.reduceMotion ? { duration: 0 } : SPRING}
          className={cn(
            "absolute -z-10",
            underline
              ? "inset-x-0 -bottom-px h-0.5 rounded-full bg-brand"
              : "inset-0 rounded-full bg-background shadow-sm dark:bg-white/10"
          )}
        />
      )}
      {children}
    </TabsPrimitive.Trigger>
  )
}

function AnimatedTabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="animated-tabs-content"
      className={cn(
        "outline-none data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-1 motion-reduce:animate-none",
        className
      )}
      {...props}
    />
  )
}

export { AnimatedTabs, AnimatedTabsList, AnimatedTabsTrigger, AnimatedTabsContent }
