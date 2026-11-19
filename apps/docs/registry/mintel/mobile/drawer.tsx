"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { AnimatePresence, motion, useDragControls, useReducedMotion } from "motion/react"

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
    [controlled, onOpenChange]
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

function DrawerContent({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof DialogPrimitive.Content>, "forceMount">) {
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
                className
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
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-header" className={cn("flex flex-col gap-1.5 pb-4 text-center", className)} {...props} />
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
