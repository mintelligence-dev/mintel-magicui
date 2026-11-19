import { CommandMenu } from "@/components/command-menu"
import { GithubIcon } from "@/components/github-icon"
import { LangSwitch } from "@/components/lang-switch"
import { ThemeToggle } from "@/components/theme-toggle"
import { getDict, langPath, type Lang } from "@/lib/i18n"
import { REPO_URL } from "@/lib/site"
import { Button } from "@/registry/mintel/ui/button"

export type SitePage = "home" | "docs" | "components" | "templates" | "salesforce"

export function SiteHeader({ lang, page = "home" }: { lang: Lang; page?: SitePage }) {
  const d = getDict(lang)
  const t = d.nav
  const links: { key: SitePage; href: string; label: string }[] = [
    { key: "docs", href: langPath(lang, "/getting-started"), label: d.docs.gettingStarted },
    { key: "components", href: langPath(lang, "/components"), label: t.components },
    { key: "templates", href: langPath(lang, "/templates"), label: d.docs.templates },
    { key: "salesforce", href: langPath(lang, "/salesforce"), label: t.salesforce },
  ]
  return (
    <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur-lg [view-transition-name:site-header]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href={langPath(lang)} className="flex shrink-0 items-center gap-2 font-heading font-semibold">
          <span className="inline-flex size-7 items-center justify-center rounded-lg bg-[image:var(--brand-gradient)] text-sm font-bold text-white">
            M
          </span>
          <span className="hidden min-[400px]:inline">Mintel UI</span>
        </a>
        <nav className="flex items-center gap-1 text-sm">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              aria-current={page === l.key ? "page" : undefined}
              className={
                page === l.key
                  ? "hidden rounded-md bg-accent px-3 py-1.5 font-medium text-accent-foreground md:block"
                  : "hidden rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground md:block"
              }
            >
              {l.label}
            </a>
          ))}
          <CommandMenu lang={lang} />
          <LangSwitch lang={lang} groupLabel={t.language} />
          <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
            <a href={REPO_URL} aria-label="GitHub">
              <GithubIcon />
            </a>
          </Button>
          <ThemeToggle label={t.themeToggle} />
        </nav>
      </div>
    </header>
  )
}
