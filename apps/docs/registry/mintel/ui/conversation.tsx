"use client"

import * as React from "react"
import { AlertCircleIcon, ArrowDownIcon, CheckCheckIcon, CheckIcon, ClockIcon, FileTextIcon, SendHorizontalIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type Channel = "line" | "facebook" | "instagram" | "tiktok" | "whatsapp" | "web"

export type ChatMessage = {
  id: string
  /** in = customer, out = your team, system = notices like "Assigned to Nina". */
  direction: "in" | "out" | "system"
  text?: string
  /** ISO string or Date. */
  time: string | Date
  author?: { name: string; avatarUrl?: string }
  status?: "sending" | "sent" | "delivered" | "read" | "failed"
  attachments?: { type: "image" | "file"; url: string; name?: string; size?: string }[]
}

const CHANNELS: Record<Channel, { label: string; color: string }> = {
  line: { label: "LINE", color: "#06C755" },
  facebook: { label: "Messenger", color: "#0866FF" },
  instagram: { label: "Instagram", color: "#E1306C" },
  tiktok: { label: "TikTok", color: "#111111" },
  whatsapp: { label: "WhatsApp", color: "#25D366" },
  web: { label: "Web chat", color: "var(--brand)" },
}

const LABELS = {
  th: {
    today: "วันนี้",
    yesterday: "เมื่อวาน",
    placeholder: "พิมพ์ข้อความ...",
    send: "ส่ง",
    newMessages: "ข้อความใหม่",
    typing: "กำลังพิมพ์",
    status: { sending: "กำลังส่ง", sent: "ส่งแล้ว", delivered: "ถึงแล้ว", read: "อ่านแล้ว", failed: "ส่งไม่สำเร็จ" },
  },
  en: {
    today: "Today",
    yesterday: "Yesterday",
    placeholder: "Type a message...",
    send: "Send",
    newMessages: "New messages",
    typing: "typing",
    status: { sending: "Sending", sent: "Sent", delivered: "Delivered", read: "Read", failed: "Failed" },
  },
}

const toDate = (t: string | Date) => (t instanceof Date ? t : new Date(t))
const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString()

function dayLabel(d: Date, locale: "th" | "en") {
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (sameDay(d, now)) return LABELS[locale].today
  if (sameDay(d, yesterday)) return LABELS[locale].yesterday
  return d.toLocaleDateString(locale === "th" ? "th-TH" : "en-GB", { day: "numeric", month: "short", year: "numeric" })
}

const timeLabel = (d: Date, locale: "th" | "en") =>
  d.toLocaleTimeString(locale === "th" ? "th-TH" : "en-GB", { hour: "2-digit", minute: "2-digit" })

function Initials({ name, avatarUrl }: { name: string; avatarUrl?: string }) {
  return avatarUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={avatarUrl} alt="" className="size-7 rounded-full object-cover" />
  ) : (
    <span className="flex size-7 items-center justify-center rounded-full bg-brand/12 text-[0.625rem] font-semibold text-brand">
      {name
        .split(/\s+/)
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()}
    </span>
  )
}

function StatusIcon({ status, label }: { status: NonNullable<ChatMessage["status"]>; label: string }) {
  const Icon = { sending: ClockIcon, sent: CheckIcon, delivered: CheckCheckIcon, read: CheckCheckIcon, failed: AlertCircleIcon }[status]
  return (
    <span title={label} className={cn("inline-flex", status === "read" && "text-brand", status === "failed" && "text-destructive")}>
      <Icon className="size-3.5" aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  )
}

/** Channel chip, e.g. in a conversation header or a case list. */
function ChannelBadge({ channel, className }: { channel: Channel; className?: string }) {
  const c = CHANNELS[channel]
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-muted px-2 py-0.5 text-xs font-medium", className)}>
      <span aria-hidden className="size-2 rounded-full" style={{ background: c.color }} />
      {c.label}
    </span>
  )
}

/**
 * Chat thread for LINE / Messenger / TikTok / WhatsApp conversations: day dividers, grouped bubbles,
 * read receipts, image and file attachments, a typing indicator and an optional composer. Sticks to the
 * newest message unless the reader has scrolled up, in which case a "new messages" pill appears.
 */
