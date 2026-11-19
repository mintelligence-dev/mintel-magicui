"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva("relative flex shrink-0 rounded-full", {
  variants: {
    size: {
      sm: "size-7 text-[0.6875rem]",
      default: "size-9 text-xs",
      lg: "size-12 text-sm",
    },
  },
  defaultVariants: { size: "default" },
})

const STATUS = {
  online: "bg-success",
  away: "bg-warning",
  busy: "bg-destructive",
  offline: "bg-muted-foreground",
} as const

/**
 * Round avatar with an image, initials fallback and optional presence dot.
 * `ring` adds the brand-gradient ring used for highlighted people.
 */
function Avatar({
  className,
  size,
  status,
  ring = false,
  children,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants> & { status?: keyof typeof STATUS; ring?: boolean }) {
  return (
    <span data-slot="avatar-wrapper" className={cn(avatarVariants({ size }), ring && "bg-[image:var(--brand-gradient)] p-0.5", className)}>
      <AvatarPrimitive.Root
        data-slot="avatar"
        className={cn("relative flex size-full overflow-hidden rounded-full", ring && "ring-2 ring-background")}
        {...props}
      >
        {children}
      </AvatarPrimitive.Root>
      {status && (
        <span
          data-slot="avatar-status"
          role="img"
          aria-label={status}
          className={cn("absolute right-0 bottom-0 size-[28%] min-h-2 min-w-2 rounded-full ring-2 ring-background", STATUS[status])}
        />
      )}
    </span>
  )
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return <AvatarPrimitive.Image data-slot="avatar-image" className={cn("aspect-square size-full object-cover", className)} {...props} />
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("flex size-full items-center justify-center rounded-full bg-brand/12 font-semibold text-brand", className)}
      {...props}
    />
  )
}

/** Overlapping stack of avatars; extra people collapse into a "+N" bubble. */
function AvatarGroup({
  className,
  max,
  children,
  ...props
}: React.ComponentProps<"div"> & { max?: number }) {
  const items = React.Children.toArray(children)
  const shown = max ? items.slice(0, max) : items
  const extra = items.length - shown.length
  return (
    <div data-slot="avatar-group" className={cn("flex items-center -space-x-2 [&>*]:ring-2 [&>*]:ring-background", className)} {...props}>
      {shown}
      {extra > 0 && (
        <span className="relative flex size-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
          +{extra}
        </span>
      )}
    </div>
  )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, avatarVariants }
