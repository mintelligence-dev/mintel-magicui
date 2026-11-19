import * as React from "react"
import { BotIcon, ClockIcon, GlobeIcon, MessageCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type BentoItem = { title: string; description: string; icon: React.ReactNode; visual?: React.ReactNode; className?: string }

const CHANNELS = [
  ["LINE", "#06C755"],
  ["Messenger", "#0866FF"],
  ["TikTok", "#111111"],
  ["WhatsApp", "#25D366"],
] as const

const DEFAULTS: BentoItem[] = [
  {
    title: "Every channel",
    description: "Four messaging apps, one queue.",
    icon: <MessageCircleIcon />,
    className: "md:col-span-2",
    visual: (
      <div className="flex flex-wrap gap-2">
        {CHANNELS.map(([n, c]) => (
          <span key={n} className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-sm font-medium">
            <span className="size-2 rounded-full ring-1 ring-foreground/20" style={{ background: c }} />
            {n}
          </span>
        ))}
      </div>
    ),
  },
  { title: "AI copilot", description: "Drafts, summaries and tags.", icon: <BotIcon />, visual: <p className="rounded-xl bg-brand/8 p-3 text-sm text-brand">“Customer wants a refund for order #A-10293.”</p> },
  { title: "SLA timers", description: "Know what's at risk.", icon: <ClockIcon />, visual: <p className="font-mono text-3xl font-semibold text-warning tabular-nums">00:12:40</p> },
  { title: "Thai first", description: "Addresses, IDs, phone numbers and Buddhist-era dates built in.", icon: <GlobeIcon />, className: "md:col-span-2", visual: <p className="text-sm text-muted-foreground">99/1 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110</p> },
]

/** Bento grid of feature cards in mixed sizes, each with an icon, copy and a small visual. */
export function SectionFeatureBento({
  title = "Built for how your team works",
  items = DEFAULTS,
  className,
}: {
  title?: React.ReactNode
  items?: BentoItem[]
  className?: string
}) {
  return (
    <section data-slot="section-feature-bento" className={cn("mx-auto max-w-6xl px-4 py-20 sm:px-6", className)}>
      <h2 className="mb-10 text-center font-heading text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <ul className="grid gap-4 md:grid-cols-3">
        {items.map((it) => (
          <li
            key={it.title}
            className={cn(
              "group relative flex flex-col justify-between gap-6 overflow-hidden rounded-3xl border bg-card p-6 transition-[border-color,box-shadow] duration-300 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/10",
              it.className
            )}
          >
            <span aria-hidden className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-[image:var(--brand-gradient)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
            <div className="relative">
              <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand [&_svg]:size-5">{it.icon}</span>
              <h3 className="font-heading text-lg font-semibold">{it.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.description}</p>
            </div>
            {it.visual && <div className="relative">{it.visual}</div>}
          </li>
        ))}
      </ul>
    </section>
  )
}
