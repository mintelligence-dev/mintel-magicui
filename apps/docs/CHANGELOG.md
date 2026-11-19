# docs

The shadcn registry (`@mintel/*`) and the documentation site.

## 0.2.1 — 2026-11-20

### Patch Changes

- 3f1edd2: /llms.txt now has setup steps for React and Salesforce, a "Use for / Not for" note per component, and each LWC's App Builder name and where it can be placed. New /llms-full.txt adds props, example code, LWC properties, events and usage for every component, so AI coding assistants can write code with them.
- 2bb6fd9: The docs site now serves /llms.txt (a map of every component, template and LWC with install instructions, for AI coding assistants), /sitemap.xml (English and Thai pages with hreflang) and /robots.txt.
- @mintelligence-dev/tokens@0.2.1

## 0.2.0 — 2026-11-20

### Minor Changes

- New components: tree view, signature pad (draw or type, PNG output) and virtual table (thousands of rows, sticky header, sorting) in the registry, and the recordForm LWC (edit or create a record with fields in sections, built on lightning-record-edit-form, no Apex). Component pages now say when to use each of the main components and what to use instead.

### Patch Changes

- a93a208: Changelog page at /changelog (EN/TH) built from the package CHANGELOG.md files, and Changesets for versioning tokens, the registry and the Salesforce components together.
- 45ae1fd: Salesforce docs: the kanban preview now uses the same corner "Move to" menu as the LWC instead of a full-width select.
- Salesforce docs: redesigned overview (record page preview, component icons and group colors), previous/next links on component pages, and a new getting started guide at /salesforce/get-started covering install, the name-conflict check, deploy, App Builder and Experience Cloud.
- 7f1b205: Salesforce docs use readable component names (Record Header, SLA Timer, KPI Trend) in the menu, cards and search, matching what App Builder shows; the tag name stays on each page. Added "when to use" guidance for 15 LWC, a dotted preview canvas on every component page, previews that match the LWC more closely (related cards, SLA timer, KPI trend), and jest tests for the seven LWC that had none.
- Updated dependencies [00c5e7c]
  - @mintelligence-dev/tokens@0.2.0

## 0.1.0 — 2026-11-19

### Minor Changes

- shadcn-compatible registry with 45 items to start: core UI, glass components, motion components and animated effects, installed with `npx shadcn add @mintel/<name>`. (#1)
- Bilingual docs (English and Thai) with a page per component, a getting started guide, templates and a text size control. (#2, #3)
- 13 more core components: stepper, timeline, data table, chart, sheet, file upload, pagination, accordion, breadcrumb, avatar, skeleton, alert and empty state. (#4)
- Thai customer data and chat: Thai address (all provinces, districts and sub-districts with postal codes), Thai ID and Thai phone inputs, OTP input and a conversation view for LINE, Messenger, TikTok and WhatsApp, among others. (#9)
- Grouped list, collapsing header and drawer snap points, in the style of the Clarity theme. (#5)
- Themes page with a gallery and a theme builder that exports CSS and a shadcn theme. (#6)
- Motion: a springy sliding indicator for Tabs, motion for data table, inputs, avatar, card, alert, empty state and navbar, then one spring motion language for every overlay, dialog, toast, timeline and grouped list, and scroll-in reveals for sections. (#7, #8, #19)
- Templates: dashboard, landing, login, mobile app, console and a Thai sign-up page. (#3, #10)
- Sections library: 16 page sections (heroes, features, pricing, FAQ, testimonials, footer and more), with New and Updated badges in the docs. (#12)
- Quality checks in CI: axe (WCAG 2.1 AA) on every page and visual regression for every component preview. (#10)
- Salesforce docs: an overview with a live SLDS vs. Mintel preview, and a page per LWC with its App Builder properties, events, usage and source. (#2, #18)

### Patch Changes

- Stepper: the current step's halo is no longer clipped. (#11)
- Feature scroll section: the preview sticks while you scroll again. (#17)
- Registry pins `@tanstack/react-table` 8 and `recharts` 3, so installs get the versions the components were written for. (#9)
