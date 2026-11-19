import type { Metadata } from "next"

import { SfComponentPage } from "@/components/sf-component-page"
import { SF_COMPONENTS, sfLabel } from "@/lib/sf-components"
import { getDict } from "@/lib/i18n"

export const dynamicParams = false

export function generateStaticParams() {
  return SF_COMPONENTS.map((c) => ({ name: c.name }))
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params
  return {
    title: `${sfLabel(name)} · Salesforce`,
    description: (getDict("th").sf.components as Record<string, string>)[name],
    alternates: { languages: { en: `/salesforce/${name}`, th: `/th/salesforce/${name}` } },
  }
}

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  return <SfComponentPage lang="th" name={name} />
}
