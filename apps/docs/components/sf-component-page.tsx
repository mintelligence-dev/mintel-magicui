import { ArrowUpRight, Check, Smartphone } from "lucide-react"

import { ItemBadge } from "@/components/item-badge"
import { LwcSource } from "@/components/lwc-source"
import { SfShell } from "@/components/sf-shell"
import { SfSidebar } from "@/components/sf-sidebar"
import { getDict, langPath, type Lang } from "@/lib/i18n"
import { SF_COMPONENTS, sfTag } from "@/lib/sf-components"
import { SF_LABELS } from "@/lib/sf-labels"
import { readSfMeta, readSfSource } from "@/lib/sf-meta"
import { Badge } from "@/registry/mintel/ui/badge"

/** One Salesforce LWC: preview, where it runs, App Builder properties and events (read from the bundle), usage and source. */
export function SfComponentPage({ lang, name }: { lang: Lang; name: string }) {
  const c = SF_COMPONENTS.find((x) => x.name === name)!
  const t = SF_LABELS[lang]
  const d = getDict(lang)
  const meta = readSfMeta(name)
  const description = (d.sf.components as Record<string, string>)[name]
  const where = [...new Set(meta.targets.map((x) => t.targets[x] ?? x))]

  return (
    <SfShell lang={lang} current={name}>
      <article className="grid min-w-0 gap-10 [&>*]:min-w-0">
        <header className="space-y-3">
          <p className="text-sm text-muted-foreground">
            <a href={langPath(lang, "/salesforce")} className="hover:text-foreground">
              Salesforce
            </a>{" "}
            / {t.groups[c.group]}
          </p>
          <h1 className="flex flex-wrap items-center gap-3 font-heading text-4xl font-bold tracking-tight">
            <span className="font-mono text-3xl sm:text-4xl">{sfTag(name)}</span>
            <ItemBadge name={`sf:${name}`} lang={lang} className="px-2.5 text-sm leading-6" />
          </h1>
          {meta.label && <p className="font-medium">{meta.label}</p>}
          <p className="max-w-3xl text-lg text-muted-foreground">{description}</p>
          <div className="flex flex-wrap gap-2">
            {meta.exposed ? (
              where.map((w) => (
                <Badge key={w} variant="soft">
                  {w}
                </Badge>
              ))
            ) : (
              <Badge variant="outline">{t.notExposed}</Badge>
            )}
            {meta.formFactors.includes("Small") && (
              <Badge variant="outline">
                <Smartphone /> {t.phones}
              </Badge>
            )}
            {!meta.apex && (
              <Badge variant="outline">
                <Check /> {t.noApex}
              </Badge>
            )}
          </div>
          {/* Phones: the sidebar is hidden, so offer the component list here. */}
          <details className="rounded-xl border lg:hidden">
            <summary className="cursor-pointer px-4 py-3 text-sm font-medium">{t.allComponents}</summary>
            <div className="border-t p-3">
              <SfSidebar lang={lang} current={name} />
            </div>
          </details>
        </header>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold">{t.preview}</h2>
          <div className="flex min-h-56 items-center justify-center overflow-x-auto rounded-xl border bg-muted/30 p-4 sm:p-10 [&>*]:min-w-0 [&>*]:max-w-full">{c.preview}</div>
          <p className="text-xs text-muted-foreground">{t.previewNote}</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold">{t.usage}</h2>
          <pre tabIndex={0} className="overflow-x-auto rounded-xl bg-muted p-4 font-mono text-[13px] leading-relaxed">
            <code>{c.usage}</code>
          </pre>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold">{t.properties}</h2>
          {meta.properties.length ? (
            <div className="overflow-x-auto rounded-xl border" tabIndex={0}>
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-xs tracking-wide text-muted-foreground uppercase">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold">{t.property}</th>
                    <th className="px-4 py-2.5 font-semibold">{t.type}</th>
                    <th className="px-4 py-2.5 font-semibold">{t.default}</th>
                    <th className="px-4 py-2.5 font-semibold">{t.where}</th>
                  </tr>
                </thead>
                <tbody>
                  {meta.properties.map((p) => (
                    <tr key={p.name} className="border-t align-top">
                      <td className="px-4 py-3">
                        <code className="font-mono text-[13px] font-semibold">{p.name}</code>
                        <p className="mt-0.5 text-muted-foreground">{p.label}</p>
                        {p.options && (
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {t.options}: <code className="font-mono">{p.options}</code>
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-[13px]">{p.type}</td>
                      <td className="px-4 py-3 font-mono text-[13px]">{p.default ?? "—"}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{[...new Set(p.targets.map((x) => t.targets[x] ?? x))].join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{t.propertiesEmpty}</p>
          )}
          {meta.apiOnly.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {t.apiOnly}:{" "}
              {meta.apiOnly.map((a, i) => (
                <span key={a}>
                  {i > 0 && ", "}
                  <code className="font-mono text-[13px] text-foreground">{a}</code>
                </span>
              ))}
            </p>
          )}
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold">{t.events}</h2>
          {meta.events.length ? (
            <ul className="flex flex-wrap gap-2">
              {meta.events.map((e) => (
                <li key={e}>
                  <code className="rounded-md bg-muted px-2 py-1 font-mono text-[13px]">on{e}</code>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">{t.eventsEmpty}</p>
          )}
        </section>

        {c.react && (
          <section className="space-y-3">
            <h2 className="font-heading text-xl font-semibold">{t.react}</h2>
            <a
              href={langPath(lang, `/components/${c.react}`)}
              className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              @mintel/{c.react}
              <ArrowUpRight className="size-4" />
            </a>
          </section>
        )}

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold">{t.source}</h2>
          <LwcSource files={readSfSource(c.sources ?? [name])} />
        </section>
      </article>
    </SfShell>
  )
}
