"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const DEFAULT_STEPS = [87.5, 100, 112.5, 125] as const
const DEFAULT_KEY = "mintel-font-scale"
const EVENT = "mintel-font-scale-change"

const STRINGS = {
  th: { group: "ขนาดตัวอักษร", smaller: "ลดขนาดตัวอักษร", reset: "ขนาดตัวอักษรปกติ", larger: "เพิ่มขนาดตัวอักษร", glyph: "ก", now: "ขนาดตัวอักษร" },
  en: { group: "Text size", smaller: "Decrease text size", reset: "Default text size", larger: "Increase text size", glyph: "A", now: "Text size" },
} as const

/**
 * Put in <head> (works from a server layout): applies the saved text size before the first paint,
 * so there is no flash and no hydration mismatch. Use the same storage key as the control.
 */
function FontScaleScript({ storageKey = DEFAULT_KEY }: { storageKey?: string }) {
  const code = `try{var s=localStorage.getItem(${JSON.stringify(storageKey)});if(s)document.documentElement.style.fontSize=s+"%"}catch(e){}`
  return <script dangerouslySetInnerHTML={{ __html: code }} />
}

/**
 * Text-size control (ก- ก ก+). Scales the root font size so everything sized in rem follows;
 * values in px do not scale. The choice is saved in localStorage.
 */
function FontSizeControl({
  steps = DEFAULT_STEPS as unknown as number[],
  defaultStep = 1,
  storageKey = DEFAULT_KEY,
  locale = "th",
  onScaleChange,
  className,
}: {
  /** Root font sizes in percent, smallest to largest. */
  steps?: number[]
  /** Index in `steps` used as the normal size. */
  defaultStep?: number
  storageKey?: string
  locale?: "th" | "en"
  onScaleChange?: (percent: number) => void
  className?: string
}) {
  const t = STRINGS[locale]
  const [index, setIndex] = React.useState(defaultStep)

  // Read the saved size after mount (the head script already applied it visually).
  React.useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(storageKey))
      const i = steps.indexOf(saved)
      if (i >= 0) setIndex(i)
    } catch {}
    // Keep several controls on the same page in sync.
    const onChange = (e: Event) => {
      const i = steps.indexOf((e as CustomEvent<number>).detail)
      if (i >= 0) setIndex(i)
    }
    window.addEventListener(EVENT, onChange)
    return () => window.removeEventListener(EVENT, onChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.join(","), storageKey])

  const apply = (i: number) => {
    const next = Math.min(steps.length - 1, Math.max(0, i))
    setIndex(next)
    const pct = steps[next]
    document.documentElement.style.fontSize = next === defaultStep ? "" : `${pct}%`
    try {
      if (next === defaultStep) localStorage.removeItem(storageKey)
      else localStorage.setItem(storageKey, String(pct))
    } catch {}
    window.dispatchEvent(new CustomEvent(EVENT, { detail: pct }))
    onScaleChange?.(pct)
  }

  const button =
    "relative inline-flex h-8 min-w-9 items-center justify-center rounded-full px-2.5 font-medium outline-none transition-[background-color,color,transform] duration-300 ease-spring-snappy select-none touch-manipulation " +
    "focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-90 disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none " +
    "after:absolute after:-inset-1.5 pointer-fine:after:hidden"

  return (
    <div
      role="group"
      aria-label={t.group}
      data-slot="font-size-control"
      className={cn("inline-flex items-center gap-0.5 rounded-full border bg-background p-1 shadow-xs", className)}
    >
      <button
        type="button"
        aria-label={t.smaller}
        disabled={index === 0}
        onClick={() => apply(index - 1)}
        className={cn(button, "text-sm text-muted-foreground hover:bg-accent hover:text-foreground")}
      >
        {t.glyph}-
      </button>
      <button
        type="button"
        aria-label={t.reset}
        aria-pressed={index === defaultStep}
        onClick={() => apply(defaultStep)}
        className={cn(
          button,
          "text-base",
          index === defaultStep
            ? "bg-accent text-accent-foreground shadow-[inset_0_0_0_1px_var(--border)]"
            : "text-muted-foreground hover:bg-accent hover:text-foreground"
        )}
      >
        {t.glyph}
      </button>
      <button
        type="button"
        aria-label={t.larger}
        disabled={index === steps.length - 1}
        onClick={() => apply(index + 1)}
        className={cn(button, "text-lg text-muted-foreground hover:bg-accent hover:text-foreground")}
      >
        {t.glyph}+
      </button>
      <span className="sr-only" aria-live="polite">
        {t.now} {steps[index]}%
      </span>
    </div>
  )
}

export { FontSizeControl, FontScaleScript }
