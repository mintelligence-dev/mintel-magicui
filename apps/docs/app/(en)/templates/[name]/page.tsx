import type { Metadata } from "next"

import { TemplatePreview } from "@/components/template-preview"
import { TEMPLATES } from "@/lib/templates"

export const dynamicParams = false

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ name: t.name }))
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params
  return { title: TEMPLATES.find((t) => t.name === name)!.title }
}

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  return <TemplatePreview lang="en" name={name} />
}
