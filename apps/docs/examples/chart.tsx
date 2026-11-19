"use client"

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/mintel/ui/chart"

const data = [
  { month: "Jan", line: 1860, facebook: 800, tiktok: 420 },
  { month: "Feb", line: 2050, facebook: 980, tiktok: 610 },
  { month: "Mar", line: 2370, facebook: 1120, tiktok: 880 },
  { month: "Apr", line: 2210, facebook: 1040, tiktok: 1190 },
  { month: "May", line: 2690, facebook: 1300, tiktok: 1460 },
  { month: "Jun", line: 3010, facebook: 1410, tiktok: 1720 },
]

const config = {
  line: { label: "LINE" },
  facebook: { label: "Facebook" },
  tiktok: { label: "TikTok" },
} satisfies ChartConfig

export default function ChartExample() {
  return (
    <div className="grid w-full gap-8 lg:grid-cols-2 [&>*]:min-w-0">
      <ChartContainer config={config} className="min-h-56 w-full">
        <BarChart data={data} accessibilityLayer margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="line" fill="var(--color-line)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="facebook" fill="var(--color-facebook)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="tiktok" fill="var(--color-tiktok)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>

      <ChartContainer config={config} className="min-h-56 w-full">
        <AreaChart data={data} accessibilityLayer margin={{ left: 12, right: 12 }}>
          <defs>
            {Object.keys(config).map((key) => (
              <linearGradient key={key} id={`fill-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={`var(--color-${key})`} stopOpacity={0.5} />
                <stop offset="95%" stopColor={`var(--color-${key})`} stopOpacity={0.05} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip content={<ChartTooltipContent />} />
          {Object.keys(config).map((key) => (
            <Area key={key} dataKey={key} type="natural" stackId="a" fill={`url(#fill-${key})`} stroke={`var(--color-${key})`} strokeWidth={2} />
          ))}
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
