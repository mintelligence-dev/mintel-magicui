import * as React from "react"

import { cn } from "@/lib/utils"
import { NumberTicker } from "@/registry/mintel/effects/number-ticker"

export type Stat = { value: number; suffix?: string; prefix?: string; label: string; decimals?: number }

/** Big numbers that count up when they scroll into view (static under reduced motion). */
export function SectionStats({
  title = "Numbers our customers see",
  stats = [
    { value: 4, suffix: " min", label: "Average first reply" },
    { value: 96, suffix: "%", label: "Customer satisfaction" },
    { value: 1.2, suffix: "M", label: "Chats handled each month", decimals: 1 },
    { value: 40, suffix: "%", label: "Less time per case" },
  ],
  className,
}: {
  title?: React.ReactNode
  stats?: Stat[]
  className?: string
}) {
  return (
    <section data-slot="section-stats" className={cn("reveal-on-scroll mx-auto max-w-6xl px-4 py-16 sm:px-6", className)}>
      <div className="overflow-hidden rounded-3xl border bg-card p-8 shadow-sm sm:p-12">
        {title && <h2 className="mb-10 text-center font-heading text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>}
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="grid gap-1 text-center">
              <dt className="order-2 text-sm text-muted-foreground">{s.label}</dt>
              <dd className="order-1 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                {s.prefix}
                <NumberTicker value={s.value} decimalPlaces={s.decimals ?? 0} className="text-brand" />
                <span className="text-brand">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
