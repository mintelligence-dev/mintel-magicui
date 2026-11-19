import type { Metadata } from "next"

import { ThemesPage } from "@/components/themes-page"
import { getDict } from "@/lib/i18n"

export const metadata: Metadata = {
  title: getDict("th").themes.metaTitle,
  alternates: { languages: { en: "/themes", th: "/th/themes" } },
}

export default function Page() {
  return <ThemesPage lang="th" />
}
