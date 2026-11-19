import { DotPattern } from "@/registry/mintel/effects/dot-pattern"

export default function DotPatternExample() {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-xl border bg-card">
      <DotPattern glow cr={1.5} className="text-brand/70 [mask-image:radial-gradient(180px_circle_at_center,white,transparent)]" />
    </div>
  )
}
