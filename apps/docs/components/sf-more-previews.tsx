"use client"

import { useEffect, useState } from "react"
import { InboxIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarGroup } from "@/registry/mintel/ui/avatar"
import { Conversation, type ChatMessage } from "@/registry/mintel/ui/conversation"
import { EmptyState } from "@/registry/mintel/ui/empty-state"
import { ProgressRing } from "@/registry/mintel/ui/progress-ring"
import { ThaiAddressPicker } from "@/registry/mintel/ui/thai-address"

// React twins of the LWC, for the Salesforce guide previews.

export function ThaiAddressPreview() {
  return <ThaiAddressPicker idPrefix="sf-thai-address" className="w-full max-w-md" />
}

const MESSAGES: ChatMessage[] = [
  { id: "1", direction: "in", author: { name: "Somchai K" }, time: "2026-11-19T09:12:00+07:00", text: "Where is my order?" },
  { id: "2", direction: "system", time: "2026-11-19T09:13:00+07:00", text: "Assigned to Nina" },
  { id: "3", direction: "out", author: { name: "Nina" }, time: "2026-11-19T09:15:00+07:00", text: "It ships today 📦", status: "read" },
]
export function ConversationPreview() {
  return <Conversation className="h-72 w-full max-w-sm" locale="en" channel="line" header={<p className="font-semibold">Somchai K</p>} messages={MESSAGES} />
}

/** Mirrors mintelSlaTimer: counts down from 31 minutes, turning amber inside 30. */
export function SlaTimerPreview() {
  const [left, setLeft] = useState(31 * 60 + 4)
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s <= -90 ? 31 * 60 + 4 : s - 1)), 1000)
    return () => clearInterval(id)
  }, [])
  const state = left < 0 ? "overdue" : left <= 30 * 60 ? "risk" : "ok"
  const abs = Math.abs(left)
  const clock = `${left < 0 ? "+" : ""}${String(Math.floor(abs / 3600)).padStart(2, "0")}:${String(Math.floor((abs % 3600) / 60)).padStart(2, "0")}:${String(abs % 60).padStart(2, "0")}`
  const tone = { ok: "text-success", risk: "text-warning", overdue: "text-destructive" }[state]
  return (
    <div
      className={cn(
        "grid w-full max-w-xs gap-1.5 rounded-2xl border bg-card p-4 transition-colors duration-500",
        state === "risk" && "border-warning/50",
        state === "overdue" && "border-destructive/50 bg-destructive/5"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">SLA</span>
        <span className={cn("rounded-full bg-current/10 px-2 py-0.5 text-xs font-semibold", tone)}>
          {{ ok: "On track", risk: "At risk", overdue: "Overdue" }[state]}
        </span>
      </div>
      <p suppressHydrationWarning className={cn("font-mono text-3xl font-semibold tabular-nums transition-colors duration-500", tone)}>
        {clock}
      </p>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full bg-current transition-[width] duration-1000 ease-linear", tone)} style={{ width: `${Math.min(100, Math.max(0, 100 - (left / (60 * 60)) * 100))}%` }} />
      </div>
    </div>
  )
}

export function ProgressRingPreview() {
  return (
    <div className="flex items-center gap-6">
      <ProgressRing value={72} label="Probability" />
      <ProgressRing value={34} tone="status" size="sm" />
    </div>
  )
}

export function EmptyStatePreview() {
  return (
    <EmptyState
      className="w-full max-w-xs bg-background"
      icon={<InboxIcon />}
      title="No open cases"
      description="New LINE and Facebook chats will appear here."
      action={<span className="inline-flex h-9 items-center rounded-md bg-[image:var(--brand-gradient)] px-4 text-sm font-semibold text-white">New case</span>}
    />
  )
}

export function AvatarGroupPreview() {
  return (
    <AvatarGroup max={4}>
      {["NP", "SK", "BT", "PS", "NR", "AW"].map((x) => (
        <Avatar key={x}>
          <AvatarFallback>{x}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  )
}

export function RecordHeaderPreview() {
  return (
    <header className="relative w-full max-w-md overflow-hidden rounded-2xl border bg-card p-5">
      <span aria-hidden className="pointer-events-none absolute -top-1/2 -right-[10%] h-[180%] w-3/5 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--brand-accent)_22%,transparent),transparent)]" />
      <div className="relative flex flex-wrap items-center gap-3">
        <span className="size-11 shrink-0 rounded-xl bg-[image:var(--brand-gradient)]" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Case</p>
          <p className="truncate bg-[image:var(--brand-gradient)] bg-clip-text font-heading text-2xl font-bold text-transparent">00012345</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/12 px-2.5 py-0.5 text-xs font-semibold text-brand">
          <span className="size-2 rounded-full bg-current" />
          Working
        </span>
      </div>
      <dl className="relative mt-4 grid grid-cols-3 gap-4 border-t pt-4 text-sm">
        {[
          ["Account", "Acme Retail"],
          ["Priority", "High"],
          ["Origin", "LINE"],
        ].map(([k, v]) => (
          <div key={k} className="min-w-0">
            <dt className="text-xs text-muted-foreground">{k}</dt>
            <dd className="truncate font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
    </header>
  )
}
