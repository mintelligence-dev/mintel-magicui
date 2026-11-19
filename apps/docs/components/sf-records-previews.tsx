"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Timeline, TimelineItem } from "@/registry/mintel/ui/timeline"

// Docs-only previews that mirror the record-page LWC (relatedCards, activityTimeline, kanban).

export function RelatedCardsPreview() {
  const cases = [
    ["00012345", "Late delivery", "Working"],
    ["00012341", "Change address", "New"],
    ["00012330", "Refund request", "Closed"],
  ]
  return (
    <div className="grid w-full max-w-md gap-3">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 font-heading font-semibold">
          Cases <span className="rounded-full bg-muted px-2 text-xs font-semibold text-muted-foreground">5</span>
        </p>
        <span className="rounded-md px-2 py-1 text-sm font-semibold text-brand">View all</span>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {cases.map(([n, s, st]) => (
          <li key={n} className="grid gap-1.5 rounded-xl border bg-card p-3 text-sm">
            <span className="font-semibold text-brand">{n}</span>
            <span className="grid grid-cols-[4rem_1fr] gap-2">
              <span className="text-muted-foreground">Subject</span>
              <span className="truncate">{s}</span>
            </span>
            <span className="grid grid-cols-[4rem_1fr] gap-2">
              <span className="text-muted-foreground">Status</span>
              <span>{st}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ActivityTimelinePreview() {
  const [filter, setFilter] = useState<"all" | "tasks" | "events">("all")
  const rows = [
    { kind: "events", title: "Product demo", time: "12 Dec, 10:00", variant: "default" as const, note: "Zoom" },
    { kind: "tasks", title: "Send quote", time: "Due 5 Dec 2026", variant: "success" as const, note: "Completed" },
    { kind: "tasks", title: "Call back", time: "Overdue 1 Dec 2026", variant: "destructive" as const, note: "Not Started", current: true },
  ].filter((r) => filter === "all" || r.kind === filter)
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="flex items-center justify-between gap-2">
        <p className="font-heading font-semibold">Activity</p>
        <div role="radiogroup" aria-label="Show" className="inline-flex gap-0.5 rounded-full bg-muted p-[3px]">
          {(["all", "tasks", "events"] as const).map((f) => (
            <button
              key={f}
              type="button"
              role="radio"
              aria-checked={filter === f}
              onClick={() => setFilter(f)}
              className={cn("rounded-full px-3 py-1 text-xs font-medium capitalize", filter === f ? "bg-background shadow-sm" : "text-muted-foreground")}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <Timeline aria-label="Activity">
        {rows.map((r) => (
          <TimelineItem key={r.title} title={r.title} time={r.time} variant={r.variant} current={r.current}>
            {r.note}
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}

export function KanbanPreview() {
  const stages = ["Prospecting", "Proposal", "Closed Won"]
  const [cards, setCards] = useState([
    { id: "a", name: "Acme renewal", amount: "฿120,000", stage: "Prospecting" },
    { id: "b", name: "Siam upsell", amount: "฿45,000", stage: "Proposal" },
    { id: "c", name: "Lanna pilot", amount: "฿18,000", stage: "Proposal" },
  ])
  const [dragging, setDragging] = useState<string>()
  const move = (id: string, stage: string) => setCards((cs) => cs.map((c) => (c.id === id ? { ...c, stage } : c)))
  return (
    <div className="grid w-full grid-cols-3 gap-2 overflow-x-auto text-sm">
      {stages.map((s) => (
        <section
          key={s}
          aria-label={s}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => dragging && move(dragging, s)}
          className="grid min-h-44 content-start gap-2 rounded-xl bg-muted p-2"
        >
          <h3 className="flex items-center justify-between px-1 text-xs font-semibold">
            {s}
            <span className="rounded-full bg-background px-1.5 text-muted-foreground">{cards.filter((c) => c.stage === s).length}</span>
          </h3>
          {cards
            .filter((c) => c.stage === s)
            .map((c) => (
              <div
                key={c.id}
                draggable
                onDragStart={() => setDragging(c.id)}
                onDragEnd={() => setDragging(undefined)}
                className={cn(
                  "grid cursor-grab gap-1 rounded-lg border bg-card p-2.5 shadow-xs transition-[opacity,rotate] duration-300 motion-safe:animate-in motion-safe:fade-in-0",
                  dragging === c.id && "rotate-[-1.5deg] opacity-50"
                )}
              >
                <span className="font-semibold">{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.amount}</span>
                <label className="sr-only" htmlFor={`move-${c.id}`}>
                  Move {c.name} to
                </label>
                <select
                  id={`move-${c.id}`}
                  value={c.stage}
                  onChange={(e) => move(c.id, e.target.value)}
                  className="mt-1 rounded-md border bg-background px-1.5 py-1 text-xs"
                >
                  {stages.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            ))}
        </section>
      ))}
    </div>
  )
}
