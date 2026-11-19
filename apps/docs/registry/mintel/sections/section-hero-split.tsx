import * as React from "react"
import { ArrowRightIcon, CheckCheckIcon, SparklesIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Two-column hero: headline, supporting copy, two calls to action and trust points on one side, a product
 * mockup (pass your own `visual`) on the other. Stacks on phones.
 */
export function SectionHeroSplit({
  eyebrow = "New: AI case summaries",
  title = (
    <>
      Every customer chat, <span className="bg-[image:var(--brand-gradient)] bg-clip-text text-transparent">one inbox</span>
    </>
  ),
  description = "LINE, Facebook, TikTok and WhatsApp land in Salesforce as cases, with AI that drafts replies and keeps your SLA on track.",
  primary = { label: "Start free trial", href: "#start" },
  secondary = { label: "Book a demo", href: "#demo" },
  points = ["Set up in a day", "Thai and English", "Works with Salesforce"],
  visual,
  className,
}: {
  eyebrow?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
  points?: string[]
  /** Right-hand visual; defaults to a chat mockup. */
  visual?: React.ReactNode
  className?: string
}) {
  return (
    <section data-slot="section-hero-split" className={cn("relative overflow-hidden", className)}>
      <div aria-hidden className="pointer-events-none absolute -top-40 right-0 h-[30rem] w-[30rem] rounded-full bg-brand-accent/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
        <div className="grid justify-items-start gap-6">
          {eyebrow && (
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-semibold text-brand shadow-xs">
              <SparklesIcon className="size-3.5" />
              {eyebrow}
            </span>
          )}
          <h1 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="max-w-xl text-lg text-muted-foreground text-pretty">{description}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={primary.href}
              className="inline-flex items-center gap-2 rounded-full bg-[image:var(--brand-gradient)] px-6 py-3 font-semibold text-brand-foreground shadow-lg shadow-brand/25 transition-transform duration-300 ease-spring-snappy hover:-translate-y-0.5 active:scale-95 motion-reduce:transition-none"
            >
              {primary.label}
              <ArrowRightIcon className="size-4" />
            </a>
            <a href={secondary.href} className="inline-flex items-center rounded-full border bg-background px-6 py-3 font-semibold transition-colors hover:bg-muted">
              {secondary.label}
            </a>
          </div>
          {points.length > 0 && (
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <CheckCheckIcon className="size-4 text-success" />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative">{visual ?? <ChatMockup />}</div>
      </div>
    </section>
  )
}

function ChatMockup() {
  const rows = [
    { who: "in", text: "Where is my order #A-10293?" },
    { who: "out", text: "It ships today 📦 Tracking: TH123456" },
    { who: "in", text: "Great, thank you!" },
  ]
  return (
    <div aria-hidden className="relative mx-auto max-w-md">
      <div className="absolute -inset-4 rounded-[2rem] bg-[image:var(--brand-gradient)] opacity-20 blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl border bg-card shadow-2xl shadow-brand/10">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-brand/12 text-xs font-semibold text-brand">SK</span>
            <div>
              <p className="text-sm font-semibold">Somchai K.</p>
              <p className="text-xs text-muted-foreground">Case #00012345</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
            <span className="size-2 rounded-full bg-[#06C755]" />
            LINE
          </span>
        </div>
        <div className="grid gap-2 p-4">
          {rows.map((r, i) => (
            <p
              key={i}
              className={cn(
                "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm",
                r.who === "out" ? "justify-self-end rounded-br-md bg-brand text-brand-foreground" : "rounded-bl-md bg-muted"
              )}
            >
              {r.text}
            </p>
          ))}
          <div className="mt-2 rounded-xl border border-brand/30 bg-brand/5 p-3 text-xs">
            <p className="mb-1 flex items-center gap-1 font-semibold text-brand">
              <SparklesIcon className="size-3.5" /> AI summary
            </p>
            <p className="text-muted-foreground">Customer asked about delivery; tracking sent; resolved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
