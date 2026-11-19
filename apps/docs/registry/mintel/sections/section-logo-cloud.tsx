import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * "Trusted by" row of customer logos. Pass `logos` as nodes (your SVGs) or plain names, which render as
 * neutral wordmarks. Logos sit muted and come to full color on hover.
 */
export function SectionLogoCloud({
  title = "Trusted by teams across Thailand and the region",
  logos = ["Siam Retail", "Kanok Foods", "Bangkok Motors", "Lanna Crafts", "Andaman Travel", "Isan Steel"],
  className,
}: {
  title?: React.ReactNode
  logos?: React.ReactNode[]
  className?: string
}) {
  return (
    <section data-slot="section-logo-cloud" className={cn("reveal-on-scroll border-y bg-muted/30", className)}>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6">
        <p className="text-center text-sm font-medium text-muted-foreground">{title}</p>
        <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo, i) => (
            <li
              key={i}
              className="flex h-10 items-center justify-center text-muted-foreground grayscale transition-[color,filter] duration-300 hover:text-foreground hover:grayscale-0"
            >
              {typeof logo === "string" ? <span className="font-heading text-lg font-bold tracking-tight whitespace-nowrap">{logo}</span> : logo}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
