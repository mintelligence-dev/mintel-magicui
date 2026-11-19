import { ArrowUpRight } from "lucide-react"

import { DocsShell } from "@/components/docs-shell"
import { CATEGORY_LABEL, COMPONENT_DOCS, countItems, itemsByCategory } from "@/lib/component-docs"
import { getDict, langPath, type Lang } from "@/lib/i18n"

export function ComponentsIndexPage({ lang }: { lang: Lang }) {
  const t = getDict(lang).docs
  return (
    <DocsShell lang={lang} current="components">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">{t.componentsIndexTitle}</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">{t.componentsIndexBody(countItems())}</p>
      </header>
      <div className="mt-10 space-y-12">
        {itemsByCategory().map(({ category, items }) => (
          <section key={category}>
            <h2 className="mb-4 font-heading text-xl font-semibold">
              {CATEGORY_LABEL[category][lang]} <span className="text-sm font-normal text-muted-foreground">({items.length})</span>
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <a
                  key={item.name}
                  href={langPath(lang, `/components/${item.name}`)}
                  className="group relative rounded-xl border bg-card p-4 transition-[border-color,box-shadow,transform] duration-300 ease-spring-snappy hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md active:scale-[0.99] motion-reduce:transition-none"
                >
                  <p className="font-heading font-semibold">{item.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {lang === "th" ? COMPONENT_DOCS[item.name].th : item.description}
                  </p>
                  <ArrowUpRight className="absolute top-4 right-4 size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </DocsShell>
  )
}
