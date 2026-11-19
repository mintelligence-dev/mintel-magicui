"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * One-time code boxes (default 6). Typing moves forward, Backspace moves back, arrows move freely,
 * and pasting or SMS autofill (autocomplete="one-time-code") fills every box at once. Calls
 * `onComplete` when all boxes are filled; `invalid` shakes the row and marks it for screen readers.
 */
function OtpInput({
  length = 6,
  value: controlled,
  onValueChange,
  onComplete,
  invalid = false,
  disabled = false,
  autoFocus = false,
  className,
  "aria-label": ariaLabel = "One-time code",
}: {
  length?: number
  value?: string
  onValueChange?: (value: string) => void
  onComplete?: (value: string) => void
  invalid?: boolean
  disabled?: boolean
  autoFocus?: boolean
  className?: string
  "aria-label"?: string
}) {
  const [uncontrolled, setUncontrolled] = React.useState("")
  const value = (controlled ?? uncontrolled).replace(/\D/g, "").slice(0, length)
  const refs = React.useRef<(HTMLInputElement | null)[]>([])

  const commit = (next: string, focusIndex?: number) => {
    const clean = next.replace(/\D/g, "").slice(0, length)
    if (controlled === undefined) setUncontrolled(clean)
    onValueChange?.(clean)
    if (clean.length === length && clean !== value) onComplete?.(clean)
    if (focusIndex !== undefined) refs.current[Math.max(0, Math.min(length - 1, focusIndex))]?.focus()
  }

  const setAt = (i: number, digit: string) => {
    const chars = value.padEnd(length, " ").split("")
    chars[i] = digit
    return chars.join("").replace(/\s+$/, "").replace(/\s/g, "")
  }

  return (
    <div
      data-slot="otp-input"
      role="group"
      aria-label={ariaLabel}
      data-invalid={invalid || undefined}
      className={cn("flex gap-2 motion-safe:data-invalid:animate-[mintel-shake_0.4s_ease-in-out]", className)}
    >
      {Array.from({ length }, (_, i) => {
        const char = value[i] ?? ""
        return (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el
            }}
            value={char}
            disabled={disabled}
            autoFocus={autoFocus && i === 0}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            maxLength={i === 0 ? length : 1}
            aria-label={`${ariaLabel} ${i + 1}/${length}`}
            aria-invalid={invalid || undefined}
            data-filled={char ? "" : undefined}
            onFocus={(e) => e.target.select()}
            // Clicking a box that already has focus fires no focus event: select again so typing replaces the digit.
            onClick={(e) => e.currentTarget.select()}
            onChange={(e) => {
              const typed = e.target.value.replace(/\D/g, "")
              if (!typed) return
              // One digit typed next to the existing one (caret not selecting it): replace, do not treat as a paste.
              if (typed.length === 2 && char && typed.includes(char)) return commit(setAt(i, typed.replace(char, "") || char), i + 1)
              // Several digits at once (paste into one box, or SMS autofill): fill from here.
              if (typed.length > 1) return commit(value.slice(0, i) + typed, i + typed.length)
              commit(setAt(i, typed), i + 1)
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                e.preventDefault()
                if (char) commit(setAt(i, ""), i)
                else if (i > 0) commit(setAt(i - 1, ""), i - 1)
              } else if (e.key === "ArrowLeft") {
                e.preventDefault()
                refs.current[i - 1]?.focus()
              } else if (e.key === "ArrowRight") {
                e.preventDefault()
                refs.current[i + 1]?.focus()
              }
            }}
            onPaste={(e) => {
              const text = e.clipboardData.getData("text").replace(/\D/g, "")
              if (!text) return
              e.preventDefault()
              commit(value.slice(0, i) + text, i + text.length)
            }}
            className={cn(
              "size-11 rounded-lg border border-input bg-transparent text-center font-mono text-lg font-semibold shadow-xs outline-none",
              "transition-[border-color,box-shadow,scale] duration-300 ease-spring-snappy",
              "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
              "data-filled:border-brand/50 motion-safe:data-filled:animate-[mintel-pop_0.3s_ease-out]",
              "aria-invalid:border-destructive aria-invalid:ring-destructive/20 disabled:opacity-50 dark:bg-input/30",
              "sm:size-12"
            )}
          />
        )
      })}
    </div>
  )
}

export { OtpInput }
