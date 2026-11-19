import { ShineBorder } from "@/registry/mintel/effects/shine-border"

export default function ShineBorderExample() {
  return (
    <div className="relative flex h-32 w-full max-w-sm items-center justify-center overflow-hidden rounded-xl bg-card">
      <ShineBorder borderWidth={2} />
      <span className="text-sm text-muted-foreground">Brand-gradient border</span>
    </div>
  )
}
