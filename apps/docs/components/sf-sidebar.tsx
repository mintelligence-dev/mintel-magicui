import { Cloud, LayoutGrid, Rocket } from "lucide-react"

import { ItemBadge } from "@/components/item-badge"
import { langPath, type Lang } from "@/lib/i18n"
import { SF_COMPONENTS, SF_GROUP_ORDER } from "@/lib/sf-components"
import { SF_GROUP_STYLE, sfIcon } from "@/lib/sf-icons"
import { SF_LABELS } from "@/lib/sf-labels"
import { cn } from "@/lib/utils"

/** Salesforce docs navigation: overview, then components grouped by where they are used. */
export function SfSidebar({ lang, current }: { lang: Lang; current: string }) {
  const t = SF_LABELS[lang]
  const link = (active: boolean) =>
    cn(
      "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors",
      active ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
    )
  return (
    <nav aria-label="Salesforce" className="space-y-5 text-sm">
      <a href={langPath(lang, "/salesforce")} aria-current={current === "overview" ? "page" : undefined} className={link(current === "overview")}>
        <Cloud className="size-4" />
        {t.overview}
      </a>
      <a href={langPath(lang, "/salesforce/get-started")} aria-current={current === "get-started" ? "page" : undefined} className={link(current === "get-started")}>
        <Rocket className="size-4" />
        {t.getStarted}
      </a>
      <a href={langPath(lang, "/components")} className={link(false)}>
        <LayoutGrid className="size-4" />
        React components
      </a>
      {SF_GROUP_ORDER.map((g) => {
        const items = SF_COMPONENTS.filter((c) => c.group === g)
        if (!items.length) return null
        const GroupIcon = SF_GROUP_STYLE[g].icon
        return (
          <div key={g} className="space-y-1 border-t pt-4">
            <p className="flex items-center gap-1.5 px-2.5 pb-1 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              <GroupIcon className="size-3.5" />
              {t.groups[g]}
            </p>
            <ul className="space-y-0.5">
              {items.map((c) => {
                const Icon = sfIcon(c.name)
                return (
                <li key={c.name}>
                  <a
                    href={langPath(lang, `/salesforce/${c.name}`)}
                    aria-current={current === c.name ? "page" : undefined}
                    className={cn(link(current === c.name), "font-mono text-[13px]")}
                  >
                    <Icon className="size-3.5 shrink-0 opacity-70" />
                    <span className="truncate">{c.name}</span>
                    <ItemBadge name={`sf:${c.name}`} lang={lang} />
                  </a>
                </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </nav>
  )
}
