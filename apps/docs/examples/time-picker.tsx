"use client"

import { useState } from "react"

import { Label } from "@/registry/mintel/ui/label"
import { TimePicker } from "@/registry/mintel/ui/time-picker"

export default function TimePickerExample() {
  const [time, setTime] = useState("09:30")
  return (
    <div className="grid w-full max-w-48 gap-2">
      <Label htmlFor="appointment">Appointment time</Label>
      <TimePicker id="appointment" locale="en" value={time} onValueChange={setTime} min="08:30" max="16:30" step={30} />
      <p className="text-xs text-muted-foreground">
        Office hours 08:30–16:30. Value: <code className="font-mono">{time || "empty"}</code>
      </p>
    </div>
  )
}
