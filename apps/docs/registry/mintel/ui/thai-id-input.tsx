"use client"

import * as React from "react"
import { CheckIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/registry/mintel/ui/input"

/** Thai national ID checksum (13 digits; the last is a mod-11 check digit). */
export function isValidThaiId(id: string) {
  const d = id.replace(/\D/g, "")
  if (d.length !== 13) return false
  let sum = 0
  for (let i = 0; i < 12; i++) sum += Number(d[i]) * (13 - i)
  return (11 - (sum % 11)) % 10 === Number(d[12])
}

/** 1234567890123 -> 1-2345-67890-12-3 (partial input is formatted as far as it goes). */
export function formatThaiId(digits: string) {
  const d = digits.replace(/\D/g, "").slice(0, 13)
  const parts = [d.slice(0, 1), d.slice(1, 5), d.slice(5, 10), d.slice(10, 12), d.slice(12, 13)]
  return parts.filter(Boolean).join("-")
}

/** Keeps the caret after the same digit when the formatted text changes length. */
export function caretAfterDigits(formatted: string, digitsBefore: number) {
  if (digitsBefore <= 0) return 0
  let seen = 0
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i]) && ++seen === digitsBefore) return i + 1
  }
  return formatted.length
}

const LABELS = {
  th: { valid: "เลขบัตรถูกต้อง", invalid: "เลขบัตรไม่ถูกต้อง" },
  en: { valid: "Valid ID number", invalid: "Invalid ID number" },
}

/**
 * Thai national ID field: formats as 1-2345-67890-12-3 while typing or pasting and checks the
 * check digit once all 13 digits are in. `value` and `onValueChange` use digits only.
 */
function ThaiIdInput({
  value: controlled,
  defaultValue = "",
  onValueChange,
  locale = "th",
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange" | "type"> & {
  value?: string
  defaultValue?: string
  onValueChange?: (digits: string, valid: boolean) => void
  locale?: "th" | "en"
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue.replace(/\D/g, "").slice(0, 13))
  const digits = (controlled ?? uncontrolled).replace(/\D/g, "").slice(0, 13)
  const complete = digits.length === 13
  const valid = complete && isValidThaiId(digits)
  const t = LABELS[locale]
  const ref = React.useRef<HTMLInputElement>(null)
  const describedBy = React.useId()

  return (
    <div data-slot="thai-id-input" className={cn("relative", className)}>
      <Input
        ref={ref}
        inputMode="numeric"
        autoComplete="off"
        placeholder="1-2345-67890-12-3"
        {...props}
        value={formatThaiId(digits)}
        aria-invalid={(complete && !valid) || props["aria-invalid"] || undefined}
        // Keep the caller's description (form hint or error) alongside the check-digit status.
        aria-describedby={[props["aria-describedby"], complete ? describedBy : undefined].filter(Boolean).join(" ") || undefined}
        className="pr-9 font-mono tracking-wide tabular-nums"
        onChange={(e) => {
          const el = e.target
          const before = el.value.slice(0, el.selectionStart ?? el.value.length).replace(/\D/g, "").length
          const next = el.value.replace(/\D/g, "").slice(0, 13)
          if (controlled === undefined) setUncontrolled(next)
          onValueChange?.(next, next.length === 13 && isValidThaiId(next))
          requestAnimationFrame(() => {
            const pos = caretAfterDigits(formatThaiId(next), before)
            // `el`, not the internal ref: a caller's own ref (react-hook-form) replaces ours.
            el.setSelectionRange(pos, pos)
          })
        }}
      />
      {complete && (
        <span
          id={describedBy}
          role="status"
          className={cn(
            "pointer-events-none absolute top-1/2 right-2.5 flex size-5 -translate-y-1/2 items-center justify-center rounded-full motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:duration-300 motion-safe:ease-spring-bouncy",
            valid ? "bg-success text-white" : "bg-destructive text-white dark:bg-destructive/60"
          )}
        >
          {valid ? <CheckIcon className="size-3.5" /> : <XIcon className="size-3.5" />}
          <span className="sr-only">{valid ? t.valid : t.invalid}</span>
        </span>
      )}
    </div>
  )
}

export { ThaiIdInput }
