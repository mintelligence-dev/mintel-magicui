"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { AnimatePresence, animate, motion, useDragControls, useMotionValue, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

// Decelerate curve = tokens.motion.easing.out in @mintelligence-dev/tokens.
const EASE_OUT = [0.32, 0.72, 0, 1] as const

type DrawerContextValue = { open: boolean; setOpen: (open: boolean) => void }
const DrawerContext = React.createContext<DrawerContextValue | null>(null)

/**
 * Bottom sheet for mobile. Built on Radix Dialog (focus trap, scroll lock, Esc, aria) with a
 * motion drag-to-dismiss handle. Dragging starts only from the handle/header so content inside
 * can scroll normally. Pads for the home indicator via env(safe-area-inset-bottom).
 */
function Drawer({
  open: controlled,
  defaultOpen = false,
  onOpenChange,
  children,
}: {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen)
  const open = controlled ?? uncontrolled
  const setOpen = React.useCallback(
    (o: boolean) => {
      if (controlled === undefined) setUncontrolled(o)
      onOpenChange?.(o)
    },
    [controlled, onOpenChange],
  )
  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        {children}
      </DialogPrimitive.Root>
    </DrawerContext.Provider>
  )
}

const DrawerTrigger = DialogPrimitive.Trigger
const DrawerClose = DialogPrimitive.Close

// Same values as tokens.motion.spring.smooth in @mintelligence-dev/tokens.
const SNAP_SPRING = {
  type: "spring",
  stiffness: 260,
  damping: 32,
  mass: 1,
} as const

/**
 * Sheet that rests at several heights. `snapPoints` are fractions of the viewport height (e.g. [0.4, 0.9]);
 * dragging settles on the nearest one (velocity counts), dragging below the lowest closes it, and the
 * handle is a button that steps to the next height for keyboard and screen-reader users.
 */
function SnapPanel({
  snapPoints,
  defaultSnapPoint = 0,
  onSnapPointChange,
  className,
  children,
  reduceMotion,
  onClose,
  labels,
}: {
  snapPoints: number[]
  defaultSnapPoint?: number
  onSnapPointChange?: (index: number) => void
  className?: string
  children: React.ReactNode
  reduceMotion: boolean
  onClose: () => void
  labels: { expand: string; collapse: string }
}) {
  const points = React.useMemo(() => [...snapPoints].sort((a, b) => a - b), [snapPoints])
  const top = points[points.length - 1]
  const controls = useDragControls()
  const [height, setHeight] = React.useState(0)
  const [index, setIndex] = React.useState(Math.min(defaultSnapPoint, points.length - 1))
  const y = useMotionValue(0)
  const offset = React.useCallback((i: number) => (top - points[i]) * height, [top, points, height])

  React.useEffect(() => {
    const measure = () => setHeight(window.innerHeight)
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  React.useEffect(() => {
    if (!height) return
    const target = offset(index)
    if (reduceMotion || y.get() === 0) y.set(target)
    else animate(y, target, SNAP_SPRING)
  }, [height, index, offset, reduceMotion, y])

  const goTo = (i: number) => {
    setIndex(i)
    onSnapPointChange?.(i)
    // Re-run the settle animation even when the index is unchanged.
    if (i === index) {
      if (reduceMotion) y.set(offset(i))
      else animate(y, offset(i), SNAP_SPRING)
    }
  }

  return (
    <motion.div
      drag="y"
      dragListener={false}
      dragControls={controls}
      dragConstraints={{ top: 0, bottom: height }}
      dragElastic={{ top: 0.04, bottom: 0 }}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        // Velocity nudges the target, capped so a flick moves at most about one step.
        const fling = Math.max(-height * 0.2, Math.min(height * 0.2, info.velocity.y * 0.15))
        const projected = y.get() + fling
        if (projected > offset(0) + height * 0.12) return onClose()
        let nearest = 0
        points.forEach((_, i) => {
          if (Math.abs(offset(i) - projected) < Math.abs(offset(nearest) - projected)) nearest = i
        })
        goTo(nearest)
      }}
      style={{ y, height: `${top * 100}svh` }}
      className={cn(
        "mx-auto flex w-full max-w-lg flex-col rounded-t-3xl border border-b-0 bg-background shadow-2xl",
        "pb-[max(env(safe-area-inset-bottom),1rem)]",
        className,
      )}
    >
      <button
        type="button"
        onPointerDown={(e) => controls.start(e)}
        onClick={() => goTo(index === points.length - 1 ? 0 : index + 1)}
        aria-label={index === points.length - 1 ? labels.collapse : labels.expand}
        className="flex shrink-0 cursor-grab touch-none justify-center rounded-t-3xl pt-3 pb-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 active:cursor-grabbing"
      >
        <span className="h-1.5 w-11 rounded-full bg-muted-foreground/30" />
      </button>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5">{children}</div>
    </motion.div>
  )
}

