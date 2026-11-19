"use client"

import type { Lang } from "@/lib/i18n"

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

const en = {
  addConnector: "Add connector",
  dialogTitle: "Add a social connector",
  dialogDesc: "Connect a social channel to your Salesforce org.",
  connectorName: "Connector name",
  connectorPlaceholder: "e.g. Main LINE OA",
  channel: "Channel",
  cancel: "Cancel",
  save: "Save",
  saved: "Connector added",
  pickChannel: "Pick a channel",
  overview: "Overview",
  cases: "Cases",
  settings: "Settings",
  messagesToday: (n: React.ReactNode) => <>{n} messages today</>,
  openCases: (n: React.ReactNode) => <>{n} open cases</>,
  settingsBody: "Notification and SLA settings",
  savedTitle: "Saved",
  savedDesc: "Customer record updated",
  errorTitle: "Couldn't connect",
  errorDesc: "Check the Pantip token",
  syncing: "Syncing...",
  synced: "Sync complete",
  syncFailed: "Sync failed",
  messages: "Messages",
  status: "Status",
}
const th: typeof en = {
  addConnector: "เพิ่ม Connector",
  dialogTitle: "เพิ่ม Social Connector",
  dialogDesc: "เชื่อมช่องทางโซเชียลเข้ากับ Salesforce ของคุณ",
  connectorName: "ชื่อ Connector",
  connectorPlaceholder: "เช่น LINE OA หลัก",
  channel: "ช่องทาง",
  cancel: "ยกเลิก",
  save: "บันทึก",
  saved: "เพิ่ม Connector แล้ว",
  pickChannel: "เลือกช่องทาง",
  overview: "ภาพรวม",
  cases: "เคส",
  settings: "ตั้งค่า",
  messagesToday: (n) => <>ข้อความเข้า {n} รายการวันนี้</>,
  openCases: (n) => <>เคสเปิดอยู่ {n} เคส</>,
  settingsBody: "ตั้งค่าการแจ้งเตือนและ SLA",
  savedTitle: "บันทึกสำเร็จ",
  savedDesc: "ข้อมูลลูกค้าอัปเดตแล้ว",
  errorTitle: "เชื่อมต่อไม่สำเร็จ",
  errorDesc: "ตรวจสอบ token ของ Pantip",
  syncing: "กำลัง sync...",
  synced: "Sync เสร็จแล้ว",
  syncFailed: "Sync ล้มเหลว",
  messages: "ข้อความ",
  status: "สถานะ",
}
const COPY: Record<Lang, typeof en> = { en, th }

export function DialogDemo({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand">{t.addConnector}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.dialogTitle}</DialogTitle>
          <DialogDescription>{t.dialogDesc}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <label className="grid gap-1.5 text-sm font-medium">
            {t.connectorName}
            <Input placeholder={t.connectorPlaceholder} />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            {t.channel}
            <ChannelSelect lang={lang} className="w-full" />
          </label>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t.cancel}</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => toast.success(t.saved)}>{t.save}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function ChannelSelect({ lang, className }: { lang: Lang; className?: string }) {
  const t = COPY[lang]
  return (
    <Select>
      <SelectTrigger className={className ?? "w-48"} aria-label={t.pickChannel}>
        <SelectValue placeholder={t.pickChannel} />
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

export function TabsDemo({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  return (
    <Tabs defaultValue="overview" className="w-full max-w-xs">
      <TabsList className="w-full">
        <TabsTrigger value="overview">{t.overview}</TabsTrigger>
        <TabsTrigger value="cases">{t.cases}</TabsTrigger>
        <TabsTrigger value="settings">{t.settings}</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="rounded-lg border bg-background p-3 text-sm">
        {t.messagesToday(<strong className="text-brand">1,284</strong>)}
      </TabsContent>
      <TabsContent value="cases" className="rounded-lg border bg-background p-3 text-sm">
        {t.openCases(<strong className="text-brand-accent">37</strong>)}
      </TabsContent>
      <TabsContent value="settings" className="rounded-lg border bg-background p-3 text-sm">
        {t.settingsBody}
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

export function TableDemo({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  return (
    <div className="w-full overflow-hidden rounded-lg border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t.channel}</TableHead>
            <TableHead className="text-right">{t.messages}</TableHead>
            <TableHead>{t.status}</TableHead>
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

export function ToastDemo({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="outline" onClick={() => toast.success(t.savedTitle, { description: t.savedDesc })}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error(t.errorTitle, { description: t.errorDesc })}>
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((r) => setTimeout(r, 1500)), {
            loading: t.syncing,
            success: t.synced,
            error: t.syncFailed,
          })
        }
      >
        Promise
      </Button>
    </div>
  )
}
