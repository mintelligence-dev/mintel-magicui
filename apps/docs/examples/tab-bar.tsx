"use client"

import { useState } from "react"
import { Bell, Home, MessageCircle, User } from "lucide-react"

import { TabBar } from "@/registry/mintel/mobile/tab-bar"

export default function TabBarExample() {
  const [tab, setTab] = useState("home")
  return (
    <div className="relative h-64 w-full max-w-xs overflow-hidden rounded-[2rem] border-[6px] border-neutral-900 bg-muted">
      {/* `absolute` only for this preview; in an app the tab bar is fixed to the bottom of the screen */}
      <TabBar
        className="absolute"
        value={tab}
        onValueChange={setTab}
        items={[
          { value: "home", label: "Home", icon: <Home /> },
          { value: "chat", label: "Chat", icon: <MessageCircle /> },
          { value: "alerts", label: "Alerts", icon: <Bell /> },
          { value: "me", label: "Me", icon: <User /> },
        ]}
      />
    </div>
  )
}
