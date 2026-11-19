"use client"

import { useState } from "react"

import { SegmentedControl } from "@/registry/mintel/glass/segmented-control"

export default function SegmentedControlExample() {
  const [period, setPeriod] = useState("week")
  return (
    <div className="grid gap-4">
      <SegmentedControl
        aria-label="Period"
        value={period}
        onValueChange={setPeriod}
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
      />
      <SegmentedControl
        aria-label="View"
        variant="brand"
        defaultValue="list"
        options={[
          { value: "list", label: "List" },
          { value: "board", label: "Board" },
        ]}
      />
    </div>
  )
}
