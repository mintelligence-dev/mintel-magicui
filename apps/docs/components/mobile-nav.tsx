"use client"

import { useEffect, useState } from "react"
import { BookOpen, Cloud, Home, LayoutGrid } from "lucide-react"

import { getDict, langPath, type Lang } from "@/lib/i18n"
import { TabBar } from "@/registry/mintel/mobile/tab-bar"

const SECTIONS = ["top"] as const

/** Docs navigation on phones (the header links are hidden below `sm`). */
export function MobileNav({ lang, page = "home" }: { lang: Lang; page?: "home" | "docs" | "components" | "salesforce" }) {
  const t = getDict(lang).mobileNav
  const [active, setActive] = useState<string>(page === "home" ? "top" : page)
  const home = langPath(lang)

  useEffect(() => {
    if (page !== "home") return
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [page])

  return (
    <TabBar
      className="sm:hidden [view-transition-name:mobile-nav]"
      aria-label={t.label}
      value={active}
      onValueChange={setActive}
      items={[
        { value: "top", label: t.start, icon: <Home />, href: `${home}#top` },
        { value: "docs", label: t.docs, icon: <BookOpen />, href: langPath(lang, "/getting-started") },
        { value: "components", label: t.components, icon: <LayoutGrid />, href: langPath(lang, "/components") },
        { value: "salesforce", label: t.salesforce, icon: <Cloud />, href: langPath(lang, "/salesforce") },
      ]}
    />
  )
}
