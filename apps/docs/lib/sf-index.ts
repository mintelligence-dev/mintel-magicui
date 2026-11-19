// Names and groups only, for client code (search) that must not pull in the previews.
// lib/sf-components.tsx checks at build time that this list matches it.
export type SfGroup = "record" | "display" | "forms" | "chat" | "site"
export const SF_GROUP_ORDER: SfGroup[] = ["record", "display", "forms", "chat", "site"]

export const SF_INDEX: { name: string; group: SfGroup }[] = [
  { name: "path", group: "record" },
  { name: "tabs", group: "display" },
  { name: "segmentedControl", group: "display" },
  { name: "recordHeader", group: "record" },
  { name: "relatedCards", group: "record" },
  { name: "kanban", group: "record" },
  { name: "activityTimeline", group: "record" },
  { name: "slaTimer", group: "record" },
  { name: "conversation", group: "chat" },
  { name: "thaiAddress", group: "forms" },
  { name: "progressRing", group: "record" },
  { name: "statusBadge", group: "record" },
  { name: "timeline", group: "display" },
  { name: "emptyState", group: "display" },
  { name: "avatarGroup", group: "display" },
  { name: "glassCard", group: "display" },
  { name: "shimmerButton", group: "display" },
  { name: "gradientText", group: "display" },
  { name: "statCard", group: "display" },
  { name: "fontSizeControl", group: "site" },
  { name: "brandLoader", group: "site" },
]

/** kebab-case tag inside the project (c namespace). */
export const sfTag = (name: string) => `c-${name.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`
