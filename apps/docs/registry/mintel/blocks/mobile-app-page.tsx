"use client"

import { useState } from "react"
import { Bell, Home, MessageCircle, PenSquare, Search, User } from "lucide-react"

import { GlassButton } from "@/registry/mintel/glass/glass-button"
import { GlassNavbar } from "@/registry/mintel/glass/glass-navbar"
import { SegmentedControl } from "@/registry/mintel/glass/segmented-control"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/registry/mintel/mobile/drawer"
import { TabBar } from "@/registry/mintel/mobile/tab-bar"
import { Badge } from "@/registry/mintel/ui/badge"
import { Button } from "@/registry/mintel/ui/button"
import { Textarea } from "@/registry/mintel/ui/textarea"
import { toast } from "@/registry/mintel/ui/toast"

const CHATS = [
  { name: "Acme Retail", channel: "LINE", text: "Is my order shipped yet?", time: "2m", unread: 2 },
  { name: "Siam Foods", channel: "Facebook", text: "Thanks, that solved it!", time: "18m", unread: 0 },
  { name: "Bangkok Air", channel: "TikTok", text: "Can I change my booking?", time: "1h", unread: 1 },
  { name: "Nimit Co.", channel: "Pantip", text: "The invoice amount looks wrong", time: "3h", unread: 0 },
  { name: "Thai Home", channel: "LINE", text: "Do you deliver to Chiang Mai?", time: "5h", unread: 0 },
]

/** Mobile web / PWA shell: glass top bar, content, bottom tab bar and a compose drawer. */
export default function MobileAppPage() {
  const [tab, setTab] = useState("chats")
  const [filter, setFilter] = useState("all")
  const [compose, setCompose] = useState(false)
  const chats = filter === "unread" ? CHATS.filter((c) => c.unread) : CHATS

  return (
    <div className="mx-auto min-h-svh max-w-md bg-muted/30 pb-28">
      <GlassNavbar className="flex h-14 items-center justify-between px-4">
        <h1 className="font-heading text-lg font-semibold">Chats</h1>
        <div className="flex gap-1">
          <GlassButton size="icon" aria-label="Search" className="size-9 shadow-none">
            <Search />
          </GlassButton>
          <GlassButton size="icon" aria-label="Compose" className="size-9 shadow-none" onClick={() => setCompose(true)}>
            <PenSquare />
          </GlassButton>
        </div>
      </GlassNavbar>

      <div className="px-4 pt-4">
        <SegmentedControl
          aria-label="Filter"
          className="w-full"
          value={filter}
          onValueChange={setFilter}
          options={[
            { value: "all", label: "All" },
            { value: "unread", label: "Unread" },
          ]}
        />
      </div>

      <ul className="mt-3 space-y-2 px-4">
        {chats.map((c) => (
          <li key={c.name}>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl border bg-card p-3 text-left transition-transform duration-300 ease-spring-snappy active:scale-[0.98] motion-reduce:transition-none"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[image:var(--brand-gradient)] font-semibold text-white">
                {c.name[0]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate font-medium">{c.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{c.time}</span>
                </span>
                <span className="mt-0.5 flex items-center gap-2">
                  <span className="truncate text-sm text-muted-foreground">{c.text}</span>
                  {c.unread > 0 && (
                    <Badge variant="brand" className="ml-auto px-1.5">
                      {c.unread}
                    </Badge>
                  )}
                </span>
                <span className="mt-1 block text-[11px] text-muted-foreground">{c.channel}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <TabBar
        value={tab}
        onValueChange={setTab}
        items={[
          { value: "home", label: "Home", icon: <Home /> },
          { value: "chats", label: "Chats", icon: <MessageCircle /> },
          { value: "alerts", label: "Alerts", icon: <Bell /> },
          { value: "me", label: "Me", icon: <User /> },
        ]}
      />

      <Drawer open={compose} onOpenChange={setCompose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>New message</DrawerTitle>
            <DrawerDescription>Sent through LINE OA</DrawerDescription>
          </DrawerHeader>
          <Textarea placeholder="Type a message..." />
          <DrawerFooter>
            <Button
              variant="brand"
              onClick={() => {
                setCompose(false)
                toast.success("Message sent")
              }}
            >
              Send
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
