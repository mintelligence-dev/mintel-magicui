# docs

The shadcn registry (`@mintel/*`) and the documentation site.

## 0.3.0 — 2026-11-20

### Minor Changes

- 08798b1: New components: Confirm dialog (waits for the action, shows failures, starts on Cancel for destructive actions), Number input (thousands separators while typing, decimals, min/max, ฿ or % affix, a real number as the value) and Time picker (24-hour, typed or picked from slots, earliest and latest times).
  
  Also from the code review: Date range picker honours `dropdowns` / `fromYear` / `toYear`; calendar screen-reader labels use the Buddhist Era year and Thai words for "today" and "selected"; Stepper steps show keyboard focus; Sidebar items and Grouped rows take `linkComponent` (e.g. Next.js Link); the console template keeps focus when switching panes on phones.

### Patch Changes

- 2132be9: Bug fixes from a full code review, and Thai defaults for the last English-first components.
  
  React:
  
  - Data table and Pagination labels are Thai by default (`locale="en"` for English). Dialog and Sheet close buttons are named "ปิด" for screen readers (`closeLabel`); the breadcrumb ellipsis is now announced (`label`).
  - OTP input: typing into a filled box no longer wipes the following digits.
  - Thai phone input: Bangkok numbers stop at 9 digits, a 9-digit 06x number is no longer valid, `+66 (0)81…`, `0066…` and `66 2…` are read correctly, and the caret is kept when a `ref` is passed (also Thai ID input, which now keeps the caller's `aria-describedby`).
  - Tag input: Enter adds what was typed (arrow keys pick a suggestion), a disabled input cannot be edited by keyboard, the list closes on blur.
  - Tree view: stays reachable by Tab when the selected node is in a collapsed branch.
  - Combobox: search matches labels and keywords only, not option ids.
  - Data table: new `getRowId`, so selection follows rows when data changes.
  - Sidebar: the closed panel on phones is hidden from keyboard and screen readers; Escape closes it.
  - Signature pad: a second finger no longer corrupts the stroke; the exported PNG uses dark ink in dark mode.
  - Conversation, font size control, Thai address, command, virtual table (keyboard rows): smaller fixes.
  - Drawer: a mouse drag on the handle no longer snaps back; collapsing from the top animates.
  - Carousel section: Next disables at the end on wide screens and the last dot lights.
  - Glass navbar (floating) keeps its gap and clears the notch once it sticks; slideshow, magic card, marquee, contact form, site header, console and mobile templates: smaller fixes.
  
  Salesforce (not verified in an org):
  
  - Related cards and Files gallery: the count showed the page size as the total and "View all" never appeared; they now use the next-page token.
  - Kanban and Related cards: only the title (and grouping) field is required, so a user without access to an extra field still gets the list. Kanban shows an "Other" column for records whose value is not in the picklist.
  - Tabs: finds its tab children in any namespace.
  - Quick actions: default actions are `Global.NewTask` / `Global.LogACall`; a bare name on app and home pages is treated as global.
  - Record form: `columns` is a String property (a datasource on an Integer may be rejected).
  - SLA timer: no default deadline field (`SlaExitDate` is not a deadline).
  - Path and Kanban show the validation-rule message; Activity timeline uses the local date for "overdue"; Thai address clears a stale sub-district when the postal code is unknown.
  - `npm run deploy`: the name check also covers orgs that have their own namespace.
- Updated dependencies
  - @m-intelligence/tokens@0.3.0

## 0.2.2 — 2026-11-20

### Patch Changes

- File upload: labels are Thai by default (`locale="th"`), like the other Thai-first inputs. Pass `locale="en"` to keep English. This changes what existing uses without a `locale` show.
- f032504: Every React component and every LWC page now has "When to use / Not for" guidance (75 more components and 15 more LWC), and /llms.txt carries it for all of them. Quick Actions: the App Builder property now explains the format (buttons separated by semicolons, the four types and their targets); no behavior change.
- @m-intelligence/tokens@0.2.2

## 0.2.1 — 2026-11-20

### Patch Changes

- 3f1edd2: /llms.txt now has setup steps for React and Salesforce, a "Use for / Not for" note per component, and each LWC's App Builder name and where it can be placed. New /llms-full.txt adds props, example code, LWC properties, events and usage for every component, so AI coding assistants can write code with them.
- 2bb6fd9: The docs site now serves /llms.txt (a map of every component, template and LWC with install instructions, for AI coding assistants), /sitemap.xml (English and Thai pages with hreflang) and /robots.txt.
- @m-intelligence/tokens@0.2.1

## 0.2.0 — 2026-11-20

### Minor Changes

- New components: tree view, signature pad (draw or type, PNG output) and virtual table (thousands of rows, sticky header, sorting) in the registry, and the recordForm LWC (edit or create a record with fields in sections, built on lightning-record-edit-form, no Apex). Component pages now say when to use each of the main components and what to use instead.

### Patch Changes

- a93a208: Changelog page at /changelog (EN/TH) built from the package CHANGELOG.md files, and Changesets for versioning tokens, the registry and the Salesforce components together.
- 45ae1fd: Salesforce docs: the kanban preview now uses the same corner "Move to" menu as the LWC instead of a full-width select.
- Salesforce docs: redesigned overview (record page preview, component icons and group colors), previous/next links on component pages, and a new getting started guide at /salesforce/get-started covering install, the name-conflict check, deploy, App Builder and Experience Cloud.
- 7f1b205: Salesforce docs use readable component names (Record Header, SLA Timer, KPI Trend) in the menu, cards and search, matching what App Builder shows; the tag name stays on each page. Added "when to use" guidance for 15 LWC, a dotted preview canvas on every component page, previews that match the LWC more closely (related cards, SLA timer, KPI trend), and jest tests for the seven LWC that had none.
- Updated dependencies [00c5e7c]
  - @m-intelligence/tokens@0.2.0

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
