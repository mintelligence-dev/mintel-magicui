"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type Plan = { name: string; description: string; monthly: number; yearly: number; features: string[]; cta: string; popular?: boolean }

const DEFAULTS: Plan[] = [
  { name: "Starter", description: "For small teams on one channel.", monthly: 990, yearly: 790, features: ["1 channel", "3 agents", "Basic reports"], cta: "Start free" },
  { name: "Growth", description: "For growing support teams.", monthly: 2990, yearly: 2390, features: ["All channels", "15 agents", "AI suggestions", "SLA timers"], cta: "Start free trial", popular: true },
  { name: "Enterprise", description: "For contact centers on Salesforce.", monthly: 0, yearly: 0, features: ["Unlimited agents", "Salesforce sync", "SSO & audit log", "Dedicated support"], cta: "Talk to sales" },
]

/** Three plans with a monthly/yearly switch (yearly shows the saving), a highlighted popular plan and feature lists. */
export function SectionPricing({
  title = "Simple pricing",
  description = "Per agent, billed in Thai baht. Cancel anytime.",
  plans = DEFAULTS,
  currency = "฿",
  className,
}: {
  title?: React.ReactNode
  description?: React.ReactNode
  plans?: Plan[]
  currency?: string
  className?: string
}) {
  const [yearly, setYearly] = React.useState(true)
  return (
    <section data-slot="section-pricing" className={cn("mx-auto max-w-6xl px-4 py-20 sm:px-6", className)}>
      <div className="mx-auto mb-10 grid max-w-2xl justify-items-center gap-4 text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
        <div role="radiogroup" aria-label="Billing period" className="inline-flex rounded-full bg-muted p-1">
          {[
            { v: false, label: "Monthly" },
            { v: true, label: "Yearly · save 20%" },
          ].map((o) => (
            <button
              key={o.label}
              type="button"
              role="radio"
              aria-checked={yearly === o.v}
              onClick={() => setYearly(o.v)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-[background-color,color,box-shadow] duration-300",
                yearly === o.v ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <ul className="grid gap-5 lg:grid-cols-3">
        {plans.map((p) => {
          const price = yearly ? p.yearly : p.monthly
          return (
            <li
              key={p.name}
              className={cn(
                "reveal-on-scroll relative flex flex-col gap-6 rounded-3xl border bg-card p-7",
                p.popular && "border-brand/50 shadow-xl shadow-brand/15 lg:-translate-y-2"
              )}
            >
              {p.popular && (
                <span className="absolute -top-3 left-7 rounded-full bg-[image:var(--brand-gradient)] px-3 py-0.5 text-xs font-semibold text-brand-foreground">Most popular</span>
              )}
              <div>
                <h3 className="font-heading text-xl font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              </div>
              <p className="flex items-baseline gap-1">
                {price ? (
                  <>
                    <span className="font-heading text-4xl font-bold tabular-nums">
                      {currency}
                      {price.toLocaleString("en-US")}
                    </span>
                    <span className="text-sm text-muted-foreground">/ agent / month</span>
                  </>
                ) : (
                  <span className="font-heading text-4xl font-bold">Custom</span>
                )}
              </p>
              <ul className="grid flex-1 gap-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckIcon className="size-4 shrink-0 text-success" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#start"
                className={cn(
                  "rounded-full px-5 py-2.5 text-center font-semibold transition-[translate,background-color] duration-300 ease-spring-snappy hover:-translate-y-0.5 motion-reduce:transition-none",
                  p.popular ? "bg-[image:var(--brand-gradient)] text-brand-foreground shadow-md shadow-brand/25" : "border hover:bg-muted"
                )}
              >
                {p.cta}
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
