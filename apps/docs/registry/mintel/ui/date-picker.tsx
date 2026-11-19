"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { CalendarIcon, XIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Calendar, type CalendarEra } from "@/registry/mintel/ui/calendar"

/** Formats a date for display. Thai locale uses the Buddhist calendar (พ.ศ.) by default. */
function formatThaiDate(date: Date, era: CalendarEra = "buddhist", style: "medium" | "long" = "medium") {
  const locale = era === "buddhist" ? "th-TH-u-ca-buddhist" : "th-TH-u-ca-gregory"
  return new Intl.DateTimeFormat(locale, { dateStyle: style }).format(date)
}

const triggerClass =
  "flex h-9 w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 text-left text-sm shadow-xs outline-none transition-[color,box-shadow] " +
  "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 dark:hover:bg-input/50 " +
  "aria-invalid:border-destructive aria-invalid:ring-destructive/20"

const contentClass =
  "z-50 max-h-(--radix-popover-content-available-height) w-auto origin-(--radix-popover-content-transform-origin) overflow-y-auto overscroll-contain rounded-xl border bg-popover p-0 text-popover-foreground shadow-lg shadow-brand/5 " +
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none"

type CommonProps = {
  era?: CalendarEra
  placeholder?: string
  className?: string
  disabled?: boolean
  /** Show month/year dropdowns (good for birth dates). */
  dropdowns?: boolean
  fromYear?: number
  toYear?: number
  "aria-invalid"?: boolean
}

function ClearButton({ onClear }: { onClear: () => void }) {
  return (
    <span
      role="button"
      tabIndex={-1}
      aria-label="ล้างวันที่"
      onPointerDown={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClear()
      }}
      className="ml-auto rounded-full p-0.5 text-muted-foreground hover:bg-accent hover:text-foreground"
    >
      <XIcon className="size-3.5" />
    </span>
  )
}

// Rendered only while the popover is open, so `new Date()` never runs during server prerender
// (Next.js cacheComponents rejects reading the current time there).
function SingleCalendar({
  era,
  value,
  dropdowns,
  fromYear,
  toYear,
  onSelect,
}: {
  era: CalendarEra
  value?: Date
  dropdowns?: boolean
  fromYear?: number
  toYear?: number
  onSelect: (d: Date | undefined) => void
}) {
  const thisYear = new Date().getFullYear()
  return (
    <Calendar
      mode="single"
      era={era}
      selected={value}
      defaultMonth={value}
      captionLayout={dropdowns ? "dropdown" : "label"}
      startMonth={new Date(fromYear ?? thisYear - 100, 0)}
      endMonth={new Date(toYear ?? thisYear + 10, 11)}
      onSelect={onSelect}
    />
  )
}

/** Single date picker. Displays e.g. "19 พ.ย. 2569"; `value` is a normal JS Date. */
function DatePicker({
  value,
  onValueChange,
  era = "buddhist",
  placeholder = "เลือกวันที่",
  className,
  disabled,
  dropdowns,
  fromYear,
  toYear,
  ...rest
}: CommonProps & { value?: Date; onValueChange?: (date: Date | undefined) => void }) {
  const [open, setOpen] = React.useState(false)
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        data-slot="date-picker-trigger"
        disabled={disabled}
        aria-invalid={rest["aria-invalid"]}
        className={cn(triggerClass, className)}
      >
        <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
        <span className={cn("truncate", !value && "text-muted-foreground")}>
          {value ? formatThaiDate(value, era) : placeholder}
        </span>
        {value && <ClearButton onClear={() => onValueChange?.(undefined)} />}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content align="start" sideOffset={6} className={contentClass}>
          <SingleCalendar
            era={era}
            value={value}
            dropdowns={dropdowns}
            fromYear={fromYear}
            toYear={toYear}
            onSelect={(d) => {
              onValueChange?.(d)
              if (d) setOpen(false)
            }}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

// One month on phones, two side by side from `sm` up. Mounted only while open (no SSR mismatch).
function RangeCalendar({
  era,
  value,
  onSelect,
}: {
  era: CalendarEra
  value?: DateRange
  onSelect?: (range: DateRange | undefined) => void
}) {
  const [months] = React.useState(() => (window.matchMedia("(min-width: 640px)").matches ? 2 : 1))
  return (
    <Calendar mode="range" era={era} selected={value} defaultMonth={value?.from} numberOfMonths={months} onSelect={onSelect} />
  )
}

/** Date range picker (two months on desktop, one on phones). */
function DateRangePicker({
  value,
  onValueChange,
  era = "buddhist",
  placeholder = "เลือกช่วงวันที่",
  className,
  disabled,
  ...rest
}: CommonProps & { value?: DateRange; onValueChange?: (range: DateRange | undefined) => void }) {
  const label = value?.from
    ? value.to
      ? `${formatThaiDate(value.from, era)} – ${formatThaiDate(value.to, era)}`
      : formatThaiDate(value.from, era)
    : placeholder
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger
        data-slot="date-range-picker-trigger"
        disabled={disabled}
        aria-invalid={rest["aria-invalid"]}
        className={cn(triggerClass, className)}
      >
        <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
        <span className={cn("truncate", !value?.from && "text-muted-foreground")}>{label}</span>
        {value?.from && <ClearButton onClear={() => onValueChange?.(undefined)} />}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content align="start" sideOffset={6} className={contentClass}>
          <RangeCalendar era={era} value={value} onSelect={onValueChange} />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export { DatePicker, DateRangePicker, formatThaiDate }
