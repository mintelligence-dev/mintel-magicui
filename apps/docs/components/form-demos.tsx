"use client"

import type { Lang } from "@/lib/i18n"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Copy, Info, MessageCircle, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/registry/mintel/ui/button"
import { Checkbox } from "@/registry/mintel/ui/checkbox"
import { Combobox, type ComboboxOption } from "@/registry/mintel/ui/combobox"
import { DatePicker, DateRangePicker } from "@/registry/mintel/ui/date-picker"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/registry/mintel/ui/dropdown-menu"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/mintel/ui/form"
import { Input } from "@/registry/mintel/ui/input"
import { Label } from "@/registry/mintel/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/mintel/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/registry/mintel/ui/radio-group"
import { Switch } from "@/registry/mintel/ui/switch"
import { Textarea } from "@/registry/mintel/ui/textarea"
import { toast } from "@/registry/mintel/ui/toast"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/mintel/ui/tooltip"

const PROVINCE_DATA = [
  ["bkk", "กรุงเทพมหานคร", "Bangkok", []],
  ["cnx", "เชียงใหม่", "Chiang Mai", []],
  ["hkt", "ภูเก็ต", "Phuket", []],
  ["kkn", "ขอนแก่น", "Khon Kaen", []],
  ["cbi", "ชลบุรี", "Chonburi", ["Pattaya", "พัทยา"]],
  ["rayong", "ระยอง", "Rayong", []],
  ["sgz", "สงขลา", "Songkhla", ["Hat Yai", "หาดใหญ่"]],
] as const

/** Province options in the page language; the other language stays searchable via keywords. */
const provinces = (lang: Lang): ComboboxOption[] =>
  PROVINCE_DATA.map(([value, thName, enName, extra]) => ({
    value,
    label: lang === "th" ? thName : enName,
    keywords: [lang === "th" ? enName : thName, ...extra],
  }))

const en = {
  pickProvince: "Choose a province",
  searchProvince: "Type in Thai or English...",
  pickChannel: "Choose channels",
  notifyNew: "Notify me about new cases",
  terms: "I accept the terms of use",
  priorities: [
    ["low", "Low"],
    ["normal", "Normal"],
    ["high", "Urgent"],
  ] as [string, string][],
  caseRow: "Case #10482 · LINE",
  options: "Options",
  manageCase: "Manage case",
  edit: "Edit",
  copyLink: "Copy link",
  linkCopied: "Link copied",
  showClosed: "Show closed cases",
  delete: "Delete",
  info: "Info",
  slaTip: "SLA: reply within 15 minutes",
  quickSettings: "Quick settings",
  notifications: "Notifications",
  sound: "Notification sound",
  v: {
    name: "Enter at least 2 characters",
    email: "Enter a valid email address",
    province: "Choose a province",
    date: "Choose an appointment date",
    message: "200 characters max",
    consent: "Please accept to continue",
  },
  submitted: "Form submitted",
  customerName: "Customer name",
  namePlaceholder: "Jane Doe",
  email: "Email",
  province: "Province",
  appointment: "Appointment date",
  appointmentHint: "Shown in the page language — the value is a normal JS Date",
  priority: "Priority",
  lineNotify: "Notify on LINE",
  lineNotifyHint: "When the case is updated",
  details: "Details",
  detailsPlaceholder: "Describe the issue briefly",
  consent: "I consent to data collection under PDPA",
  submit: "Submit case",
  reset: "Reset",
}
const th: typeof en = {
  pickProvince: "เลือกจังหวัด",
  searchProvince: "พิมพ์ไทยหรืออังกฤษ...",
  pickChannel: "เลือกช่องทาง",
  notifyNew: "แจ้งเตือนเมื่อมีเคสใหม่",
  terms: "ยอมรับเงื่อนไขการใช้งาน",
  priorities: [
    ["low", "ต่ำ"],
    ["normal", "ปกติ"],
    ["high", "ด่วน"],
  ],
  caseRow: "เคส #10482 · LINE",
  options: "ตัวเลือก",
  manageCase: "จัดการเคส",
  edit: "แก้ไข",
  copyLink: "คัดลอกลิงก์",
  linkCopied: "คัดลอกลิงก์แล้ว",
  showClosed: "แสดงเคสที่ปิดแล้ว",
  delete: "ลบ",
  info: "ข้อมูล",
  slaTip: "SLA ตอบกลับภายใน 15 นาที",
  quickSettings: "ตั้งค่าเร็ว",
  notifications: "การแจ้งเตือน",
  sound: "เสียงแจ้งเตือน",
  v: {
    name: "กรอกชื่ออย่างน้อย 2 ตัวอักษร",
    email: "รูปแบบอีเมลไม่ถูกต้อง",
    province: "เลือกจังหวัด",
    date: "เลือกวันที่นัดหมาย",
    message: "ไม่เกิน 200 ตัวอักษร",
    consent: "ต้องยอมรับเงื่อนไขก่อน",
  },
  submitted: "ส่งแบบฟอร์มแล้ว",
  customerName: "ชื่อลูกค้า",
  namePlaceholder: "สมชาย ใจดี",
  email: "อีเมล",
  province: "จังหวัด",
  appointment: "วันนัดหมาย",
  appointmentHint: "แสดงเป็น พ.ศ. — ค่าที่ส่งออกเป็น Date ปกติ",
  priority: "ความเร่งด่วน",
  lineNotify: "แจ้งเตือนทาง LINE",
  lineNotifyHint: "เมื่อเคสมีการอัปเดต",
  details: "รายละเอียด",
  detailsPlaceholder: "อธิบายปัญหาสั้นๆ",
  consent: "ยินยอมให้เก็บข้อมูลตาม PDPA",
  submit: "ส่งเคส",
  reset: "ล้างฟอร์ม",
}
const COPY: Record<Lang, typeof en> = { en, th }

