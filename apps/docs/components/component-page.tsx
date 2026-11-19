import { readFileSync } from "node:fs"
import { join } from "node:path"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"

import { CodeBlock } from "@/components/code-block"
import { CopyCommand } from "@/components/copy-command"
import { DocsShell } from "@/components/docs-shell"
import { PreviewTabs } from "@/components/preview-tabs"
import { EXAMPLES } from "@/examples"
import { CATEGORY_LABEL, COMPONENT_DOCS, ITEMS, isSection, itemsByCategory } from "@/lib/component-docs"
import { getDict, langPath, type Lang } from "@/lib/i18n"
import { REGISTRY_URL } from "@/lib/site"
import { ItemBadge } from "@/components/item-badge"
import { Badge } from "@/registry/mintel/ui/badge"

const ROOT = process.cwd()
// Scroll-driven examples: no clipping (position: sticky). Zoom parallax also runs edge to edge.
const FRAME: Record<string, "unclipped" | "bleed" | "section"> = { "sticky-showcase": "unclipped", "zoom-parallax": "bleed" }
const frameOf = (name: string) => FRAME[name] ?? (isSection(name) ? "section" : undefined)

/** Registry imports become what the app actually gets after `shadcn add`. */
const toAppPaths = (code: string) =>
  code
    .replace(/@\/registry\/mintel\/(?:ui|effects|glass|motion|mobile)\//g, "@/components/ui/")
    .replace(/@\/registry\/mintel\/sections\//g, "@/components/")

const read = (rel: string) => readFileSync(join(ROOT, rel), "utf8")

export function ComponentPage({ lang, name }: { lang: Lang; name: string }) {
  const d = getDict(lang)
  const t = d.docs
  const item = ITEMS.find((i) => i.name === name)!
  const doc = COMPONENT_DOCS[name]
  const Example = EXAMPLES[name]
  const exampleCode = toAppPaths(read(`examples/${name}.tsx`))
  const sources = item.files.map((f) => ({ name: f.split("/").pop()!, code: toAppPaths(read(f)) }))

  // previous / next in sidebar order
  const ordered = itemsByCategory().flatMap((g) => g.items)
  const index = ordered.findIndex((i) => i.name === name)
  const prev = ordered[index - 1]
  const next = ordered[index + 1]

  return (
    <DocsShell lang={lang} current={name}>
      <article className="space-y-10">
        <header className="space-y-3">
          <p className="text-sm text-muted-foreground">
            <a href={langPath(lang, "/components")} className="hover:text-foreground">
              {t.components}
            </a>{" "}
            / {CATEGORY_LABEL[item.category][lang]}
          </p>
          <h1 className="flex flex-wrap items-center gap-3 font-heading text-4xl font-bold tracking-tight">
            {item.title}
            <ItemBadge name={item.name} lang={lang} className="text-sm leading-6 px-2.5" />
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground">{lang === "th" ? doc.th : item.description}</p>
          {item.dependencies.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-muted-foreground">{t.dependencies}:</span>
              {item.dependencies.map((dep) => (
                <Badge key={dep} variant="outline" className="font-mono text-[11px]">
                  {dep}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold">{t.installation}</h2>
          <CopyCommand label={d.nav.copy} command={`npx shadcn@latest add @mintel/${name}`} />
          <p className="text-sm text-muted-foreground">
            {t.setupHint}{" "}
            <a href={langPath(lang, "/getting-started")} className="text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand">
              {t.gettingStarted}
            </a>
            . {t.withUrl}
          </p>
          <CopyCommand label={d.nav.copy} command={`npx shadcn@latest add ${REGISTRY_URL}/${name}.json`} />
        </section>

        <section className="space-y-3">
          <PreviewTabs
            code={exampleCode}
            frame={frameOf(name)}
            labels={{ preview: t.preview, code: t.code, copy: d.nav.copy }}
          >
            <Example />
          </PreviewTabs>
        </section>

        {(doc.props?.length || doc.upstream) && (
          <section className="space-y-3">
            <h2 className="font-heading text-xl font-semibold">{t.props}</h2>
            {doc.props && (
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 text-xs text-muted-foreground uppercase">
                    <tr>
                      <th className="px-4 py-2.5 font-semibold">{t.prop}</th>
                      <th className="px-4 py-2.5 font-semibold">{t.type}</th>
                      <th className="px-4 py-2.5 font-semibold">{t.default}</th>
                      <th className="px-4 py-2.5 font-semibold">{t.description}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doc.props.map((prop) => (
                      <tr key={prop.name} className="border-t align-top">
                        <td className="px-4 py-3 font-mono text-xs font-semibold whitespace-nowrap text-brand">{prop.name}</td>
                        <td className="max-w-64 px-4 py-3 font-mono text-xs text-muted-foreground">{prop.type}</td>
                        <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">{prop.default ?? "—"}</td>
                        <td className="min-w-56 px-4 py-3">{prop.description[lang]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {doc.upstream && (
              <p className="text-sm text-muted-foreground">
                {t.upstream}{" "}
                <a
                  href={doc.upstream.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
                >
                  {doc.upstream.label} <ExternalLink className="size-3" />
                </a>
              </p>
            )}
          </section>
        )}

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold">{t.source}</h2>
          <p className="text-sm text-muted-foreground">{t.sourceHint}</p>
          {sources.map((s) => (
            <CodeBlock key={s.name} title={`components/ui/${s.name}`} code={s.code} copyLabel={d.nav.copy} />
          ))}
        </section>

        <nav className="flex items-center justify-between gap-4 border-t pt-6 text-sm">
          {prev ? (
            <a href={langPath(lang, `/components/${prev.name}`)} className="group flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              <span>
                <span className="block text-xs">{t.previous}</span>
                <span className="font-medium text-foreground">{prev.title}</span>
              </span>
            </a>
          ) : (
            <span />
          )}
          {next && (
            <a href={langPath(lang, `/components/${next.name}`)} className="group flex items-center gap-2 text-right text-muted-foreground hover:text-foreground">
              <span>
                <span className="block text-xs">{t.next}</span>
                <span className="font-medium text-foreground">{next.title}</span>
              </span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          )}
        </nav>
      </article>
    </DocsShell>
  )
}
