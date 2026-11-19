"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/mintel/ui/tabs"

/** File tabs (html / js / css) for an LWC bundle. */
export function LwcSource({ files }: { files: { name: string; code: string }[] }) {
  return (
    <Tabs defaultValue={files[0]?.name} className="min-w-0">
      <TabsList className="max-w-full overflow-x-auto">
        {files.map((f) => (
          <TabsTrigger key={f.name} value={f.name} className="font-mono text-xs">
            {f.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {files.map((f) => (
        <TabsContent key={f.name} value={f.name}>
          <pre tabIndex={0} className="max-h-80 overflow-auto rounded-lg bg-muted p-4 font-mono text-xs leading-relaxed">
            <code>{f.code}</code>
          </pre>
        </TabsContent>
      ))}
    </Tabs>
  )
}