const CHANNELS: ComboboxOption[] = [
  { value: "line", label: "LINE" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
  { value: "instagram", label: "Instagram" },
  { value: "x", label: "X" },
  { value: "pantip", label: "Pantip" },
]

export function ComboboxDemo({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const [province, setProvince] = useState("")
  const [channels, setChannels] = useState<string[]>(["line", "facebook"])
  return (
    <div className="grid w-full max-w-xs gap-3">
      <Combobox
        locale={lang}
        options={provinces(lang)}
        value={province}
        onValueChange={setProvince}
        placeholder={t.pickProvince}
        searchPlaceholder={t.searchProvince}
      />
      <Combobox locale={lang} multiple options={CHANNELS} value={channels} onValueChange={setChannels} placeholder={t.pickChannel} />
    </div>
  )
}

export function DatePickerDemo({ lang }: { lang: Lang }) {
  // Today is picked after mount, so the prerendered HTML does not depend on the build date.
  const [date, setDate] = useState<Date | undefined>()
  useEffect(() => setDate(new Date()), [])
  const [range, setRange] = useState<DateRange | undefined>()
  return (
    <div className="grid w-full max-w-xs gap-3">
      <DatePicker locale={lang} value={date} onValueChange={setDate} />
      <DateRangePicker locale={lang} value={range} onValueChange={setRange} />
    </div>
  )
}

export function ChoiceDemo({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-3">
        <Switch id="notify" defaultChecked />
        <Label htmlFor="notify">{t.notifyNew}</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="terms" defaultChecked />
        <Label htmlFor="terms">{t.terms}</Label>
      </div>
      <RadioGroup defaultValue="normal" className="flex gap-5">
        {t.priorities.map(([v, l]) => (
          <div key={v} className="flex items-center gap-2">
            <RadioGroupItem value={v} id={`p-${v}`} />
            <Label htmlFor={`p-${v}`}>{l}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export function DropdownMenuDemo({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const [showClosed, setShowClosed] = useState(true)
  return (
    <div className="flex w-full max-w-xs items-center justify-between rounded-lg border bg-background px-3 py-2">
      <span className="text-sm font-medium">{t.caseRow}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={t.options}>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>{t.manageCase}</DropdownMenuLabel>
          <DropdownMenuItem>
            <Pencil /> {t.edit} <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => toast(t.linkCopied)}>
            <Copy /> {t.copyLink}
          </DropdownMenuItem>
          <DropdownMenuCheckboxItem checked={showClosed} onCheckedChange={setShowClosed}>
            {t.showClosed}
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Trash2 /> {t.delete}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function TooltipPopoverDemo({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  return (
    <div className="flex items-center gap-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" aria-label={t.info}>
            <Info />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t.slaTip}</TooltipContent>
      </Tooltip>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">{t.quickSettings}</Button>
        </PopoverTrigger>
        <PopoverContent className="grid gap-3">
          <p className="font-heading text-sm font-semibold">{t.notifications}</p>
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="pop-sw">{t.sound}</Label>
            <Switch id="pop-sw" size="sm" defaultChecked />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

const makeSchema = (v: (typeof en)["v"]) =>
  z.object({
    name: z.string().min(2, v.name),
    email: z.email(v.email),
    province: z.string().min(1, v.province),
    date: z.date({ error: v.date }),
    priority: z.enum(["low", "normal", "high"]),
    message: z.string().max(200, v.message).optional(),
    notify: z.boolean(),
    consent: z.literal(true, { error: v.consent }),
  })
type FormValues = z.input<ReturnType<typeof makeSchema>>

export function FormDemo({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const form = useForm<FormValues>({
    resolver: zodResolver(makeSchema(t.v)),
    defaultValues: { name: "", email: "", province: "", priority: "normal", message: "", notify: true, consent: false as unknown as true },
  })

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit((v) => toast.success(t.submitted, { description: `${v.name} · ${v.email}` }))}
        className="grid gap-5 sm:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.customerName}</FormLabel>
              <FormControl>
                <Input placeholder={t.namePlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.email}</FormLabel>
              <FormControl>
                <Input type="email" inputMode="email" placeholder="name@company.co.th" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="province"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t.province}</FormLabel>
              <Combobox
                locale={lang}
                options={provinces(lang)}
                value={field.value}
                onValueChange={field.onChange}
                placeholder={t.pickProvince}
                aria-invalid={!!fieldState.error}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t.appointment}</FormLabel>
              <DatePicker locale={lang} value={field.value} onValueChange={field.onChange} aria-invalid={!!fieldState.error} />
              <FormDescription>{t.appointmentHint}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.priority}</FormLabel>
              <FormControl>
                <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-5 pt-1">
                  {t.priorities.map(([v, l]) => (
                    <label key={v} className="flex items-center gap-2 text-sm">
                      <RadioGroupItem value={v} /> {l}
                    </label>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notify"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between gap-3 rounded-lg border p-3 sm:self-end">
              <div className="grid gap-1">
                <FormLabel>{t.lineNotify}</FormLabel>
                <FormDescription className="text-xs">{t.lineNotifyHint}</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t.details}</FormLabel>
              <FormControl>
                <Textarea placeholder={t.detailsPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <div className="flex items-center gap-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={(c) => field.onChange(c === true)} />
                </FormControl>
                <FormLabel>{t.consent}</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 sm:col-span-2">
          <Button type="submit" variant="brand">
            <MessageCircle /> {t.submit}
          </Button>
          <Button type="button" variant="ghost" onClick={() => form.reset()}>
            {t.reset}
          </Button>
        </div>
      </form>
    </Form>
  )
}
