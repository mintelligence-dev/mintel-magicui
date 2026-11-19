"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Frosted glass surface.
 *
 * - Works everywhere via `backdrop-filter: blur() saturate()` (with -webkit- prefix for iOS Safari).
 * - Falls back to the solid `--card` color when the browser lacks backdrop-filter or the user
 *   enables "reduce transparency".
 * - `refraction` adds an edge-lens distortion (SVG displacement map). Chromium + mouse only;
 *   other browsers and touch devices keep the plain frosted look.
 */
const glassSurface =
  "relative isolate border border-glass-border bg-glass text-glass-foreground backdrop-blur-glass backdrop-saturate-180 " +
  "shadow-[inset_0_1px_0_0_var(--glass-highlight),inset_0_-1px_0_0_color-mix(in_oklab,var(--glass-highlight)_40%,transparent),0_12px_40px_-12px_var(--glass-shadow)] " +
  "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-[linear-gradient(135deg,var(--glass-highlight)_0%,transparent_45%)] before:opacity-40 " +
  "not-supports-[backdrop-filter:blur(1px)]:bg-card [@media(prefers-reduced-transparency:reduce)]:bg-card [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none"

function useRefractionSupport(enabled: boolean) {
  const [supported, setSupported] = React.useState(false)
  React.useEffect(() => {
    if (!enabled) return
    const brands = (navigator as Navigator & { userAgentData?: { brands?: { brand: string }[] } })
      .userAgentData?.brands
    const isChromium = !!brands?.some((b) => /Chromium/i.test(b.brand))
    const finePointer = window.matchMedia("(pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-transparency: reduce)").matches
    setSupported(isChromium && finePointer && !reduced)
  }, [enabled])
  return supported
}

function displacementMap(w: number, h: number, radius: number) {
  const edge = Math.max(8, Math.min(w, h) * 0.12)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="r" x1="0" x2="1"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#f00"/></linearGradient><linearGradient id="b" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#00f"/></linearGradient></defs><rect width="${w}" height="${h}" fill="#000"/><rect width="${w}" height="${h}" rx="${radius}" fill="url(#r)"/><rect width="${w}" height="${h}" rx="${radius}" fill="url(#b)" style="mix-blend-mode:difference"/><rect x="${edge}" y="${edge}" width="${w - edge * 2}" height="${h - edge * 2}" rx="${radius}" fill="#808080" style="filter:blur(${edge / 2}px)"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

function GlassCard({
  className,
  children,
  refraction = false,
  refractionStrength = 40,
  ...props
}: React.ComponentProps<"div"> & {
  /** Edge-lens distortion of the content behind the glass (Chromium + mouse only). */
  refraction?: boolean
  /** Displacement in px. */
  refractionStrength?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const filterId = `glass-${React.useId().replace(/:/g, "")}`
  const supported = useRefractionSupport(refraction)
  const [size, setSize] = React.useState<{ w: number; h: number; r: number } | null>(null)

  React.useEffect(() => {
    if (!supported || !ref.current) return
    const el = ref.current
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect()
      const r = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0
      setSize({ w: Math.round(rect.width), h: Math.round(rect.height), r })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [supported])

  return (
    <div
      ref={ref}
      data-slot="glass-card"
      className={cn(glassSurface, "rounded-2xl", className)}
      {...props}
    >
      {supported && size && (
        <>
          <svg aria-hidden className="pointer-events-none absolute size-0">
            <filter id={filterId} colorInterpolationFilters="sRGB">
              <feImage
                href={displacementMap(size.w, size.h, size.r)}
                x="0"
                y="0"
                width={size.w}
                height={size.h}
                result="map"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale={-refractionStrength}
                xChannelSelector="R"
                yChannelSelector="B"
              />
            </filter>
          </svg>
          {/* Separate layer: if the url() filter is unsupported only this layer is affected. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-20 rounded-[inherit]"
            style={{ backdropFilter: `url(#${filterId})` }}
          />
        </>
      )}
      {children}
    </div>
  )
}

export { GlassCard, glassSurface }
