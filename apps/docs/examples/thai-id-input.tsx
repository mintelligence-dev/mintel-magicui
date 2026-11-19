"use client"

import { useState } from "react"

import { Label } from "@/registry/mintel/ui/label"
import { ThaiIdInput } from "@/registry/mintel/ui/thai-id-input"

export default function ThaiIdInputExample() {
  const [state, setState] = useState({ digits: "", valid: false })
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="citizen-id">Citizen ID</Label>
      {/* Try 1101700230708 (valid) or change the last digit */}
      <ThaiIdInput id="citizen-id" locale="en" onValueChange={(digits, valid) => setState({ digits, valid })} />
      <p className="text-xs text-muted-foreground">
        {state.digits.length}/13 digits{state.digits.length === 13 && (state.valid ? " · valid" : " · check digit does not match")}
      </p>
    </div>
  )
}
