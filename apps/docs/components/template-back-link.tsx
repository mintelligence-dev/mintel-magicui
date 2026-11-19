"use client"

import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"

/** Floating "back to templates" link; hidden when the page is shown inside the templates gallery iframe. */
export function TemplateBackLink({ href, label }: { href: string; label: string }) {
  const [embedded, setEmbedded] = useState(true)
  useEffect(() => setEmbedded(window.self !== window.top), [])
  if (embedded) return null
  return (
    <a
      href={href}
      className="fixed bottom-[max(env(safe-area-inset-bottom),1rem)] left-4 z-50 inline-flex items-center gap-2 rounded-full border bg-background/90 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur hover:bg-background"
    >
      <ArrowLeft className="size-4" /> {label}
    </a>
  )
}
