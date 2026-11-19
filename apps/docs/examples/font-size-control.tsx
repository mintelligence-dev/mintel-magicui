import { FontSizeControl } from "@/registry/mintel/ui/font-size-control"

// Also render <FontScaleScript /> inside <head> in app/layout.tsx so the saved size applies before
// the first paint (import it from "@/components/ui/font-size-control").
export default function FontSizeControlExample() {
  return (
    <div className="grid justify-items-center gap-4">
      <FontSizeControl />
      <FontSizeControl locale="en" />
      <p className="max-w-sm text-center text-sm text-muted-foreground">
        Everything sized in rem grows and shrinks with the page — try it on this site.
      </p>
    </div>
  )
}
