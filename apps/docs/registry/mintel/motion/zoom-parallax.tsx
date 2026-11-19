"use client"

import * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

// Hydration-safe: only switch to the static layout after mount.
function useReducedMotionSafe() {
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return mounted && prefersReduced === true
}

/**
 * Zoom-out hero reveal: full-bleed media that shrinks into a rounded card as you scroll,
 * while an optional overlay (headline) fades out. Uses `svh` so the iOS toolbar doesn't jump it.
 * Animates transform/opacity/border-radius only.
 */
function ZoomParallax({
  children,
  overlay,
  className,
  height = "200svh",
  fromScale = 1,
  toScale = 0.82,
  radius = 28,
}: {
  /** The media (image / video / any node), rendered full-bleed. */
  children: React.ReactNode
  /** Content over the media that fades out during the zoom. */
  overlay?: React.ReactNode
  className?: string
  /** Scroll distance of the effect. */
  height?: string
  fromScale?: number
  toScale?: number
  /** Final corner radius in px. */
  radius?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const scale = useTransform(scrollYProgress, [0, 0.8], [fromScale, toScale])
  const borderRadius = useTransform(scrollYProgress, [0, 0.8], [0, radius])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const overlayY = useTransform(scrollYProgress, [0, 0.35], [0, -40])

  if (reduceMotion) {
    return (
      <div className={cn("relative h-[80svh] overflow-hidden rounded-3xl", className)}>
        {children}
        {overlay && <div className="absolute inset-0 flex items-center justify-center">{overlay}</div>}
      </div>
    )
  }

  return (
    <div ref={ref} className={cn("relative", className)} style={{ height }}>
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale, borderRadius }}
          className="relative size-full overflow-hidden will-change-transform"
        >
          {children}
          {overlay && (
            <motion.div
              style={{ opacity: overlayOpacity, y: overlayY }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {overlay}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export { ZoomParallax }
