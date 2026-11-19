"use client"

import { useState } from "react"

import { Calendar } from "@/registry/mintel/ui/calendar"

// Thai with Buddhist Era years by default. Pass `era="gregorian"` or another react-day-picker locale to change it.
export default function CalendarExample() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-xl border" />
}
