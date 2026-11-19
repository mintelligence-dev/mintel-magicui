"use client"

import { STYLE_KEY } from "@/lib/style-theme"
import { Button } from "@/registry/mintel/ui/button"

/**
 * Switches the whole docs site between the Mintel and Clarity themes. The swatch is painted with
 * --brand-gradient, so it always shows the active theme without React state (no hydration mismatch).
 */
export function StyleSwitch({ label }: { label: string }) {
  const toggle = () => {
    const root = document.documentElement
    const clarity = root.getAttribute("data-mintel-theme") !== "clarity"
    if (clarity) root.setAttribute("data-mintel-theme", "clarity")
    else root.removeAttribute("data-mintel-theme")
    try {
      if (clarity) localStorage.setItem(STYLE_KEY, "clarity")
      else localStorage.removeItem(STYLE_KEY)
    } catch {}
  }
  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={label} title={label}>
      <span
        aria-hidden
        className="size-4.5 rounded-full bg-[image:var(--brand-gradient)] shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.6)] ring-1 ring-border"
      />
    </Button>
  )
}
