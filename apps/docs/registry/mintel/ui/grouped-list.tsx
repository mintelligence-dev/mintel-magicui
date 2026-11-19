import * as React from "react"
import { ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Settings-style list: rounded sections of rows on the `grouped` background, with separators that
 * start after the icon. Rows can be links, buttons or plain rows with any trailing control (switch …).
 */
function GroupedList({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="grouped-list" className={cn("grid gap-7 bg-grouped px-4 py-6", className)} {...props} />
}

function GroupedSection({
  header,
  footer,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"section">, "title"> & { header?: React.ReactNode; footer?: React.ReactNode }) {
  const id = React.useId()
  return (
    <section data-slot="grouped-section" aria-labelledby={header ? id : undefined} className={cn("grid gap-1.5 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-both motion-safe:duration-500 motion-safe:ease-spring-smooth", className)} {...props}>
      {header && (
        <h3 id={id} className="px-4 text-xs font-normal tracking-wide text-muted-foreground uppercase">
          {header}
        </h3>
      )}
      <ul data-slot="card" className="overflow-hidden rounded-xl bg-card text-card-foreground">
        {children}
      </ul>
      {footer && <p className="px-4 text-xs text-muted-foreground">{footer}</p>}
    </section>
  )
}

// Semantic colors only, so the tones follow the active theme.
const ICON_TONES = {
  brand: "bg-brand text-brand-foreground",
  blue: "bg-chart-1 text-white",
  purple: "bg-chart-2 text-white",
  cyan: "bg-chart-3 text-white",
  green: "bg-success text-white",
  amber: "bg-warning text-white",
  red: "bg-destructive text-white dark:bg-destructive/60",
  gray: "bg-muted-foreground text-background",
} as const

type RowContent = {
  icon?: React.ReactNode
  iconTone?: keyof typeof ICON_TONES
  title: React.ReactNode
  description?: React.ReactNode
  /** Short value on the right, e.g. "On" or "Thai". */
  value?: React.ReactNode
  /** Any control on the right (switch, badge …). Replaces the chevron. */
  trailing?: React.ReactNode
  destructive?: boolean
}

function RowInner({ icon, iconTone = "brand", title, description, value, trailing, destructive, chevron }: RowContent & { chevron: boolean }) {
  return (
    <>
      {icon && (
        <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-[0.45rem] [&_svg]:size-4", ICON_TONES[iconTone])}>
          {icon}
        </span>
      )}
      {/* The separator lives on this inner block so it starts after the icon, like native settings lists. */}
      <span className="flex min-h-11 min-w-0 flex-1 items-center gap-3 py-2.5 pr-4 group-[:not(:first-child)]/row:border-t group-[:not(:first-child)]/row:border-border">
        <span className="min-w-0 flex-1">
          <span className={cn("block truncate", destructive && "text-destructive")}>{title}</span>
          {description && <span className="block text-xs text-muted-foreground">{description}</span>}
        </span>
        {value !== undefined && <span className="shrink-0 text-muted-foreground">{value}</span>}
        {trailing}
        {chevron && !trailing && <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground/60" aria-hidden />}
      </span>
    </>
  )
}

/**
 * One row. Give it `href` (renders a link) or `onClick` (renders a button) to make it pressable with a
 * chevron; otherwise it is a plain row, e.g. with a `trailing` switch.
 */
function GroupedRow({
  href,
  onClick,
  linkComponent: LinkComponent = "a",
  className,
  ...content
}: RowContent & {
  href?: string
  onClick?: () => void
  /** Rendered instead of <a> when `href` is set, e.g. your router's Link, so navigation stays client-side. */
  linkComponent?: React.ElementType
  className?: string
}) {
  const pressable = href !== undefined || onClick !== undefined
  const inner = cn(
    "flex w-full items-center gap-3 pl-4 text-left text-sm outline-none",
    pressable && "transition-[background-color,scale] duration-200 ease-spring-snappy hover:bg-muted active:scale-[0.99] active:bg-muted focus-visible:bg-accent motion-reduce:active:scale-100"
  )
  return (
    <li data-slot="grouped-row" className={cn("group/row", className)}>
      {href !== undefined ? (
        <LinkComponent href={href} className={inner}>
          <RowInner {...content} chevron />
        </LinkComponent>
      ) : onClick ? (
        <button type="button" onClick={onClick} className={inner}>
          <RowInner {...content} chevron />
        </button>
      ) : (
        <div className={inner}>
          <RowInner {...content} chevron={false} />
        </div>
      )}
    </li>
  )
}

export { GroupedList, GroupedSection, GroupedRow }
