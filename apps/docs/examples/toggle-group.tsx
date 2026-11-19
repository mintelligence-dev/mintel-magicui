"use client"

import { useState } from "react"
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/registry/mintel/ui/toggle-group"

export default function ToggleGroupExample() {
  const [channels, setChannels] = useState(["line", "facebook"])
  return (
    <div className="grid justify-items-center gap-5">
      <div className="flex flex-wrap justify-center gap-3">
        <ToggleGroup type="multiple" aria-label="Formatting">
          <ToggleGroupItem value="bold" aria-label="Bold"><Bold /></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic"><Italic /></ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline"><Underline /></ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single" defaultValue="left" aria-label="Alignment">
          <ToggleGroupItem value="left" aria-label="Align left"><AlignLeft /></ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center"><AlignCenter /></ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right"><AlignRight /></ToggleGroupItem>
        </ToggleGroup>
      </div>
      <ToggleGroup type="multiple" value={channels} onValueChange={setChannels} aria-label="Channels">
        {["LINE", "Facebook", "TikTok", "WhatsApp"].map((c) => (
          <ToggleGroupItem key={c} value={c.toLowerCase()}>{c}</ToggleGroupItem>
        ))}
      </ToggleGroup>
      <p className="text-sm text-muted-foreground">Showing: {channels.join(", ") || "none"}</p>
    </div>
  )
}
