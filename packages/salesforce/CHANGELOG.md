# @mintelligence-dev/salesforce

Lightning Web Components, static resources and deploy scripts for Salesforce.

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
