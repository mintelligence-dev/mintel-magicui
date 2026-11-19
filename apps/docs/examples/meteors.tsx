import { Meteors } from "@/registry/mintel/effects/meteors"

export default function MeteorsExample() {
  return (
    <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-xl border bg-card">
      <Meteors number={14} />
      <span className="font-heading text-xl font-semibold">Meteors</span>
    </div>
  )
}
