"use client"

import { BarChart3, Bot, Calendar, Cloud, Home, Inbox, MessageCircle, Settings, ShieldCheck, Zap } from "lucide-react"

import { CopyCommand } from "@/components/copy-command"
import { installCmd } from "@/lib/site"
import { DotPattern } from "@/registry/mintel/effects/dot-pattern"
import {
  AnimatedTabs,
  AnimatedTabsContent,
  AnimatedTabsList,
  AnimatedTabsTrigger,
} from "@/registry/mintel/motion/animated-tabs"
import { Dock, DockItem } from "@/registry/mintel/motion/dock"
import { ScrollRevealText } from "@/registry/mintel/motion/scroll-reveal-text"
import { StickyShowcase } from "@/registry/mintel/motion/sticky-showcase"
import { ZoomParallax } from "@/registry/mintel/motion/zoom-parallax"

function Visual({ icon: Icon, from, to, label }: { icon: typeof Bot; from: string; to: string; label: string }) {
  return (
    <div
      className="relative flex size-full min-h-56 flex-col items-center justify-center gap-4 overflow-hidden"
      style={{ background: `radial-gradient(120% 120% at 30% 20%, ${from}, ${to})` }}
    >
      <DotPattern className="text-white/20" />
      <div className="flex size-24 items-center justify-center rounded-3xl border border-white/30 bg-white/15 text-white shadow-2xl backdrop-blur-md">
        <Icon className="size-11" />
      </div>
      <span className="font-heading text-lg font-semibold text-white/90">{label}</span>
    </div>
  )
}

const FEATURES = [
  {
    title: "รวมทุกช่องทางไว้ที่เดียว",
    description: "LINE, Facebook, TikTok และ Pantip เข้ามาเป็นเคสใน Salesforce อัตโนมัติ",
    visual: <Visual icon={MessageCircle} from="var(--brand)" to="var(--mintel-color-blue-950)" label="Omnichannel" />,
  },
  {
    title: "AI ช่วยตอบและสรุปเคส",
    description: "Agentforce ร่างคำตอบ สรุปบทสนทนา และส่งต่อให้คนเมื่อจำเป็น",
    visual: <Visual icon={Bot} from="var(--brand-accent)" to="var(--mintel-color-purple-950)" label="AI Assist" />,
  },
  {
    title: "เห็นภาพรวมแบบเรียลไทม์",
    description: "แดชบอร์ด SLA และความพึงพอใจของลูกค้า อัปเดตทุกนาที",
    visual: <Visual icon={BarChart3} from="var(--brand-cyan)" to="var(--mintel-color-blue-900)" label="Analytics" />,
  },
]

export function MotionShowcase() {
  return (
    <div className="space-y-24">
      <div>
        <ScrollRevealText
          as="h3"
          className="max-w-4xl font-heading text-3xl leading-tight font-semibold tracking-tight sm:text-5xl"
          text="เราออกแบบประสบการณ์ลูกค้าที่ลื่นไหล ทุกการแตะ ทุกการเลื่อน ตอบสนองอย่างเป็นธรรมชาติ เหมือนสิ่งของจริงที่มีน้ำหนัก"
        />
        <CopyCommand className="mt-6 max-w-xl" command={installCmd("scroll-reveal-text")} />
      </div>

      <div>
        <StickyShowcase items={FEATURES} />
        <CopyCommand className="mt-6 max-w-xl" command={installCmd("sticky-showcase")} />
      </div>

      <div className="grid gap-8 lg:grid-cols-2 [&>*]:min-w-0">
        <div className="space-y-4">
          <p className="font-heading text-lg font-semibold">Dock</p>
          <p className="text-sm text-muted-foreground">เลื่อนเมาส์ผ่านเพื่อขยายไอคอน — บนมือถือจะเป็นการกดแบบ spring แทน</p>
          <div className="relative flex min-h-40 items-end justify-center overflow-hidden rounded-2xl border bg-[radial-gradient(120%_120%_at_50%_0%,var(--brand)_0%,var(--brand-accent)_60%,var(--mintel-color-neutral-950)_100%)] p-6">
            <Dock>
              <DockItem label="Home"><Home /></DockItem>
              <DockItem label="Inbox"><Inbox /></DockItem>
              <DockItem label="Calendar"><Calendar /></DockItem>
              <DockItem label="Cloud"><Cloud /></DockItem>
              <DockItem label="Security"><ShieldCheck /></DockItem>
              <DockItem label="Settings"><Settings /></DockItem>
            </Dock>
          </div>
          <CopyCommand command={installCmd("dock")} />
        </div>
        <div className="space-y-4">
          <p className="font-heading text-lg font-semibold">Animated Tabs</p>
          <p className="text-sm text-muted-foreground">ตัวชี้แท็บเลื่อนตามด้วย spring — มีแบบ pill และ underline</p>
          <div className="flex min-h-40 flex-col items-center justify-center gap-6 rounded-2xl border bg-muted/30 p-6">
            <AnimatedTabs defaultValue="all">
              <AnimatedTabsList>
                <AnimatedTabsTrigger value="all">ทั้งหมด</AnimatedTabsTrigger>
                <AnimatedTabsTrigger value="open">เปิดอยู่</AnimatedTabsTrigger>
                <AnimatedTabsTrigger value="closed">ปิดแล้ว</AnimatedTabsTrigger>
              </AnimatedTabsList>
            </AnimatedTabs>
            <AnimatedTabs defaultValue="chat" variant="underline">
              <AnimatedTabsList>
                <AnimatedTabsTrigger value="chat"><MessageCircle /> Chat</AnimatedTabsTrigger>
                <AnimatedTabsTrigger value="ai"><Zap /> AI</AnimatedTabsTrigger>
                <AnimatedTabsTrigger value="report"><BarChart3 /> Report</AnimatedTabsTrigger>
              </AnimatedTabsList>
              <AnimatedTabsContent value="chat" className="hidden" />
            </AnimatedTabs>
          </div>
          <CopyCommand command={installCmd("animated-tabs")} />
        </div>
      </div>
    </div>
  )
}

export function ZoomShowcase() {
  return (
    <div>
      <ZoomParallax
        overlay={
          <div className="px-6 text-center text-white">
            <p className="text-sm font-semibold tracking-[0.2em] text-white/70 uppercase">Zoom Parallax</p>
            <p className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-7xl">Customer Experience</p>
            <p className="mt-3 text-white/80">เลื่อนลงเพื่อดูภาพย่อเข้าเป็นการ์ด</p>
          </div>
        }
      >
        <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_20%_10%,var(--brand-cyan),transparent_60%),radial-gradient(80%_80%_at_80%_30%,var(--brand-accent),transparent_60%),linear-gradient(160deg,var(--brand),var(--mintel-color-neutral-950))]" />
        <DotPattern className="text-white/15" />
      </ZoomParallax>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <CopyCommand className="max-w-xl" command={installCmd("zoom-parallax")} />
      </div>
    </div>
  )
}
