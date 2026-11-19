import type { Metadata } from "next"

import { SalesforcePage } from "@/components/salesforce-page"
import { getDict } from "@/lib/i18n"

export const metadata: Metadata = {
  title: getDict("en").sf.metaTitle,
  alternates: { languages: { en: "/salesforce", th: "/th/salesforce" } },
}

export default function Page() {
  return <SalesforcePage lang="en" />
}
