import { BarChart3, Bot, MessageCircle } from "lucide-react"

import { StickyShowcase } from "@/registry/mintel/motion/sticky-showcase"

const visual = (Icon: typeof Bot, bg: string) => (
  <div className="flex size-full min-h-56 items-center justify-center" style={{ background: bg }}>
    <Icon className="size-16 text-white" />
  </div>
)

export default function StickyShowcaseExample() {
  return (
    <StickyShowcase
      className="w-full"
      items={[
        { title: "Every channel in one place", description: "LINE, Facebook and TikTok become cases.", visual: visual(MessageCircle, "var(--brand)") },
        { title: "AI drafts and summarizes", description: "Agentforce drafts replies for your team.", visual: visual(Bot, "var(--brand-accent)") },
        { title: "Real-time overview", description: "SLA dashboards updated every minute.", visual: visual(BarChart3, "var(--brand-cyan)") },
      ]}
    />
  )
}
