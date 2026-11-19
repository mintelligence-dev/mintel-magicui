import * as React from "react"
import { BotIcon, ClockIcon, MessageCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { StickyShowcase, type ShowcaseItem } from "@/registry/mintel/motion/sticky-showcase"

const tile = (Icon: typeof BotIcon, from: string) => (
  <div className="flex size-full min-h-56 items-center justify-center" style={{ background: `linear-gradient(135deg, ${from}, var(--brand-accent))` }}>
    <Icon className="size-16 text-white/90" aria-hidden />
  </div>
)

/** Story told while scrolling: copy on one side, a sticky visual that changes with it (stacked on phones). */
export function SectionFeatureScroll({
  title = "How it works",
  items = [
    { title: "Chats arrive in one place", description: "Every channel becomes a case with the full conversation attached.", visual: tile(MessageCircleIcon, "var(--brand)") },
    { title: "AI drafts the reply", description: "Agents review, tweak and send, in Thai or English.", visual: tile(BotIcon, "var(--brand-cyan)") },
    { title: "SLA stays on track", description: "Timers and alerts keep every case moving.", visual: tile(ClockIcon, "var(--brand)") },
  ],
  className,
}: {
  title?: React.ReactNode
  items?: ShowcaseItem[]
  className?: string
}) {
  return (
    <section data-slot="section-feature-scroll" className={cn("mx-auto max-w-6xl px-4 py-20 sm:px-6", className)}>
      <h2 className="mb-6 font-heading text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <StickyShowcase items={items} />
    </section>
  )
}
