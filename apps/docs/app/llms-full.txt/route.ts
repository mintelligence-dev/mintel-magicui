import { buildLlmsFull } from "@/lib/llms"

export const dynamic = "force-static"

/** Full reference for AI coding assistants: props, examples and LWC properties (see lib/llms.ts). */
export function GET() {
  return new Response(buildLlmsFull(), { headers: { "content-type": "text/plain; charset=utf-8" } })
}
