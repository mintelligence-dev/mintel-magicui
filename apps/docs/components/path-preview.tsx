"use client"

import { useState } from "react"

import { Stepper } from "@/registry/mintel/ui/stepper"

const STAGES = ["New", "Working", "Escalated", "Closed"].map((s) => ({ value: s, label: s }))

/** React twin of mintelPath, for the Salesforce guide preview. */
export function PathPreview() {
  const [current, setCurrent] = useState("Working")
  return <Stepper steps={STAGES} value={current} onStepClick={setCurrent} aria-label="Case status" className="w-full" />
}
