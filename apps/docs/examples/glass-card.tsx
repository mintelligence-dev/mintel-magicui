import { GlassCard } from "@/registry/mintel/glass/glass-card"

// Glass needs something colorful behind it.
export default function GlassCardExample() {
  return (
    <div
      className="flex w-full items-center justify-center rounded-2xl p-8"
      style={{
        background:
          "radial-gradient(120% 120% at 15% 10%, var(--brand-cyan), transparent 55%), radial-gradient(120% 120% at 90% 90%, var(--brand-accent), transparent 55%), var(--brand)",
      }}
    >
      <GlassCard refraction className="w-full max-w-xs p-6">
        <p className="text-sm text-muted-foreground">Incoming messages</p>
        <p className="mt-1 font-heading text-4xl font-bold">8,902</p>
      </GlassCard>
    </div>
  )
}
