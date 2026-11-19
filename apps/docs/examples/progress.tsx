"use client"

import { useEffect, useState } from "react"

import { Progress } from "@/registry/mintel/ui/progress"

export default function ProgressExample() {
  const [upload, setUpload] = useState(12)
  useEffect(() => {
    const id = setInterval(() => setUpload((v) => (v >= 100 ? 12 : Math.min(100, v + 11))), 900)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="grid w-full max-w-sm gap-5 text-sm">
      <div className="grid gap-1.5">
        <div className="flex justify-between">
          <span>Uploading receipt.pdf</span>
          <span className="text-muted-foreground tabular-nums">{upload}%</span>
        </div>
        <Progress value={upload} aria-label="Upload" />
      </div>
      <div className="grid gap-1.5">
        <span>SLA used</span>
        <Progress value={82} tone="warning" aria-label="SLA used" />
      </div>
      <div className="grid gap-1.5">
        <span>Syncing with Salesforce…</span>
        <Progress size="sm" aria-label="Syncing" />
      </div>
    </div>
  )
}
