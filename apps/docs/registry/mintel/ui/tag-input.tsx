"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const LABELS = {
  th: { placeholder: "พิมพ์แล้วกด Enter", remove: "ลบ", suggestions: "คำแนะนำ" },
  en: { placeholder: "Type and press Enter", remove: "Remove", suggestions: "Suggestions" },
}

/**
 * Free-form tags (case tags, recipients, keywords). Enter, comma or Tab adds; Backspace on an empty field
 * removes the last; pasting "a, b, c" adds each. Duplicates are ignored. Optional `suggestions` appear
 * as you type (arrow keys + Enter to pick).
 */
function TagInput({
  value: controlled,
  defaultValue = [],
  onValueChange,
  suggestions = [],
  max,
  placeholder,
  locale = "th",
  disabled,
  className,
  "aria-label": ariaLabel,
}: {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (tags: string[]) => void
  suggestions?: string[]
  max?: number
  placeholder?: string
  locale?: "th" | "en"
  disabled?: boolean
  className?: string
  "aria-label"?: string
}) {
  const t = LABELS[locale]
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const tags = controlled ?? uncontrolled
  const [draft, setDraft] = React.useState("")
  // -1: nothing picked, so Enter adds what was typed; arrow keys move into the suggestions.
  const [active, setActive] = React.useState(-1)
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listId = React.useId()
  const full = max !== undefined && tags.length >= max

  const set = (next: string[]) => {
    if (controlled === undefined) setUncontrolled(next)
    onValueChange?.(next)
  }
  const add = (raw: string[]) => {
    const next = [...tags]
    for (const r of raw) {
      const tag = r.trim()
      if (!tag || next.some((x) => x.toLowerCase() === tag.toLowerCase())) continue
      if (max !== undefined && next.length >= max) break
      next.push(tag)
    }
    if (next.length !== tags.length) set(next)
    setDraft("")
    setActive(-1)
  }

  const matches = draft && open
    ? suggestions.filter((s) => s.toLowerCase().includes(draft.toLowerCase()) && !tags.some((t) => t.toLowerCase() === s.toLowerCase())).slice(0, 6)
    : []

  return (
    <div className={cn("relative", className)}>
      <div
        data-slot="tag-input"
        onClick={() => inputRef.current?.focus()}
        className={cn(
          "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-2 py-1.5 shadow-xs transition-[border-color,box-shadow] duration-200",
          "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 dark:bg-input/30",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-brand/12 py-0.5 pr-1 pl-2.5 text-sm font-medium text-brand motion-safe:animate-in motion-safe:zoom-in-75 motion-safe:fade-in-0 motion-safe:duration-300 motion-safe:ease-spring-bouncy"
          >
            {tag}
            <button
              type="button"
              aria-label={`${t.remove} ${tag}`}
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation()
                set(tags.filter((x) => x !== tag))
              }}
              className="relative flex size-4 items-center justify-center rounded-full transition-colors after:absolute after:-inset-2 hover:bg-brand/20 pointer-fine:after:hidden"
            >
              <XIcon className="size-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={draft}
          disabled={disabled}
          // At the limit the field stays focusable (read-only), so focus is not thrown to the page.
          readOnly={full}
          aria-activedescendant={active >= 0 && matches[active] ? `${listId}-${active}` : undefined}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            // Keep what was typed, but close the suggestions.
            setOpen(false)
            setActive(-1)
          }}
          aria-label={ariaLabel ?? placeholder ?? t.placeholder}
          aria-autocomplete={suggestions.length ? "list" : undefined}
          aria-controls={matches.length ? listId : undefined}
          aria-expanded={suggestions.length ? matches.length > 0 : undefined}
          role={suggestions.length ? "combobox" : undefined}
          placeholder={tags.length ? "" : placeholder ?? t.placeholder}
          onChange={(e) => {
            const v = e.target.value
            if (v.includes(",")) add(v.split(","))
            else {
              setDraft(v)
              setActive(-1)
            }
          }}
          onPaste={(e) => {
            const text = e.clipboardData.getData("text")
            if (/[,\n]/.test(text)) {
              e.preventDefault()
              add(text.split(/[,\n]/))
            }
          }}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return
            if (e.key === "ArrowDown" && matches.length) {
              e.preventDefault()
              setActive((a) => (a + 1) % matches.length)
            } else if (e.key === "ArrowUp" && matches.length) {
              e.preventDefault()
              setActive((a) => (a <= 0 ? matches.length - 1 : a - 1))
            } else if (e.key === "Enter" || (e.key === "Tab" && draft)) {
              if (!draft && e.key === "Enter") return
              e.preventDefault()
              add([matches[active] ?? draft])
            } else if (e.key === "Backspace" && !draft && tags.length) {
              set(tags.slice(0, -1))
            } else if (e.key === "Escape") {
              setDraft("")
            }
          }}
          className="h-6 min-w-24 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      {matches.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          aria-label={t.suggestions}
          className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-lg border bg-popover p-1 text-sm shadow-lg motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1"
        >
          {matches.map((m, i) => (
            <li
              key={m}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault()
                add([m])
              }}
              onMouseEnter={() => setActive(i)}
              className={cn("cursor-default rounded-md px-2.5 py-1.5", i === active && "bg-accent text-accent-foreground")}
            >
              {m}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { TagInput }
