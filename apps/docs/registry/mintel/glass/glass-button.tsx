import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const glassButtonVariants = cva(
  "relative isolate inline-flex shrink-0 items-center justify-center gap-2 rounded-full border text-sm font-semibold whitespace-nowrap outline-none select-none touch-manipulation " +
    "backdrop-blur-glass backdrop-saturate-180 " +
    // inside another glass surface the parent already blurs the backdrop; skip the nested (costly) pass
    "in-data-[slot=glass-card]:backdrop-filter-none in-data-[slot=glass-navbar]:backdrop-filter-none " +
    "shadow-[inset_0_1px_0_0_var(--glass-highlight),0_8px_24px_-10px_var(--glass-shadow)] " +
    // spring press feedback; disabled for reduced motion
    "transition-[transform,background-color,box-shadow] duration-500 ease-spring-snappy active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100 " +
    "focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 " +
    "not-supports-[backdrop-filter:blur(1px)]:bg-card [@media(prefers-reduced-transparency:reduce)]:bg-card " +
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-glass-border bg-glass text-glass-foreground hover:bg-glass/80",
        tinted:
          "border-white/30 bg-brand/70 text-brand-foreground hover:bg-brand/80 dark:border-white/15",
        accent:
          "border-white/30 bg-brand-accent/70 text-brand-accent-foreground hover:bg-brand-accent/80 dark:border-white/15",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-3.5 text-xs",
        lg: "h-12 px-7 text-base",
        // 44px: minimum comfortable touch target
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function GlassButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof glassButtonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="glass-button"
      className={cn(glassButtonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { GlassButton, glassButtonVariants }
