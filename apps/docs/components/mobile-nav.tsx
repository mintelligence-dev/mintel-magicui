"use client"

import { useEffect, useState } from "react"
import { BookOpen, Cloud, LayoutGrid, Palette } from "lucide-react"

import { TabBar } from "@/registry/mintel/mobile/tab-bar"

const SECTIONS = ["top", "tokens", "components", "salesforce"] as const

/** Docs site navigation on phones (the header links are hidden below `sm`). */
export function MobileNav() {
  const [active, setActive] = useState<string>("top")

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <TabBar
      className="sm:hidden"
      aria-label="เมนูเอกสาร"
      value={active}
      onValueChange={setActive}
      items={[
        { value: "top", label: "เริ่มต้น", icon: <BookOpen />, href: "#top" },
        { value: "tokens", label: "Tokens", icon: <Palette />, href: "#tokens" },
        { value: "components", label: "Components", icon: <LayoutGrid />, href: "#components" },
        { value: "salesforce", label: "Salesforce", icon: <Cloud />, href: "#salesforce" },
      ]}
    />
  )
}
