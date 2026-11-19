"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

export function CopyCommand({
  command,
  className,
  label = "Copy command",
}: {
  command: string
  className?: string
  label?: string
}) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }
  return (
    <div
      className={cn(
        "group flex items-center gap-2 rounded-lg border bg-muted/60 px-3 py-2 font-mono text-xs",
        className
      )}
    >
      <span className="text-brand select-none">$</span>
      <code className="min-w-0 flex-1 truncate text-foreground/90">{command}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={label}
        className="shrink-0 rounded p-1 text-muted-foreground transition hover:bg-background hover:text-foreground"
      >
        {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  )
}
