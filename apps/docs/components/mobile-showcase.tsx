"use client"

import { useState } from "react"
import { Bell, Home, MessageCircle, User } from "lucide-react"

import { CopyCommand } from "@/components/copy-command"
import { installCmd } from "@/lib/site"
import { Button } from "@/registry/mintel/ui/button"
import { Input } from "@/registry/mintel/ui/input"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/mintel/mobile/drawer"
import { TabBar } from "@/registry/mintel/mobile/tab-bar"
import { toast } from "@/registry/mintel/ui/toast"

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto h-[30rem] w-[15.5rem] overflow-hidden rounded-[2.5rem] border-[6px] border-neutral-900 bg-[radial-gradient(120%_80%_at_50%_0%,var(--brand)_0%,var(--brand-accent)_55%,var(--background)_100%)] shadow-xl dark:border-neutral-700">
      <div className="absolute top-2 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-neutral-900" />
      {children}
    </div>
  )
}

export function MobileShowcase() {
  const [tab, setTab] = useState("home")
  return (
    <div className="grid gap-8 md:grid-cols-2 [&>*]:min-w-0">
      <div className="space-y-4">
        <p className="font-heading text-lg font-semibold">Drawer</p>
        <p className="text-sm text-muted-foreground">Bottom sheet ลากที่แถบด้านบนลงเพื่อปิด — ใช้บนมือถือแทน dialog</p>
        <div className="flex min-h-40 items-center justify-center rounded-2xl border bg-muted/30 p-6">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="brand">เปิด Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>ส่งข้อความหาลูกค้า</DrawerTitle>
                <DrawerDescription>ข้อความจะถูกส่งผ่าน LINE OA</DrawerDescription>
              </DrawerHeader>
              <Input placeholder="พิมพ์ข้อความ..." />
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button onClick={() => toast.success("ส่งข้อความแล้ว")}>ส่ง</Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button variant="ghost">ยกเลิก</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <CopyCommand command={installCmd("drawer")} />
      </div>
      <div className="space-y-4">
        <p className="font-heading text-lg font-semibold">Tab Bar</p>
        <p className="text-sm text-muted-foreground">แถบแท็บด้านล่างแบบกระจก เว้นที่ให้ home indicator อัตโนมัติ</p>
        <Phone>
          <TabBar
            className="absolute"
            value={tab}
            onValueChange={setTab}
            items={[
              { value: "home", label: "หน้าแรก", icon: <Home /> },
              { value: "chat", label: "แชท", icon: <MessageCircle /> },
              { value: "alerts", label: "แจ้งเตือน", icon: <Bell /> },
              { value: "me", label: "ฉัน", icon: <User /> },
            ]}
          />
        </Phone>
        <CopyCommand command={installCmd("tab-bar")} />
      </div>
    </div>
  )
}
