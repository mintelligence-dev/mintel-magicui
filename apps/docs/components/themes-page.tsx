import { CodeBlock } from "@/components/code-block"
import { DocsShell } from "@/components/docs-shell"
import { ThemeBuilder } from "@/components/theme-builder"
import { ThemeGallery } from "@/components/theme-gallery"
import { getDict, type Lang } from "@/lib/i18n"

const RUNTIME_CSS = `/* app/globals.css (after the Mintel theme) */
@import "@m-intelligence/tokens/themes/all.css";`

const RUNTIME_JS = `// Switch: "clarity", or null for Mintel
function setTheme(id: string | null) {
  if (id) document.documentElement.setAttribute("data-mintel-theme", id)
  else document.documentElement.removeAttribute("data-mintel-theme")
}`

export function ThemesPage({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  const t = d.themes
  const copy = d.nav.copy
  return (
    <DocsShell lang={lang} current="themes">
      <article className="grid min-w-0 gap-14">
        <header className="max-w-3xl space-y-3">
          <h1 className="font-heading text-4xl font-bold tracking-tight">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.body}</p>
        </header>

        <ThemeGallery lang={lang} copyLabel={copy} />

        <section className="grid max-w-3xl gap-3">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">{t.runtimeTitle}</h2>
          <p className="text-muted-foreground">{t.runtimeBody}</p>
          <CodeBlock title="app/globals.css" code={RUNTIME_CSS} copyLabel={copy} />
          <CodeBlock title="theme.ts" code={RUNTIME_JS} copyLabel={copy} />
        </section>

        <section id="builder" className="grid scroll-mt-20 gap-4">
          <div className="max-w-3xl space-y-2">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">{t.builderTitle}</h2>
            <p className="text-muted-foreground">{t.builderBody}</p>
          </div>
          <ThemeBuilder lang={lang} copyLabel={copy} />
        </section>
      </article>
    </DocsShell>
  )
}
