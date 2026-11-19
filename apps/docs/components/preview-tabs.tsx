"use client"

import { CodeBlock } from "@/components/code-block"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/mintel/ui/tabs"

/** Preview / Code tabs. The preview and the code come from the same example file. */
export function PreviewTabs({
  code,
  labels,
  fullBleed = false,
  children,
}: {
  code: string
  labels: { preview: string; code: string; copy: string }
  /** Scroll-driven examples need room and no clipping (position: sticky). */
  fullBleed?: boolean
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
            "relative flex w-full items-center justify-center rounded-xl border bg-muted/30",
            fullBleed ? "p-0" : "min-h-72 overflow-hidden p-6 sm:p-10"
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
