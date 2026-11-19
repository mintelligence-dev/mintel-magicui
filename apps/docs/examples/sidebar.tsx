"use client"

import { useState } from "react"
import { BarChart3, Inbox, LayoutDashboard, MessageCircle, Settings, UserRound } from "lucide-react"

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

const NAV = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard /> },
  { id: "inbox", label: "Inbox", icon: <Inbox />, badge: 12 },
  { id: "chats", label: "Live chats", icon: <MessageCircle />, badge: 3 },
  { id: "customers", label: "Customers", icon: <UserRound /> },
  { id: "reports", label: "Reports", icon: <BarChart3 /> },
]

export default function SidebarExample() {
  const [page, setPage] = useState("inbox")
  // The shell fills its parent; here a fixed-height frame stands in for the browser window.
  return (
    <div className="h-[26rem] w-full overflow-hidden rounded-2xl border">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[image:var(--brand-gradient)] text-sm font-bold text-white">
              M
            </span>
            <span className="truncate font-heading font-semibold">Mintel Desk</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup label="Workspace">
              {NAV.map((n) => (
                <SidebarItem key={n.id} icon={n.icon} label={n.label} badge={n.badge} active={page === n.id} onClick={() => setPage(n.id)} />
              ))}
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarItem icon={<Settings />} label="Settings" active={page === "settings"} onClick={() => setPage("settings")} />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-2 border-b px-3">
            <SidebarTrigger />
            <span className="font-semibold capitalize">{NAV.find((n) => n.id === page)?.label ?? "Settings"}</span>
          </header>
          <div className="grid gap-3 p-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 rounded-xl bg-muted/60" />
            ))}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
