"use client"

import * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"

import { cn } from "@/lib/utils"

function useReducedMotionSafe() {
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return mounted && prefersReduced === true
}

function Word({
  children,
  progress,
  range,
  dim,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  dim: number
}) {
  const opacity = useTransform(progress, range, [dim, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  )
}

type Segment = { text: string; word: boolean }

function segment(text: string, locale: string): Segment[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const seg = new Intl.Segmenter(locale, { granularity: "word" })
    const out: Segment[] = []
    for (const s of seg.segment(text)) {
      const isSpace = /^\s+$/.test(s.segment)
      // Attach punctuation to the previous word so it doesn't animate on its own.
      if (!isSpace && !s.isWordLike && out.length && out[out.length - 1].word) {
        out[out.length - 1].text += s.segment
      } else {
        out.push({ text: s.segment, word: !isSpace })
      }
    }
    return out
  }
  return text.split(/(\s+)/).filter(Boolean).map((t) => ({ text: t, word: !/^\s+$/.test(t) }))
}

/**
 * Paragraph that lights up word by word as it scrolls through the viewport.
 * Uses motion's useScroll (native ScrollTimeline where available) and animates opacity only.
 */
function ScrollRevealText({
  text,
  className,
  dim = 0.15,
  as: Tag = "p",
  locale = "th",
}: {
  text: string
  className?: string
  /** Opacity of words not yet revealed. */
  dim?: number
  as?: "p" | "h2" | "h3" | "div"
  /** Locale for word segmentation (Thai has no spaces between words). */
  locale?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] })
  // Word segmentation that also works for Thai (no spaces between words). Whitespace stays as plain
  // text so lines wrap naturally; only words become animated inline-blocks.
  const segments = React.useMemo(() => segment(text, locale), [text, locale])
  const words = segments.filter((seg) => seg.word).length
  let wordIndex = 0

  return (
    <div ref={ref}>
      <Tag className={cn("text-balance", className)} aria-label={text}>
        {reduceMotion
          ? text
          : segments.map((seg, i) => {
              if (!seg.word) return seg.text
              const n = wordIndex++
              return (
                <Word key={i} progress={scrollYProgress} range={[n / words, (n + 1) / words]} dim={dim}>
                  {seg.text}
                </Word>
              )
            })}
      </Tag>
    </div>
  )
}

export { ScrollRevealText }
