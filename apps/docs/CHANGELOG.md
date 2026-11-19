# docs

The shadcn registry (`@mintel/*`) and the documentation site.

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
