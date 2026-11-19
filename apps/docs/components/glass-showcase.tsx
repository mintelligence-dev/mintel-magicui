"use client"

import { useState } from "react"
import { Bell, Search, Sparkles } from "lucide-react"

import { CopyCommand } from "@/components/copy-command"
import { getDict, type Lang } from "@/lib/i18n"
import { installCmd } from "@/lib/site"
import { GlassButton } from "@/registry/mintel/glass/glass-button"
import { GlassCard } from "@/registry/mintel/glass/glass-card"
import { GlassNavbar } from "@/registry/mintel/glass/glass-navbar"
import { SegmentedControl } from "@/registry/mintel/glass/segmented-control"

function Backdrop() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -left-16 size-80 rounded-full bg-brand opacity-70 blur-3xl" />
      <div className="absolute top-20 right-[-4rem] size-96 rounded-full bg-brand-accent opacity-60 blur-3xl" />
      <div className="absolute bottom-[-6rem] left-1/3 size-80 rounded-full bg-brand-cyan opacity-50 blur-3xl" />
      {/* Detailed content so blur and refraction are visible */}
      <div className="absolute inset-0 flex flex-col justify-center gap-2 px-6 font-heading text-[clamp(2.5rem,9vw,6rem)] leading-none font-bold tracking-tight text-foreground/10 select-none">
        <span>Customer</span>
        <span className="pl-[10%]">Experience</span>
        <span>Intelligence</span>
      </div>
    </div>
  )
}

export function GlassShowcase({ lang }: { lang: Lang }) {
  const t = getDict(lang).glass
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
            <GlassButton size="icon" aria-label={t.search} className="size-9 shadow-none">
              <Search />
            </GlassButton>
            <GlassButton size="icon" aria-label={t.notifications} className="size-9 shadow-none">
              <Bell />
            </GlassButton>
          </div>
        </GlassNavbar>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <GlassCard refraction className="p-6">
            <p className="text-sm text-muted-foreground">{t.incoming}</p>
            <p className="mt-1 font-heading text-4xl font-bold tabular-nums">{stats[period]}</p>
            <SegmentedControl
              aria-label={t.period}
              variant="brand"
              className="mt-5 w-full"
              value={period}
              onValueChange={setPeriod}
              options={t.periods.map(([value, label]) => ({ value, label }))}
            />
            <p className="mt-4 text-xs text-muted-foreground">
              {t.refraction}
            </p>
          </GlassCard>

          <GlassCard className="flex flex-col justify-between gap-6 p-6">
            <div>
              <p className="font-heading text-xl font-semibold">Glass Button</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.pressHint}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <GlassButton>Default</GlassButton>
              <GlassButton variant="tinted">Tinted</GlassButton>
              <GlassButton variant="accent">Accent</GlassButton>
            </div>
          </GlassCard>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 [&>*]:min-w-0">
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
