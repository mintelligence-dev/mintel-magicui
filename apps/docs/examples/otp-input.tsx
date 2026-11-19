"use client"

import { useState } from "react"

import { OtpInput } from "@/registry/mintel/ui/otp-input"

export default function OtpInputExample() {
  const [code, setCode] = useState("")
  const [status, setStatus] = useState<"idle" | "ok" | "wrong">("idle")
  return (
    <div className="grid justify-items-center gap-3">
      <p className="text-sm text-muted-foreground">We sent a code to 081-234-5678 (try 123456)</p>
      <OtpInput
        value={code}
        onValueChange={(v) => {
          setCode(v)
          setStatus("idle")
        }}
        onComplete={(v) => setStatus(v === "123456" ? "ok" : "wrong")}
        invalid={status === "wrong"}
        aria-label="Verification code"
      />
      <p role="status" className="h-5 text-sm">
        {status === "ok" && <span className="text-success">Verified</span>}
        {status === "wrong" && <span className="text-destructive">That code is not right</span>}
      </p>
    </div>
  )
}
