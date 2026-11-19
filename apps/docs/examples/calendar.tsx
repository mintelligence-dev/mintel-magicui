"use client"

import { useEffect, useState } from "react"

import { Calendar } from "@/registry/mintel/ui/calendar"

// Thai with Buddhist Era years by default. Pass `era="gregorian"` or another react-day-picker locale to change it.
export default function CalendarExample() {
  // Today is picked after mount, so the prerendered HTML does not depend on the build date.
  const [date, setDate] = useState<Date | undefined>()
  useEffect(() => setDate(new Date()), [])
  return <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-xl border" />
}
