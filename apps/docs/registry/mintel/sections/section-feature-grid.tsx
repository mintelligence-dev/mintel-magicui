import * as React from "react"
import { BotIcon, ClockIcon, GlobeIcon, LayersIcon, MessageCircleIcon, ShieldCheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type Feature = { icon: React.ReactNode; title: string; description: string }

const DEFAULTS: Feature[] = [
  { icon: <MessageCircleIcon />, title: "Every channel, one inbox", description: "LINE, Facebook, TikTok, WhatsApp and web chat in a single queue." },
  { icon: <BotIcon />, title: "AI that drafts replies", description: "Suggested answers and summaries grounded in your knowledge base." },
  { icon: <ClockIcon />, title: "SLA you can see", description: "Live timers and alerts before a case goes overdue." },
  { icon: <LayersIcon />, title: "Native to Salesforce", description: "Cases, contacts and history stay in your org." },
  { icon: <GlobeIcon />, title: "Thai and English", description: "Built for Thai customers, addresses and phone numbers." },
  { icon: <ShieldCheckIcon />, title: "Secure by default", description: "Role-based access, audit trails and PDPA-ready data handling." },
]

/** Feature grid: an icon tile, title and one-line description per feature. */
export function SectionFeatureGrid({
  eyebrow = "Features",
  title = "Everything your support team needs",
  description = "Built with contact centers in Thailand, from first chat to closed case.",
  features = DEFAULTS,
  className,
}: {
  eyebrow?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  features?: Feature[]
  className?: string
}) {
  return (
    <section data-slot="section-feature-grid" className={cn("mx-auto max-w-6xl px-4 py-20 sm:px-6", className)}>
      <div className="mx-auto mb-12 max-w-2xl text-center">
        {eyebrow && <p className="text-sm font-semibold tracking-wide text-brand uppercase">{eyebrow}</p>}
        <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-3 text-muted-foreground">{description}</p>
      </div>
      <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <li key={f.title} className="reveal-on-scroll group flex gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-[background-color,color,scale] duration-300 ease-spring-snappy group-hover:scale-105 group-hover:bg-[image:var(--brand-gradient)] group-hover:text-brand-foreground motion-reduce:transition-none [&_svg]:size-5">
              {f.icon}
            </span>
            <div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
