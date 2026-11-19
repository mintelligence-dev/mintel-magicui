// Every Mintel LWC shown in the Salesforce docs: group, usage snippet, React twin and docs-only preview.
// Previews are React components that mirror the LWC (the LWC themselves only run inside Salesforce).
import { AnimatedGradientText } from "@/registry/mintel/effects/animated-gradient-text"
import { NumberTicker } from "@/registry/mintel/effects/number-ticker"
import { ShimmerButton } from "@/registry/mintel/effects/shimmer-button"
import { GlassCard } from "@/registry/mintel/glass/glass-card"
import { FontSizeControl } from "@/registry/mintel/ui/font-size-control"
import { PathPreview } from "@/components/path-preview"
import { StatusBadgePreview, TimelinePreview } from "@/components/sf-status-preview"
import {
  AvatarGroupPreview,
  ConversationPreview,
  EmptyStatePreview,
  ProgressRingPreview,
  RecordHeaderPreview,
  SlaTimerPreview,
  ThaiAddressPreview,
} from "@/components/sf-more-previews"
import { ActivityTimelinePreview, KanbanPreview, RelatedCardsPreview } from "@/components/sf-records-previews"
import { SegmentedPreview, TabsPreview } from "@/components/sf-tabs-preview"
import { AnnouncementPreview, BrandLoaderPreview, FilesGalleryPreview, KpiTrendPreview, QuickActionsPreview, RecordFormPreview } from "@/components/sf-new-previews"
import { SectionCta } from "@/registry/mintel/sections/section-cta"
import { SectionFaq } from "@/registry/mintel/sections/section-faq"
import { SectionFeatureGrid } from "@/registry/mintel/sections/section-feature-grid"
import { SectionHeroCentered } from "@/registry/mintel/sections/section-hero-centered"

import { SF_INDEX, type SfGroup } from "@/lib/sf-index"
import { readSfMeta } from "@/lib/sf-meta"

export { SF_GROUP_ORDER, sfLabel, sfTag, type SfGroup } from "@/lib/sf-index"

export type SfComponent = {
  name: string
  group: SfGroup
  /** React registry item with the same look, if any. */
  react?: string
  /** Bundles whose source is shown (defaults to [name]). */
  sources?: readonly string[]
  usage: string
  preview: React.ReactNode
}

