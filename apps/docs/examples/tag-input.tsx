"use client"

import { useState } from "react"

import { Label } from "@/registry/mintel/ui/label"
import { TagInput } from "@/registry/mintel/ui/tag-input"

const SUGGESTIONS = ["Refund", "Shipping", "VIP", "Complaint", "Billing", "Warranty", "คืนเงิน", "จัดส่ง"]

export default function TagInputExample() {
  const [tags, setTags] = useState(["VIP", "Shipping"])
  return (
    <div className="grid w-full max-w-md gap-2">
      <Label>Case tags</Label>
      {/* Enter / comma adds, Backspace removes the last, paste "a, b, c" adds several */}
      <TagInput value={tags} onValueChange={setTags} suggestions={SUGGESTIONS} max={8} locale="en" aria-label="Case tags" />
      <p className="text-xs text-muted-foreground">{tags.length}/8 tags</p>
    </div>
  )
}
