# @mintelligence-dev/salesforce

Lightning Web Components, static resources and deploy scripts for Salesforce.

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
