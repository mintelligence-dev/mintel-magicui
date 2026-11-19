import type { ReactNode } from "react"

export type Lang = "en" | "th"
export const LANGS: Lang[] = ["en", "th"]

/** Path for a page in a language: English lives at the root, Thai under /th. */
export function langPath(lang: Lang, path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`
  if (lang === "en") return clean
  return clean === "/" ? "/th" : `/th${clean}`
}

/** Strips the /th prefix so a path can be re-prefixed for another language. */
export function stripLang(pathname: string) {
  if (pathname === "/th") return "/"
  return pathname.startsWith("/th/") ? pathname.slice(3) : pathname
}

const Code = ({ children }: { children: ReactNode }) => (
  <code className="rounded bg-muted px-1 py-0.5 text-sm">{children}</code>
)
const Strong = ({ children }: { children: ReactNode }) => <strong className="text-foreground">{children}</strong>

const en = {
  meta: {
    title: "Mintel UI",
    description:
      "M-Intelligence design system — brand tokens for React and Salesforce LWC, plus animated components via a shadcn registry.",
  },
  nav: {
    tokens: "Tokens",
    components: "Components",
    salesforce: "Salesforce",
    language: "Language",
    themeToggle: "Toggle light/dark theme",
    styleSwitch: "Design theme",
    allThemes: "All themes & builder",
    copy: "Copy command",
  },
  mobileNav: { label: "Docs menu", start: "Home", docs: "Docs", components: "Components", salesforce: "Salesforce" },
  hero: {
    badge: "✨ Open-source design system by M-Intelligence",
    subtitle:
      "One set of brand tokens for React, Salesforce LWC and mobile web — plus fluid, ready-made components you install with a single command.",
    browse: "Browse components",
    start: "Get started",
    stats: { tokens: "Semantic tokens", items: "Registry items", platforms: "Platforms" },
  },
  stackLabel: "Works with the stack your team already uses",
  architecture: {
    eyebrow: "Architecture",
    title: "One token set → every platform",
    tokens: (
      <>
        <Strong>@mintelligence-dev/tokens</Strong> keeps colors, fonts, radius and motion in a single{" "}
        <Code>src/tokens.json</Code> and builds CSS variables, a Tailwind v4 theme, a JS object and an LWC module from
        it.
      </>
    ),
    components: (
      <>
        <Strong>Components</Strong> ship through a shadcn registry — <Code>shadcn add</Code> copies the source into your
        project. No version lock-in, no waiting for a release.
      </>
    ),
    thai: "Thai (IBM Plex Sans Thai)",
  },
  install: {
    eyebrow: "Getting started",
    title: "Start in two steps",
    step1: "1. Install the theme",
    step1Desc: "Adds brand colors (light/dark), fonts and radius to the globals.css of a shadcn project.",
    step2: "2. Add the components you need",
    step2Desc: "Every component already uses the brand tokens — no colors to configure.",
  },
  tokens: {
    eyebrow: "Foundations",
    title: "Brand tokens",
    semantic: "Semantic (toggle dark mode to see the values change)",
    sampleSans: "Customer experience, crafted with care",
    sampleHeading: "Intelligence that feels human",
  },
  components: {
    eyebrow: "Registry",
    title: "Components",
    categories: "Component categories",
    comboboxTitle: "Combobox — searchable / multi-select",
    datePickerTitle: "Date Picker — Buddhist Era",
    formTitle: "Form — react-hook-form + zod (submit empty to see validation)",
    inputPlaceholder: "Your email",
    connect: "Connect",
    magicCard: "Hover here",
    magicCardSub: "The spotlight follows your cursor",
    borderBeam: "A beam runs around the border",
    shineBorder: "Brand-gradient border",
    blurFade: "Fades in as you scroll",
  },
  glass: {
    pressHint: "Press and hold to feel the spring press",
    search: "Search",
    notifications: "Notifications",
    incoming: "Incoming messages",
    period: "Period",
    periods: [
      ["day", "Day"],
      ["week", "Week"],
      ["month", "Month"],
    ] as [string, string][],
    refraction: (
      <>
        This card has <code>refraction</code> on — in Chrome/Edge with a mouse, its edges bend the content behind it.
      </>
    ),
  },
  mobile: {
    drawerDesc: "Bottom sheet — drag the handle down to close. Use it instead of a dialog on phones.",
    openDrawer: "Open drawer",
    tabBarDesc: "Glass bottom tab bar that pads for the home indicator automatically.",
    drawerTitle: "Message the customer",
    drawerDesc2: "Sent through LINE OA",
    messagePlaceholder: "Type a message...",
    send: "Send",
    sent: "Message sent",
    cancel: "Cancel",
    tabs: { home: "Home", chat: "Chat", alerts: "Alerts", me: "Me" },
  },
  motion: {
    reveal:
      "We design customer experiences that flow — every tap and every scroll responds naturally, like a real object with weight.",
    dockDesc: "Move your mouse across to magnify — on phones it becomes a spring press instead.",
    tabsDesc: "The tab indicator glides with a spring — pill and underline styles.",
    zoomHint: "Scroll down to see the image settle into a card",
    features: [
      { title: "Every channel in one place", description: "LINE, Facebook, TikTok and Pantip arrive as cases in Salesforce automatically." },
      { title: "AI drafts and summarizes", description: "Agentforce drafts replies, summarizes conversations and hands off to a person when needed." },
      { title: "Real-time overview", description: "SLA and customer satisfaction dashboards, updated every minute." },
    ],
    caseTabs: { all: "All", open: "Open", closed: "Closed" },
  },
  salesforceTeaser: {
    eyebrow: "Salesforce",
    title: "Built for Salesforce too",
    body: "The same tokens power Lightning Web Components, and SLDS styling hooks rebrand standard lightning-* components.",
    cta: "Open the Salesforce guide",
  },
  footer: "M Intelligence Co., Ltd. · MIT License",
  docs: {
    gettingStarted: "Getting started",
    themes: "Themes",
    changelog: "Changelog",
    templates: "Templates",
    templatesBody: "Whole pages you can install in one command — they pull in the Mintel components they use and land at app/<route>/page.tsx.",
    openPreview: "Open full preview",
    backToTemplates: "Templates",
    installsTo: "Installs to",
    components: "Components",
    allComponents: "All components",
    installation: "Installation",
    preview: "Preview",
    code: "Code",
    source: "Component source",
    sourceHint: "This is the file `shadcn add` copies into components/ui — edit it freely.",
    props: "Props",
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
    upstream: "Other props come from",
    dependencies: "Dependencies",
    setupHint: "Uses the @mintel registry — set it up once in",
    withUrl: "Without the @mintel setup:",
    previous: "Previous",
    next: "Next",
    search: "Search docs...",
    searchShort: "Search",
    noResults: "No results",
    pages: "Pages",
    componentsIndexTitle: "Components",
    componentsIndexBody: (n: number) =>
      `${n} registry items: core UI, forms, data display, navigation, glass, fluid motion, mobile and effects — all on Mintel brand tokens.`,
    gs: {
      title: "Getting started",
      body: "Set up a Next.js app with the Mintel theme, fonts and components. Every step below was run in a fresh Next.js 16 project.",
      steps: [
        { title: "Create an app", body: "Skip this if you already have a Next.js + Tailwind v4 project." },
        { title: "Initialize shadcn", body: "Creates components.json, lib/utils and the base CSS." },
        { title: "Add the @mintel registry", body: "Add this to components.json once. After that, install anything with @mintel/<name>." },
        { title: "Install the theme", body: "Writes the brand colors (light + dark), fonts, radius, springs and glass tokens into app/globals.css." },
        { title: "Load the fonts", body: "Manrope for Latin, IBM Plex Sans Thai for Thai and Rubik for headings. The theme picks these next/font variables up automatically. viewport-fit=cover lets mobile components pad for the notch and home indicator." },
        { title: "Add components", body: "Install what you need. Render <Toaster /> once (already in the layout above) and call toast() anywhere." },
        { title: "Dark mode", body: "Components follow the .dark class on <html>. Toggle it however you like, e.g.:" },
      ],
      noConfig: "Prefer not to edit components.json? Use full URLs instead:",
      themesMore: "Want a different look? Clarity and other themes install the same way, or build your own.",
      themesLink: "Browse themes →",
      salesforce: "Building on Salesforce instead? See the Salesforce guide.",
    },
  },
  themes: {
    metaTitle: "Themes",
    title: "Themes",
    body: "Every component reads the same variables, so a theme restyles all of them at once. Pick a ready-made theme, or build your own from one and copy the CSS.",
    galleryTitle: "Ready-made themes",
    light: "Light",
    dark: "Dark",
    mode: "Preview mode",
    useHere: "Use on this site",
    usingHere: "In use on this site",
    install: "Install (whole app)",
    runtimeTitle: "Let people switch at runtime",
    runtimeBody: "Install the Mintel theme, import every theme's CSS once, then set data-mintel-theme on <html>. Remove the attribute to go back to Mintel. (data-theme is already the dark-mode switch.)",
    builderTitle: "Build your own",
    builderBody: "Start from a theme, change the colors, corners and font, and check the result on real components in light and dark. Then copy the CSS into app/globals.css, after the theme you started from.",
    base: "Start from",
    primary: "Primary color",
    accent: "Accent color",
    accentHint: "Second color of the brand gradient.",
    radius: "Corner radius",
    font: "Font",
    fonts: { theme: "From the theme", brand: "Manrope + Rubik", system: "System font", thai: "IBM Plex Sans Thai" },
    contrast: "Text on primary",
    contrastPass: "Readable",
    contrastFail: "Too low",
    reset: "Reset",
    share: "Copy link",
    shared: "Link copied",
    output: "app/globals.css",
    outputHint: "Install the starting theme first, then paste this after its variables:",
    sample: {
      title: "New case",
      subtitle: "From LINE OA",
      name: "Customer",
      namePlaceholder: "Nina Park",
      notify: "Notify the team",
      save: "Save case",
      cancel: "Cancel",
      open: "Open",
      closed: "Closed",
      tabs: ["Day", "Week", "Month"],
      alert: "3 cases are close to their SLA",
    },
  },
  sf: {
    metaTitle: "Salesforce",
    eyebrow: "Salesforce",
    title: "Mintel UI for Salesforce",
    subtitle:
      "Bring the Mintel brand to Lightning Experience, the Salesforce mobile app and Experience Cloud — with the same tokens as the React components.",
    layersTitle: "Three layers",
    layers: [
      {
        title: "Tokens in your LWC",
        body: "A CSS-only module, c/tokens, gives every component the brand colors, fonts, radius and spring easings as --mintel-* variables.",
      },
      {
        title: "Rebrand standard components",
        body: "The mintelGlobal static resource sets SLDS styling hooks, so lightning-button, tabs, path and links pick up the brand without code changes.",
      },
      {
        title: "Ready-made Mintel LWC",
        body: "Glass card, shimmer button, gradient text and stat card — drag them onto any Lightning or Experience Builder page.",
      },
    ],
    previewTitle: "Live preview: SLDS vs. Mintel",
    previewBody:
      "A Salesforce record page built from real SLDS markup and CSS in a sandboxed frame. “SLDS default” is what an org looks like today; “Mintel brand” adds the mintelGlobal stylesheet and places the Mintel LWC on the page.",
    previewChanges:
      "Mintel brand = the same record page with the mintelGlobal stylesheet (brand blue #295DA8, rounder corners) plus Mintel LWC: shimmer button, gradient title, stat cards and a glass AI summary card.",
    previewDefault: "SLDS default",
    previewBrand: "Mintel brand",
    previewCaption: "SLDS 2.264 CSS from npm. Mintel components are rendered with the real stylesheets of the LWC in packages/salesforce. The standard SLDS Path cannot be recolored (no styling hook), so the Mintel page uses path instead. SLDS 2 (Cosmos)-only hooks are not shown here.",
    previewLabel: "Preview of SLDS components",
    componentsTitle: "Mintel Lightning Web Components",
    componentsBody: "Each component is exposed to Lightning App Builder and Experience Builder, works on phones, and stops animating when users prefer reduced motion.",
    usage: "Usage",
    source: "Source",
    looksLike: "Looks like",
    components: {
      path:
        "Stage path in Mintel colors. On a record page it reads a picklist (e.g. Case Status), and changes it in two steps — select, then “Mark as current stage”. Works without a record too.",
      tabs:
        "Tabs whose pill or underline springs to the active tab. Two parts, like lightning-tabset and lightning-tab: c-tabs is the tab bar (selection, indicator, arrow keys, tabchange); each c-tab holds one tab's label and content. For composing inside your own LWC.",
      segmentedControl:
        "Segmented control with a sliding thumb, for switching views or ranges. Set options in App Builder as value:Label pairs, or pass an array from JS.",
      recordHeader:
        "Branded record header for record pages: object icon and label, the title in the brand gradient, a status badge and up to four highlight fields, with a slot for action buttons.",
      relatedCards:
        "A record page related list (Cases, Opportunities, Contacts…) as cards with a count and View all. Uses the UI API, so sharing and field security apply and there is no Apex.",
      kanban:
        "Related records as a board grouped by a picklist, e.g. Opportunities by Stage. Drag a card or use its Move to menu (keyboard and mobile app); it saves at once and rolls back with Salesforce's message if a validation rule says no.",
      activityTimeline:
        "Tasks and Events for the record in one timeline with an All / Tasks / Events filter. Overdue tasks are red, completed ones green. Reads through UI API GraphQL, no Apex.",
      slaTimer:
        "Countdown to a DateTime field such as a Case SLA. Green on track, amber inside the warning window, red and counting up once overdue; a bar shows time used; a Boolean field like IsClosed stops it.",
      conversation:
        "Chat thread for LINE, Messenger, TikTok and WhatsApp on a Case or Messaging Session: day dividers, grouped bubbles, read receipts, attachments, typing and a composer. Compose it in your LWC with messages from Apex.",
      thaiAddress:
        "Thai address for Flow screens and pages: province, district, sub-district and postal code, or type the postal code first. Bangkok uses khet/khwaeng. In Flow the names and ids are outputs.",
      progressRing:
        "Percentage ring that sweeps in, from a record field (e.g. Opportunity Probability) or a fixed value, in brand or red/amber/green colors.",
      emptyState: "Branded empty state for related lists and pages: icon in a soft halo, title, description and an optional button.",
      avatarGroup: "Overlapping avatars for a case team or account owners, with a +N bubble and a lift on hover.",
      statusBadge:
        "Status pill with a colored dot. On a record page it shows a field's label; colors come from your Value:variant list, then keyword guesses (Closed → success, Escalated → destructive …).",
      timeline:
        "Vertical event history: colored dots or icons, times, descriptions and a pulsing current step. For composing inside your own LWC.",
      glassCard: "Frosted glass card with a title, subtitle and any content.",
      shimmerButton: "Brand-gradient call to action with a light sweep; fires a normal click event.",
      gradientText: "Headline filled with a slowly moving brand gradient.",
      statCard: "KPI card whose number counts up when it appears.",
      quickActions:
        "Big buttons for the actions people use most on a page: start a Flow, open a quick action (New task, Log a call), go to a URL, or tell your own LWC. Configured in App Builder, one line per button.",
      filesGallery:
        "The record's files as cards with image thumbnails or a file-type tile; a click opens Salesforce's own file preview. Reads the Files related list through the UI API, no Apex.",
      kpiTrend:
        "KPI card with a sparkline that draws itself and a change badge (green or red depending on whether higher is good). The value comes from a record's number field or App Builder.",
      announcement:
        "Page banner for maintenance, news or policy messages, with a link. When dismissed it stays hidden on that device until you change its version.",
      siteHero: "Centered hero for Experience Cloud pages: eyebrow, a title with gradient words, copy and two buttons.",
      siteFeatures: "Feature grid for Experience Cloud pages; cards rise in one after another. Set features in Experience Builder as text.",
      siteFaq: "Frequently asked questions for Experience Cloud pages on native <details>: keyboard and screen-reader friendly with no script.",
      siteCta: "Closing call to action on a brand-gradient band for Experience Cloud pages.",
      brandLoader:
        "Invisible helper: drop it once on an app, home or record page to load the mintelGlobal stylesheet, so standard lightning-* components switch to the Mintel brand.",
      fontSizeControl:
        "Text-size control (ก- ก ก+) for Experience Cloud: scales the page and remembers the choice. Not for Lightning Experience, whose global font size should not change.",
    },
    deployTitle: "Deploy to your org",
    deploySteps: [
      "Log in to the org with the Salesforce CLI.",
      "Deploy the SFDX project from packages/salesforce.",
      "In Lightning App Builder, add “Mintel Brand Loader” once per page, then place the components you need.",
    ],
    lwrTitle: "Experience Cloud (LWR)",
    lwrBody: "Instead of the loader, link the static resource from Settings → Advanced → Edit Head Markup:",
    ownTitle: "Use the tokens in your own LWC",
    ownBody: "Import the module at the top of the component's CSS. For dark mode, add class=\"mintel-dark\" on the host element.",
    statusTitle: "Status",
    status:
      "All bundles compile with @lwc/compiler and the SLDS hook names are checked against the SLDS CSS. Not yet tested in a real org — report anything that differs, especially on SLDS 2 (Cosmos).",
    legal:
      "Salesforce, Lightning and SLDS are trademarks of Salesforce, Inc. This project is not affiliated with or endorsed by Salesforce. The preview uses the Salesforce Lightning Design System CSS (BSD-3-Clause).",
  },
}

export type Dict = typeof en

const th: Dict = {
  meta: {
    title: "Mintel UI",
    description:
      "Design system ของ M-Intelligence — brand tokens สำหรับ React และ Salesforce LWC พร้อม animated components ผ่าน shadcn registry",
  },
  nav: {
    tokens: "Tokens",
    components: "Components",
    salesforce: "Salesforce",
    language: "ภาษา",
    themeToggle: "สลับธีมสว่าง/มืด",
    styleSwitch: "ธีมดีไซน์",
    allThemes: "ธีมทั้งหมด & สร้างธีมเอง",
    copy: "คัดลอกคำสั่ง",
  },
  mobileNav: { label: "เมนูเอกสาร", start: "หน้าแรก", docs: "คู่มือ", components: "Components", salesforce: "Salesforce" },
  hero: {
    badge: "✨ Open-source design system โดย M-Intelligence",
    subtitle:
      "Brand tokens ชุดเดียวสำหรับ React, Salesforce LWC และ mobile web พร้อม component ที่ลื่นไหล ติดตั้งได้ด้วยคำสั่งเดียว",
    browse: "ดู Components",
    start: "เริ่มใช้งาน",
    stats: { tokens: "Semantic tokens", items: "Components ใน registry", platforms: "แพลตฟอร์ม" },
  },
  stackLabel: "ใช้ได้กับ stack ที่ทีมใช้อยู่แล้ว",
  architecture: {
    eyebrow: "Architecture",
    title: "Tokens ชุดเดียว → ทุกแพลตฟอร์ม",
    tokens: (
      <>
        <Strong>@mintelligence-dev/tokens</Strong> เก็บสี ฟอนต์ radius และ motion ไว้ที่ <Code>src/tokens.json</Code>{" "}
        ที่เดียว แล้ว build ออกเป็น CSS variables, Tailwind v4 theme, JS object และ LWC module
      </>
    ),
    components: (
      <>
        <Strong>Components</Strong> แจกผ่าน shadcn registry — คำสั่ง <Code>shadcn add</Code> จะ copy source
        เข้าโปรเจกต์ ไม่ผูก version ไม่ต้องรอ release
      </>
    ),
    thai: "ภาษาไทย (IBM Plex Sans Thai)",
  },
  install: {
    eyebrow: "Getting started",
    title: "เริ่มใช้งานใน 2 ขั้นตอน",
    step1: "1. ติดตั้ง theme",
    step1Desc: "ใส่สีแบรนด์ (light/dark), ฟอนต์ และ radius ลงใน globals.css ของโปรเจกต์ shadcn",
    step2: "2. เพิ่ม component ที่ต้องการ",
    step2Desc: "ทุก component ใช้ token ของแบรนด์อยู่แล้ว ไม่ต้องตั้งสีเอง",
  },
  tokens: {
    eyebrow: "Foundations",
    title: "Brand tokens",
    semantic: "Semantic (สลับ dark mode เพื่อดูค่าที่เปลี่ยน)",
    sampleSans: "Customer Experience ลูกค้าคือหัวใจ",
    sampleHeading: "Intelligence ข้อมูลอัจฉริยะ",
  },
  components: {
    eyebrow: "Registry",
    title: "Components",
    categories: "หมวด component",
    comboboxTitle: "Combobox — ค้นหาได้ / เลือกหลายค่า",
    datePickerTitle: "Date Picker — พ.ศ.",
    formTitle: "Form — react-hook-form + zod (กดส่งโดยไม่กรอกเพื่อดู validation)",
    inputPlaceholder: "อีเมลของคุณ",
    connect: "เชื่อมต่อ",
    magicCard: "เลื่อนเมาส์มาที่นี่",
    magicCardSub: "spotlight ตามเคอร์เซอร์",
    borderBeam: "Beam รอบกรอบ",
    shineBorder: "ขอบไล่เฉดแบรนด์",
    blurFade: "ค่อยๆ ปรากฏตอน scroll",
  },
  glass: {
    pressHint: "กดค้างเพื่อดู spring press",
    search: "ค้นหา",
    notifications: "การแจ้งเตือน",
    incoming: "ข้อความเข้า",
    period: "ช่วงเวลา",
    periods: [
      ["day", "วัน"],
      ["week", "สัปดาห์"],
      ["month", "เดือน"],
    ],
    refraction: (
      <>
        การ์ดนี้เปิด <code>refraction</code> — บน Chrome/Edge (เมาส์) ขอบจะหักเหภาพด้านหลัง
      </>
    ),
  },
  mobile: {
    drawerDesc: "Bottom sheet ลากที่แถบด้านบนลงเพื่อปิด — ใช้บนมือถือแทน dialog",
    openDrawer: "เปิด Drawer",
    tabBarDesc: "แถบแท็บด้านล่างแบบกระจก เว้นที่ให้ home indicator อัตโนมัติ",
    drawerTitle: "ส่งข้อความหาลูกค้า",
    drawerDesc2: "ข้อความจะถูกส่งผ่าน LINE OA",
    messagePlaceholder: "พิมพ์ข้อความ...",
    send: "ส่ง",
    sent: "ส่งข้อความแล้ว",
    cancel: "ยกเลิก",
    tabs: { home: "หน้าแรก", chat: "แชท", alerts: "แจ้งเตือน", me: "ฉัน" },
  },
  motion: {
    reveal:
      "เราออกแบบประสบการณ์ลูกค้าที่ลื่นไหล ทุกการแตะ ทุกการเลื่อน ตอบสนองอย่างเป็นธรรมชาติ เหมือนสิ่งของจริงที่มีน้ำหนัก",
    dockDesc: "เลื่อนเมาส์ผ่านเพื่อขยายไอคอน — บนมือถือจะเป็นการกดแบบ spring แทน",
    tabsDesc: "ตัวชี้แท็บเลื่อนตามด้วย spring — มีแบบ pill และ underline",
    zoomHint: "เลื่อนลงเพื่อดูภาพย่อเข้าเป็นการ์ด",
    features: [
      { title: "รวมทุกช่องทางไว้ที่เดียว", description: "LINE, Facebook, TikTok และ Pantip เข้ามาเป็นเคสใน Salesforce อัตโนมัติ" },
      { title: "AI ช่วยตอบและสรุปเคส", description: "Agentforce ร่างคำตอบ สรุปบทสนทนา และส่งต่อให้คนเมื่อจำเป็น" },
      { title: "เห็นภาพรวมแบบเรียลไทม์", description: "แดชบอร์ด SLA และความพึงพอใจของลูกค้า อัปเดตทุกนาที" },
    ],
    caseTabs: { all: "ทั้งหมด", open: "เปิดอยู่", closed: "ปิดแล้ว" },
  },
  salesforceTeaser: {
    eyebrow: "Salesforce",
    title: "ใช้กับ Salesforce ได้ด้วย",
    body: "Token ชุดเดียวกันใช้ใน Lightning Web Components ได้ และ SLDS styling hooks เปลี่ยนสี lightning-* มาตรฐานให้เป็นสีแบรนด์",
    cta: "เปิดคู่มือ Salesforce",
  },
  footer: "M Intelligence Co., Ltd. · MIT License",
  docs: {
    gettingStarted: "เริ่มต้นใช้งาน",
    themes: "ธีม",
    changelog: "บันทึกการเปลี่ยนแปลง",
    templates: "Templates",
    templatesBody: "หน้าเว็บสำเร็จรูปที่ติดตั้งได้ด้วยคำสั่งเดียว — ดึง component ของ Mintel ที่ใช้มาให้ครบ และวางไว้ที่ app/<route>/page.tsx",
    openPreview: "เปิดดูเต็มจอ",
    backToTemplates: "Templates",
    installsTo: "ติดตั้งไปที่",
    components: "Components",
    allComponents: "Components ทั้งหมด",
    installation: "ติดตั้ง",
    preview: "Preview",
    code: "Code",
    source: "Source ของ component",
    sourceHint: "ไฟล์นี้คือสิ่งที่ `shadcn add` copy ไปไว้ใน components/ui — แก้ได้ตามต้องการ",
    props: "Props",
    prop: "Prop",
    type: "Type",
    default: "ค่าเริ่มต้น",
    description: "คำอธิบาย",
    upstream: "Prop อื่นๆ ดูได้ที่",
    dependencies: "Dependencies",
    setupHint: "ใช้ registry @mintel — ตั้งค่าครั้งเดียวได้ที่",
    withUrl: "ถ้ายังไม่ได้ตั้งค่า @mintel:",
    previous: "ก่อนหน้า",
    next: "ถัดไป",
    search: "ค้นหาเอกสาร...",
    searchShort: "ค้นหา",
    noResults: "ไม่พบรายการ",
    pages: "หน้า",
    componentsIndexTitle: "Components",
    componentsIndexBody: (n: number) =>
      `${n} รายการใน registry: core UI, ฟอร์ม, แสดงข้อมูล, นำทาง, glass, fluid motion, mobile และ effects — ใช้ brand tokens ของ Mintel ทั้งหมด`,
    gs: {
      title: "เริ่มต้นใช้งาน",
      body: "ตั้งค่าโปรเจกต์ Next.js ให้ใช้ theme ฟอนต์ และ component ของ Mintel ทุกขั้นด้านล่างทดสอบในโปรเจกต์ Next.js 16 ที่สร้างใหม่แล้ว",
      steps: [
        { title: "สร้างโปรเจกต์", body: "ข้ามขั้นนี้ได้ถ้ามีโปรเจกต์ Next.js + Tailwind v4 อยู่แล้ว" },
        { title: "ตั้งค่า shadcn", body: "สร้าง components.json, lib/utils และ CSS พื้นฐาน" },
        { title: "เพิ่ม registry @mintel", body: "ใส่ใน components.json ครั้งเดียว จากนั้นติดตั้งได้ด้วย @mintel/<ชื่อ>" },
        { title: "ติดตั้ง theme", body: "ใส่สีแบรนด์ (light + dark), ฟอนต์, radius, spring และ glass tokens ลงใน app/globals.css" },
        { title: "โหลดฟอนต์", body: "Manrope สำหรับอังกฤษ IBM Plex Sans Thai สำหรับไทย และ Rubik สำหรับหัวข้อ theme จะอ่านตัวแปรของ next/font เหล่านี้เอง ส่วน viewport-fit=cover ช่วยให้ component บนมือถือเว้นที่ให้รอยบากและ home indicator" },
        { title: "เพิ่ม component", body: "ติดตั้งตัวที่ต้องการ วาง <Toaster /> ครั้งเดียว (มีใน layout ด้านบนแล้ว) แล้วเรียก toast() ได้ทุกที่" },
        { title: "Dark mode", body: "Component เปลี่ยนตาม class .dark บน <html> สลับด้วยวิธีไหนก็ได้ เช่น:" },
      ],
      noConfig: "ถ้าไม่อยากแก้ components.json ใช้ URL เต็มแทนได้:",
      themesMore: "อยากได้หน้าตาแบบอื่น? ธีม Clarity และธีมอื่นติดตั้งแบบเดียวกัน หรือสร้างธีมเองก็ได้",
      themesLink: "ดูธีมทั้งหมด →",
      salesforce: "ถ้าทำงานบน Salesforce ดูคู่มือ Salesforce",
    },
  },
  themes: {
    metaTitle: "ธีม",
    title: "ธีม",
    body: "ทุก component อ่านค่าจากตัวแปรชุดเดียวกัน เปลี่ยนธีมครั้งเดียวก็เปลี่ยนหน้าตาทั้งหมด เลือกธีมสำเร็จรูป หรือสร้างธีมเองจากธีมที่มีอยู่แล้ว copy CSS ไปใช้",
    galleryTitle: "ธีมสำเร็จรูป",
    light: "สว่าง",
    dark: "มืด",
    mode: "โหมดตัวอย่าง",
    useHere: "ใช้กับเว็บนี้",
    usingHere: "กำลังใช้กับเว็บนี้",
    install: "ติดตั้ง (ทั้งแอป)",
    runtimeTitle: "ให้ผู้ใช้สลับธีมเองได้",
    runtimeBody: "ติดตั้ง theme ของ Mintel แล้ว import CSS ของทุกธีมครั้งเดียว จากนั้นตั้ง data-mintel-theme ที่ <html> ลบ attribute ออกเพื่อกลับเป็น Mintel (data-theme ใช้กับ dark mode อยู่แล้ว)",
    builderTitle: "สร้างธีมเอง",
    builderBody: "เริ่มจากธีมที่มี ปรับสี มุมโค้ง และฟอนต์ ดูผลกับ component จริงทั้งโหมดสว่างและมืด แล้ว copy CSS ไปวางใน app/globals.css ต่อจากธีมที่ใช้เริ่มต้น",
    base: "เริ่มจาก",
    primary: "สีหลัก",
    accent: "สีรอง",
    accentHint: "สีที่สองของ gradient แบรนด์",
    radius: "ความโค้งของมุม",
    font: "ฟอนต์",
    fonts: { theme: "ตามธีม", brand: "Manrope + Rubik", system: "ฟอนต์ระบบ", thai: "IBM Plex Sans Thai" },
    contrast: "ตัวอักษรบนสีหลัก",
    contrastPass: "อ่านง่าย",
    contrastFail: "ต่างกันน้อยไป",
    reset: "รีเซ็ต",
    share: "คัดลอกลิงก์",
    shared: "คัดลอกลิงก์แล้ว",
    output: "app/globals.css",
    outputHint: "ติดตั้งธีมที่ใช้เริ่มต้นก่อน แล้ววางโค้ดนี้ต่อจากตัวแปรของธีม:",
    sample: {
      title: "เคสใหม่",
      subtitle: "จาก LINE OA",
      name: "ลูกค้า",
      namePlaceholder: "นีน่า พาร์ค",
      notify: "แจ้งทีม",
      save: "บันทึกเคส",
      cancel: "ยกเลิก",
      open: "เปิดอยู่",
      closed: "ปิดแล้ว",
      tabs: ["วัน", "สัปดาห์", "เดือน"],
      alert: "มี 3 เคสใกล้ครบ SLA",
    },
  },
  sf: {
    metaTitle: "Salesforce",
    eyebrow: "Salesforce",
    title: "Mintel UI สำหรับ Salesforce",
    subtitle:
      "ใช้แบรนด์ Mintel บน Lightning Experience, Salesforce mobile app และ Experience Cloud ด้วย token ชุดเดียวกับ React components",
    layersTitle: "ใช้งานได้ 3 ชั้น",
    layers: [
      {
        title: "Token ใน LWC ของทีม",
        body: "CSS module c/tokens ให้สี ฟอนต์ radius และ spring easing ของแบรนด์เป็นตัวแปร --mintel-* ใช้ได้ทุก component",
      },
      {
        title: "เปลี่ยนสี component มาตรฐาน",
        body: "Static resource mintelGlobal ตั้งค่า SLDS styling hooks ให้ lightning-button, tabs, path และลิงก์เป็นสีแบรนด์โดยไม่ต้องแก้โค้ด",
      },
      {
        title: "LWC สำเร็จรูปของ Mintel",
        body: "Glass card, shimmer button, gradient text และ stat card ลากวางบนหน้า Lightning หรือ Experience Builder ได้เลย",
      },
    ],
    previewTitle: "ตัวอย่างจริง: SLDS เทียบกับ Mintel",
    previewBody:
      "หน้า record ของ Salesforce ที่สร้างจาก markup และ CSS ของ SLDS จริงในกรอบแยก “SLDS ปกติ” คือหน้าตา org ทั่วไปในตอนนี้ ส่วน “Mintel brand” ใส่ stylesheet mintelGlobal และวาง LWC ของ Mintel ลงในหน้า",
    previewChanges:
      "Mintel brand = หน้า record เดิมที่ใส่ stylesheet mintelGlobal (น้ำเงินแบรนด์ #295DA8 มุมมนขึ้น) และวาง LWC ของ Mintel: ปุ่ม shimmer หัวข้อไล่สี การ์ด KPI และการ์ดกระจกสรุปเคสด้วย AI",
    previewDefault: "SLDS ปกติ",
    previewBrand: "Mintel brand",
    previewCaption: "ใช้ CSS ของ SLDS 2.264 จาก npm ส่วน component ของ Mintel ใช้ stylesheet จริงของ LWC ใน packages/salesforce Path มาตรฐานของ SLDS เปลี่ยนสีไม่ได้ (ไม่มี styling hook) หน้า Mintel จึงใช้ path แทน ส่วน hook ที่มีเฉพาะ SLDS 2 (Cosmos) จะไม่เห็นในตัวอย่างนี้",
    previewLabel: "ตัวอย่าง component ของ SLDS",
    componentsTitle: "Lightning Web Components ของ Mintel",
    componentsBody: "ทุกตัวใช้ใน Lightning App Builder และ Experience Builder ได้ รองรับมือถือ และหยุด animation เมื่อผู้ใช้ตั้งค่าลดการเคลื่อนไหว",
    usage: "วิธีใช้",
    source: "Source",
    looksLike: "หน้าตา",
    components: {
      path:
        "แถบขั้นตอนสี Mintel บนหน้า record จะอ่าน picklist (เช่น Case Status) และเปลี่ยนค่าแบบ 2 ขั้น — เลือก แล้วกด “ตั้งเป็นขั้นปัจจุบัน” ใช้แบบไม่มี record ก็ได้",
      tabs:
        "แท็บที่ตัวไฮไลต์ (pill หรือขีดเส้นใต้) เด้งไปหาแท็บที่เลือก มี 2 ส่วนเหมือน lightning-tabset กับ lightning-tab: c-tabs คือแถบแท็บ (จำแท็บที่เลือก ตัวไฮไลต์ ปุ่มลูกศร และ event tabchange) ส่วน c-tab แต่ละตัวคือ 1 แท็บ เก็บชื่อแท็บและเนื้อหา ใช้ประกอบใน LWC ของเราเอง",
      segmentedControl:
        "ตัวเลือกแบบแบ่งช่อง มีแถบเลื่อนไปยังช่องที่เลือก ใช้สลับมุมมองหรือช่วงเวลา ตั้ง options ใน App Builder เป็นคู่ value:Label หรือส่ง array จาก JS",
      recordHeader:
        "หัวหน้า record แบบมีแบรนด์ มีไอคอนและชื่อ object ชื่อ record สีไล่เฉด ป้ายสถานะ ฟิลด์สำคัญไม่เกิน 4 ช่อง และช่องใส่ปุ่มคำสั่ง",
      relatedCards:
        "related list บนหน้า record (เช่น Cases, Opportunities, Contacts) แสดงเป็นการ์ด มีจำนวนและปุ่มดูทั้งหมด ดึงผ่าน UI API จึงเคารพสิทธิ์และ field security และไม่ต้องเขียน Apex",
      kanban:
        "บอร์ดของ record ที่เกี่ยวข้อง แบ่งคอลัมน์ตาม picklist เช่น Opportunity ตาม Stage ลากการ์ดหรือใช้เมนูย้ายไป (ใช้คีย์บอร์ดและแอปมือถือได้) บันทึกทันที และย้อนกลับพร้อมข้อความของ Salesforce ถ้าติด validation rule",
      activityTimeline:
        "Task และ Event ของ record ในไทม์ไลน์เดียว กรองได้ ทั้งหมด/งาน/นัดหมาย งานเลยกำหนดเป็นสีแดง งานเสร็จเป็นสีเขียว ดึงผ่าน UI API GraphQL ไม่ต้องเขียน Apex",
      slaTimer:
        "นับถอยหลังถึงเวลาในฟิลด์ DateTime เช่น SLA ของเคส เขียวเมื่อทันเวลา เหลืองเมื่อใกล้ครบ แดงและนับเวลาที่เกินเมื่อเลยกำหนด มีแถบเวลาที่ใช้ไป และหยุดเมื่อฟิลด์ Boolean เช่น IsClosed เป็นจริง",
      conversation:
        "หน้าแชต LINE, Messenger, TikTok และ WhatsApp บนหน้า Case หรือ Messaging Session มีตัวคั่นวัน จัดกลุ่มข้อความ สถานะอ่านแล้ว ไฟล์แนบ กำลังพิมพ์ และช่องพิมพ์ ใช้ประกอบใน LWC ของเราโดยส่งข้อความจาก Apex",
      thaiAddress:
        "ที่อยู่ไทยสำหรับ Flow screen และหน้าต่างๆ เลือกจังหวัด อำเภอ ตำบล แล้วได้รหัสไปรษณีย์ หรือพิมพ์รหัสไปรษณีย์ก่อน กรุงเทพฯ ใช้เขต/แขวง ใน Flow ได้ทั้งชื่อและ id เป็น output",
      progressRing: "วงแหวนเปอร์เซ็นต์ที่กวาดเข้ามา อ่านจากฟิลด์ของ record (เช่น Probability ของ Opportunity) หรือใส่ค่าเอง สีแบรนด์หรือแดง/เหลือง/เขียวตามค่า",
      emptyState: "หน้าว่างแบบมีแบรนด์สำหรับ related list และหน้าต่างๆ ไอคอนในแสงนุ่ม หัวข้อ คำอธิบาย และปุ่ม",
      avatarGroup: "รูปโปรไฟล์ซ้อนกันสำหรับทีมดูแลเคสหรือเจ้าของลูกค้า รวมคนที่เหลือเป็น +N และยกขึ้นเมื่อชี้",
      statusBadge:
        "ป้ายสถานะมีจุดสี บนหน้า record จะแสดง label ของฟิลด์ สีมาจากรายการ Value:variant ที่ตั้งไว้ ถ้าไม่ได้ตั้งจะเดาจากคำ (Closed → เขียว, Escalated → แดง …)",
      timeline:
        "ประวัติเหตุการณ์แนวตั้ง จุดหรือไอคอนมีสีตามสถานะ มีเวลาและคำอธิบาย ขั้นปัจจุบันมีวงกระเพื่อม ใช้ประกอบใน LWC ของเราเอง",
      glassCard: "การ์ดกระจกฝ้า ใส่หัวข้อ คำอธิบาย และเนื้อหาอะไรก็ได้",
      shimmerButton: "ปุ่ม call to action สีแบรนด์ มีแสงวิ่งรอบขอบ ส่ง click event ปกติ",
      gradientText: "หัวข้อที่เติมสีไล่เฉดแบรนด์ซึ่งค่อยๆ เคลื่อนที่",
      statCard: "การ์ด KPI ที่ตัวเลขนับขึ้นตอนแสดงผล",
      quickActions:
        "ปุ่มใหญ่สำหรับงานที่ทำบ่อยบนหน้า: เปิด Flow, เปิด quick action (สร้าง Task, บันทึกการโทร), ไปที่ลิงก์ หรือส่ง event ให้ LWC ของเรา ตั้งใน App Builder บรรทัดละปุ่ม",
      filesGallery:
        "ไฟล์ของ record เป็นการ์ด รูปภาพมีภาพย่อ ไฟล์อื่นแสดงชนิดไฟล์ กดแล้วเปิดหน้าดูไฟล์ของ Salesforce ดึงจาก related list Files ผ่าน UI API ไม่ใช้ Apex",
      kpiTrend:
        "การ์ด KPI พร้อมกราฟเส้นเล็กที่ค่อยๆ วาดตัวเอง และป้ายบอกการเปลี่ยนแปลง (เขียวหรือแดงตามว่าค่าสูงดีหรือไม่ดี) ค่าดึงจากฟิลด์ตัวเลขของ record หรือตั้งใน App Builder",
      announcement:
        "แถบประกาศบนหน้า เช่นปิดปรับปรุง ข่าว หรือนโยบาย ใส่ลิงก์ได้ ถ้าผู้ใช้ปิดแล้วจะไม่แสดงบนเครื่องนั้นจนกว่าจะเปลี่ยน version",
      siteHero: "Hero ตรงกลางสำหรับหน้า Experience Cloud มีข้อความนำ หัวข้อที่มีคำสีไล่เฉด คำอธิบาย และปุ่ม 2 ปุ่ม",
      siteFeatures: "ตารางฟีเจอร์สำหรับหน้า Experience Cloud การ์ดค่อยๆ เลื่อนขึ้นทีละใบ ตั้งรายการฟีเจอร์เป็นข้อความใน Experience Builder",
      siteFaq: "คำถามที่พบบ่อยสำหรับหน้า Experience Cloud ใช้ <details> ของเบราว์เซอร์ ใช้คีย์บอร์ดและ screen reader ได้โดยไม่ต้องมีสคริปต์",
      siteCta: "แถบปิดท้ายสีแบรนด์ชวนให้ติดต่อ สำหรับหน้า Experience Cloud",
      brandLoader:
        "ตัวช่วยที่มองไม่เห็น วางครั้งเดียวในหน้า app, home หรือ record เพื่อโหลด stylesheet mintelGlobal ให้ component มาตรฐาน lightning-* เป็นแบรนด์ Mintel",
      fontSizeControl:
        "ปุ่มปรับขนาดตัวอักษร (ก- ก ก+) สำหรับ Experience Cloud ขยายทั้งหน้าและจำค่าที่เลือก ไม่ใช้กับ Lightning Experience เพราะไม่ควรเปลี่ยนขนาดฟอนต์ของทั้งระบบ",
    },
    deployTitle: "Deploy เข้า org",
    deploySteps: [
      "Login เข้า org ด้วย Salesforce CLI",
      "Deploy SFDX project จาก packages/salesforce",
      "ใน Lightning App Builder ใส่ “Mintel Brand Loader” หน้าละ 1 ตัว แล้ววาง component ที่ต้องการ",
    ],
    lwrTitle: "Experience Cloud (LWR)",
    lwrBody: "แทนการใช้ loader ให้ link static resource ที่ Settings → Advanced → Edit Head Markup:",
    ownTitle: "ใช้ token ใน LWC ของทีมเอง",
    ownBody: "Import module ที่บรรทัดแรกของ CSS ใน component ถ้าต้องการ dark mode ให้ใส่ class=\"mintel-dark\" ที่ host element",
    statusTitle: "สถานะ",
    status:
      "ทุก bundle ผ่าน @lwc/compiler และตรวจชื่อ SLDS hook กับ CSS ของ SLDS แล้ว ยังไม่ได้ทดสอบใน org จริง — ถ้าเจออะไรต่างไป โดยเฉพาะบน SLDS 2 (Cosmos) แจ้งได้เลย",
    legal:
      "Salesforce, Lightning และ SLDS เป็นเครื่องหมายการค้าของ Salesforce, Inc. โปรเจกต์นี้ไม่ได้เกี่ยวข้องหรือได้รับการรับรองจาก Salesforce ตัวอย่างใช้ CSS ของ Salesforce Lightning Design System (BSD-3-Clause)",
  },
}

export const dictionaries: Record<Lang, Dict> = { en, th }
export const getDict = (lang: Lang) => dictionaries[lang]
