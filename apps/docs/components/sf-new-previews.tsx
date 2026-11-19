"use client"

import { useState } from "react"
import { CalendarPlus, FileText, HelpCircle, MessageCircle, Phone, X } from "lucide-react"

import { cn } from "@/lib/utils"

// Docs-only previews for kpiTrend, announcement, quickActions and filesGallery.

export function KpiTrendPreview() {
  const points = [31, 28, 35, 33, 37]
  const min = Math.min(...points)
  const span = Math.max(...points) - min || 1
  const coords = points.map((v, i) => [(i / (points.length - 1)) * 100, 28 - ((v - min) / span) * 24])
  const line = coords.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ")
  return (
    <article className="grid w-full max-w-xs gap-1 rounded-2xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Open cases</p>
        <span className="rounded-full bg-success/14 px-2 py-0.5 text-xs font-semibold text-success">▲ 12.1%</span>
      </div>
      <p className="font-heading text-3xl font-bold tabular-nums">37</p>
      <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="h-12 w-full overflow-visible" role="img" aria-label="Open cases: 31, 28, 35, 33, 37">
        <path d={`${line} L100,32 L0,32 Z`} className="fill-brand/12" />
        <path d={line} fill="none" className="stroke-brand" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <p className="text-xs text-muted-foreground">Last 5 weeks</p>
    </article>
  )
}

export function AnnouncementPreview() {
  const [open, setOpen] = useState(true)
  return open ? (
    <div role="status" className="flex w-full max-w-lg items-center gap-3 rounded-xl border border-info/30 bg-info/8 px-4 py-3 text-sm motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1">
      <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-info shadow-[0_0_0_4px_color-mix(in_oklab,var(--info)_20%,transparent)]" />
      <p className="min-w-0 flex-1">
        <strong className="mr-1.5 text-info">Heads up</strong>Scheduled maintenance on Saturday 22:00–23:00.
      </p>
      <a href="#" className="shrink-0 font-semibold text-info underline underline-offset-2">
        Details
      </a>
      <button type="button" aria-label="Dismiss" onClick={() => setOpen(false)} className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-info/12">
        <X className="size-4" />
      </button>
    </div>
  ) : (
    <button type="button" onClick={() => setOpen(true)} className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-muted">
      Show again
    </button>
  )
}

export function QuickActionsPreview() {
  const actions = [
    { label: "New task", icon: CalendarPlus },
    { label: "Log a call", icon: Phone },
    { label: "Send LINE", icon: MessageCircle },
    { label: "Help", icon: HelpCircle },
  ]
  return (
    <ul className="grid w-full max-w-md grid-cols-2 gap-2.5 sm:grid-cols-4">
      {actions.map(({ label, icon: Icon }) => (
        <li key={label}>
          <button
            type="button"
            className="flex min-h-22 w-full flex-col items-center justify-center gap-2 rounded-2xl border bg-card p-3 text-xs font-semibold transition-[translate,box-shadow,scale] duration-300 ease-spring-snappy hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand/15 active:scale-95 motion-reduce:transition-none"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-[image:var(--brand-gradient)] text-brand-foreground">
              <Icon className="size-5" />
            </span>
            {label}
          </button>
        </li>
      ))}
    </ul>
  )
}

export function FilesGalleryPreview() {
  const files = [
    { name: "Receipt.png", meta: "PNG · 51 KB", image: true },
    { name: "Contract.pdf", meta: "PDF · 2.3 MB", ext: "PDF" },
    { name: "Quote.xlsx", meta: "XLSX · 88 KB", ext: "XLSX" },
  ]
  return (
    <div className="grid w-full max-w-md gap-3">
      <p className="flex items-center gap-2 font-heading font-semibold">
        Files <span className="rounded-full bg-muted px-2 text-xs text-muted-foreground">3</span>
      </p>
      <ul className="grid grid-cols-3 gap-2.5">
        {files.map((f) => (
          <li key={f.name} className="grid gap-1.5 rounded-xl border bg-card p-2">
            <span
              className={cn(
                "flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-muted",
                f.image && "bg-[radial-gradient(circle_at_30%_30%,var(--brand-cyan),transparent_55%),radial-gradient(circle_at_70%_70%,var(--brand-accent),transparent_55%),var(--brand)]"
              )}
            >
              {!f.image && (
                <span className="flex items-center gap-1 rounded-md bg-[image:var(--brand-gradient)] px-1.5 py-0.5 text-[0.6875rem] font-bold text-brand-foreground">
                  <FileText className="size-3" />
                  {f.ext}
                </span>
              )}
            </span>
            <span className="truncate px-1 text-xs font-semibold">{f.name}</span>
            <span className="px-1 text-[0.6875rem] text-muted-foreground">{f.meta}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** recordForm: sections of fields, two columns on wide screens, a sticky save bar. */
export function RecordFormPreview() {
  const sections = [
    { title: "Contact", fields: [["First name", "Somchai"], ["Last name", "Jaidee"], ["Phone", "081-234-5678"], ["Email", "somchai@acme.co.th"]] },
    { title: "Company", fields: [["Company", "Acme Retail"], ["Industry", "Retail"]] },
  ]
  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-xl overflow-hidden rounded-2xl border bg-card text-left">
      <p className="px-5 pt-4 font-heading text-lg font-semibold">New lead</p>
      {sections.map((s, i) => (
        <fieldset key={s.title} className={cn("px-5 pt-4 pb-1", i > 0 && "mt-2 border-t border-dashed")}>
          <legend className="sr-only">{s.title}</legend>
          <p aria-hidden className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            <span className="size-1.5 rounded-full bg-[image:var(--brand-gradient)]" />
            {s.title}
          </p>
          <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
            {s.fields.map(([label, value]) => (
              <label key={label} className="grid gap-1 text-xs text-muted-foreground">
                {label}
                <input defaultValue={value} className="h-9 rounded-md border bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30" />
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <div className="mt-4 flex justify-end gap-2 border-t bg-card/90 px-5 py-3 backdrop-blur">
        <button type="submit" className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-[translate,box-shadow] duration-300 ease-spring-snappy hover:-translate-y-0.5 hover:shadow-md active:translate-y-0">
          Save
        </button>
      </div>
    </form>
  )
}

/** Brand Loader: the same stat card under Theme = brand and Theme = follow-org (values from an SLDS 2 Cosmos org). */
export function BrandLoaderPreview() {
  const themes = [
    { label: "brand", note: "Mintel", vars: { "--c": "#295DA8", "--bg": "#ffffff", "--b": "#E5E6EA", "--r": "14px", "--f": "var(--font-heading)" } },
    { label: "follow-org", note: "SLDS 2 (Cosmos)", vars: { "--c": "#066afe", "--bg": "#fafafa", "--b": "#c9c9c9", "--r": "12px", "--f": "system-ui, sans-serif" } },
  ]
  return (
    <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
      {themes.map((t) => (
        <figure key={t.label} className="grid gap-2">
          <div
            style={t.vars as React.CSSProperties}
            className="rounded-[var(--r)] border border-[var(--b)] bg-[var(--bg)] p-5 text-[#181B31] [font-family:var(--f)]"
          >
            <p className="text-sm text-[#505469]">Open cases</p>
            <p className="text-4xl font-bold text-[var(--c)] tabular-nums">37</p>
            <p className="text-sm text-[#505469]">3 due today</p>
          </div>
          <figcaption className="text-center text-xs text-muted-foreground">
            Theme = <code className="font-mono font-semibold text-foreground">{t.label}</code> · {t.note}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
