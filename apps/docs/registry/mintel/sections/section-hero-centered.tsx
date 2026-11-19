import * as React from "react"
import { ArrowRightIcon, PlayIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/** Centered hero with a soft brand glow, two calls to action and a row of customer avatars. */
export function SectionHeroCentered({
  eyebrow = "Trusted by 2,000+ support teams",
  title = (
    <>
      Customer service that <span className="bg-[image:var(--brand-gradient)] bg-clip-text text-transparent">feels personal</span>
    </>
  ),
  description = "Answer every chat in seconds, keep context across channels, and let AI handle the busywork.",
  primary = { label: "Get started free", href: "#start" },
  secondary = { label: "Watch the 2-min tour", href: "#tour" },
  people = ["NP", "SK", "BT", "PS", "NR"],
  className,
}: {
  eyebrow?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
  /** Initials for the avatar row. */
  people?: string[]
  className?: string
}) {
  return (
    <section data-slot="section-hero-centered" className={cn("relative overflow-hidden", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[28rem] max-w-3xl rounded-full bg-[image:var(--brand-gradient)] opacity-20 blur-3xl" />
      <div className="relative mx-auto grid max-w-4xl justify-items-center gap-6 px-4 py-20 text-center sm:px-6 md:py-28">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {people.map((p, i) => (
              <span
                key={p}
                className="flex size-8 items-center justify-center rounded-full bg-brand/12 text-[0.6875rem] font-semibold text-brand ring-2 ring-background"
                style={{ zIndex: people.length - i }}
              >
                {p}
              </span>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">{eyebrow}</span>
        </div>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-6xl">{title}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground text-pretty">{description}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={primary.href}
            className="inline-flex items-center gap-2 rounded-full bg-[image:var(--brand-gradient)] px-6 py-3 font-semibold text-brand-foreground shadow-lg shadow-brand/25 transition-transform duration-300 ease-spring-snappy hover:-translate-y-0.5 active:scale-95 motion-reduce:transition-none"
          >
            {primary.label}
            <ArrowRightIcon className="size-4" />
          </a>
          <a href={secondary.href} className="inline-flex items-center gap-2 rounded-full border bg-background px-6 py-3 font-semibold transition-colors hover:bg-muted">
            <PlayIcon className="size-4 text-brand" />
            {secondary.label}
          </a>
        </div>
      </div>
    </section>
  )
}
