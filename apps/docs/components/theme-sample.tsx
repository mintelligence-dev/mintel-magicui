"use client"

import { BellIcon, TriangleAlertIcon } from "lucide-react"

import { getDict, type Lang } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { SegmentedControl } from "@/registry/mintel/glass/segmented-control"
import { Alert, AlertTitle } from "@/registry/mintel/ui/alert"
import { Badge } from "@/registry/mintel/ui/badge"
import { Button } from "@/registry/mintel/ui/button"
import { Input } from "@/registry/mintel/ui/input"
import { Label } from "@/registry/mintel/ui/label"
import { Switch } from "@/registry/mintel/ui/switch"

/**
 * A small screen built from real components, used to preview a theme. The caller paints the theme's
 * variables on the wrapper (inline style), so this shows any theme whatever the page itself uses.
 */
export function ThemeSample({
  lang,
  vars,
  dark,
  compact = false,
  className,
}: {
  lang: Lang
  vars: Record<string, string>
  dark: boolean
  compact?: boolean
  className?: string
}) {
  const t = getDict(lang).themes.sample
  return (
    <div
      style={vars as React.CSSProperties}
      className={cn(dark && "dark", "bg-background font-sans text-foreground", className)}
    >
      <div className="grid gap-3 rounded-xl border bg-card p-4 text-card-foreground shadow-sm" data-slot="card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-heading text-base font-semibold">{t.title}</p>
            <p className="text-xs text-muted-foreground">{t.subtitle}</p>
          </div>
          <div className="flex gap-1.5">
            <Badge variant="soft">{t.open}</Badge>
            {!compact && <Badge variant="success">{t.closed}</Badge>}
          </div>
        </div>
        {!compact && (
          <div className="grid gap-1.5">
            <Label htmlFor={`sample-name-${dark ? "d" : "l"}`}>{t.name}</Label>
            <Input id={`sample-name-${dark ? "d" : "l"}`} placeholder={t.namePlaceholder} />
          </div>
        )}
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="inline-flex items-center gap-2">
            <BellIcon className="size-4 text-muted-foreground" />
            {t.notify}
          </span>
          <Switch defaultChecked aria-label={t.notify} />
        </div>
        {!compact && (
          <>
            <SegmentedControl aria-label="Range" defaultValue="week" options={t.tabs.map((x, i) => ({ value: ["day", "week", "month"][i], label: x }))} />
            <Alert variant="warning">
              <TriangleAlertIcon />
              <AlertTitle>{t.alert}</AlertTitle>
            </Alert>
          </>
        )}
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="outline" size="sm">
            {t.cancel}
          </Button>
          <Button variant="brand" size="sm">
            {t.save}
          </Button>
        </div>
      </div>
    </div>
  )
}
