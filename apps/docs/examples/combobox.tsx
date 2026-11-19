"use client"

import { useState } from "react"

import { Combobox } from "@/registry/mintel/ui/combobox"

const provinces = [
  { value: "bkk", label: "Bangkok", keywords: ["กรุงเทพมหานคร"] },
  { value: "cnx", label: "Chiang Mai", keywords: ["เชียงใหม่"] },
  { value: "hkt", label: "Phuket", keywords: ["ภูเก็ต"] },
  { value: "cbi", label: "Chonburi", keywords: ["ชลบุรี", "Pattaya"] },
]

const channels = ["LINE", "Facebook", "TikTok", "Instagram", "Pantip"].map((c) => ({ value: c.toLowerCase(), label: c }))

export default function ComboboxExample() {
  const [province, setProvince] = useState("")
  const [selected, setSelected] = useState<string[]>(["line"])
  return (
    <div className="grid w-full max-w-xs gap-3">
      {/* Single, searchable in English or Thai via keywords */}
      <Combobox locale="en" options={provinces} value={province} onValueChange={setProvince} placeholder="Choose a province" />
      {/* Multiple with chips */}
      <Combobox locale="en" multiple options={channels} value={selected} onValueChange={setSelected} placeholder="Channels" />
    </div>
  )
}
