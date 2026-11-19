"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/registry/mintel/ui/select"

export default function SelectExample() {
  return (
    <Select>
      <SelectTrigger className="w-56" aria-label="Channel">
        <SelectValue placeholder="Choose a channel" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Social channels</SelectLabel>
          <SelectItem value="line">LINE</SelectItem>
          <SelectItem value="facebook">Facebook</SelectItem>
          <SelectItem value="tiktok">TikTok</SelectItem>
          <SelectItem value="pantip">Pantip</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
