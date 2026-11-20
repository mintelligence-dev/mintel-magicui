// Where the docs (and the registry JSON under /r) are served.
// On Vercel the production domain is picked up automatically; override with NEXT_PUBLIC_SITE_URL
// (e.g. a custom domain) or point the registry somewhere else with NEXT_PUBLIC_REGISTRY_URL.
const vercelProduction = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelProduction ? `https://${vercelProduction}` : "http://localhost:3000")

export const REGISTRY_URL = process.env.NEXT_PUBLIC_REGISTRY_URL ?? `${SITE_URL}/r`

export const REPO_URL = process.env.NEXT_PUBLIC_REPO_URL ?? "https://github.com/mintelligence-dev/mintel-magicui"

export const installCmd = (name: string) => `npx shadcn@latest add ${REGISTRY_URL}/${name}.json`
