import { MagicCard } from "@/registry/mintel/effects/magic-card"

export default function MagicCardExample() {
  return (
    <MagicCard className="flex h-40 w-full max-w-sm flex-col items-center justify-center rounded-xl p-6 text-center">
      <p className="font-heading font-semibold">Hover here</p>
      <p className="text-sm text-muted-foreground">The spotlight follows your cursor</p>
    </MagicCard>
  )
}
