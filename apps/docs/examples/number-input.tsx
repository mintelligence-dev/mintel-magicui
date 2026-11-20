"use client"

import { useState } from "react"

import { Label } from "@/registry/mintel/ui/label"
import { NumberInput } from "@/registry/mintel/ui/number-input"

export default function NumberInputExample() {
  const [amount, setAmount] = useState<number | null>(1250000)
  const [discount, setDiscount] = useState<number | null>(7.5)
  return (
    <div className="grid w-full max-w-xs gap-4">
      <div className="grid gap-2">
        <Label htmlFor="amount">Order amount</Label>
        <NumberInput id="amount" prefix="฿" decimals={2} min={0} value={amount} onValueChange={setAmount} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="discount">Discount</Label>
        <NumberInput id="discount" suffix="%" decimals={1} min={0} max={100} value={discount} onValueChange={setDiscount} />
      </div>
      <p className="text-xs text-muted-foreground">
        Values: <code className="font-mono">{String(amount)}</code> and <code className="font-mono">{String(discount)}</code>
      </p>
    </div>
  )
}
