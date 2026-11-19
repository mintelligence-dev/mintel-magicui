"use client"

import * as React from "react"
import { PhoneIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/registry/mintel/ui/input"

/** Normalise to local digits: "+66 81 234 5678" or "6681..." -> "0812345678". */
export function toThaiLocalDigits(text: string) {
  let d = text.replace(/\D/g, "")
  // International forms: +66…, 0066…, or 66… (a local number always starts with 0, so a leading 66 is the country code).
  if (d.startsWith("0066")) d = "0" + d.slice(4)
  else if (text.trim().startsWith("+66") || (d.startsWith("66") && d.length >= 10)) d = "0" + d.slice(2)
  // "+66 (0)81 234 5678": the optional trunk zero would otherwise be doubled.
  if (d.startsWith("00")) d = d.slice(1)
  // Bangkok landlines (02) have 9 digits; everything else is capped at 10.
  return d.slice(0, d.startsWith("02") ? 9 : 10)
}

/** Mobile (06/08/09) has 10 digits; landlines (02-05, 07) have 9. */
export function isValidThaiPhone(digits: string) {
  return /^0[689]\d{8}$/.test(digits) || /^0[2-57]\d{7}$/.test(digits)
}

/** 0812345678 -> 081-234-5678, 021234567 -> 02-123-4567, 053123456 -> 053-123-456. */
export function formatThaiPhone(digits: string) {
  const d = digits.replace(/\D/g, "").slice(0, 10)
  if (d.startsWith("02")) return [d.slice(0, 2), d.slice(2, 5), d.slice(5, 9)].filter(Boolean).join("-")
  return [d.slice(0, 3), d.slice(3, 6), d.slice(6, 10)].filter(Boolean).join("-")
}

/** E.164 for SMS / WhatsApp APIs: 0812345678 -> +66812345678. */
export function toE164(digits: string) {
  return digits.startsWith("0") ? `+66${digits.slice(1)}` : digits
}

const caretAfterDigits = (formatted: string, n: number) => {
  if (n <= 0) return 0
  let seen = 0
  for (let i = 0; i < formatted.length; i++) if (/\d/.test(formatted[i]) && ++seen === n) return i + 1
  return formatted.length
}

/**
 * Thai phone field: formats mobiles as 081-234-5678 and Bangkok landlines as 02-123-4567, and accepts
 * pasted +66 numbers. `onValueChange` gets local digits plus the E.164 form and whether it is complete.
 */
function ThaiPhoneInput({
  value: controlled,
  defaultValue = "",
  onValueChange,
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange" | "type"> & {
  value?: string
  defaultValue?: string
  onValueChange?: (digits: string, info: { e164: string; valid: boolean }) => void
}) {
  const [uncontrolled, setUncontrolled] = React.useState(toThaiLocalDigits(defaultValue))
  const digits = toThaiLocalDigits(controlled ?? uncontrolled)
  const ref = React.useRef<HTMLInputElement>(null)

  return (
    <div data-slot="thai-phone-input" className={cn("relative", className)}>
      <PhoneIcon aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={ref}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="081-234-5678"
        {...props}
        value={formatThaiPhone(digits)}
        className="pl-9 tabular-nums"
        onChange={(e) => {
          const el = e.target
          const before = el.value.slice(0, el.selectionStart ?? el.value.length).replace(/\D/g, "").length
          const next = toThaiLocalDigits(el.value)
          if (controlled === undefined) setUncontrolled(next)
          onValueChange?.(next, { e164: toE164(next), valid: isValidThaiPhone(next) })
          requestAnimationFrame(() => {
            const pos = caretAfterDigits(formatThaiPhone(next), before)
            // `el`, not the internal ref: a caller's own ref (react-hook-form) replaces ours.
            el.setSelectionRange(pos, pos)
          })
        }}
      />
    </div>
  )
}

export { ThaiPhoneInput }
