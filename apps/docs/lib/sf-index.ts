// Names, readable labels and groups only, for client code (search) that must not pull in the previews.
// `label` is the App Builder name (masterLabel) without the "Mintel" prefix.
// lib/sf-components.tsx checks at build time that this list matches it.
export type SfGroup = "record" | "display" | "forms" | "chat" | "site"
export const SF_GROUP_ORDER: SfGroup[] = ["record", "display", "forms", "chat", "site"]

export const SF_INDEX: { name: string; label: string; group: SfGroup }[] = [
  { name: "path", label: "Path", group: "record" },
  { name: "tabs", label: "Tabs", group: "display" },
  { name: "segmentedControl", label: "Segmented Control", group: "display" },
  { name: "recordHeader", label: "Record Header", group: "record" },
  { name: "relatedCards", label: "Related Cards", group: "record" },
  { name: "kanban", label: "Kanban", group: "record" },
  { name: "activityTimeline", label: "Activity Timeline", group: "record" },
  { name: "slaTimer", label: "SLA Timer", group: "record" },
  { name: "conversation", label: "Conversation", group: "chat" },
  { name: "thaiAddress", label: "Thai Address", group: "forms" },
  { name: "progressRing", label: "Progress Ring", group: "record" },
  { name: "statusBadge", label: "Status Badge", group: "record" },
  { name: "timeline", label: "Timeline", group: "display" },
  { name: "emptyState", label: "Empty State", group: "display" },
  { name: "avatarGroup", label: "Avatar Group", group: "display" },
  { name: "glassCard", label: "Glass Card", group: "display" },
  { name: "shimmerButton", label: "Shimmer Button", group: "display" },
  { name: "gradientText", label: "Gradient Text", group: "display" },
  { name: "statCard", label: "Stat Card", group: "display" },
  { name: "fontSizeControl", label: "Font Size Control", group: "site" },
  { name: "quickActions", label: "Quick Actions", group: "record" },
  { name: "filesGallery", label: "Files Gallery", group: "record" },
  { name: "recordForm", label: "Record Form", group: "record" },
  { name: "kpiTrend", label: "KPI Trend", group: "display" },
  { name: "announcement", label: "Announcement", group: "display" },
  { name: "siteHero", label: "Site Hero", group: "site" },
  { name: "siteFeatures", label: "Site Features", group: "site" },
  { name: "siteFaq", label: "Site FAQ", group: "site" },
  { name: "siteCta", label: "Site CTA", group: "site" },
  { name: "brandLoader", label: "Brand Loader", group: "site" },
]

/** kebab-case tag inside the project (c namespace). */
export const sfTag = (name: string) => `c-${name.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`

/** Readable name, as App Builder shows it (without "Mintel"). */
export const sfLabel = (name: string) => SF_INDEX.find((c) => c.name === name)?.label ?? name
