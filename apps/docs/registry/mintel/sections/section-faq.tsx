import * as React from "react"

import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/mintel/ui/accordion"

export type Faq = { q: string; a: React.ReactNode }

const DEFAULTS: Faq[] = [
  { q: "Which channels can we connect?", a: "LINE Official Account, Facebook Messenger, Instagram, TikTok and WhatsApp, plus a web chat widget." },
  { q: "Do we need Salesforce?", a: "No. Mintel works on its own, and syncs cases, contacts and history to Salesforce when you connect it." },
  { q: "Is our data kept in Thailand?", a: "You choose the region. Data is encrypted in transit and at rest, with PDPA-ready retention controls." },
  { q: "How long does setup take?", a: "Most teams are live in a day: connect channels, invite agents, import quick replies." },
  { q: "Can we try it first?", a: "Yes, every plan starts with a 14-day free trial. No credit card needed." },
]

/** Frequently asked questions: heading and contact link on one side, an accordion on the other. */
export function SectionFaq({
  title = "Questions, answered",
  description = (
    <>
      Can't find what you're looking for?{" "}
      <a href="#contact" className="font-medium text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand">
        Talk to us
      </a>
      .
    </>
  ),
  items = DEFAULTS,
  className,
}: {
  title?: React.ReactNode
  description?: React.ReactNode
  items?: Faq[]
  className?: string
}) {
  return (
    <section data-slot="section-faq" className={cn("reveal-on-scroll mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.5fr]", className)}>
      <div>
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-3 text-muted-foreground">{description}</p>
      </div>
      <Accordion type="single" collapsible defaultValue="item-0">
        {items.map((f, i) => (
          <AccordionItem key={f.q} value={`item-${i}`}>
            <AccordionTrigger className="text-base">{f.q}</AccordionTrigger>
            <AccordionContent className="text-base">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
