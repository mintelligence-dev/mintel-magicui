import { GithubIcon } from "@/components/github-icon"
import { LangSwitch } from "@/components/lang-switch"
import { ThemeToggle } from "@/components/theme-toggle"
import { getDict, langPath, type Lang } from "@/lib/i18n"
import { REPO_URL } from "@/lib/site"
import { Button } from "@/registry/mintel/ui/button"

export function SiteHeader({ lang, page = "home" }: { lang: Lang; page?: "home" | "salesforce" }) {
  const t = getDict(lang).nav
  const home = langPath(lang)
  const link = "hidden rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground sm:block"
  const current = "hidden rounded-md bg-accent px-3 py-1.5 font-medium text-accent-foreground sm:block"
  return (
    <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur-lg [view-transition-name:site-header]">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href={home} className="flex items-center gap-2 font-heading font-semibold">
          <span className="inline-flex size-7 items-center justify-center rounded-lg bg-[image:var(--brand-gradient)] text-sm font-bold text-white">
            M
          </span>
          Mintel UI
        </a>
        <nav className="flex items-center gap-1 text-sm">
          <a href={`${home}#tokens`} className={link}>
            {t.tokens}
          </a>
          <a href={`${home}#components`} className={link}>
            {t.components}
          </a>
          <a
            href={langPath(lang, "/salesforce")}
            aria-current={page === "salesforce" ? "page" : undefined}
            className={page === "salesforce" ? current : link}
          >
            {t.salesforce}
          </a>
          <LangSwitch lang={lang} groupLabel={t.language} />
          <Button variant="ghost" size="icon" asChild>
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
