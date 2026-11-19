import { ExternalLink } from "lucide-react"

import { CopyCommand } from "@/components/copy-command"
import { DocsShell } from "@/components/docs-shell"
import { getDict, langPath, type Lang } from "@/lib/i18n"
import { TEMPLATES, TEMPLATE_TH } from "@/lib/templates"
import { Badge } from "@/registry/mintel/ui/badge"

export function TemplatesPage({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  const t = d.docs
  return (
    <DocsShell lang={lang} current="templates">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">{t.templates}</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">{t.templatesBody}</p>
      </header>
      <div className="mt-10 grid gap-8">
        {TEMPLATES.map((tpl) => {
          const preview = langPath(lang, `/templates/${tpl.name}`)
          return (
            <article key={tpl.name} className="overflow-hidden rounded-2xl border bg-card">
              {/* Live, scaled-down preview of the real page */}
              <a href={preview} className="group relative block h-72 overflow-hidden border-b bg-muted/30 sm:h-96" aria-label={`${t.openPreview}: ${tpl.title}`}>
                <iframe
                  src={preview}
                  title={tpl.title}
                  loading="lazy"
                  tabIndex={-1}
                  className="pointer-events-none absolute top-0 left-0 h-[200%] w-[200%] origin-top-left scale-50"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-background/0 transition-colors group-hover:bg-background/40">
                  <span className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-semibold opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    {t.openPreview} <ExternalLink className="size-4" />
                  </span>
                </span>
              </a>
              <div className="grid gap-3 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-heading text-xl font-semibold">{tpl.title}</h2>
                  <Badge variant="soft" className="font-mono">
                    {t.installsTo} app/{tpl.route}/page.tsx
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{lang === "th" ? TEMPLATE_TH[tpl.name] : tpl.description}</p>
                <CopyCommand label={d.nav.copy} command={`npx shadcn@latest add @mintel/${tpl.name}`} />
                <div className="flex flex-wrap gap-1.5">
                  {tpl.registryDependencies.map((dep) => (
                    <a key={dep} href={langPath(lang, `/components/${dep}`)}>
                      <Badge variant="outline" className="font-mono text-[11px] hover:border-brand/40">
                        {dep}
                      </Badge>
                    </a>
                  ))}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </DocsShell>
  )
}
