import { SectionHeader } from "@/registry/mintel/sections/section-header"

export default function SectionHeaderExample() {
  // A scroll area stands in for the page: scroll it to see the header turn frosted.
  return (
    <div className="h-80 overflow-y-auto">
      <SectionHeader />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:px-6">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-24 rounded-2xl bg-muted/70" />
        ))}
      </div>
    </div>
  )
}
