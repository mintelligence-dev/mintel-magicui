import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn("flex flex-wrap items-center gap-1.5 text-sm break-words text-muted-foreground sm:gap-2", className)}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="breadcrumb-item" className={cn("inline-flex items-center gap-1.5", className)} {...props} />
}

/** A link. It can render your router's Link (Next.js, React Router …) instead of <a>; see the props below. */
function BreadcrumbLink({ asChild, className, ...props }: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a"
  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("rounded-sm transition-colors hover:text-brand focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none", className)}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
  return (
    <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5 text-muted-foreground/60", className)} {...props}>
      {children ?? <ChevronRightIcon />}
    </li>
  )
}

/** Stands for the levels left out of a long trail. `label` is what screen readers say (Thai by default). */
function BreadcrumbEllipsis({ className, label = "ระดับที่ย่อไว้", ...props }: React.ComponentProps<"span"> & { label?: string }) {
  return (
    <span data-slot="breadcrumb-ellipsis" role="img" aria-label={label} className={cn("flex size-6 items-center justify-center", className)} {...props}>
      <MoreHorizontalIcon aria-hidden className="size-4" />
    </span>
  )
}

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis }
