"use client"

import { forwardRef, useRef } from "react"
import { Atom, Cloud, Palette } from "lucide-react"

import { AnimatedBeam } from "@/registry/mintel/effects/animated-beam"

const Node = forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => (
  <div ref={ref} className="z-10 flex size-14 items-center justify-center rounded-2xl border bg-card shadow-sm">
    {children}
  </div>
))
Node.displayName = "Node"

export default function AnimatedBeamExample() {
  const container = useRef<HTMLDivElement>(null)
  const from = useRef<HTMLDivElement>(null)
  const toA = useRef<HTMLDivElement>(null)
  const toB = useRef<HTMLDivElement>(null)
  return (
    <div ref={container} className="relative flex w-full max-w-md items-center justify-between p-6">
      <Node ref={from}>
        <Palette className="size-6 text-brand" />
      </Node>
      <div className="flex flex-col gap-10">
        <Node ref={toA}>
          <Atom className="size-6 text-brand-cyan" />
        </Node>
        <Node ref={toB}>
          <Cloud className="size-6 text-brand-accent" />
        </Node>
      </div>
      <AnimatedBeam containerRef={container} fromRef={from} toRef={toA} curvature={-40} />
      <AnimatedBeam containerRef={container} fromRef={from} toRef={toB} curvature={40} reverse />
    </div>
  )
}
