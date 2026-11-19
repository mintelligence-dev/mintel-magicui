import { buildLlms } from "@/lib/llms"

export const dynamic = "force-static"

/** Short index of the design system for AI coding assistants (see lib/llms.ts). */
export function GET() {
  return new Response(buildLlms(), { headers: { "content-type": "text/plain; charset=utf-8" } })
}
