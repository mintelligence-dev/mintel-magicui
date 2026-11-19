"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/** Page numbers to show: always first and last, `siblings` around the current page, "…" for gaps. */
function pageRange(page: number, pageCount: number, siblings = 1): (number | "…")[] {
  const total = siblings * 2 + 5
  if (pageCount <= total) return Array.from({ length: pageCount }, (_, i) => i + 1)
  const start = Math.max(2, Math.min(page - siblings, pageCount - siblings * 2 - 2))
  const end = Math.min(pageCount - 1, Math.max(page + siblings, siblings * 2 + 3))
  const middle = Array.from({ length: end - start + 1 }, (_, i) => start + i)
  return [1, ...(start > 2 ? (["…"] as const) : []), ...middle, ...(end < pageCount - 1 ? (["…"] as const) : []), pageCount]
}

const LABELS = {
  en: { nav: "Pagination", prev: "Previous", next: "Next", page: (n: number) => `Page ${n}` },
  th: { nav: "แบ่งหน้า", prev: "ก่อนหน้า", next: "ถัดไป", page: (n: number) => `หน้า ${n}` },
}

/**
 * Page navigation. Controlled: pass `page` (1-based), `pageCount` and `onPageChange`.
 * The current page gets a brand pill that springs between numbers.
 */
function Pagination({
  page,
  pageCount,
  onPageChange,
  siblings = 1,
  locale = "en",
  className,
  ...props
}: Omit<React.ComponentProps<"nav">, "onChange"> & {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  siblings?: number
  locale?: "en" | "th"
}) {
  const t = LABELS[locale]
  const go = (p: number) => onPageChange(Math.min(pageCount, Math.max(1, p)))
  const cell =
    "relative inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-sm font-medium outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40 pointer-coarse:h-10 pointer-coarse:min-w-10"

  return (
    <nav data-slot="pagination" aria-label={t.nav} className={cn("flex justify-center", className)} {...props}>
      <ul className="flex items-center gap-0.5 sm:gap-1">
        <li>
          <button type="button" className={cn(cell, "gap-1 hover:bg-muted")} onClick={() => go(page - 1)} disabled={page <= 1} aria-label={t.prev}>
            <ChevronLeftIcon className="size-4" />
            <span className="hidden sm:inline">{t.prev}</span>
          </button>
        </li>
        {pageRange(page, pageCount, siblings).map((p, i) =>
          p === "…" ? (
            <li key={`gap-${i}`} aria-hidden className="px-0.5 text-muted-foreground sm:px-1">
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                className={cn(
                  cell,
                  "tabular-nums duration-300 ease-spring-snappy",
                  p === page ? "bg-brand text-brand-foreground shadow-md shadow-brand/25" : "hover:bg-muted"
                )}
                aria-label={t.page(p)}
                aria-current={p === page ? "page" : undefined}
                onClick={() => go(p)}
              >
                {p}
              </button>
            </li>
          )
        )}
        <li>
          <button type="button" className={cn(cell, "gap-1 hover:bg-muted")} onClick={() => go(page + 1)} disabled={page >= pageCount} aria-label={t.next}>
            <span className="hidden sm:inline">{t.next}</span>
            <ChevronRightIcon className="size-4" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export { Pagination, pageRange }
