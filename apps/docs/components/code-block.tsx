"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

/** Code with a copy button. `title` shows a file name above it. */
export function CodeBlock({
  code,
  title,
  className,
  copyLabel = "Copy code",
  maxHeight = "max-h-[28rem]",
}: {
  code: string
  title?: string
  className?: string
  copyLabel?: string
  maxHeight?: string
}) {
  const [copied, setCopied] = useState(false)
  return (
    <div className={cn("group relative overflow-hidden rounded-xl border bg-muted/50", className)}>
      {title && (
        <div className="border-b px-4 py-2 font-mono text-xs text-muted-foreground">{title}</div>
      )}
      <button
        type="button"
        aria-label={copyLabel}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
          } catch {}
        }}
        className={cn(
          "absolute right-2 z-10 rounded-md border bg-background/80 p-1.5 text-muted-foreground backdrop-blur transition hover:text-foreground",
          title ? "top-10" : "top-2"
        )}
      >
        {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
      </button>
      <pre tabIndex={0} className={cn("overflow-auto p-4 font-mono text-[13px] leading-relaxed", maxHeight)}>
        <code>{code}</code>
      </pre>
    </div>
  )
}
