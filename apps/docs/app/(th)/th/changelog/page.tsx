import type { Metadata } from "next"

import { ChangelogPage } from "@/components/changelog-page"

export const metadata: Metadata = {
  title: "บันทึกการเปลี่ยนแปลง",
  alternates: { languages: { en: "/changelog", th: "/th/changelog" } },
}

export default function Page() {
  return <ChangelogPage lang="th" />
}