export const SF_COMPONENTS: SfComponent[] = [
  {
    name: "path",
    group: "record",
    react: "stepper",
    usage: `<!-- Record page: reads and updates a picklist (two steps, like the standard Path) -->
<c-path record-id={recordId} object-api-name="Case" field-api-name="Status"></c-path>

<!-- Without a record -->
<c-path stages="New,Working,Escalated,Closed" current="Working" onstagechange={handleStage}></c-path>`,
    preview: <PathPreview />,
  },
  {
    name: "tabs",
    group: "display",
    react: "animated-tabs",
    sources: ["tabs", "tab"],
    usage: `<c-tabs label="Account" active-value="overview" ontabchange={handleTab}>
    <c-tab label="Overview" value="overview">...</c-tab>
    <c-tab label="Cases" value="cases">...</c-tab>
</c-tabs>

<!-- Underline style -->
<c-tabs variant="underline">...</c-tabs>`,
    preview: <TabsPreview />,
  },
  {
    name: "segmentedControl",
    group: "display",
    react: "segmented-control",
    usage: `<!-- App Builder: Options = "day:Day,week:Week,month:Month" -->
<c-segmented-control label="Range" options="day:Day,week:Week,month:Month"
    value="week" onchange={handleRange}></c-segmented-control>

<!-- From JS: an array of { value, label } -->
<c-segmented-control options={views} variant="brand"></c-segmented-control>`,
    preview: <SegmentedPreview />,
  },
  {
    name: "recordHeader",
    group: "record",
    usage: `<!-- Record page (App Builder): title, status and up to four highlight fields -->
<c-record-header record-id={recordId} object-api-name="Case" title-field="CaseNumber"
    fields="Account.Name,Priority,Origin" status-field="Status">
    <lightning-button slot="actions" label="Escalate"></lightning-button>
</c-record-header>`,
    preview: <RecordHeaderPreview />,
  },
  {
    name: "relatedCards",
    group: "record",
    usage: `<!-- Record page (App Builder): an Account's Cases as cards. UI API, no Apex -->
<c-related-cards record-id={recordId} related-list-id="Cases" child-object-api-name="Case"
    title-field="CaseNumber" fields="Subject,Status,Priority" sort-by="-CreatedDate" page-size="6">
</c-related-cards>`,
    preview: <RelatedCardsPreview />,
  },
  {
    name: "kanban",
    group: "record",
    usage: `<!-- Record page: an Account's Opportunities by Stage. Drag, or "Move to" for keyboard and mobile -->
<c-kanban record-id={recordId} related-list-id="Opportunities" child-object-api-name="Opportunity"
    group-field="StageName" title-field="Name" subtitle-field="Amount" hide-values="Closed Lost"
    onmove={handleMove}></c-kanban>`,
    preview: <KanbanPreview />,
  },
  {
    name: "activityTimeline",
    group: "record",
    react: "timeline",
    usage: `<!-- Record page: Tasks and Events for the record (UI API GraphQL, no Apex) -->
<c-activity-timeline record-id={recordId} limit="20"></c-activity-timeline>`,
    preview: <ActivityTimelinePreview />,
  },
  {
    name: "slaTimer",
    group: "record",
    usage: `<!-- Record page: counts down to a DateTime field; amber inside 30 min, red when overdue -->
<c-sla-timer record-id={recordId} object-api-name="Case" deadline-field="SlaExitDate"
    start-field="CreatedDate" completed-field="IsClosed" warning-minutes="30"></c-sla-timer>`,
    preview: <SlaTimerPreview />,
  },
  {
    name: "conversation",
    group: "chat",
    react: "conversation",
    usage: `<!-- In your LWC, with messages from Apex -->
<c-conversation title="Somchai K" channel="line" messages={messages}
    typing={customerTyping} show-composer onsend={handleSend}></c-conversation>

// messages: [{ id, direction: 'in' | 'out' | 'system', text, time, author: { name }, status, attachments }]`,
    preview: <ConversationPreview />,
  },
  {
    name: "thaiAddress",
    group: "forms",
    react: "thai-address",
    usage: `<!-- Flow screen: outputs province, district, subDistrict, zip (+ ids) -->
<!-- In your LWC: -->
<c-thai-address locale="th" required onchange={handleAddress}></c-thai-address>

// Data: static resource mintelThaiAddress (77 provinces, 7,436 sub-districts, postal codes)`,
    preview: <ThaiAddressPreview />,
  },
  {
    name: "progressRing",
    group: "record",
    react: "progress-ring",
    usage: `<!-- Record page: a percent field, e.g. Opportunity Probability -->
<c-progress-ring record-id={recordId} object-api-name="Opportunity" field-api-name="Probability"
    label="Probability"></c-progress-ring>

<!-- Fixed value, red / amber / green by value -->
<c-progress-ring value="34" variant="status" size="small"></c-progress-ring>`,
    preview: <ProgressRingPreview />,
  },
  {
    name: "statusBadge",
    group: "record",
    react: "badge",
    usage: `<!-- Record page: shows the field's label, colored by its value -->
<c-status-badge record-id={recordId} object-api-name="Case" field-api-name="Status"
    variants="Escalated:destructive,On Hold:warning"></c-status-badge>

<!-- Fixed value -->
<c-status-badge value="Closed" appearance="solid"></c-status-badge>`,
    preview: <StatusBadgePreview />,
  },
  {
    name: "timeline",
    group: "display",
    react: "timeline",
    sources: ["timeline", "timelineItem"],
    usage: `<c-timeline label="Case history">
    <c-timeline-item title="Case created" time="09:12">From LINE OA</c-timeline-item>
    <c-timeline-item title="Assigned to Nina" time="09:15" variant="brand">
        <lightning-icon slot="icon" icon-name="utility:user" size="x-small"></lightning-icon>
    </c-timeline-item>
    <c-timeline-item title="Resolved" variant="success" current></c-timeline-item>
</c-timeline>`,
    preview: <TimelinePreview />,
  },
  {
    name: "emptyState",
    group: "display",
    react: "empty-state",
    usage: `<c-empty-state title="No open cases" description="New chats will appear here."
    icon-name="utility:inbox" action-label="New case" onaction={handleNew}></c-empty-state>`,
    preview: <EmptyStatePreview />,
  },
  {
    name: "avatarGroup",
    group: "display",
    react: "avatar",
    usage: `<!-- App Builder: names="Nina Park, Somchai K, ..." -->
<c-avatar-group people={caseTeam} max="4"></c-avatar-group>

// caseTeam: [{ name, photoUrl }]`,
    preview: <AvatarGroupPreview />,
  },
  {
    name: "glassCard",
    group: "display",
    react: "glass-card",
    usage: `<c-glass-card title="Case summary" subtitle="LINE OA" variant="brand">
    <p>Customer asked about delivery status.</p>
</c-glass-card>`,
    preview: (
      <div
        className="relative flex min-h-40 w-full items-center justify-center overflow-hidden rounded-xl p-5"
        style={{
          background:
            "radial-gradient(120% 120% at 20% 10%, var(--brand-cyan), transparent 55%), radial-gradient(120% 120% at 80% 80%, var(--brand-accent), transparent 55%), var(--brand)",
        }}
      >
        <GlassCard className="w-full max-w-xs p-5">
          <p className="font-heading font-semibold">Case summary</p>
          <p className="text-sm text-muted-foreground">LINE OA</p>
          <p className="mt-3 text-sm">Customer asked about delivery status.</p>
        </GlassCard>
      </div>
    ),
  },
  {
    name: "shimmerButton",
    group: "display",
    react: "shimmer-button",
    usage: `<c-shimmer-button label="Create case" onclick={handleCreate}></c-shimmer-button>`,
    preview: <ShimmerButton>Create case</ShimmerButton>,
  },
  {
    name: "gradientText",
    group: "display",
    react: "animated-gradient-text",
    usage: `<c-gradient-text text="Customer Experience" size="large"></c-gradient-text>`,
    preview: <AnimatedGradientText className="font-heading text-3xl font-bold">Customer Experience</AnimatedGradientText>,
  },
  {
    name: "statCard",
    group: "display",
    react: "number-ticker",
    usage: `<c-stat-card label="Cases today" value={casesToday} suffix="cases"></c-stat-card>`,
    preview: (
      <div className="w-full max-w-xs rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">Cases today</p>
        <p className="mt-1 flex items-baseline gap-1">
          <NumberTicker value={1284} className="font-heading text-4xl font-bold text-brand dark:text-brand" />
          <span className="font-semibold text-muted-foreground">cases</span>
        </p>
      </div>
    ),
  },
  {
    name: "fontSizeControl",
    group: "site",
    react: "font-size-control",
    usage: `<!-- Experience Cloud: scales the whole page and remembers the choice -->
<c-font-size-control locale="th" apply-to-page></c-font-size-control>`,
    preview: <FontSizeControl />,
  },
  {
    name: "quickActions",
    group: "record",
    usage: `<!-- One text value; buttons are separated by semicolons: "Label | icon | flow/action/url/event | target" -->
<c-quick-actions record-id={recordId} object-api-name="Case"
    actions="New task | utility:task | action | NewTask; Send LINE | utility:chat | flow | Send_Line_Message; Help | utility:help | url | https://help.example.com; Escalate | utility:priority | event | escalate"
    onaction={handleAction}></c-quick-actions>

<!-- handleAction(event) runs only for "event" buttons: event.detail is { name: "escalate", label: "Escalate" }.
     Nothing listens for it when an admin drops Mintel Quick Actions on a page, so use "event" from your own LWC. -->`,
    preview: <QuickActionsPreview />,
  },
  {
    name: "filesGallery",
    group: "record",
    usage: `<!-- Record page: the record's files as cards; opens Salesforce's file preview. UI API, no Apex -->
<c-files-gallery record-id={recordId} page-size="12"></c-files-gallery>`,
    preview: <FilesGalleryPreview />,
  },
  {
    name: "recordForm",
    group: "record",
    react: "form",
    usage: `<!-- Record page: edit this record; App Builder "Sections and fields" -->
<c-record-form record-id={recordId} object-api-name="Contact" title="Contact details"
    sections="Contact: FirstName, LastName, Phone, Email | Address: MailingStreet, MailingCity"
    onsuccess={handleSaved}></c-record-form>

<!-- App or home page: create a new record -->
<c-record-form object-api-name="Lead" title="New lead" columns="1"
    sections="FirstName, LastName, Company"></c-record-form>`,
    preview: <RecordFormPreview />,
  },
  {
    name: "kpiTrend",
    group: "display",
    react: "chart",
    usage: `<!-- Home or app page: value and trend from App Builder -->
<c-kpi-trend label="Open cases" trend="31,28,35,33,37" caption="Last 5 weeks"></c-kpi-trend>

<!-- Record page: the value from a number field; trend from a parent LWC -->
<c-kpi-trend record-id={recordId} object-api-name="Account" field-api-name="AnnualRevenue"
    trend={history} good-direction="up"></c-kpi-trend>`,
    preview: <KpiTrendPreview />,
  },
  {
    name: "announcement",
    group: "display",
    react: "alert",
    usage: `<!-- App Builder: change "version" to show a dismissed banner again -->
<c-announcement title="Heads up" message="Scheduled maintenance on Saturday 22:00–23:00."
    variant="info" link-label="Details" link-url="/s/maintenance" dismissible version="2026-11"></c-announcement>`,
    preview: <AnnouncementPreview />,
  },
  {
    name: "siteHero",
    group: "site",
    react: "section-hero-centered",
    usage: `<!-- Experience Builder: drag "Mintel Site Hero" onto the page and fill in the properties -->
<c-site-hero eyebrow="Help center" title="How can we" highlight="help you today?"
    primary-label="Start a chat" primary-url="/s/chat"></c-site-hero>`,
    preview: <SectionHeroCentered className="w-full" />,
  },
  {
    name: "siteFeatures",
    group: "site",
    react: "section-feature-grid",
    usage: `<!-- Experience Builder: "Title | Description | icon" separated by semicolons -->
<c-site-features title="Why customers choose us"
    features="One inbox | All channels in one place | utility:chat; Fast answers | Replies in minutes | utility:clock"></c-site-features>`,
    preview: <SectionFeatureGrid className="w-full py-6" />,
  },
  {
    name: "siteFaq",
    group: "site",
    react: "section-faq",
    usage: `<!-- Experience Builder: "Question | Answer" separated by semicolons; the first one starts open -->
<c-site-faq title="Questions, answered"
    questions="Which channels can I use? | LINE, Messenger and web chat.; How fast will you reply? | Within minutes."></c-site-faq>`,
    preview: <SectionFaq className="w-full py-6" />,
  },
  {
    name: "siteCta",
    group: "site",
    react: "section-cta",
    usage: `<c-site-cta title="Need help? We are one message away." primary-label="Start a chat" primary-url="/s/chat"
    secondary-label="Call us" secondary-url="tel:021234567"></c-site-cta>`,
    preview: <SectionCta className="w-full py-6" />,
  },
  {
    name: "brandLoader",
    group: "site",
    usage: `<!-- App Builder: drop "Mintel Brand Loader" once on each app, home or record page (it is invisible).
     Theme = brand       loads mintelGlobal: standard lightning-* components take the Mintel brand.
     Theme = follow-org  loads mintelFollowOrg: Mintel components take the org's SLDS 2 theme. -->

<!-- One component only, in your own LWC markup -->
<c-stat-card class="mintel-follow-org" label="Open cases" value="37"></c-stat-card>`,
    preview: <BrandLoaderPreview />,
  },
]

// Keep the lightweight index in step with this list.
{
  const a = SF_COMPONENTS.map((c) => `${c.name}:${c.group}`).join()
  const b = SF_INDEX.map((c) => `${c.name}:${c.group}`).join()
  if (a !== b) throw new Error(`lib/sf-index.ts is out of date with lib/sf-components.tsx`)
  // Labels must match what App Builder shows (masterLabel without "Mintel"), where the bundle has one.
  for (const c of SF_INDEX) {
    const master = readSfMeta(c.name).label?.replace(/^Mintel /, "")
    if (master && master !== c.label) throw new Error(`lib/sf-index.ts: label of ${c.name} is "${c.label}", App Builder shows "${master}"`)
  }
}