function DrawerContent({
  className,
  children,
  snapPoints,
  defaultSnapPoint,
  onSnapPointChange,
  snapLabels = { expand: "Expand", collapse: "Collapse" },
  ...props
}: Omit<React.ComponentProps<typeof DialogPrimitive.Content>, "forceMount"> & {
  /** Resting heights as fractions of the viewport (e.g. [0.4, 0.9]). Omit for a sheet that fits its content. */
  snapPoints?: number[]
  /** Index into the sorted snapPoints to open at. */
  defaultSnapPoint?: number
  onSnapPointChange?: (index: number) => void
  /** Accessible names for the handle button. */
  snapLabels?: { expand: string; collapse: string }
}) {
  const ctx = React.useContext(DrawerContext)
  if (!ctx) throw new Error("DrawerContent must be used inside <Drawer>")
  const reduceMotion = useReducedMotion()
  const controls = useDragControls()
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.5, ease: EASE_OUT }

  return (
    <AnimatePresence>
      {ctx.open && (
        <DialogPrimitive.Portal forceMount>
          <DialogPrimitive.Overlay forceMount className="fixed inset-0 z-50">
            <motion.div
              className="size-full bg-black/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
            />
          </DialogPrimitive.Overlay>
          <DialogPrimitive.Content
            forceMount
            data-slot="drawer-content"
            className="fixed inset-x-0 bottom-0 z-50 outline-none"
            {...props}
          >
            {snapPoints?.length ? (
              <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={transition}>
                <SnapPanel
                  snapPoints={snapPoints}
                  defaultSnapPoint={defaultSnapPoint}
                  onSnapPointChange={onSnapPointChange}
                  className={className}
                  reduceMotion={!!reduceMotion}
                  onClose={() => ctx.setOpen(false)}
                  labels={snapLabels}
                >
                  {children}
                </SnapPanel>
              </motion.div>
            ) : (
              <motion.div
                drag="y"
                dragListener={false}
                dragControls={controls}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0.04, bottom: 0.7 }}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 110 || info.velocity.y > 500) ctx.setOpen(false)
                }}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={transition}
                className={cn(
                  "mx-auto flex max-h-[90svh] w-full max-w-lg flex-col rounded-t-3xl border border-b-0 bg-background shadow-2xl",
                  "pb-[max(env(safe-area-inset-bottom),1rem)]",
                  className,
                )}
              >
                <div
                  onPointerDown={(e) => controls.start(e)}
                  className="flex shrink-0 cursor-grab touch-none justify-center pt-3 pb-2 active:cursor-grabbing"
                  aria-hidden
                >
                  <span className="h-1.5 w-11 rounded-full bg-muted-foreground/30" />
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5">{children}</div>
              </motion.div>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="drawer-header" className={cn("flex flex-col gap-1.5 pb-4 text-center", className)} {...props} />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-footer" className={cn("mt-auto flex flex-col gap-2 pt-4", className)} {...props} />
}

function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="drawer-title"
      className={cn("font-heading text-lg font-semibold", className)}
      {...props}
    />
  )
}

function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export { Drawer, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription }
