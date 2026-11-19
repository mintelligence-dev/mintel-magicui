import { TemplateBackLink } from "@/components/template-back-link"
import { getDict, langPath, type Lang } from "@/lib/i18n"
import { TEMPLATE_COMPONENTS } from "@/lib/templates"

/** Full-page render of a template with a small floating way back. */
export function TemplatePreview({ lang, name }: { lang: Lang; name: string }) {
  const Template = TEMPLATE_COMPONENTS[name]
  return (
    <>
      <Template />
      <TemplateBackLink href={langPath(lang, "/templates")} label={getDict(lang).docs.backToTemplates} />
    </>
  )
}
