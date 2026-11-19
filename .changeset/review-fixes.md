---
"docs": patch
"@mintelligence-dev/salesforce": patch
---

Bug fixes from a full code review, and Thai defaults for the last English-first components.

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
