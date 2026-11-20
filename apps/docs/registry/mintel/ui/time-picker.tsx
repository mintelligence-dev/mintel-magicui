"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { ClockIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const LABELS = {
  th: { choose: "เลือกเวลา", times: "เวลา", invalid: "เวลาไม่ถูกต้อง", outside: (a: string, b: string) => `เลือกได้ระหว่าง ${a}–${b} น.` },
  en: { choose: "Choose a time", times: "Times", invalid: "Not a valid time", outside: (a: string, b: string) => `Between ${a} and ${b}` },
}

const pad = (n: number) => String(n).padStart(2, "0")
const toMinutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5))
const fromMinutes = (m: number) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`
const isTime = (text: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(text)

/** "930" -> "09:30", "9:5" -> "09:05", "14" -> "14:00". Returns "" when it is not a time. */
function parseTime(text: string) {
  const t = text.trim().replace(".", ":")
  const m = t.match(/^(\d{1,2}):(\d{1,2})$/) ?? (/^\d{3,4}$/.test(t) ? [t, t.slice(0, -2), t.slice(-2)] : /^\d{1,2}$/.test(t) ? [t, t, "0"] : null)
  if (!m) return ""
  const time = `${pad(Number(m[1]))}:${pad(Number(m[2]))}`
  return isTime(time) ? time : ""
}

type TimePickerProps = Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange" | "type" | "min" | "max" | "step"> & {
  /** 24-hour "HH:mm", or "" when empty. */
  value?: string
  defaultValue?: string
  onValueChange?: (time: string) => void
  /** Minutes between the times offered in the list. Typed times can be any minute. */
  step?: number
  /** Earliest and latest time, "HH:mm". */
  min?: string
  max?: string
  locale?: "th" | "en"
}

/**
 * Time field on the 24-hour clock: type it ("930", "9:30", "14") or pick from a list of slots.
 * The value is always "HH:mm" or "". Times outside `min` / `max` are marked invalid.
 */
function TimePicker({
  value: controlled,
  defaultValue = "",
  onValueChange,
  step = 30,
  min = "00:00",
  max = "23:59",
  locale = "th",
  className,
  disabled,
  placeholder = "09:30",
  onBlur,
  "aria-invalid": ariaInvalid,
  ...props
}: TimePickerProps) {
  const t = LABELS[locale]
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const value = controlled ?? uncontrolled
  const [text, setText] = React.useState(value)
  const [open, setOpen] = React.useState(false)
  const [bad, setBad] = React.useState<"" | "invalid" | "outside">("")
  const listRef = React.useRef<HTMLDivElement>(null)
  const hintId = React.useId()

  // Show the value when it changes from outside.
  React.useEffect(() => setText(value), [value])

  const slots = React.useMemo(() => {
    const out: string[] = []
    const size = Math.max(1, Math.round(step))
    for (let m = Math.ceil(toMinutes(min) / size) * size; m <= toMinutes(max); m += size) out.push(fromMinutes(m))
    return out
  }, [step, min, max])

  const set = (time: string) => {
    if (controlled === undefined) setUncontrolled(time)
    setText(time)
    onValueChange?.(time)
  }
  const inRange = (time: string) => toMinutes(time) >= toMinutes(min) && toMinutes(time) <= toMinutes(max)

  const commitText = () => {
    if (!text.trim()) {
      setBad("")
      if (value) set("")
      return
    }
    const time = parseTime(text)
    if (!time) return setBad("invalid")
    setBad(inRange(time) ? "" : "outside")
    if (time !== value || time !== text) set(time)
  }

  // Open on the chosen time (or the next slot after it), scrolled into view.
  const focusSlot = () => {
    const list = listRef.current
    if (!list) return
    const options = Array.from(list.querySelectorAll<HTMLButtonElement>("[role=option]"))
    const target = options.find((o) => o.dataset.time === value) ?? options.find((o) => (o.dataset.time ?? "") >= (value || "09:00")) ?? options[0]
    target?.focus()
    target?.scrollIntoView({ block: "center" })
  }

  const onListKeyDown = (e: React.KeyboardEvent) => {
    const options = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>("[role=option]") ?? [])
    const i = options.indexOf(document.activeElement as HTMLButtonElement)
    const go = (n: number) => {
      e.preventDefault()
      options[Math.max(0, Math.min(options.length - 1, n))]?.focus()
    }
    if (e.key === "ArrowDown") go(i + 1)
    else if (e.key === "ArrowUp") go(i - 1)
    else if (e.key === "Home") go(0)
    else if (e.key === "End") go(options.length - 1)
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <div data-slot="time-picker" className={cn("grid gap-1", className)}>
        <PopoverPrimitive.Anchor className="relative">
          <input
            inputMode="numeric"
            autoComplete="off"
            placeholder={placeholder}
            {...props}
            type="text"
            value={text}
            disabled={disabled}
            aria-invalid={bad ? true : ariaInvalid}
            aria-describedby={[props["aria-describedby"], bad ? hintId : undefined].filter(Boolean).join(" ") || undefined}
            onChange={(e) => {
              setText(e.target.value.replace(/[^\d:.]/g, "").slice(0, 5))
              setBad("")
            }}
            onBlur={(e) => {
              commitText()
              onBlur?.(e)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitText()
              else if (e.key === "ArrowDown" && !open) {
                e.preventDefault()
                setOpen(true)
              }
              props.onKeyDown?.(e)
            }}
            className={cn(
              "h-9 w-full min-w-0 rounded-md border border-input bg-transparent py-1 pr-10 pl-3 text-base tabular-nums shadow-xs outline-none transition-[color,box-shadow,border-color] duration-200 placeholder:text-muted-foreground md:text-sm dark:bg-input/30",
              "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
              "aria-invalid:border-destructive aria-invalid:ring-destructive/20"
            )}
          />
          <PopoverPrimitive.Trigger
            type="button"
            disabled={disabled}
            aria-label={t.choose}
            className="absolute top-1/2 right-1 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none"
          >
            <ClockIcon className="size-4" />
          </PopoverPrimitive.Trigger>
        </PopoverPrimitive.Anchor>
        {bad && (
          <p id={hintId} className="text-xs text-destructive">
            {bad === "invalid" ? t.invalid : t.outside(min, max)}
          </p>
        )}
      </div>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="end"
          sideOffset={6}
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            focusSlot()
          }}
          className={cn(
            "z-50 max-h-64 w-28 origin-(--radix-popover-content-transform-origin) overflow-y-auto overscroll-contain rounded-xl border bg-popover p-1 text-popover-foreground shadow-lg shadow-brand/5",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-150 data-[state=closed]:ease-in data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-90 data-[state=open]:duration-300 data-[state=open]:ease-spring-snappy motion-reduce:animate-none"
          )}
        >
          <div ref={listRef} role="listbox" aria-label={t.times} onKeyDown={onListKeyDown} className="grid gap-0.5">
            {slots.map((slot) => (
              <button
                key={slot}
                type="button"
                role="option"
                aria-selected={slot === value}
                data-time={slot}
                onClick={() => {
                  setBad("")
                  set(slot)
                  setOpen(false)
                }}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-left text-sm tabular-nums outline-none transition-colors hover:bg-accent focus-visible:bg-accent",
                  slot === value && "bg-brand/10 font-semibold text-brand"
                )}
              >
                {slot}
              </button>
            ))}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export { TimePicker }
