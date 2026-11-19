import type { Metadata } from "next"

import { ComponentPage } from "@/components/component-page"
import { COMPONENT_DOCS, ITEMS } from "@/lib/component-docs"

export const dynamicParams = false

export function generateStaticParams() {
  return ITEMS.map((i) => ({ name: i.name }))
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params
  const item = ITEMS.find((i) => i.name === name)!
  return {
    title: item.title,
    description: COMPONENT_DOCS[name].th,
    alternates: { languages: { en: `/components/${name}`, th: `/th/components/${name}` } },
  }
}

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  return <ComponentPage lang="th" name={name} />
}
