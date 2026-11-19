"use client"

import { useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, useAnimate, useReducedMotion } from "motion/react"

import { RoundFlag } from "@/components/flags"
import { langPath, stripLang, type Lang } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const OPTIONS: { lang: Lang; label: string }[] = [
  { lang: "th", label: "ไทย" },
  { lang: "en", label: "English" },
]

const SLOT = 28 // px, one flag slot (size-7)
const xOf = (lang: Lang) => (lang === "th" ? 0 : SLOT)

/**
 * Language switch styled like a toggle. The thumb behaves like a liquid droplet: it leans toward the
 * other flag on press, stretches across both on release, then settles with a small bounce before the
 * page switches language. Keeps the current page and #section.
 */
export function LangSwitch({ lang, groupLabel }: { lang: Lang; groupLabel: string }) {
  const pathname = usePathname() || "/"
  const page = stripLang(pathname)
  const [selected, setSelected] = useState<Lang>(lang)
  const [scope, animate] = useAnimate()
  const reduceMotion = useReducedMotion()
  const busy = useRef(false)

  // Press: lean a little toward the target flag.
  const lean = (target: Lang) => {
    if (reduceMotion || busy.current || target === selected) return
    const toRight = xOf(target) > xOf(selected)
    animate(
      scope.current,
      { x: toRight ? xOf(selected) : xOf(selected) - 8, width: SLOT + 8, scaleY: 0.94 },
      { type: "spring", stiffness: 500, damping: 30 }
    )
  }

  const release = () => {
    if (reduceMotion || busy.current) return
    animate(scope.current, { x: xOf(selected), width: SLOT, scaleY: 1 }, { type: "spring", stiffness: 500, damping: 30 })
  }

  const go = async (target: Lang) => {
    if (busy.current || target === selected) return
    busy.current = true
    const href = langPath(target, page) + window.location.hash
    const from = xOf(selected)
    const to = xOf(target)
    setSelected(target)
    if (!reduceMotion) {
      const toRight = to > from
      // Stretch across both slots (slightly flattened), then contract onto the target with an overshoot.
      await animate(
        scope.current,
        {
          x: toRight ? [from, from, to + 2, to] : [from, to, to, to],
          width: [SLOT, SLOT * 2, SLOT - 2, SLOT],
          scaleY: [1, 0.82, 1.06, 1],
        },
        { duration: 0.5, times: [0, 0.42, 0.78, 1], ease: [0.32, 0.72, 0, 1] }
      )
    }
    window.location.assign(href)
  }

  return (
    <div role="radiogroup" aria-label={groupLabel} className="relative flex h-9 items-center rounded-full bg-muted p-1">
      <motion.span
        ref={scope}
        aria-hidden
        initial={false}
        style={{ x: xOf(lang), width: SLOT }}
        className="absolute top-1 left-1 h-7 rounded-full bg-background shadow-[0_1px_3px_rgb(0_0_0/0.18),0_0_0_1px_rgb(0_0_0/0.04)] dark:bg-white/20"
      />
      {OPTIONS.map(({ lang: target, label }) => {
        const active = target === selected
        return (
          <a
            key={target}
            href={langPath(target, page)}
            hrefLang={target}
            lang={target}
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onPointerDown={() => lean(target)}
            onPointerLeave={release}
            onPointerCancel={release}
            onClick={(e) => {
              e.preventDefault()
              go(target)
            }}
            className={cn(
              "relative z-10 flex size-7 items-center justify-center rounded-full outline-none select-none touch-manipulation",
              "focus-visible:ring-[3px] focus-visible:ring-ring/50",
              // 44px touch target on phones without changing the visual size
              "after:absolute after:-inset-2 pointer-fine:after:hidden"
            )}
          >
            <RoundFlag
              lang={target}
              className={cn(
                "size-5 transition-[opacity,filter,transform] duration-300 ease-spring-snappy motion-reduce:transition-none",
                active ? "scale-100 opacity-100" : "scale-90 opacity-50 grayscale-[40%] hover:opacity-90 hover:grayscale-0"
              )}
            />
          </a>
        )
      })}
    </div>
  )
}
