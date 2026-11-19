"use client"

import * as React from "react"
import { PauseIcon, PlayIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type Slide = { title: string; description: string; visual: React.ReactNode }

const panel = (label: string, rows: string[]) => (
  <div className="grid size-full content-center gap-3 p-8">
    <p className="text-sm font-semibold text-brand">{label}</p>
    {rows.map((r) => (
      <div key={r} className="rounded-xl border bg-card px-4 py-3 text-sm shadow-sm">
        {r}
      </div>
    ))}
  </div>
)

const DEFAULTS: Slide[] = [
  { title: "Unified inbox", description: "See every chat with its channel, owner and SLA.", visual: panel("Inbox", ["Somchai K. · LINE · 2 min", "Siam Foods · Messenger · 12 min", "Ploy S. · TikTok · 31 min"]) },
  { title: "AI suggestions", description: "Reply drafts and summaries you can send in one click.", visual: panel("Suggested reply", ["Hi Somchai! Your order ships today.", "Tracking: TH123456 (Kerry Express)"]) },
  { title: "Live reports", description: "First reply time, CSAT and volume by channel.", visual: panel("This week", ["First reply: 4 min (−38%)", "CSAT: 96%", "Chats: 12,480"]) },
]

/**
 * Feature tabs that advance on their own with a progress bar. A pause button stops it (WCAG 2.2.2), it never
 * auto-advances under reduced motion, and choosing a tab pauses it.
 */
export function SectionFeatureSlideshow({
  title = "See it in action",
  slides = DEFAULTS,
  interval = 6000,
  className,
}: {
  title?: React.ReactNode
  slides?: Slide[]
  /** Milliseconds per slide. */
  interval?: number
  className?: string
}) {
  const [index, setIndex] = React.useState(0)
  const [playing, setPlaying] = React.useState(false)
  const [reduced, setReduced] = React.useState(true)

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    setPlaying(!mq.matches)
  }, [])

  React.useEffect(() => {
    if (!playing || reduced) return
    const id = setTimeout(() => setIndex((i) => (i + 1) % slides.length), interval)
    return () => clearTimeout(id)
  }, [playing, reduced, index, interval, slides.length])

  return (
    <section data-slot="section-feature-slideshow" className={cn("mx-auto max-w-6xl px-4 py-20 sm:px-6", className)}>
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {!reduced && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            className="flex size-10 items-center justify-center rounded-full border transition-colors hover:bg-muted"
          >
            {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
          </button>
        )}
      </div>
      <div className="grid gap-6 lg:grid-cols-[22rem_minmax(0,1fr)]">
        <div role="tablist" aria-label="Features" className="grid content-start gap-2">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              id={`slide-tab-${i}`}
              aria-selected={i === index}
              aria-controls="slide-panel"
              onClick={() => {
                setIndex(i)
                setPlaying(false)
              }}
              className={cn(
                "relative overflow-hidden rounded-2xl border p-4 text-left transition-[background-color,border-color] duration-300",
                i === index ? "border-brand/40 bg-brand/5" : "hover:bg-muted/60"
              )}
            >
              <span className="block font-semibold">{s.title}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{s.description}</span>
              {i === index && playing && !reduced && (
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-brand/15">
                  <span
                    key={index}
                    className="block h-full origin-left bg-[image:var(--brand-gradient)]"
                    style={{ animation: `mintel-slide-progress ${interval}ms linear forwards` }}
                  />
                </span>
              )}
            </button>
          ))}
        </div>
        <div
          id="slide-panel"
          role="tabpanel"
          aria-labelledby={`slide-tab-${index}`}
          className="min-h-80 overflow-hidden rounded-3xl border bg-[radial-gradient(120%_120%_at_0%_0%,color-mix(in_oklab,var(--brand)_10%,transparent),transparent_60%)] bg-muted/30"
        >
          <div key={index} className="size-full motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-right-4 motion-safe:duration-500">
            {slides[index].visual}
          </div>
        </div>
      </div>
    </section>
  )
}
