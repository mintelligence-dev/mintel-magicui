"use client"

import * as React from "react"
import { CheckCircle2Icon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/registry/mintel/ui/input"
import { Label } from "@/registry/mintel/ui/label"
import { Textarea } from "@/registry/mintel/ui/textarea"
import { ThaiPhoneInput } from "@/registry/mintel/ui/thai-phone-input"

/**
 * Contact block: company details on one side, a short form (name, email, Thai phone, message) on the
 * other. `onSubmit` receives the values; the demo shows a thank-you state.
 */
export function SectionContact({
  title = "Talk to our team",
  description = "We reply within one business day, in Thai or English.",
  details = [
    { icon: <MailIcon />, label: "hello@example.co.th" },
    { icon: <PhoneIcon />, label: "02-123-4567" },
    { icon: <MapPinIcon />, label: "99/1 Sukhumvit Rd., Khlong Toei, Bangkok 10110" },
  ],
  onSubmit,
  className,
}: {
  title?: React.ReactNode
  description?: React.ReactNode
  details?: { icon: React.ReactNode; label: string }[]
  onSubmit?: (values: { name: string; email: string; phone: string; message: string }) => void | Promise<void>
  className?: string
}) {
  const [sent, setSent] = React.useState(false)
  const [phone, setPhone] = React.useState("")
  const [phoneValid, setPhoneValid] = React.useState(true)
  const [pending, setPending] = React.useState(false)
  const [failed, setFailed] = React.useState(false)
  return (
    <section data-slot="section-contact" className={cn("reveal-on-scroll mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2", className)}>
      <div>
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-3 text-muted-foreground">{description}</p>
        <ul className="mt-8 grid gap-4">
          {details.map((d) => (
            <li key={d.label} className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand [&_svg]:size-5">{d.icon}</span>
              {d.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
        {sent ? (
          <div role="status" className="grid min-h-72 place-content-center justify-items-center gap-3 text-center motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95">
            <CheckCircle2Icon className="size-12 text-success" />
            <p className="font-heading text-xl font-semibold">Thanks! We'll be in touch.</p>
          </div>
        ) : (
          <form
            className="grid gap-4"
            onSubmit={async (e) => {
              e.preventDefault()
              // One request at a time; the phone is optional, but a partial number is not sent.
              if (pending || (phone && !phoneValid)) return
              const f = new FormData(e.currentTarget)
              setPending(true)
              setFailed(false)
              try {
                await onSubmit?.({ name: String(f.get("name")), email: String(f.get("email")), phone, message: String(f.get("message")) })
                setSent(true)
              } catch {
                setFailed(true)
              } finally {
                setPending(false)
              }
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input id="contact-name" name="name" autoComplete="name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input id="contact-email" name="email" type="email" autoComplete="email" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-phone">Phone (optional)</Label>
              <ThaiPhoneInput
                id="contact-phone"
                value={phone}
                aria-invalid={Boolean(phone) && !phoneValid}
                onValueChange={(v, info) => {
                  setPhone(v)
                  setPhoneValid(info.valid)
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea id="contact-message" name="message" rows={4} required />
            </div>
            <button
              type="submit"
              aria-disabled={pending}
              className="rounded-full bg-[image:var(--brand-gradient)] px-6 py-3 font-semibold text-brand-foreground shadow-md shadow-brand/25 transition-transform duration-300 ease-spring-snappy hover:-translate-y-0.5 active:scale-95 motion-reduce:transition-none"
            >
              Send message
            </button>
            {failed && (
              <p role="alert" className="text-sm text-destructive">
                Could not send your message. Please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
