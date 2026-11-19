"use client"

import { useState } from "react"

import { ThaiAddressPicker, type ThaiAddressNames } from "@/registry/mintel/ui/thai-address"

export default function ThaiAddressExample() {
  const [names, setNames] = useState<ThaiAddressNames>({})
  return (
    <div className="grid w-full max-w-xl gap-4">
      {/* Try a postal code first, e.g. 10200 (several places) or 50200 */}
      <ThaiAddressPicker onValueChange={(_, n) => setNames(n)} />
      <p className="rounded-lg bg-muted px-3 py-2 text-sm">
        {[names.subDistrict, names.district, names.province, names.zip].filter(Boolean).join(" · ") || "—"}
      </p>
    </div>
  )
}
