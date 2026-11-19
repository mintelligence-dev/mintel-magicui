"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type CarouselCard = { title: string; description: string; tag?: string; tone?: string }

const DEFAULTS: CarouselCard[] = [
  { title: "Siam Retail", description: "Cut first-reply time from 2 hours to 4 minutes.", tag: "Retail" },
  { title: "Bangkok Motors", description: "One view of every service booking across 30 branches.", tag: "Automotive" },
  { title: "Andaman Travel", description: "Handled 3× peak-season chats without new hires.", tag: "Travel" },
  { title: "Kanok Foods", description: "Order updates on LINE straight from Salesforce.", tag: "F&B" },
  { title: "Isan Steel", description: "B2B quotes answered the same day.", tag: "Manufacturing" },
]

/**
 * Horizontal carousel with scroll snapping, previous/next buttons and position dots. No autoplay; swipe on
 * touch, arrow buttons or Shift+scroll on desktop.
 */
export function SectionCarousel({
  title = "Customer stories",
  items = DEFAULTS,
  className,
}: {
  title?: React.ReactNode
  items?: CarouselCard[]
  className?: string
}) {
  const track = React.useRef<HTMLUListElement>(null)
  const [active, setActive] = React.useState(0)

  const cardWidth = () => {
    const el = track.current
    const first = el?.querySelector("li")
    return first ? first.getBoundingClientRect().width + 16 : 300
  }
  const go = (i: number) => {
    const el = track.current
    if (!el) return
    const next = Math.max(0, Math.min(items.length - 1, i))
    el.scrollTo({ left: next * cardWidth(), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
  }

  return (
    <section data-slot="section-carousel" aria-roledescription="carousel" aria-label={typeof title === "string" ? title : "Carousel"} className={cn("reveal-on-scroll mx-auto max-w-6xl px-4 py-20 sm:px-6", className)}>
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous" className="flex size-10 items-center justify-center rounded-full border transition-colors hover:bg-muted disabled:opacity-40">
            <ChevronLeftIcon className="size-4" />
          </button>
          <button type="button" onClick={() => go(active + 1)} disabled={active >= items.length - 1} aria-label="Next" className="flex size-10 items-center justify-center rounded-full border transition-colors hover:bg-muted disabled:opacity-40">
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>
      <ul
        ref={track}
        tabIndex={0}
        aria-label="Slides"
        onScroll={(e) => setActive(Math.round(e.currentTarget.scrollLeft / cardWidth()))}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 outline-none [scrollbar-width:none] focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:-mx-6 sm:scroll-px-6 sm:px-6"
      >
        {items.map((it, i) => (
          <li
            key={it.title}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            className="w-[min(20rem,80vw)] shrink-0 snap-start"
          >
            <article className="flex h-56 flex-col justify-between rounded-3xl border bg-card p-6 shadow-sm">
              {it.tag && <span className="w-fit rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand">{it.tag}</span>}
              <div>
                <h3 className="font-heading text-xl font-semibold">{it.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{it.description}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center gap-1.5" aria-hidden>
        {items.map((_, i) => (
          <span key={i} className={cn("h-1.5 rounded-full transition-[width,background-color] duration-300", i === active ? "w-6 bg-brand" : "w-1.5 bg-muted-foreground/30")} />
        ))}
      </div>
    </section>
  )
}
