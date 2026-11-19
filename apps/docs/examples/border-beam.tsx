import { BorderBeam } from "@/registry/mintel/effects/border-beam"

export default function BorderBeamExample() {
  return (
    <div className="relative flex h-32 w-full max-w-sm items-center justify-center rounded-xl border bg-card">
      <span className="text-sm text-muted-foreground">A beam runs around the border</span>
      <BorderBeam size={90} duration={6} />
    </div>
  )
}
