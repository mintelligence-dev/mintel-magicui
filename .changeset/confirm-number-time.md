---
"docs": minor
---

New components: Confirm dialog (waits for the action, shows failures, starts on Cancel for destructive actions), Number input (thousands separators while typing, decimals, min/max, ฿ or % affix, a real number as the value) and Time picker (24-hour, typed or picked from slots, earliest and latest times).

Also from the code review: Date range picker honours `dropdowns` / `fromYear` / `toYear`; calendar screen-reader labels use the Buddhist Era year and Thai words for "today" and "selected"; Stepper steps show keyboard focus; Sidebar items and Grouped rows take `linkComponent` (e.g. Next.js Link); the console template keeps focus when switching panes on phones.
