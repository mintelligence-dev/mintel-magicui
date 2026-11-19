"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"

import { DatePicker, DateRangePicker } from "@/registry/mintel/ui/date-picker"

export default function DatePickerExample() {
  const [date, setDate] = useState<Date | undefined>()
  const [range, setRange] = useState<DateRange | undefined>()
  return (
    <div className="grid w-full max-w-xs gap-3">
      {/* Thai (default): shows Buddhist Era years, e.g. 19 พ.ย. 2569 */}
      <DatePicker value={date} onValueChange={setDate} />
      {/* English: Common Era, e.g. 19 Nov 2026 */}
      <DatePicker locale="en" value={date} onValueChange={setDate} />
      <DateRangePicker locale="en" value={range} onValueChange={setRange} />
    </div>
  )
}
