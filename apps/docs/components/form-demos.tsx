"use client"

import { useState } from "react"
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

const PROVINCES: ComboboxOption[] = [
  { value: "bkk", label: "กรุงเทพมหานคร", keywords: ["Bangkok"] },
  { value: "cnx", label: "เชียงใหม่", keywords: ["Chiang Mai"] },
  { value: "hkt", label: "ภูเก็ต", keywords: ["Phuket"] },
  { value: "kkn", label: "ขอนแก่น", keywords: ["Khon Kaen"] },
  { value: "cbi", label: "ชลบุรี", keywords: ["Chonburi", "Pattaya"] },
  { value: "rayong", label: "ระยอง", keywords: ["Rayong"] },
  { value: "sgz", label: "สงขลา", keywords: ["Songkhla", "Hat Yai"] },
]

const CHANNELS: ComboboxOption[] = [
  { value: "line", label: "LINE" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
  { value: "instagram", label: "Instagram" },
  { value: "x", label: "X" },
  { value: "pantip", label: "Pantip" },
]

export function ComboboxDemo() {
  const [province, setProvince] = useState("")
  const [channels, setChannels] = useState<string[]>(["line", "facebook"])
  return (
    <div className="grid w-full max-w-xs gap-3">
      <Combobox options={PROVINCES} value={province} onValueChange={setProvince} placeholder="เลือกจังหวัด" searchPlaceholder="พิมพ์ไทยหรืออังกฤษ..." />
      <Combobox multiple options={CHANNELS} value={channels} onValueChange={setChannels} placeholder="เลือกช่องทาง" />
    </div>
  )
}

export function DatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [range, setRange] = useState<DateRange | undefined>()
  return (
    <div className="grid w-full max-w-xs gap-3">
      <DatePicker value={date} onValueChange={setDate} />
      <DateRangePicker value={range} onValueChange={setRange} />
    </div>
  )
}

export function ChoiceDemo() {
  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-3">
        <Switch id="notify" defaultChecked />
        <Label htmlFor="notify">แจ้งเตือนเมื่อมีเคสใหม่</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="terms" defaultChecked />
        <Label htmlFor="terms">ยอมรับเงื่อนไขการใช้งาน</Label>
      </div>
      <RadioGroup defaultValue="normal" className="flex gap-5">
        {[
          ["low", "ต่ำ"],
          ["normal", "ปกติ"],
          ["high", "ด่วน"],
        ].map(([v, l]) => (
          <div key={v} className="flex items-center gap-2">
            <RadioGroupItem value={v} id={`p-${v}`} />
            <Label htmlFor={`p-${v}`}>{l}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export function DropdownMenuDemo() {
  const [showClosed, setShowClosed] = useState(true)
  return (
    <div className="flex w-full max-w-xs items-center justify-between rounded-lg border bg-background px-3 py-2">
      <span className="text-sm font-medium">เคส #10482 · LINE</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="ตัวเลือก">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>จัดการเคส</DropdownMenuLabel>
          <DropdownMenuItem>
            <Pencil /> แก้ไข <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => toast("คัดลอกลิงก์แล้ว")}>
            <Copy /> คัดลอกลิงก์
          </DropdownMenuItem>
          <DropdownMenuCheckboxItem checked={showClosed} onCheckedChange={setShowClosed}>
            แสดงเคสที่ปิดแล้ว
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Trash2 /> ลบ
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function TooltipPopoverDemo() {
  return (
    <div className="flex items-center gap-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" aria-label="ข้อมูล">
            <Info />
          </Button>
        </TooltipTrigger>
        <TooltipContent>SLA ตอบกลับภายใน 15 นาที</TooltipContent>
      </Tooltip>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">ตั้งค่าเร็ว</Button>
        </PopoverTrigger>
        <PopoverContent className="grid gap-3">
          <p className="font-heading text-sm font-semibold">การแจ้งเตือน</p>
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="pop-sw">เสียงแจ้งเตือน</Label>
            <Switch id="pop-sw" size="sm" defaultChecked />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

const schema = z.object({
  name: z.string().min(2, "กรอกชื่ออย่างน้อย 2 ตัวอักษร"),
  email: z.email("รูปแบบอีเมลไม่ถูกต้อง"),
  province: z.string().min(1, "เลือกจังหวัด"),
  date: z.date({ error: "เลือกวันที่นัดหมาย" }),
  priority: z.enum(["low", "normal", "high"]),
  message: z.string().max(200, "ไม่เกิน 200 ตัวอักษร").optional(),
  notify: z.boolean(),
  consent: z.literal(true, { error: "ต้องยอมรับเงื่อนไขก่อน" }),
})
type FormValues = z.input<typeof schema>

export function FormDemo() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", province: "", priority: "normal", message: "", notify: true, consent: false as unknown as true },
  })

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit((v) => toast.success("ส่งแบบฟอร์มแล้ว", { description: `${v.name} · ${v.email}` }))}
        className="grid gap-5 sm:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อลูกค้า</FormLabel>
              <FormControl>
                <Input placeholder="สมชาย ใจดี" {...field} />
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
              <FormLabel>อีเมล</FormLabel>
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
              <FormLabel>จังหวัด</FormLabel>
              <Combobox
                options={PROVINCES}
                value={field.value}
                onValueChange={field.onChange}
                placeholder="เลือกจังหวัด"
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
              <FormLabel>วันนัดหมาย</FormLabel>
              <DatePicker value={field.value} onValueChange={field.onChange} aria-invalid={!!fieldState.error} />
              <FormDescription>แสดงเป็น พ.ศ. — ค่าที่ส่งออกเป็น Date ปกติ</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ความเร่งด่วน</FormLabel>
              <FormControl>
                <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-5 pt-1">
                  {[
                    ["low", "ต่ำ"],
                    ["normal", "ปกติ"],
                    ["high", "ด่วน"],
                  ].map(([v, l]) => (
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
                <FormLabel>แจ้งเตือนทาง LINE</FormLabel>
                <FormDescription className="text-xs">เมื่อเคสมีการอัปเดต</FormDescription>
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
              <FormLabel>รายละเอียด</FormLabel>
              <FormControl>
                <Textarea placeholder="อธิบายปัญหาสั้นๆ" {...field} />
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
                <FormLabel>ยินยอมให้เก็บข้อมูลตาม PDPA</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 sm:col-span-2">
          <Button type="submit" variant="brand">
            <MessageCircle /> ส่งเคส
          </Button>
          <Button type="button" variant="ghost" onClick={() => form.reset()}>
            ล้างฟอร์ม
          </Button>
        </div>
      </form>
    </Form>
  )
}
