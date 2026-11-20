"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { BarChart3, ChevronLeft, Inbox, MessageCircle, Search, Settings, UserRound } from "lucide-react"

import { cn } from "@/lib/utils"
import { SegmentedControl } from "@/registry/mintel/glass/segmented-control"
import { Avatar, AvatarFallback } from "@/registry/mintel/ui/avatar"
import { Badge } from "@/registry/mintel/ui/badge"
import { Button } from "@/registry/mintel/ui/button"
import { ChannelBadge, Conversation, type Channel, type ChatMessage } from "@/registry/mintel/ui/conversation"
import { Input } from "@/registry/mintel/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/mintel/ui/sidebar"
import { TagInput } from "@/registry/mintel/ui/tag-input"
import { Timeline, TimelineItem } from "@/registry/mintel/ui/timeline"

// Sample data with fixed timestamps (replace with your API).
type Chat = {
  id: string
  name: string
  channel: Channel
  caseNumber: string
  status: "New" | "Working" | "Escalated"
  priority: "High" | "Normal"
  unread: number
  assignee?: string
  messages: ChatMessage[]
}

const CHATS: Chat[] = [
  {
    id: "c1",
    name: "Somchai K.",
    channel: "line",
    caseNumber: "00012345",
    status: "Working",
    priority: "High",
    unread: 2,
    assignee: "Nina",
    messages: [
      { id: "m1", direction: "in", author: { name: "Somchai K." }, time: "2026-11-19T09:12:00+07:00", text: "Hi, I ordered a jacket last week" },
      { id: "m2", direction: "in", author: { name: "Somchai K." }, time: "2026-11-19T09:12:30+07:00", text: "Order #A-10293, it hasn't arrived" },
      { id: "m3", direction: "system", time: "2026-11-19T09:13:00+07:00", text: "Assigned to Nina" },
      { id: "m4", direction: "out", author: { name: "Nina" }, time: "2026-11-19T09:15:00+07:00", text: "Hi Somchai! Let me check with the courier.", status: "read" },
      { id: "m5", direction: "in", author: { name: "Somchai K." }, time: "2026-11-19T09:41:00+07:00", text: "Any update? 🙏" },
    ],
  },
  {
    id: "c2",
    name: "Siam Foods",
    channel: "facebook",
    caseNumber: "00012341",
    status: "New",
    priority: "Normal",
    unread: 1,
    messages: [{ id: "m1", direction: "in", author: { name: "Siam Foods" }, time: "2026-11-19T09:30:00+07:00", text: "Can we change the delivery address?" }],
  },
  {
    id: "c3",
    name: "Ploy S.",
    channel: "tiktok",
    caseNumber: "00012338",
    status: "Escalated",
    priority: "High",
    unread: 0,
    assignee: "Beam",
    messages: [
      { id: "m1", direction: "in", author: { name: "Ploy S." }, time: "2026-11-19T08:02:00+07:00", text: "The item is damaged" },
      { id: "m2", direction: "out", author: { name: "Beam" }, time: "2026-11-19T08:10:00+07:00", text: "Sorry! Could you send a photo?", status: "delivered" },
    ],
  },
  {
    id: "c4",
    name: "Nimit Co.",
    channel: "whatsapp",
    caseNumber: "00012330",
    status: "Working",
    priority: "Normal",
    unread: 0,
    assignee: "Nina",
    messages: [{ id: "m1", direction: "out", author: { name: "Nina" }, time: "2026-11-18T17:20:00+07:00", text: "Your refund has been processed.", status: "read" }],
  },
]

// Sample times carry their own offset, so slicing gives the same wall-clock time on server and client.
const hhmm = (t: string | Date) =>
  typeof t === "string" ? t.slice(11, 16) : t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })

const STATUS_VARIANT = { New: "soft", Working: "secondary", Escalated: "destructive" } as const

