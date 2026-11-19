import { CATEGORY_LABEL, itemsByCategory } from "@/lib/component-docs"
import { getDict, langPath, type Lang } from "@/lib/i18n"
import { cn } from "@/lib/utils"

/** Left navigation for the docs pages (desktop). */
export function DocsSidebar({ lang, current }: { lang: Lang; current: string }) {
  const t = getDict(lang).docs
  const link = (path: string, label: string, key: string) => (
    <a
      key={key}
      href={langPath(lang, path)}
      aria-current={current === key ? "page" : undefined}
      className={cn(
        "block rounded-md px-3 py-1.5 text-sm transition-colors",
        current === key ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
    </a>
  )
  return (
    <nav aria-label={t.components} className="space-y-6 text-sm">
      <div className="space-y-0.5">
        {link("/getting-started", t.gettingStarted, "getting-started")}
        {link("/components", t.allComponents, "components")}
        {link("/salesforce", "Salesforce", "salesforce")}
      </div>
      {itemsByCategory().map(({ category, items }) => (
        <div key={category}>
          <p className="mb-1.5 px-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {CATEGORY_LABEL[category][lang]}
          </p>
          <div className="space-y-0.5">{items.map((i) => link(`/components/${i.name}`, i.title, i.name))}</div>
        </div>
      ))}
    </nav>
  )
}
