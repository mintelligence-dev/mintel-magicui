import * as React from "react"

import { cn } from "@/lib/utils"

export type FooterColumn = { title: string; links: { label: string; href: string }[] }

const DEFAULTS: FooterColumn[] = [
  { title: "Product", links: [{ label: "Inbox", href: "#" }, { label: "AI copilot", href: "#" }, { label: "Reports", href: "#" }, { label: "Pricing", href: "#" }] },
  { title: "Company", links: [{ label: "About", href: "#" }, { label: "Customers", href: "#" }, { label: "Careers", href: "#" }, { label: "Contact", href: "#" }] },
  { title: "Resources", links: [{ label: "Docs", href: "#" }, { label: "Status", href: "#" }, { label: "Privacy", href: "#" }, { label: "Terms", href: "#" }] },
]

/**
 * Site footer: brand and tagline, link columns and a bottom bar. Pass `copyright` (e.g. with the year from
 * your server) so the markup never depends on the build date.
 */
export function SectionFooter({
  brand = "Mintel",
  tagline = "Customer conversations, made simple.",
  columns = DEFAULTS,
  copyright = "© M-Intelligence Co., Ltd.",
  className,
}: {
  brand?: React.ReactNode
  tagline?: React.ReactNode
  columns?: FooterColumn[]
  copyright?: React.ReactNode
  className?: string
}) {
  return (
    <footer data-slot="section-footer" className={cn("reveal-on-scroll border-t bg-muted/30", className)}>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="grid content-start gap-3">
          <a href="#" className="flex items-center gap-2 font-heading text-lg font-bold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-[image:var(--brand-gradient)] text-sm text-brand-foreground">M</span>
            {brand}
          </a>
          <p className="max-w-xs text-sm text-muted-foreground">{tagline}</p>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="text-sm font-semibold">{c.title}</h2>
            <ul className="mt-3 grid gap-2 text-sm">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground sm:px-6">{copyright}</p>
      </div>
    </footer>
  )
}
