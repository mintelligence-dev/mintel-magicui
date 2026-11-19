"use client"

import { usePathname } from "next/navigation"

import { langPath, stripLang, type Lang } from "@/lib/i18n"

/** Switches language while keeping the current page and section (#hash). */
export function LangSwitch({ lang, label, title }: { lang: Lang; label: string; title: string }) {
  const pathname = usePathname() || "/"
  const target: Lang = lang === "en" ? "th" : "en"
  const href = langPath(target, stripLang(pathname))

  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      title={title}
      aria-label={title}
      onClick={(e) => {
        e.preventDefault()
        window.location.assign(href + window.location.hash)
      }}
      className="inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {label}
    </a>
  )
}
