import type { MetadataRoute } from "next"

import { langPath } from "@/lib/i18n"
import { PAGE_PATHS, abs } from "@/lib/site-pages"

export const dynamic = "force-static"

/** Every docs page in English and Thai, with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGE_PATHS.flatMap((path) => {
    const languages = { en: abs(path), th: abs(langPath("th", path)) }
    const priority = path === "/" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.6
    return [
      { url: languages.en, alternates: { languages }, priority },
      { url: languages.th, alternates: { languages }, priority },
    ]
  })
}
