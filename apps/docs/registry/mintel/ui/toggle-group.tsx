"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

import { cn } from "@/lib/utils"

/**
 * Buttons that stay pressed: `type="single"` (one at a time, e.g. alignment) or `type="multiple"`
 * (filters, formatting). Pressed items take the brand tint with a small spring.
 */
function ToggleGroup({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn("inline-flex w-fit flex-wrap items-center gap-1 rounded-lg border bg-background p-1", className)}
      {...props}
    />
  )
}

function ToggleGroupItem({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        "inline-flex h-8 min-w-8 items-center justify-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-muted-foreground outline-none",
        "transition-[color,background-color,scale] duration-300 ease-spring-snappy hover:bg-muted hover:text-foreground active:scale-95",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
        "data-[state=on]:bg-brand/12 data-[state=on]:text-brand motion-reduce:transition-none motion-reduce:active:scale-100",
        "pointer-coarse:h-10 pointer-coarse:min-w-10 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
