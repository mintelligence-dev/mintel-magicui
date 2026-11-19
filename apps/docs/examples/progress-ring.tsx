"use client"

import { useState } from "react"

import { Button } from "@/registry/mintel/ui/button"
import { ProgressRing } from "@/registry/mintel/ui/progress-ring"

export default function ProgressRingExample() {
  const [win, setWin] = useState(72)
  return (
    <div className="grid justify-items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <ProgressRing value={win} label="Win rate" size="lg" />
        <ProgressRing value={34} label="CSAT goal" tone="status" />
        <ProgressRing value={91} tone="status" size="sm" />
      </div>
      <Button variant="outline" size="sm" onClick={() => setWin(Math.round(Math.random() * 100))}>
        Shuffle
      </Button>
    </div>
  )
}