/** SLA countdown for the open case. Reads the clock after mount (prerender-safe). */
function SlaCountdown({ minutes }: { minutes: number }) {
  const [deadline, setDeadline] = useState<number | null>(null)
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    const start = Date.now()
    setDeadline(start + minutes * 60_000)
    setNow(start)
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [minutes])
  const left = deadline !== null && now !== null ? Math.round((deadline - now) / 1000) : null
  const state = left === null ? "ok" : left < 0 ? "overdue" : left <= 30 * 60 ? "risk" : "ok"
  const abs = Math.abs(left ?? 0)
  const clock =
    left === null
      ? "--:--:--"
      : `${left < 0 ? "+" : ""}${[Math.floor(abs / 3600), Math.floor((abs % 3600) / 60), abs % 60].map((n) => String(n).padStart(2, "0")).join(":")}`
  const tone = { ok: "text-success", risk: "text-warning", overdue: "text-destructive" }[state]
  return (
    <div className={cn("grid gap-1 rounded-xl border p-3 transition-colors duration-500", state === "risk" && "border-warning/50", state === "overdue" && "border-destructive/50 bg-destructive/5")}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold tracking-wide text-muted-foreground uppercase">First reply SLA</span>
        <span className={cn("font-semibold", tone)}>{{ ok: "On track", risk: "At risk", overdue: "Overdue" }[state]}</span>
      </div>
      <p role="timer" className={cn("font-mono text-2xl font-semibold tabular-nums transition-colors duration-500", tone)}>
        {clock}
      </p>
    </div>
  )
}

function CasePanel({ chat }: { chat: Chat }) {
  const [tags, setTags] = useState(chat.priority === "High" ? ["VIP", "Shipping"] : ["Shipping"])
  return (
    <aside className="grid content-start gap-4 overflow-y-auto border-l p-4">
      <div className="relative overflow-hidden rounded-xl border p-4">
        <span aria-hidden className="pointer-events-none absolute -top-1/2 -right-1/4 h-[180%] w-2/3 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--brand-accent)_20%,transparent),transparent)]" />
        <p className="relative text-xs font-semibold tracking-wide text-muted-foreground uppercase">Case</p>
        <p className="relative bg-[image:var(--brand-gradient)] bg-clip-text font-heading text-2xl font-bold text-transparent">{chat.caseNumber}</p>
        <div className="relative mt-2 flex flex-wrap gap-1.5">
          <Badge variant={STATUS_VARIANT[chat.status]}>{chat.status}</Badge>
          <Badge variant={chat.priority === "High" ? "warning" : "outline"}>{chat.priority} priority</Badge>
        </div>
        <dl className="relative mt-3 grid grid-cols-2 gap-3 border-t pt-3 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">Channel</dt>
            <dd className="mt-0.5">
              <ChannelBadge channel={chat.channel} />
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Owner</dt>
            <dd className="mt-0.5 font-medium">{chat.assignee ?? "Unassigned"}</dd>
          </div>
        </dl>
      </div>
      <SlaCountdown key={chat.id} minutes={chat.priority === "High" ? 32 : 120} />
      <div className="grid gap-2">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Tags</p>
        <TagInput value={tags} onValueChange={setTags} suggestions={["VIP", "Refund", "Shipping", "Complaint", "Billing"]} locale="en" aria-label="Case tags" />
      </div>
      <div className="grid gap-2">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Activity</p>
        <Timeline aria-label="Case activity">
          <TimelineItem title="Case created" time="09:12" variant="brand" />
          <TimelineItem title={`Assigned to ${chat.assignee ?? "queue"}`} time="09:13" />
          <TimelineItem title="Waiting for courier" time="09:20" variant="warning" current />
        </Timeline>
      </div>
    </aside>
  )
}

