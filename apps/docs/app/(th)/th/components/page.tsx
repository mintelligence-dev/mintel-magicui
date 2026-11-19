import type { Metadata } from "next"

import { ComponentsIndexPage } from "@/components/components-index-page"

export const metadata: Metadata = {
  title: "Components",
  alternates: { languages: { en: "/components", th: "/th/components" } },
}

export default function Page() {
  return <ComponentsIndexPage lang="th" />
}
