import { DocsSidebar } from "@/components/docs-sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { SiteHeader } from "@/components/site-header"
import { getDict, type Lang } from "@/lib/i18n"

/** Header + sidebar + content layout shared by the docs pages. */
export function DocsShell({ lang, current, children }: { lang: Lang; current: string; children: React.ReactNode }) {
  const d = getDict(lang)
  return (
    <main id="top" className="min-h-screen overflow-x-clip pb-24 sm:pb-0">
      <SiteHeader lang={lang} page={current === "getting-started" || current === "themes" ? "docs" : current === "templates" ? "templates" : "components"} />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-20 max-h-[calc(100svh-6rem)] overflow-y-auto pr-2 pb-10">
            <DocsSidebar lang={lang} current={current} />
          </div>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
      <MobileNav lang={lang} page={current === "getting-started" || current === "themes" ? "docs" : "components"} />
      <footer className="border-t py-10 text-center text-sm text-muted-foreground">© 2026 {d.footer}</footer>
    </main>
  )
}
