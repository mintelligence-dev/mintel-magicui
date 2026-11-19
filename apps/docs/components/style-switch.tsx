"use client"

import { useEffect, useState } from "react"
import { Check, Palette } from "lucide-react"

import { THEMES, applySiteTheme, currentSiteTheme, themeVars } from "@/lib/style-theme"
import { Button } from "@/registry/mintel/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/mintel/ui/dropdown-menu"

/**
 * Header menu that switches the whole docs site between design themes. The trigger swatch is painted with
 * --brand-gradient, so it shows the active theme before hydration too.
 */
export function StyleSwitch({ label, allLabel, allHref }: { label: string; allLabel: string; allHref: string }) {
  const [active, setActive] = useState("mintel")

  useEffect(() => {
    setActive(currentSiteTheme())
    const observer = new MutationObserver(() => setActive(currentSiteTheme()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-mintel-theme"] })
    return () => observer.disconnect()
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex size-9 items-center justify-center rounded-md transition-colors hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none">
        <span
          aria-hidden
          className="size-4.5 rounded-full bg-[image:var(--brand-gradient)] shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.6)] ring-1 ring-border"
        />
        <span className="sr-only">{label}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        {THEMES.map((t) => (
          <DropdownMenuItem key={t.id} onSelect={() => applySiteTheme(t.id)} className="gap-2.5">
            <span
              aria-hidden
              className="size-4 shrink-0 rounded-full bg-[image:var(--brand-gradient)] ring-1 ring-border"
              style={themeVars(t, "light") as React.CSSProperties}
            />
            <span className="flex-1">{t.title}</span>
            {active === t.id && <Check className="size-4 text-brand" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href={allHref} className="gap-2.5">
            <Palette className="size-4 text-muted-foreground" />
            {allLabel}
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
