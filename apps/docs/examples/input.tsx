"use client"

import { useState } from "react"

import { Input } from "@/registry/mintel/ui/input"
import { Label } from "@/registry/mintel/ui/label"

export default function InputExample() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)
  return (
    <form
      noValidate
      className="grid w-full max-w-xs gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        setError(!/^\S+@\S+\.\S+$/.test(email))
      }}
    >
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="name@company.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (error) setError(false)
        }}
        aria-invalid={error || undefined}
        aria-describedby={error ? "email-error" : undefined}
      />
      {error && (
        <p id="email-error" className="text-sm text-destructive">
          Enter a valid email, e.g. name@company.com
        </p>
      )}
      <button type="submit" className="h-9 rounded-md bg-primary text-sm font-semibold text-primary-foreground">
        Continue
      </button>
    </form>
  )
}