export default function ConsolePage() {
  const [chats, setChats] = useState(CHATS)
  const [activeId, setActiveId] = useState(CHATS[0].id)
  const [filter, setFilter] = useState("all")
  const [query, setQuery] = useState("")
  const [mobileView, setMobileView] = useState<"list" | "chat">("list")
  // On phones only one of the two panes is shown: move focus with the switch, or it is lost with the hidden pane.
  const backRef = useRef<HTMLButtonElement>(null)
  const listHeadingRef = useRef<HTMLHeadingElement>(null)
  const switched = useRef(false)
  useEffect(() => {
    if (!switched.current) {
      switched.current = true
      return
    }
    ;(mobileView === "chat" ? backRef : listHeadingRef).current?.focus()
  }, [mobileView])
  const active = chats.find((c) => c.id === activeId)!

  const visible = useMemo(
    () =>
      chats.filter(
        (c) =>
          (filter === "all" || (filter === "mine" ? c.assignee === "Nina" : !c.assignee)) &&
          (!query || `${c.name} ${c.caseNumber}`.toLowerCase().includes(query.toLowerCase()))
      ),
    [chats, filter, query]
  )

  const open = (id: string) => {
    setActiveId(id)
    setMobileView("chat")
    setChats((cs) => cs.map((c) => (c.id === id ? { ...c, unread: 0 } : c)))
  }

  const send = (text: string) => {
    const msg: ChatMessage = { id: `out-${active.messages.length}`, direction: "out", author: { name: "Nina" }, time: new Date(), text, status: "sent" }
    setChats((cs) => cs.map((c) => (c.id === active.id ? { ...c, messages: [...c.messages, msg] } : c)))
  }

  const unread = chats.reduce((n, c) => n + c.unread, 0)

  return (
    <div className="h-svh bg-background">
      <SidebarProvider defaultCollapsed>
        <Sidebar>
          <SidebarHeader>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[image:var(--brand-gradient)] text-sm font-bold text-white">M</span>
            <span className="truncate font-heading font-semibold">Mintel Desk</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup label="Workspace">
              <SidebarItem icon={<MessageCircle />} label="Live chats" active badge={unread || undefined} />
              <SidebarItem icon={<Inbox />} label="Cases" />
              <SidebarItem icon={<UserRound />} label="Customers" />
              <SidebarItem icon={<BarChart3 />} label="Reports" />
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarItem icon={<Settings />} label="Settings" />
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="grid overflow-hidden md:grid-cols-[20rem_minmax(0,1fr)] xl:grid-cols-[20rem_minmax(0,1fr)_20rem]">
          {/* Chat list */}
          <section className={cn("min-h-0 flex-col border-r", mobileView === "list" ? "flex" : "hidden md:flex")} aria-label="Conversations">
            <header className="flex items-center gap-2 border-b px-3 py-3">
              <SidebarTrigger />
              <h1 ref={listHeadingRef} tabIndex={-1} className="font-heading text-lg font-semibold outline-none">
                Live chats
              </h1>
            </header>
            <div className="grid gap-2 border-b p-3">
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name or case" aria-label="Search conversations" className="pl-9" />
              </div>
              <SegmentedControl
                aria-label="Filter"
                value={filter}
                onValueChange={setFilter}
                options={[
                  { value: "all", label: "All" },
                  { value: "mine", label: "Mine" },
                  { value: "queue", label: "Queue" },
                ]}
              />
            </div>
            <ul className="min-h-0 flex-1 overflow-y-auto p-2">
              {visible.map((c) => {
                // A chat can have no messages yet.
                const last = c.messages[c.messages.length - 1] as (typeof c.messages)[number] | undefined
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => open(c.id)}
                      aria-current={c.id === activeId ? "true" : undefined}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-muted",
                        c.id === activeId && "bg-accent"
                      )}
                    >
                      <Avatar>
                        <AvatarFallback>{c.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate font-medium">{c.name}</span>
                          <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{last ? hhmm(last.time) : ""}</span>
                        </span>
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate text-sm text-muted-foreground">{last?.text}</span>
                          {c.unread > 0 && (
                            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-[0.6875rem] font-semibold text-brand-foreground">{c.unread}</span>
                          )}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
              {visible.length === 0 && <li className="p-6 text-center text-sm text-muted-foreground">No conversations</li>}
            </ul>
          </section>

          {/* Conversation */}
          <section className={cn("min-h-0 flex-col p-2 md:p-3", mobileView === "chat" ? "flex" : "hidden md:flex")} aria-label="Conversation">
            <Conversation
              className="min-h-0 flex-1"
              locale="en"
              channel={active.channel}
              header={
                <div className="flex items-center gap-2">
                  <Button ref={backRef} variant="ghost" size="icon" className="md:hidden" aria-label="Back to conversations" onClick={() => setMobileView("list")}>
                    <ChevronLeft />
                  </Button>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{active.name}</p>
                    <p className="text-xs text-muted-foreground">Case #{active.caseNumber}</p>
                  </div>
                </div>
              }
              messages={active.messages}
              onSend={send}
            />
          </section>

          {/* Case details (wide screens) */}
          <div className="hidden min-h-0 xl:grid">
            <CasePanel key={active.id} chat={active} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