function Conversation({
  messages,
  channel,
  typing,
  onSend,
  locale = "th",
  header,
  className,
}: {
  messages: ChatMessage[]
  channel?: Channel
  /** Name of who is typing, e.g. the customer. */
  typing?: string
  /** Shows the composer. Enter sends, Shift+Enter adds a line. */
  onSend?: (text: string) => void
  locale?: "th" | "en"
  header?: React.ReactNode
  className?: string
}) {
  const t = LABELS[locale]
  const scroller = React.useRef<HTMLDivElement>(null)
  const atBottom = React.useRef(true)
  const [unseen, setUnseen] = React.useState(false)
  const [draft, setDraft] = React.useState("")
  const lastId = messages[messages.length - 1]?.id

  const scrollToEnd = (smooth: boolean) => {
    const el = scroller.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" })
  }

  React.useLayoutEffect(() => {
    scrollToEnd(false)
  }, [])
  React.useEffect(() => {
    if (atBottom.current) scrollToEnd(true)
    else setUnseen(true)
  }, [lastId, typing])

  const send = () => {
    const text = draft.trim()
    if (!text || !onSend) return
    onSend(text)
    setDraft("")
    atBottom.current = true
  }

  // Group: a bubble shows author/avatar only when the previous one is from someone else or > 5 min apart.
  const rows: React.ReactNode[] = []
  messages.forEach((m, i) => {
    const date = toDate(m.time)
    const prev = messages[i - 1]
    const prevDate = prev && toDate(prev.time)
    if (!prevDate || !sameDay(prevDate, date)) {
      rows.push(
        <div key={`day-${m.id}`} role="separator" className="my-2 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          {/* Day and time depend on the reader's clock and time zone, so they can differ from the server render. */}
          <span suppressHydrationWarning>{dayLabel(date, locale)}</span>
          <span className="h-px flex-1 bg-border" />
        </div>
      )
    }
    if (m.direction === "system") {
      rows.push(
        <p key={m.id} className="mx-auto my-1 max-w-[80%] rounded-full bg-muted px-3 py-1 text-center text-xs text-muted-foreground">
          {m.text}
        </p>
      )
      return
    }
    const first =
      !prev || prev.direction !== m.direction || prev.author?.name !== m.author?.name || date.getTime() - toDate(prev.time).getTime() > 5 * 60_000
    const out = m.direction === "out"
    rows.push(
      <div
        key={m.id}
        data-direction={m.direction}
        className={cn(
          "flex items-end gap-2 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-300",
          out ? "flex-row-reverse motion-safe:slide-in-from-right-2" : "motion-safe:slide-in-from-left-2",
          first ? "mt-3" : "mt-0.5"
        )}
      >
        {!out && <span className="w-7 shrink-0">{first && m.author && <Initials {...m.author} />}</span>}
        <div className={cn("grid max-w-[78%] gap-1", out ? "justify-items-end" : "justify-items-start")}>
          {first && m.author && (
            <span className="px-1 text-xs text-muted-foreground">{m.author.name}</span>
          )}
          {m.attachments?.map((a, k) =>
            a.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={k} src={a.url} alt={a.name ?? ""} className="max-h-56 rounded-2xl border object-cover" />
            ) : (
              <a
                key={k}
                href={a.url}
                className="flex items-center gap-2 rounded-2xl border bg-card px-3 py-2 text-sm transition-colors hover:bg-muted"
              >
                <FileTextIcon className="size-5 shrink-0 text-brand" />
                <span className="min-w-0">
                  <span className="block truncate font-medium">{a.name ?? a.url}</span>
                  {a.size && <span className="text-xs text-muted-foreground">{a.size}</span>}
                </span>
              </a>
            )
          )}
          {m.text && (
            <p
              className={cn(
                "rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap break-words",
                out ? "rounded-br-md bg-brand text-brand-foreground" : "rounded-bl-md bg-muted text-foreground"
              )}
            >
              {m.text}
            </p>
          )}
          <span className="flex items-center gap-1 px-1 text-[0.6875rem] text-muted-foreground tabular-nums">
            <span suppressHydrationWarning>{timeLabel(date, locale)}</span>
            {out && m.status && <StatusIcon status={m.status} label={t.status[m.status]} />}
          </span>
        </div>
      </div>
    )
  })

  return (
    <section data-slot="conversation" className={cn("relative flex min-h-0 flex-col overflow-hidden rounded-2xl border bg-card", className)}>
      {(header || channel) && (
        <header className="flex items-center justify-between gap-3 border-b px-4 py-3">
          <div className="min-w-0">{header}</div>
          {channel && <ChannelBadge channel={channel} />}
        </header>
      )}
      <div
        ref={scroller}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        onScroll={(e) => {
          const el = e.currentTarget
          atBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 48
          if (atBottom.current) setUnseen(false)
        }}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-2"
      >
        {rows}
        {typing && (
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex gap-1 rounded-2xl rounded-bl-md bg-muted px-3 py-2.5" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-1.5 rounded-full bg-muted-foreground/60 motion-safe:animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </span>
            <span>
              {typing} {t.typing}…
            </span>
          </div>
        )}
      </div>
      {unseen && (
        <button
          type="button"
          onClick={() => {
            scrollToEnd(true)
            setUnseen(false)
          }}
          className="absolute bottom-20 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-brand-foreground shadow-lg motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2"
        >
          <ArrowDownIcon className="size-3.5" />
          {t.newMessages}
        </button>
      )}
      {onSend && (
        <form
          className="flex items-end gap-2 border-t p-2"
          onSubmit={(e) => {
            e.preventDefault()
            send()
          }}
        >
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault()
                send()
              }
            }}
            rows={1}
            placeholder={t.placeholder}
            aria-label={t.placeholder}
            className="field-sizing-content max-h-32 min-h-9 flex-1 resize-none rounded-xl bg-muted px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            aria-label={t.send}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground transition-[scale,opacity] duration-300 ease-spring-snappy active:scale-90 disabled:opacity-40"
          >
            <SendHorizontalIcon className="size-4" />
          </button>
        </form>
      )}
    </section>
  )
}

export { Conversation, ChannelBadge }
