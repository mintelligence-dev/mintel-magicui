"use client"

import { useState } from "react"
import { BarChart3, Bell, Home, Inbox, MessageCircle, MoreHorizontal, Settings, Users } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { NumberTicker } from "@/registry/mintel/effects/number-ticker"
import { Badge } from "@/registry/mintel/ui/badge"
import { Button, buttonVariants } from "@/registry/mintel/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/mintel/ui/card"
import { Combobox } from "@/registry/mintel/ui/combobox"
import { DateRangePicker } from "@/registry/mintel/ui/date-picker"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/mintel/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/mintel/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/registry/mintel/ui/tabs"

const NAV = [
  { label: "Overview", icon: Home, active: true },
  { label: "Inbox", icon: Inbox },
  { label: "Customers", icon: Users },
  { label: "Reports", icon: BarChart3 },
  { label: "Settings", icon: Settings },
]

const STATS = [
  { label: "Open cases", value: 37, delta: "+4 today" },
  { label: "Messages", value: 1284, delta: "+12% vs last week" },
  { label: "Avg. first reply", value: 4, suffix: "min", delta: "SLA 15 min" },
  { label: "CSAT", value: 96, suffix: "%", delta: "+2 pts" },
]

const CASES = [
  { id: "C-10482", customer: "Acme Retail", channel: "LINE", status: "Open", agent: "Nok" },
  { id: "C-10481", customer: "Siam Foods", channel: "Facebook", status: "Waiting", agent: "Beam" },
  { id: "C-10479", customer: "Bangkok Air", channel: "TikTok", status: "Open", agent: "Ploy" },
  { id: "C-10476", customer: "Nimit Co.", channel: "Pantip", status: "Escalated", agent: "Nok" },
  { id: "C-10470", customer: "Thai Home", channel: "LINE", status: "Closed", agent: "Beam" },
]

const CHANNELS = ["LINE", "Facebook", "TikTok", "Pantip"].map((c) => ({ value: c, label: c }))

const statusVariant = (s: string) =>
  s === "Open" ? "soft" : s === "Waiting" ? "warning" : s === "Escalated" ? "destructive" : "success"

export default function DashboardPage() {
  const [range, setRange] = useState<DateRange | undefined>()
  const [channels, setChannels] = useState<string[]>([])
  const rows = channels.length ? CASES.filter((c) => channels.includes(c.channel)) : CASES

  return (
    <div className="flex min-h-svh bg-muted/30">
      <aside className="hidden w-60 shrink-0 border-r bg-background p-4 md:block">
        <p className="mb-6 flex items-center gap-2 px-2 font-heading font-semibold">
          <span className="inline-flex size-7 items-center justify-center rounded-lg bg-[image:var(--brand-gradient)] text-sm font-bold text-white">
            M
          </span>
          Mintel Desk
        </p>
        <nav className="space-y-1">
          {NAV.map(({ label, icon: Icon, active }) => (
            <a
              key={label}
              href="#"
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
                  : "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              }
            >
              <Icon className="size-4" /> {label}
            </a>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight">Overview</h1>
            <p className="text-sm text-muted-foreground">Customer service across every channel</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <DateRangePicker locale="en" value={range} onValueChange={setRange} className="w-60" />
            <Button variant="outline" size="icon" aria-label="Notifications">
              <Bell />
            </Button>
          </div>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((s) => (
            <Card key={s.label} className="gap-2 py-5">
              <CardHeader className="px-5">
                <CardDescription>{s.label}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-baseline gap-1 px-5">
                <NumberTicker value={s.value} className="font-heading text-3xl font-bold text-foreground dark:text-foreground" />
                {s.suffix && <span className="text-sm text-muted-foreground">{s.suffix}</span>}
              </CardContent>
              <p className="px-5 text-xs text-success">{s.delta}</p>
            </Card>
          ))}
        </section>

        <Card className="mt-6 gap-0 py-0">
          <CardHeader className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4">
            <div>
              <CardTitle>Cases</CardTitle>
              <CardDescription>Latest conversations turned into cases</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="mine">Mine</TabsTrigger>
                </TabsList>
              </Tabs>
              <Combobox
                locale="en"
                multiple
                options={CHANNELS}
                value={channels}
                onValueChange={setChannels}
                placeholder="All channels"
                className="w-52"
              />
            </div>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Case</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="pl-5 font-mono text-xs">{c.id}</TableCell>
                  <TableCell className="font-medium">{c.customer}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5">
                      <MessageCircle className="size-3.5 text-muted-foreground" /> {c.channel}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(c.status)}>{c.status}</Badge>
                  </TableCell>
                  <TableCell>{c.agent}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        aria-label={`Options for ${c.id}`}
                        className={buttonVariants({ variant: "ghost", size: "icon" })}
                      >
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Open case</DropdownMenuItem>
                        <DropdownMenuItem>Assign to me</DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">Close case</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  )
}
