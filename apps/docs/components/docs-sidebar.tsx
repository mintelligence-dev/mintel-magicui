import { BookOpen, ChartColumn, LayoutPanelTop, Palette, ChevronRight, Cloud, Component, FormInput, Layers, LayoutGrid, LayoutTemplate, Orbit, PanelsTopLeft, Smartphone, Sparkles } from "lucide-react"

import { ItemBadge } from "@/components/item-badge"
import { CATEGORY_LABEL, ITEMS, itemsByCategory, type Category } from "@/lib/component-docs"
import { getDict, langPath, type Lang } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const CATEGORY_ICON: Record<Category, { icon: typeof Component; tone: string }> = {
  core: { icon: Component, tone: "text-brand bg-brand/10" },
  forms: { icon: FormInput, tone: "text-brand-cyan bg-brand-cyan/10" },
  data: { icon: ChartColumn, tone: "text-brand bg-brand/10" },
  navigation: { icon: PanelsTopLeft, tone: "text-brand-cyan bg-brand-cyan/10" },
  sections: { icon: LayoutPanelTop, tone: "text-brand-accent bg-brand-accent/10" },
  glass: { icon: Layers, tone: "text-brand-accent bg-brand-accent/10" },
  motion: { icon: Orbit, tone: "text-brand-accent bg-brand-accent/10" },
  mobile: { icon: Smartphone, tone: "text-brand-cyan bg-brand-cyan/10" },
  effects: { icon: Sparkles, tone: "text-brand bg-brand/10" },
}

/**
 * Docs navigation: guide links with icons on top, then collapsible component groups (icon, name,
 * count). The group of the current page is open; items sit on a tree line with a brand marker.
 */
export function DocsSidebar({ lang, current }: { lang: Lang; current: string }) {
  const t = getDict(lang).docs
  const currentCategory = ITEMS.find((i) => i.name === current)?.category

  const guides = [
    { key: "getting-started", path: "/getting-started", label: t.gettingStarted, icon: BookOpen },
    { key: "themes", path: "/themes", label: t.themes, icon: Palette },
    { key: "components", path: "/components", label: t.allComponents, icon: LayoutGrid },
    { key: "templates", path: "/templates", label: t.templates, icon: LayoutTemplate },
    { key: "salesforce", path: "/salesforce", label: "Salesforce", icon: Cloud },
  ]

  return (
    <nav aria-label={t.components} className="space-y-6 text-sm">
      <ul className="space-y-0.5">
        {guides.map(({ key, path, label, icon: Icon }) => {
          const active = current === key
          return (
            <li key={key}>
              <a
                href={langPath(lang, path)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-medium transition-colors",
                  active ? "bg-accent text-accent-foreground" : "text-foreground/80 hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("size-4", active ? "text-brand" : "text-muted-foreground")} />
                {label}
              </a>
            </li>
          )
        })}
      </ul>

      <div className="space-y-1 border-t pt-5">
        <p className="px-2.5 pb-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
          {t.components}
        </p>
        {itemsByCategory().map(({ category, items }) => {
          const { icon: Icon, tone } = CATEGORY_ICON[category]
          const open = currentCategory ? currentCategory === category : category === "core"
          return (
            <details key={category} open={open} className="group/cat">
              <summary className="flex cursor-pointer list-none items-center gap-2.5 rounded-lg px-2.5 py-2 font-semibold select-none hover:bg-muted [&::-webkit-details-marker]:hidden">
                <span className={cn("inline-flex size-6 items-center justify-center rounded-md", tone)}>
                  <Icon className="size-3.5" />
                </span>
                <span className="flex-1">{CATEGORY_LABEL[category][lang]}</span>
                <span className="rounded-full bg-muted px-1.5 text-[11px] font-medium text-muted-foreground tabular-nums">
                  {items.length}
                </span>
                <ChevronRight className="size-3.5 text-muted-foreground transition-transform group-open/cat:rotate-90 motion-reduce:transition-none" />
              </summary>
              <ul className="mt-1 mb-2 ml-[1.375rem] space-y-0.5 border-l pl-3">
                {items.map((item) => {
                  const active = current === item.name
                  return (
                    <li key={item.name} className="relative">
                      {active && <span aria-hidden className="absolute top-1 bottom-1 -left-[0.8125rem] w-0.5 rounded-full bg-brand" />}
                      <a
                        href={langPath(lang, `/components/${item.name}`)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors",
                          active ? "font-medium text-brand" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span className="truncate">{item.title}</span>
                        <ItemBadge name={item.name} lang={lang} />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </details>
          )
        })}
      </div>
    </nav>
  )
}
