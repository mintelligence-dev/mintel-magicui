import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/** Closing call to action on a brand-gradient band with a soft glow. */
export function SectionCta({
  title = "Ready to answer every customer faster?",
  description = "Start free for 14 days. Bring your LINE OA, we'll handle the rest.",
  primary = { label: "Start free trial", href: "#start" },
  secondary = { label: "Talk to sales", href: "#sales" },
  className,
}: {
  title?: React.ReactNode
  description?: React.ReactNode
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
  className?: string
}) {
  return (
    <section data-slot="section-cta" className={cn("mx-auto max-w-6xl px-4 py-16 sm:px-6", className)}>
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-[image:var(--brand-gradient)] px-6 py-16 text-center text-brand-foreground shadow-2xl shadow-brand/25 sm:px-16">
        <div aria-hidden className="absolute -top-24 -left-24 -z-10 size-72 rounded-full bg-white/20 blur-3xl" />
        <div aria-hidden className="absolute -right-24 -bottom-24 -z-10 size-72 rounded-full bg-brand-cyan/40 blur-3xl" />
        <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg opacity-90">{description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={primary.href}
            className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 font-semibold text-foreground shadow-lg transition-transform duration-300 ease-spring-snappy hover:-translate-y-0.5 active:scale-95 motion-reduce:transition-none"
          >
            {primary.label}
            <ArrowRightIcon className="size-4" />
          </a>
          <a href={secondary.href} className="inline-flex items-center rounded-full border border-current/30 px-6 py-3 font-semibold transition-colors hover:bg-white/10">
            {secondary.label}
          </a>
        </div>
      </div>
    </section>
  )
}
