"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const SIZES = { sm: 72, default: 112, lg: 160 } as const
const R = 42
const C = 2 * Math.PI * R

/**
 * Percentage ring that sweeps to its value when it appears (and when the value changes). `tone="status"`
 * colors it red below 40, amber below 70 and green above; the default uses the brand gradient.
 */
function ProgressRing({
  value,
  label,
  size = "default",
  tone = "brand",
  className,
}: {
  value: number
  label?: React.ReactNode
  size?: keyof typeof SIZES
  tone?: "brand" | "status"
  className?: string
}) {
  const v = Math.max(0, Math.min(100, Math.round(value)))
  const [shown, setShown] = React.useState(0)
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setShown(v))
    return () => cancelAnimationFrame(id)
  }, [v])
  const gradientId = `ring-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
  const stroke =
    tone === "status" ? (v < 40 ? "var(--destructive)" : v < 70 ? "var(--warning)" : "var(--success)") : `url(#${gradientId})`
  const px = SIZES[size]

  return (
    <div
      data-slot="progress-ring"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={v}
      aria-label={typeof label === "string" ? label : undefined}
      className={cn("relative inline-grid place-items-center", className)}
      style={{ width: px, height: px }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--brand)" />
            <stop offset="100%" stopColor="var(--brand-accent)" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={R} fill="none" strokeWidth="9" className="stroke-muted" />
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          strokeWidth="9"
          strokeLinecap="round"
          stroke={stroke}
          strokeDasharray={C}
          strokeDashoffset={C * (1 - shown / 100)}
          className="transition-[stroke-dashoffset,stroke] duration-1000 ease-spring-smooth motion-reduce:transition-none"
        />
      </svg>
      <div className="relative grid text-center leading-tight">
        <span className={cn("font-heading font-bold tabular-nums", { sm: "text-base", default: "text-2xl", lg: "text-4xl" }[size])}>
          {v}
          <span className="text-[0.6em] font-semibold text-muted-foreground">%</span>
        </span>
        {label && size !== "sm" && <span className="text-xs text-muted-foreground">{label}</span>}
      </div>
    </div>
  )
}

export { ProgressRing }
