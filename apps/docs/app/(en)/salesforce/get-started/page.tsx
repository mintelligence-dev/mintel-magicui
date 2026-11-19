import type { Metadata } from "next"

import { SfGetStartedPage } from "@/components/sf-get-started-page"

export const metadata: Metadata = {
  title: "Getting started · Salesforce",
  alternates: { languages: { en: "/salesforce/get-started", th: "/th/salesforce/get-started" } },
}

export default function Page() {
  return <SfGetStartedPage lang="en" />
}
