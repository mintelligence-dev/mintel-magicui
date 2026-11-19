import type { Metadata } from "next"

import { TemplatesPage } from "@/components/templates-page"

export const metadata: Metadata = {
  title: "Templates",
  alternates: { languages: { en: "/templates", th: "/th/templates" } },
}

export default function Page() {
  return <TemplatesPage lang="th" />
}
