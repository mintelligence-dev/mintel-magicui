"use client"

import { useState } from "react"

import { SignaturePad } from "@/registry/mintel/ui/signature-pad"

export default function SignaturePadExample() {
  const [signature, setSignature] = useState<string | null>(null)
  return (
    <div className="grid w-full max-w-md gap-3">
      <p className="text-sm font-medium">Customer signature</p>
      <SignaturePad locale="en" onChange={setSignature} />
      <p role="status" className="text-xs text-muted-foreground">
        {signature ? `Signature captured (${Math.round(signature.length / 1024)} KB PNG)` : "Not signed yet"}
      </p>
    </div>
  )
}
