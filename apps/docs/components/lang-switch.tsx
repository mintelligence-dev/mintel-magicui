"use client"

import { usePathname } from "next/navigation"

import { RoundFlag } from "@/components/flags"
import { langPath, stripLang, type Lang } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const OPTIONS: { lang: Lang; label: string }[] = [
  { lang: "th", label: "ไทย" },
  { lang: "en", label: "English" },
]

/** Two round flags side by side; the current language is highlighted. Keeps the page and #hash. */
export function LangSwitch({ lang, groupLabel }: { lang: Lang; groupLabel: string }) {
  const pathname = usePathname() || "/"
  const page = stripLang(pathname)

  return (
    <div role="group" aria-label={groupLabel} className="flex items-center gap-1 rounded-full bg-muted p-1">
      {OPTIONS.map(({ lang: target, label }) => {
        const active = target === lang
        const href = langPath(target, page)
        return (
          <a
            key={target}
            href={href}
            hrefLang={target}
            lang={target}
            title={label}
            aria-label={label}
            aria-current={active ? "true" : undefined}
            onClick={(e) => {
              e.preventDefault()
              if (!active) window.location.assign(href + window.location.hash)
            }}
            className={cn(
              "relative inline-flex size-7 rounded-full outline-none transition-[opacity,transform,box-shadow] duration-300 ease-spring-snappy",
              "focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-90 motion-reduce:transition-none",
              // 44px touch target on phones without changing the visual size
              "after:absolute after:-inset-2 pointer-fine:after:hidden",
              active
                ? "ring-2 ring-brand ring-offset-2 ring-offset-muted"
                : "opacity-45 grayscale-[35%] hover:opacity-100 hover:grayscale-0"
            )}
          >
            <RoundFlag lang={target} className="size-full" />
          </a>
        )
      })}
    </div>
  )
}
