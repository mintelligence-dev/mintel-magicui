"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

/**
 * Slider for one value or a range (pass two values). The thumb grows while dragged and shows its value
 * in a bubble (`formatValue` controls the text, `showValue={false}` hides it).
 */
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  formatValue = (v) => String(v),
  showValue = true,
  onValueChange,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  formatValue?: (value: number) => React.ReactNode
  showValue?: boolean
}) {
  const [internal, setInternal] = React.useState(value ?? defaultValue ?? [min])
  const current = value ?? internal

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      onValueChange={(v) => {
        if (value === undefined) setInternal(v)
        onValueChange?.(v)
      }}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute bg-[image:var(--brand-gradient)] data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
        />
      </SliderPrimitive.Track>
      {current.map((v, i) => (
        <SliderPrimitive.Thumb
          key={i}
          data-slot="slider-thumb"
          className={cn(
            "group/thumb relative block size-5 shrink-0 cursor-grab rounded-full border-2 border-brand bg-background shadow-md outline-none",
            "transition-[scale,box-shadow] duration-300 ease-spring-bouncy hover:scale-110 active:scale-125 active:cursor-grabbing",
            "focus-visible:ring-[4px] focus-visible:ring-ring/40 disabled:pointer-events-none motion-reduce:transition-none",
            "after:absolute after:-inset-3 pointer-fine:after:hidden"
          )}
        >
          {showValue && (
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 scale-75 rounded-md bg-foreground px-1.5 py-0.5 text-xs font-semibold whitespace-nowrap text-background opacity-0 transition-[opacity,scale] duration-200 ease-spring-snappy group-hover/thumb:scale-100 group-hover/thumb:opacity-100 group-focus-visible/thumb:scale-100 group-focus-visible/thumb:opacity-100 group-active/thumb:scale-100 group-active/thumb:opacity-100 tabular-nums"
            >
              {formatValue(v)}
            </span>
          )}
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
