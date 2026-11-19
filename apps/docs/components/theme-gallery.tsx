"use client"

import { useEffect, useState } from "react"
import { Check, Moon, Sun } from "lucide-react"

import { CopyCommand } from "@/components/copy-command"
import { ThemeSample } from "@/components/theme-sample"
import { getDict, type Lang } from "@/lib/i18n"
import { THEMES, applySiteTheme, currentSiteTheme, themeVars } from "@/lib/style-theme"
import { cn } from "@/lib/utils"
import { SegmentedControl } from "@/registry/mintel/glass/segmented-control"

export const installCommand = (id: string) =>
  `npx shadcn@latest add @mintel/${id === "mintel" ? "mintel-theme" : `theme-${id}`}`

/** One card per theme (Mintel + packages/tokens/src/themes/*.json): live sample, install command, try it here. */
export function ThemeGallery({ lang, copyLabel }: { lang: Lang; copyLabel: string }) {
  const t = getDict(lang).themes
  const [mode, setMode] = useState<"light" | "dark">("light")
  const [active, setActive] = useState("mintel")

  useEffect(() => {
    setActive(currentSiteTheme())
    if (document.documentElement.classList.contains("dark")) setMode("dark")
    const observer = new MutationObserver(() => setActive(currentSiteTheme()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-mintel-theme"] })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">{t.galleryTitle}</h2>
        <SegmentedControl
          aria-label={t.mode}
          value={mode}
          onValueChange={(v) => setMode(v as "light" | "dark")}
          options={[
            { value: "light", label: (<span className="inline-flex items-center gap-1.5"><Sun className="size-4" aria-hidden />{t.light}</span>) },
            { value: "dark", label: (<span className="inline-flex items-center gap-1.5"><Moon className="size-4" aria-hidden />{t.dark}</span>) },
          ]}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 [&>*]:min-w-0">
        {THEMES.map((theme) => {
          const inUse = active === theme.id
          return (
            <article
              key={theme.id}
              className={cn("grid gap-4 rounded-2xl border p-4 transition-colors", inUse && "border-brand/60 ring-1 ring-brand/30")}
            >
              <ThemeSample lang={lang} vars={themeVars(theme, mode)} dark={mode === "dark"} className="rounded-xl p-4" />
              <div className="grid gap-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-heading text-lg font-semibold">{theme.title}</h3>
                  <button
                    type="button"
                    onClick={() => applySiteTheme(theme.id)}
                    disabled={inUse}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-brand transition-colors hover:bg-brand/10 disabled:text-muted-foreground disabled:hover:bg-transparent"
                  >
                    {inUse && <Check className="size-4" />}
                    {inUse ? t.usingHere : t.useHere}
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">{theme.description[lang]}</p>
              </div>
              <div className="grid gap-1.5">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{t.install}</p>
                <CopyCommand label={copyLabel} command={installCommand(theme.id)} />
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
