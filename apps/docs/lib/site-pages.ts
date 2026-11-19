// Every public docs page (English paths), for the sitemap and llms.txt.
import blocks from "@/registry/blocks.json"
import { ITEMS } from "@/lib/component-docs"
import { SF_INDEX } from "@/lib/sf-index"
import { SITE_URL } from "@/lib/site"

export const BASE_URL = `${SITE_URL}${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}`

export const GUIDE_PATHS = ["/", "/getting-started", "/themes", "/components", "/templates", "/salesforce", "/salesforce/get-started", "/changelog"]

/** English paths of every page; each also exists under /th. */
export const PAGE_PATHS: string[] = [
  ...GUIDE_PATHS,
  ...ITEMS.map((i) => `/components/${i.name}`),
  ...(blocks as { name: string }[]).map((b) => `/templates/${b.name}`),
  ...SF_INDEX.map((c) => `/salesforce/${c.name}`),
]

export const abs = (path: string) => `${BASE_URL}${path === "/" ? "" : path}`
