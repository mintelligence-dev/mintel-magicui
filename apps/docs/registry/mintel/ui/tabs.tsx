"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-2", className)} {...props} />
}

/**
 * The active tab's background is one indicator that springs between tabs (CSS transition with the
 * brand spring curve; instant under reduced motion). Until it has measured, the active tab paints its
 * own background, so there is no flash before hydration.
 */
function TabsList({ className, children, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  const listRef = React.useRef<HTMLDivElement>(null)
  const [box, setBox] = React.useState<{ x: number; y: number; w: number; h: number } | null>(null)

  React.useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => {
      const active = list.querySelector<HTMLElement>('[role="tab"][data-state="active"]')
      if (!active) return setBox(null)
      setBox({ x: active.offsetLeft, y: active.offsetTop, w: active.offsetWidth, h: active.offsetHeight })
    }
    measure()
    // Follow selection changes (data-state) and size changes (fonts loading, resizing, text-size control).
    const mutations = new MutationObserver(measure)
    mutations.observe(list, { subtree: true, attributes: true, attributeFilter: ["data-state"] })
    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure)
    resize?.observe(list)
    return () => {
      mutations.disconnect()
      resize?.disconnect()
    }
  }, [])

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      data-indicator={box ? "" : undefined}
      className={cn(
        "relative inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-[3px] text-muted-foreground",
        className
      )}
      {...props}
    >
      {box && (
        <span
          aria-hidden
          data-slot="tabs-indicator"
          className="pointer-events-none absolute top-0 left-0 rounded-md border border-transparent bg-background shadow-sm transition-[translate,width,height] duration-500 ease-spring-snappy motion-reduce:transition-none dark:border-input dark:bg-input/30"
          style={{ translate: `${box.x}px ${box.y}px`, width: box.w, height: box.h }}
        />
      )}
      {children}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative z-10 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-3 py-1 text-sm font-medium whitespace-nowrap text-foreground/70 transition-[color,box-shadow,background-color,scale] duration-300 ease-spring-snappy hover:text-foreground active:scale-[0.97] motion-reduce:active:scale-100 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-brand not-in-data-indicator:data-[state=active]:bg-background not-in-data-indicator:data-[state=active]:shadow-sm dark:not-in-data-indicator:data-[state=active]:border-input dark:not-in-data-indicator:data-[state=active]:bg-input/30 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "flex-1 outline-none data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2 data-[state=active]:duration-300 data-[state=active]:ease-spring-smooth",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
