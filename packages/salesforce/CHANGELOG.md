# @m-intelligence/salesforce

Lightning Web Components, static resources and deploy scripts for Salesforce.

## 0.3.1 — 2026-11-21

No changes in this release.

## 0.3.0 — 2026-11-20

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

## 0.2.2 — 2026-11-20

### Patch Changes

- f032504: Every React component and every LWC page now has "When to use / Not for" guidance (75 more components and 15 more LWC), and /llms.txt carries it for all of them. Quick Actions: the App Builder property now explains the format (buttons separated by semicolons, the four types and their targets); no behavior change.

## 0.2.1 — 2026-11-20

### Patch Changes

- App Builder now shows descriptions for the Kanban properties (related list, card title, card second line, values to hide) and for Record Form's "Sections and fields". No behavior change.

## 0.2.0 — 2026-11-20

### Minor Changes

- New components: tree view, signature pad (draw or type, PNG output) and virtual table (thousands of rows, sticky header, sorting) in the registry, and the recordForm LWC (edit or create a record with fields in sections, built on lightning-record-edit-form, no Apex). Component pages now say when to use each of the main components and what to use instead.
- 00c5e7c: Mintel LWC can follow the org's SLDS 2 theme: Brand Loader gets a Theme property (brand or follow-org), the new mintelFollowOrg stylesheet maps the components to the SLDS 2 global styling hooks, and class="mintel-follow-org" opts in a single component. Without the opt-in nothing changes. Also fixes the Brand Loader, which threw an error and never loaded the brand stylesheet after the components were renamed.

### Patch Changes

- 7f1b205: Salesforce docs use readable component names (Record Header, SLA Timer, KPI Trend) in the menu, cards and search, matching what App Builder shows; the tag name stays on each page. Added "when to use" guidance for 15 LWC, a dotted preview canvas on every component page, previews that match the LWC more closely (related cards, SLA timer, KPI trend), and jest tests for the seven LWC that had none.

## 0.1.0 — 2026-11-19

### Minor Changes

- LWC pack with the `c/tokens` CSS module and the `mintelGlobal` static resource that rebrands standard components through SLDS styling hooks; first components: glass card, shimmer button, gradient text, stat card and brand loader. (#2)
- Text size control for Experience Cloud sites. (#3)
- Path bound to a record picklist, tabs, segmented control, timeline and status badge. (#4)
- Record page components: record header, SLA timer, progress ring, avatar group, empty state, Thai address and conversation. (#9)
- Related cards, kanban and activity timeline, built on the UI API and GraphQL wire adapters (no Apex). (#13)
- Quick actions, files gallery, KPI trend, announcement, and Experience Cloud sections: site hero, features, FAQ and call to action. (#20)
- Motion for glass card, stat card, timeline item and Thai address, off under reduced motion. (#19)
- `npm run deploy` checks the org for components with the same names before deploying and refuses to overwrite anything that is not from Mintel UI. (#16)

### Breaking Changes

- Component names no longer start with `mintel` (`c-mintel-sla-timer` is now `c-sla-timer`). The SFDX project uses the namespace `mintel`, which becomes the prefix once the package exists. (#14, #15)
