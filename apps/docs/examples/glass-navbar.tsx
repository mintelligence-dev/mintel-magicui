import { Bell, Search, Sparkles } from "lucide-react"

import { GlassButton } from "@/registry/mintel/glass/glass-button"
import { GlassNavbar } from "@/registry/mintel/glass/glass-navbar"

export default function GlassNavbarExample() {
  return (
    <div
      className="w-full rounded-2xl px-3 pt-1 pb-16"
      style={{
        background:
          "radial-gradient(120% 120% at 15% 10%, var(--brand-cyan), transparent 55%), radial-gradient(120% 120% at 90% 90%, var(--brand-accent), transparent 55%), var(--brand)",
      }}
    >
      {/* `static` only for this preview; in an app it is sticky at the top */}
      <GlassNavbar floating className="static flex h-14 items-center justify-between px-4">
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
    </div>
  )
}
