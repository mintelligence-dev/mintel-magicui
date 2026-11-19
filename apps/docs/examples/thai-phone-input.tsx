"use client"

import { useState } from "react"

import { Label } from "@/registry/mintel/ui/label"
import { ThaiPhoneInput } from "@/registry/mintel/ui/thai-phone-input"

export default function ThaiPhoneInputExample() {
  const [info, setInfo] = useState({ e164: "", valid: false })
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="phone">Mobile number</Label>
      {/* Paste "+66 81 234 5678" or type 0812345678 */}
      <ThaiPhoneInput id="phone" onValueChange={(_, i) => setInfo(i)} />
      <p className="font-mono text-xs text-muted-foreground">
        E.164: {info.e164 || "—"} {info.valid && "✓"}
      </p>
    </div>
  )
}
