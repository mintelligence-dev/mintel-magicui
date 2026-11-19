import * as React from "react"
import { QuoteIcon, StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type Testimonial = { quote: string; name: string; role: string; rating?: number }

const DEFAULTS: Testimonial[] = [
  { quote: "First replies went from 2 hours to 4 minutes. Our LINE OA finally feels like a real channel.", name: "Nina Park", role: "Head of CX, Siam Retail", rating: 5 },
  { quote: "Agents see the whole history in Salesforce, so nobody asks customers to repeat themselves.", name: "Somchai Kittisak", role: "Service Manager, Bangkok Motors", rating: 5 },
  { quote: "The AI summaries save each agent about an hour a day. Setup took one afternoon.", name: "Ploy Srisuk", role: "Ops Lead, Andaman Travel", rating: 5 },
]

/** Customer quotes in cards with a rating, name and role. Three columns on desktop, stacked on phones. */
export function SectionTestimonials({
  title = "Loved by support teams",
  description = "Real results from teams that answer thousands of chats a day.",
  items = DEFAULTS,
  className,
}: {
  title?: React.ReactNode
  description?: React.ReactNode
  items?: Testimonial[]
  className?: string
}) {
  return (
    <section data-slot="section-testimonials" className={cn("mx-auto max-w-6xl px-4 py-20 sm:px-6", className)}>
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-3 text-muted-foreground">{description}</p>
      </div>
      <ul className="grid gap-5 md:grid-cols-3">
        {items.map((t) => (
          <li key={t.name} className="reveal-on-scroll">
            <figure className="relative flex h-full flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm transition-[translate,box-shadow] duration-300 ease-spring-snappy hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <QuoteIcon aria-hidden className="absolute top-5 right-5 size-8 text-brand/15" />
              {t.rating && (
                <div className="flex gap-0.5" role="img" aria-label={`${t.rating} out of 5`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} aria-hidden className={cn("size-4", i < t.rating! ? "fill-warning text-warning" : "text-muted-foreground/40")} />
                  ))}
                </div>
              )}
              <blockquote className="flex-1 text-pretty">“{t.quote}”</blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-[image:var(--brand-gradient)] text-sm font-semibold text-brand-foreground">
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-sm text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
