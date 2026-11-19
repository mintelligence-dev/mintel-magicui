"use client"

import { CodeBlock } from "@/components/code-block"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/mintel/ui/tabs"
import { PREVIEW_CANVAS } from "@/lib/preview-canvas"

/** Preview / Code tabs. The preview and the code come from the same example file. */
export function PreviewTabs({
  code,
  labels,
  frame = "padded",
  children,
}: {
  code: string
  labels: { preview: string; code: string; copy: string }
  /**
   * "padded" (default): centered, padded, clipped. "unclipped": padded but not clipped, so position: sticky
   * works. "bleed": edge to edge and not clipped. "section": full-width page section on the page background.
   * "section-sticky": the same, but not clipped (overflow: hidden would stop position: sticky).
   */
  frame?: "padded" | "unclipped" | "bleed" | "section" | "section-sticky"
  children: React.ReactNode
}) {
  return (
    <Tabs defaultValue="preview" className="gap-3">
      <TabsList>
        <TabsTrigger value="preview">{labels.preview}</TabsTrigger>
        <TabsTrigger value="code">{labels.code}</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" forceMount className="data-[state=inactive]:hidden">
        <div
          className={cn(
            "relative flex w-full items-center justify-center rounded-2xl border",
            frame === "padded" || frame === "unclipped" ? PREVIEW_CANVAS : "bg-muted/30",
            frame === "bleed" ? "p-0" : frame === "section" ? "block overflow-hidden bg-background p-0" : frame === "section-sticky" ? "block bg-background p-0" : frame === "unclipped" ? "px-6 py-6 sm:px-10 sm:py-10" : "min-h-72 overflow-hidden p-6 sm:p-10"
          )}
        >
          {children}
        </div>
      </TabsContent>
      <TabsContent value="code">
        <CodeBlock code={code} copyLabel={labels.copy} />
      </TabsContent>
    </Tabs>
  )
}
