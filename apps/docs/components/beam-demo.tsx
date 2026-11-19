"use client"

import { forwardRef, useRef } from "react"
import { Atom, Cloud, Palette } from "lucide-react"

import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/registry/mintel/magicui/animated-beam"

const Node = forwardRef<HTMLDivElement, { className?: string; children: React.ReactNode; label: string }>(
  ({ className, children, label }, ref) => (
    <div className="z-10 flex flex-col items-center gap-2">
      <div
        ref={ref}
        className={cn(
          "flex size-14 items-center justify-center rounded-2xl border bg-card shadow-[0_0_24px_-12px_var(--brand)]",
          className
        )}
      >
        {children}
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  )
)
Node.displayName = "Node"

export function BeamDemo() {
  const container = useRef<HTMLDivElement>(null)
  const tokens = useRef<HTMLDivElement>(null)
  const react = useRef<HTMLDivElement>(null)
  const lwc = useRef<HTMLDivElement>(null)

  return (
    <div ref={container} className="relative flex w-full items-center justify-between px-4 py-8 sm:px-10">
      <Node ref={tokens} label="tokens.json" className="size-16 border-brand/40">
        <Palette className="size-7 text-brand" />
      </Node>
      <div className="flex flex-col gap-10">
        <Node ref={react} label="React / Next.js">
          <Atom className="size-6 text-brand-cyan" />
        </Node>
        <Node ref={lwc} label="Salesforce LWC">
          <Cloud className="size-6 text-brand-accent" />
        </Node>
      </div>
      <AnimatedBeam containerRef={container} fromRef={tokens} toRef={react} curvature={-40} />
      <AnimatedBeam containerRef={container} fromRef={tokens} toRef={lwc} curvature={40} reverse />
    </div>
  )
}
