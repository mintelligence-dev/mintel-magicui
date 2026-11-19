import { CircleCheck, CircleX } from "lucide-react"

import { cn } from "@/lib/utils"

export type GuideLine = { text: string; alt?: { href: string; label: string } }

/** "Use it for / Not for" columns, shared by the React and Salesforce component pages. */
export function WhenToUse({ title, labels, use, avoid }: { title: string; labels: { use: string; avoid: string }; use: GuideLine[]; avoid: GuideLine[] }) {
  return (
    <section className="space-y-4">
      <h2 className="font-heading text-xl font-semibold">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2 [&>*]:min-w-0">
        {([["use", use], ["avoid", avoid]] as const).map(([kind, lines]) => (
          <div key={kind} className={cn("rounded-2xl border p-5", kind === "use" ? "border-success/30 bg-success/5" : "border-destructive/25 bg-destructive/5")}>
            <h3 className={cn("flex items-center gap-2 text-sm font-semibold", kind === "use" ? "text-success" : "text-destructive")}>
              {kind === "use" ? <CircleCheck className="size-4" /> : <CircleX className="size-4" />}
              {labels[kind]}
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              {lines.map((line) => (
                <li key={line.text} className="text-muted-foreground">
                  {line.text}
                  {line.alt && (
                    <>
                      {" "}
                      <a href={line.alt.href} className="font-medium text-brand underline-offset-2 hover:underline">
                        → {line.alt.label}
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
