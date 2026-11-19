export const REGISTRY_URL =
  process.env.NEXT_PUBLIC_REGISTRY_URL ??
  "https://raw.githubusercontent.com/mintelligence-dev/mintel-magicui/main/apps/docs/public/r"

export const REPO_URL = "https://github.com/mintelligence-dev/mintel-magicui"

export const installCmd = (name: string) => `npx shadcn@latest add ${REGISTRY_URL}/${name}.json`
