"use client"

import { Badge } from "@/registry/mintel/ui/badge"
import { Button } from "@/registry/mintel/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/mintel/ui/dialog"
import { Input } from "@/registry/mintel/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/registry/mintel/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/mintel/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/mintel/ui/tabs"
import { toast } from "@/registry/mintel/ui/toast"

const CHANNELS = ["LINE", "Facebook", "TikTok", "Instagram", "X", "Pantip"]

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand">เพิ่ม Connector</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>เพิ่ม Social Connector</DialogTitle>
          <DialogDescription>เชื่อมช่องทางโซเชียลเข้ากับ Salesforce ของคุณ</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <label className="grid gap-1.5 text-sm font-medium">
            ชื่อ Connector
            <Input placeholder="เช่น LINE OA หลัก" />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            ช่องทาง
            <ChannelSelect className="w-full" />
          </label>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">ยกเลิก</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => toast.success("เพิ่ม Connector แล้ว")}>บันทึก</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function ChannelSelect({ className }: { className?: string }) {
  return (
    <Select>
      <SelectTrigger className={className ?? "w-48"}>
        <SelectValue placeholder="เลือกช่องทาง" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Social channels</SelectLabel>
          {CHANNELS.map((c) => (
            <SelectItem key={c} value={c.toLowerCase()}>
              {c}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-xs">
      <TabsList className="w-full">
        <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
        <TabsTrigger value="cases">เคส</TabsTrigger>
        <TabsTrigger value="settings">ตั้งค่า</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="rounded-lg border bg-background p-3 text-sm">
        ข้อความเข้า <strong className="text-brand">1,284</strong> รายการวันนี้
      </TabsContent>
      <TabsContent value="cases" className="rounded-lg border bg-background p-3 text-sm">
        เคสเปิดอยู่ <strong className="text-brand-accent">37</strong> เคส
      </TabsContent>
      <TabsContent value="settings" className="rounded-lg border bg-background p-3 text-sm">
        ตั้งค่าการแจ้งเตือนและ SLA
      </TabsContent>
    </Tabs>
  )
}

const ROWS = [
  { channel: "LINE", messages: 842, status: "Online" },
  { channel: "Facebook", messages: 311, status: "Online" },
  { channel: "TikTok", messages: 96, status: "Syncing" },
  { channel: "Pantip", messages: 35, status: "Error" },
] as const

export function TableDemo() {
  return (
    <div className="w-full overflow-hidden rounded-lg border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Channel</TableHead>
            <TableHead className="text-right">Messages</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((r) => (
            <TableRow key={r.channel}>
              <TableCell className="font-medium">{r.channel}</TableCell>
              <TableCell className="text-right tabular-nums">{r.messages}</TableCell>
              <TableCell>
                <Badge
                  variant={r.status === "Online" ? "success" : r.status === "Syncing" ? "warning" : "destructive"}
                >
                  {r.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function ToastDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="outline" onClick={() => toast.success("บันทึกสำเร็จ", { description: "ข้อมูลลูกค้าอัปเดตแล้ว" })}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error("เชื่อมต่อไม่สำเร็จ", { description: "ตรวจสอบ token ของ Pantip" })}>
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((r) => setTimeout(r, 1500)), {
            loading: "กำลัง sync...",
            success: "Sync เสร็จแล้ว",
            error: "Sync ล้มเหลว",
          })
        }
      >
        Promise
      </Button>
    </div>
  )
}
