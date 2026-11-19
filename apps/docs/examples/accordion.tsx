import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/mintel/ui/accordion"

const faqs = [
  { q: "Which channels are supported?", a: "LINE OA, Facebook Messenger, TikTok and WhatsApp, all in one inbox." },
  { q: "Does it work with Salesforce?", a: "Yes. Conversations become Cases and Contacts in your org, in real time." },
  { q: "Can we use our own branding?", a: "Every component reads the Mintel tokens, so a theme change restyles everything." },
]

export default function AccordionExample() {
  return (
    <Accordion type="single" collapsible defaultValue="item-0" className="w-full max-w-lg">
      {faqs.map((f, i) => (
        <AccordionItem key={f.q} value={`item-${i}`}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
