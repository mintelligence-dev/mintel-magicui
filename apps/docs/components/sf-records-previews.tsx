"use client"

import { useState } from "react"
import { MoveIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/registry/mintel/ui/dropdown-menu"
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
        <button type="button" className="rounded-md px-2 py-1 text-sm font-semibold text-brand transition-colors hover:bg-brand/10">
          View all
        </button>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {cases.map(([n, s, st]) => (
          <li key={n}>
            {/* The whole card opens the record, as in the LWC. */}
            <button
              type="button"
              className="grid w-full gap-1.5 rounded-xl border bg-card p-3 text-left text-sm transition-[translate,box-shadow,border-color] duration-300 ease-spring-snappy hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md hover:shadow-brand/10 motion-reduce:transition-none"
            >
              <span className="font-semibold text-brand">{n}</span>
              <span className="grid grid-cols-[4rem_1fr] gap-2">
                <span className="text-muted-foreground">Subject</span>
                <span className="truncate">{s}</span>
              </span>
              <span className="grid grid-cols-[4rem_1fr] gap-2">
                <span className="text-muted-foreground">Status</span>
                <span>{st}</span>
              </span>
            </button>
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
    <div className="grid w-full grid-cols-[repeat(3,minmax(8.5rem,1fr))] gap-2 overflow-x-auto text-sm">
      {stages.map((s) => (
        <section
          key={s}
          aria-label={s}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => dragging && move(dragging, s)}
          className="grid min-h-44 content-start gap-2 rounded-xl bg-muted p-2.5"
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
                  "relative grid cursor-grab gap-1 rounded-lg border bg-card py-3 pr-9 pl-3 shadow-xs transition-[opacity,rotate,translate,box-shadow] duration-300 ease-spring-snappy hover:-translate-y-px hover:shadow-md hover:shadow-brand/15 motion-safe:animate-in motion-safe:fade-in-0 motion-reduce:transition-none",
                  dragging === c.id && "rotate-[-1.5deg] opacity-50"
                )}
              >
                <span className="font-semibold">{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.amount}</span>
                {/* Like the LWC: a small move menu in the corner, for keyboards and touch. */}
                <DropdownMenu>
                  <DropdownMenuTrigger
                    aria-label={`Move ${c.name} to…`}
                    className="absolute top-1.5 right-1.5 inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
                  >
                    <MoveIcon className="size-3.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Move to</DropdownMenuLabel>
                    {stages
                      .filter((o) => o !== c.stage)
                      .map((o) => (
                        <DropdownMenuItem key={o} onSelect={() => move(c.id, o)}>
                          {o}
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
        </section>
      ))}
    </div>
  )
}
