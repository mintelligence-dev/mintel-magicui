import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Smartphone } from "lucide-react"

import { ItemBadge } from "@/components/item-badge"
import { LwcSource } from "@/components/lwc-source"
import { SfShell } from "@/components/sf-shell"
import { SfSidebar } from "@/components/sf-sidebar"
import { WhenToUse } from "@/components/when-to-use"
import { getDict, langPath, type Lang } from "@/lib/i18n"
import { SF_COMPONENTS, SF_GROUP_ORDER, sfLabel, sfTag } from "@/lib/sf-components"
import { SF_GUIDES } from "@/lib/sf-guides"
import { SF_GROUP_STYLE, sfIcon } from "@/lib/sf-icons"
import { PREVIEW_CANVAS } from "@/lib/preview-canvas"
import { SF_LABELS } from "@/lib/sf-labels"
import { cn } from "@/lib/utils"
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
  const Icon = sfIcon(name)
  const guide = SF_GUIDES[name]
  const toLine = (line: { en: string; th: string; alt?: string }) => ({
    text: line[lang],
    alt: line.alt ? { href: langPath(lang, `/salesforce/${line.alt}`), label: sfLabel(line.alt) } : undefined,
  })
  // Sidebar order, for previous / next links.
  const ordered = SF_GROUP_ORDER.flatMap((g) => SF_COMPONENTS.filter((x) => x.group === g))
  const at = ordered.findIndex((x) => x.name === name)
  const prev = ordered[at - 1]
  const next = ordered[at + 1]

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
            <span aria-hidden className={`inline-flex size-12 items-center justify-center rounded-2xl ${SF_GROUP_STYLE[c.group].tile}`}>
              <Icon className="size-6" />
            </span>
            {sfLabel(name)}
            <ItemBadge name={`sf:${name}`} lang={lang} className="px-2.5 text-sm leading-6" />
          </h1>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <code className="rounded-md bg-muted px-2 py-1 font-mono text-[13px] font-semibold">&lt;{sfTag(name)}&gt;</code>
            {meta.label && (
              <span className="text-muted-foreground">
                {t.inAppBuilder}: <span className="font-medium text-foreground">{meta.label}</span>
              </span>
            )}
          </p>
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
          <div className={cn("flex min-h-64 items-center justify-center overflow-x-auto rounded-2xl border p-4 sm:p-10 [&>*]:min-w-0 [&>*]:max-w-full", PREVIEW_CANVAS)}>{c.preview}</div>
          <p className="text-xs text-muted-foreground">{t.previewNote}</p>
        </section>

        {guide && (
          <WhenToUse title={d.docs.whenToUse} labels={{ use: d.docs.use, avoid: d.docs.avoid }} use={guide.use.map(toLine)} avoid={guide.avoid.map(toLine)} />
        )}

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

        <nav aria-label={t.pager} className="grid gap-3 border-t pt-8 sm:grid-cols-2">
          {prev ? (
            <a href={langPath(lang, `/salesforce/${prev.name}`)} className="group rounded-2xl border p-4 transition-colors hover:border-brand/45 hover:bg-muted/40">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" /> {t.previous}
              </span>
              <span className="mt-1 block text-sm font-semibold">{sfLabel(prev.name)}</span>
            </a>
          ) : (
            <span />
          )}
          {next && (
            <a href={langPath(lang, `/salesforce/${next.name}`)} className="group rounded-2xl border p-4 text-right transition-colors hover:border-brand/45 hover:bg-muted/40">
              <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                {t.next} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm font-semibold">{sfLabel(next.name)}</span>
            </a>
          )}
        </nav>
      </article>
    </SfShell>
  )
}
