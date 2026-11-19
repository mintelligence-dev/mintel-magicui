import { BADGES } from "@/lib/component-docs"
import { cn } from "@/lib/utils"

const LABEL = { new: { en: "New", th: "ใหม่" }, updated: { en: "Updated", th: "อัปเดต" } }

/** "New" / "Updated" pill next to a component name (docs navigation only). */
export function ItemBadge({ name, lang, className }: { name: string; lang: "en" | "th"; className?: string }) {
  const kind = BADGES[name]
  if (!kind) return null
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-1.5 text-[0.6875rem] leading-[1.125rem] font-semibold",
        kind === "new" ? "bg-brand/12 text-brand" : "bg-warning/15 text-warning",
        className
      )}
    >
      {LABEL[kind][lang]}
    </span>
  )
}
