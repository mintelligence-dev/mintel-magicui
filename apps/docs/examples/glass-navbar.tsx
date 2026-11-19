import { Bell, Search, Sparkles } from "lucide-react"

import { GlassButton } from "@/registry/mintel/glass/glass-button"
import { GlassNavbar } from "@/registry/mintel/glass/glass-navbar"

const feed = ["New case from LINE OA", "Nina replied to Acme Retail", "SLA met for 12 cases", "Weekly report is ready", "3 new TikTok messages", "Siam Foods closed a case", "Agentforce drafted 8 replies", "Daily backup finished"]

export default function GlassNavbarExample() {
  // A scroll area stands in for the page: scroll down and the bar slides away, scroll up and it returns.
  return (
    <div
      className="h-96 w-full overflow-y-auto rounded-2xl px-3"
      style={{
        background:
          "radial-gradient(120% 120% at 15% 10%, var(--brand-cyan), transparent 55%), radial-gradient(120% 120% at 90% 90%, var(--brand-accent), transparent 55%), var(--brand)",
      }}
    >
      <GlassNavbar floating hideOnScroll className="flex h-14 items-center justify-between px-4">
        <span className="flex items-center gap-2 font-heading font-semibold">
          <Sparkles className="size-4 text-brand" /> Mintel
        </span>
        <div className="flex gap-1">
          <GlassButton size="icon" aria-label="Search" className="size-9">
            <Search />
          </GlassButton>
          <GlassButton size="icon" aria-label="Notifications" className="size-9">
            <Bell />
          </GlassButton>
        </div>
      </GlassNavbar>
      <ul className="grid gap-2 py-4">
        {[...feed, ...feed].map((item, i) => (
          <li key={i} className="rounded-xl bg-white/80 px-4 py-3 text-sm text-neutral-900 shadow-sm">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
