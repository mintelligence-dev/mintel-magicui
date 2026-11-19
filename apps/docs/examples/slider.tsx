"use client"

import { useState } from "react"

import { Slider } from "@/registry/mintel/ui/slider"

export default function SliderExample() {
  const [budget, setBudget] = useState([2500, 12000])
  return (
    <div className="grid w-full max-w-sm gap-10 pt-6">
      <div className="grid gap-3">
        <span className="text-sm font-medium">Volume</span>
        <Slider defaultValue={[60]} aria-label="Volume" formatValue={(v) => `${v}%`} />
      </div>
      <div className="grid gap-3">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Budget (THB)</span>
          <span className="text-muted-foreground tabular-nums">
            {budget[0].toLocaleString()} – {budget[1].toLocaleString()}
          </span>
        </div>
        <Slider value={budget} onValueChange={setBudget} min={0} max={20000} step={500} minStepsBetweenThumbs={2} formatValue={(v) => `฿${v.toLocaleString()}`} />
      </div>
    </div>
  )
}
