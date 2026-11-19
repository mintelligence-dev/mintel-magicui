import { GlassButton } from "@/registry/mintel/glass/glass-button"

export default function GlassButtonExample() {
  return (
    <div
      className="flex w-full flex-wrap items-center justify-center gap-3 rounded-2xl p-8"
      style={{
        background:
          "radial-gradient(120% 120% at 15% 10%, var(--brand-cyan), transparent 55%), radial-gradient(120% 120% at 90% 90%, var(--brand-accent), transparent 55%), var(--brand)",
      }}
    >
      <GlassButton>Default</GlassButton>
      <GlassButton variant="tinted">Tinted</GlassButton>
      <GlassButton variant="accent">Accent</GlassButton>
    </div>
  )
}
