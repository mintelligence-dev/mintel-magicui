import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Friendly "nothing here yet" block: an icon in a soft brand halo, a title, a short
 * description and an optional action. Use inside cards, tables or whole pages.
 */
function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed px-6 py-10 text-center motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-500",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="relative mb-3 flex size-14 items-center justify-center motion-safe:animate-in motion-safe:zoom-in-75 motion-safe:duration-700 motion-safe:ease-spring-bouncy">
          <span aria-hidden className="absolute inset-0 rounded-full bg-[image:var(--brand-gradient)] opacity-15 blur-md" />
          <span className="relative flex size-12 items-center justify-center rounded-2xl border bg-background text-brand shadow-sm [&_svg]:size-6">
            {icon}
          </span>
        </div>
      )}
      <p className="font-heading font-semibold">{title}</p>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-4 flex flex-wrap justify-center gap-2">{action}</div>}
    </div>
  )
}

export { EmptyState }
