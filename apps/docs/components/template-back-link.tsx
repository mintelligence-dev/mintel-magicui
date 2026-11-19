"use client"

import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"

/** "Back to templates" tab; hidden when the page is shown inside the templates gallery iframe. */
export function TemplateBackLink({ href, label }: { href: string; label: string }) {
  const [embedded, setEmbedded] = useState(true)
  useEffect(() => setEmbedded(window.self !== window.top), [])
  if (embedded) return null
  // A small tab on the left edge, vertically centred: templates put headers, composers and tab bars in the
  // corners, so the edge is the one place it never covers controls. The label opens on hover/focus.
  return (
    <a
      href={href}
      className="group fixed top-1/2 left-0 z-50 inline-flex -translate-y-1/2 items-center gap-2 rounded-r-full border border-l-0 bg-background/90 py-2.5 pr-3 pl-2 text-sm font-semibold shadow-lg backdrop-blur transition-[padding] duration-300 ease-spring-snappy hover:bg-background hover:pr-4 focus-visible:pr-4"
    >
      <ArrowLeft className="size-4 shrink-0" />
      <span className="sr-only group-hover:not-sr-only group-focus-visible:not-sr-only">{label}</span>
    </a>
  )
}
