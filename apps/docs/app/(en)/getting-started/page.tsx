import type { Metadata } from "next"

import { GettingStartedPage } from "@/components/getting-started-page"
import { getDict } from "@/lib/i18n"

export const metadata: Metadata = {
  title: getDict("en").docs.gettingStarted,
  alternates: { languages: { en: "/getting-started", th: "/th/getting-started" } },
}

export default function Page() {
  return <GettingStartedPage lang="en" />
}
