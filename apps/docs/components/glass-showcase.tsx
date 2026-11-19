"use client"

import { useState } from "react"
import { Bell, Search, Sparkles } from "lucide-react"

import { CopyCommand } from "@/components/copy-command"
import { installCmd } from "@/lib/site"
import { GlassButton } from "@/registry/mintel/glass/glass-button"
import { GlassCard } from "@/registry/mintel/glass/glass-card"
import { GlassNavbar } from "@/registry/mintel/glass/glass-navbar"
import { SegmentedControl } from "@/registry/mintel/glass/segmented-control"

function Backdrop() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -left-16 size-80 rounded-full bg-brand opacity-70 blur-3xl animate-[blob_16s_ease-in-out_infinite] motion-reduce:animate-none" />
      <div className="absolute top-20 right-[-4rem] size-96 rounded-full bg-brand-accent opacity-60 blur-3xl animate-[blob_20s_ease-in-out_infinite_reverse] motion-reduce:animate-none" />
      <div className="absolute bottom-[-6rem] left-1/3 size-80 rounded-full bg-brand-cyan opacity-50 blur-3xl animate-[blob_18s_ease-in-out_infinite] motion-reduce:animate-none" />
      {/* Detailed content so blur and refraction are visible */}
      <div className="absolute inset-0 flex flex-col justify-center gap-2 px-6 font-heading text-[clamp(2.5rem,9vw,6rem)] leading-none font-bold tracking-tight text-foreground/10 select-none">
        <span>Customer</span>
        <span className="pl-[10%]">Experience</span>
        <span>Intelligence</span>
      </div>
    </div>
  )
}

export function GlassShowcase() {
  const [period, setPeriod] = useState("week")
  const stats = { day: "1,284", week: "8,902", month: "36,417" } as Record<string, string>

  return (
    <div className="space-y-6">
      <div className="relative isolate overflow-hidden rounded-3xl border bg-muted/40 px-3 pb-8 sm:px-6">
        <Backdrop />
        <GlassNavbar floating className="static mt-4 flex h-14 items-center justify-between px-3 sm:px-5">
          <span className="flex items-center gap-2 font-heading font-semibold">
            <Sparkles className="size-4 text-brand" /> Mintel
          </span>
          <div className="flex items-center gap-1">
            <GlassButton size="icon" aria-label="ค้นหา" className="size-9 shadow-none">
              <Search />
            </GlassButton>
            <GlassButton size="icon" aria-label="การแจ้งเตือน" className="size-9 shadow-none">
              <Bell />
            </GlassButton>
          </div>
        </GlassNavbar>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <GlassCard refraction className="p-6">
            <p className="text-sm text-muted-foreground">ข้อความเข้า</p>
            <p className="mt-1 font-heading text-4xl font-bold tabular-nums">{stats[period]}</p>
            <SegmentedControl
              aria-label="ช่วงเวลา"
              className="mt-5 w-full"
              value={period}
              onValueChange={setPeriod}
              options={[
                { value: "day", label: "วัน" },
                { value: "week", label: "สัปดาห์" },
                { value: "month", label: "เดือน" },
              ]}
            />
            <p className="mt-4 text-xs text-muted-foreground">
              การ์ดนี้เปิด <code>refraction</code> — บน Chrome/Edge (เมาส์) ขอบจะหักเหภาพด้านหลัง
            </p>
          </GlassCard>

          <GlassCard className="flex flex-col justify-between gap-6 p-6">
            <div>
              <p className="font-heading text-xl font-semibold">Glass Button</p>
              <p className="mt-1 text-sm text-muted-foreground">กดค้างเพื่อดู spring press</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <GlassButton>Default</GlassButton>
              <GlassButton variant="tinted">Tinted</GlassButton>
              <GlassButton variant="accent">Accent</GlassButton>
            </div>
          </GlassCard>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {["glass-card", "glass-button", "glass-navbar", "segmented-control"].map((n) => (
          <div key={n} className="space-y-1.5">
            <p className="font-heading text-sm font-semibold">{n}</p>
            <CopyCommand command={installCmd(n)} />
          </div>
        ))}
      </div>
    </div>
  )
}
