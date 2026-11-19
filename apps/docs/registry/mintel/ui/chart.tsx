"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Charts use recharts. Each series gets a color from `config` (defaults: --chart-1 … --chart-5,
// the Mintel data palette) exposed as --color-<key>, so marks can use fill="var(--color-revenue)".

export type ChartConfig = Record<string, { label?: React.ReactNode; color?: string; icon?: React.ComponentType }>

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null)

function useChart() {
  const ctx = React.useContext(ChartContext)
  if (!ctx) throw new Error("useChart must be used inside <ChartContainer />")
  return ctx
}

function ChartContainer({
  config,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
}) {
  const style = Object.fromEntries(
    Object.entries(config).map(([key, item], i) => [`--color-${key}`, item.color ?? `var(--chart-${(i % 5) + 1})`])
  ) as React.CSSProperties

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        style={style}
        className={cn(
          "flex aspect-video justify-center text-xs",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/70",
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted/60",
          "[&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-hidden [&_.recharts-surface]:outline-hidden [&_.recharts-layer]:outline-hidden",
          className
        )}
        {...props}
      >
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

type TooltipItem = { dataKey?: string | number; name?: string | number; value?: unknown; color?: string; payload?: Record<string, unknown> }

/** Glassy tooltip that lists every series with its color, label and value. */
function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel = false,
  valueFormatter = (v) => (typeof v === "number" ? v.toLocaleString() : String(v ?? "")),
  className,
}: {
  active?: boolean
  payload?: readonly TooltipItem[]
  label?: React.ReactNode
  hideLabel?: boolean
  valueFormatter?: (value: unknown) => React.ReactNode
  className?: string
}) {
  const { config } = useChart()
  if (!active || !payload?.length) return null
  return (
    <div
      className={cn(
        "grid min-w-36 gap-1.5 rounded-xl border bg-background/85 px-3 py-2 text-xs shadow-xl shadow-brand/10 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)]",
        className
      )}
    >
      {!hideLabel && label !== undefined && <p className="font-semibold">{label}</p>}
      {payload.map((item, i) => {
        const key = String(item.dataKey ?? item.name ?? i)
        const entry = config[key]
        return (
          <div key={key} className="flex items-center gap-2">
            <span className="size-2.5 shrink-0 rounded-[3px]" style={{ background: item.color ?? `var(--color-${key})` }} />
            <span className="text-muted-foreground">{entry?.label ?? item.name}</span>
            <span className="ml-auto font-mono font-medium tabular-nums">{valueFormatter(item.value)}</span>
          </div>
        )
      })}
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({
  payload,
  className,
}: {
  payload?: readonly { dataKey?: unknown; value?: unknown; color?: string }[]
  className?: string
}) {
  const { config } = useChart()
  if (!payload?.length) return null
  // recharts sorts legend items alphabetically; show them in the order of `config` instead.
  const order = Object.keys(config)
  const rank = (item: { dataKey?: unknown; value?: unknown }) => {
    const i = order.indexOf(String(item.dataKey ?? item.value))
    return i === -1 ? order.length : i
  }
  const items = [...payload].sort((a, b) => rank(a) - rank(b))
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-4 pt-3", className)}>
      {items.map((item, i) => {
        const key = String(item.dataKey ?? item.value ?? i)
        const entry = config[key]
        const Icon = entry?.icon
        return (
          <div key={key} className="flex items-center gap-1.5">
            {Icon ? <Icon /> : <span className="size-2.5 rounded-[3px]" style={{ background: item.color }} />}
            <span className="text-muted-foreground">{entry?.label ?? String(item.value ?? key)}</span>
          </div>
        )
      })}
    </div>
  )
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, useChart }
