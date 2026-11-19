"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type StepperStep = { value: string; label: React.ReactNode; description?: React.ReactNode }

/**
 * Progress through ordered stages.
 * - `variant="arrow"`: chevron path like a Salesforce Path, in Mintel colors.
 * - `variant="steps"`: numbered circles joined by a line (wizards, checkouts).
 * Completed steps show a check, the current one is highlighted; pass `onStepClick` to make steps
 * clickable. Scrolls horizontally on narrow screens.
 */
function Stepper({
  steps,
  value,
  onStepClick,
  variant = "arrow",
  selected,
  className,
  "aria-label": ariaLabel = "Progress",
}: {
  steps: StepperStep[]
  /** Value of the current step. */
  value: string
  onStepClick?: (value: string) => void
  variant?: "arrow" | "steps"
  /** A step the user picked but has not confirmed yet (e.g. before "Mark as current"). */
  selected?: string
  className?: string
  "aria-label"?: string
}) {
  const currentIndex = Math.max(0, steps.findIndex((s) => s.value === value))
  const interactive = !!onStepClick

  if (variant === "steps") {
    return (
      <ol
        aria-label={ariaLabel}
        data-slot="stepper"
        className={cn("flex w-full snap-x items-start overflow-x-auto pb-1", className)}
      >
        {steps.map((step, i) => {
          const state = i < currentIndex ? "complete" : i === currentIndex ? "current" : "upcoming"
          const Item = interactive ? "button" : "div"
          return (
            <li key={step.value} className="relative flex min-w-28 flex-1 snap-start flex-col items-center text-center">
              {i > 0 && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-4 right-1/2 h-0.5 w-full -translate-y-1/2 transition-colors duration-500",
                    i <= currentIndex ? "bg-brand" : "bg-border"
                  )}
                />
              )}
              <Item
                {...(interactive ? { type: "button" as const, onClick: () => onStepClick?.(step.value) } : {})}
                aria-current={state === "current" ? "step" : undefined}
                className={cn(
                  "relative z-10 flex flex-col items-center gap-2 rounded-lg px-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  interactive && "cursor-pointer"
                )}
              >
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-500 ease-spring-snappy motion-reduce:transition-none",
                    state === "complete" && "border-brand bg-brand text-brand-foreground",
                    state === "current" && "scale-110 border-brand bg-background text-brand shadow-[0_0_0_4px_color-mix(in_oklab,var(--brand)_15%,transparent)]",
                    state === "upcoming" && "border-border bg-background text-muted-foreground",
                    selected === step.value && state !== "current" && "ring-2 ring-brand/40 ring-offset-2 ring-offset-background"
                  )}
                >
                  {state === "complete" ? <CheckIcon className="size-4" strokeWidth={3} /> : i + 1}
                </span>
                <span className={cn("text-sm font-medium", state === "upcoming" ? "text-muted-foreground" : "text-foreground")}>
                  {step.label}
                </span>
                {step.description && <span className="text-xs text-muted-foreground">{step.description}</span>}
              </Item>
            </li>
          )
        })}
      </ol>
    )
  }

  return (
    <ol
      aria-label={ariaLabel}
      data-slot="stepper"
      className={cn("flex w-full snap-x gap-1 overflow-x-auto pb-1 [scrollbar-width:thin]", className)}
    >
      {steps.map((step, i) => {
        const state = i < currentIndex ? "complete" : i === currentIndex ? "current" : "upcoming"
        const first = i === 0
        const last = i === steps.length - 1
        // Chevron shape: notch on the left (except first), point on the right (except last).
        const clip = cn(
          first && last
            ? ""
            : first
              ? "[clip-path:polygon(0_0,calc(100%-14px)_0,100%_50%,calc(100%-14px)_100%,0_100%)]"
              : last
                ? "[clip-path:polygon(0_0,100%_0,100%_100%,0_100%,14px_50%)]"
                : "[clip-path:polygon(0_0,calc(100%-14px)_0,100%_50%,calc(100%-14px)_100%,0_100%,14px_50%)]"
        )
        const Item = interactive ? "button" : "div"
        return (
          <li key={step.value} className="min-w-32 flex-1 snap-start">
            <Item
              {...(interactive ? { type: "button" as const, onClick: () => onStepClick?.(step.value) } : {})}
              aria-current={state === "current" ? "step" : undefined}
              title={typeof step.label === "string" ? step.label : undefined}
              className={cn(
                "group relative flex h-10 w-full items-center justify-center gap-1.5 px-6 text-sm font-semibold whitespace-nowrap outline-none",
                "transition-[background-color,color,filter] duration-500 ease-spring-snappy motion-reduce:transition-none",
                "focus-visible:brightness-95",
                first && "rounded-l-full pl-5",
                last && "rounded-r-full pr-5",
                clip,
                state === "complete" && "bg-brand/15 text-brand hover:bg-brand/25 dark:bg-brand/25",
                state === "current" && "bg-[image:var(--brand-gradient)] text-brand-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]",
                state === "upcoming" && "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                selected === step.value && state !== "current" && "bg-accent text-accent-foreground underline decoration-2 underline-offset-4",
                interactive && "cursor-pointer"
              )}
            >
              {state === "complete" && <CheckIcon className="size-4 shrink-0" strokeWidth={3} />}
              <span className="truncate">{step.label}</span>
            </Item>
          </li>
        )
      })}
    </ol>
  )
}

export { Stepper }
