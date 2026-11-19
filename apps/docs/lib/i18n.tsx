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
    componentsIndexBody: "45 registry items: core UI and forms, glass, fluid motion, mobile and effects — all on Mintel brand tokens.",
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
      salesforce: "Building on Salesforce instead? See the Salesforce guide.",
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
        body: "A CSS-only module, c/mintelTokens, gives every component the brand colors, fonts, radius and spring easings as --mintel-* variables.",
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
    previewCaption: "SLDS 2.264 CSS from npm. Mintel components are rendered with the real stylesheets of the LWC in packages/salesforce. SLDS Path has fixed colors in SLDS 1 (no styling hook), and SLDS 2 (Cosmos)-only hooks are not shown here.",
    previewLabel: "Preview of SLDS components",
    componentsTitle: "Mintel Lightning Web Components",
    componentsBody: "Each component is exposed to Lightning App Builder and Experience Builder, works on phones, and stops animating when users prefer reduced motion.",
    usage: "Usage",
    source: "Source",
    looksLike: "Looks like",
    components: {
      mintelGlassCard: "Frosted glass card with a title, subtitle and any content.",
      mintelShimmerButton: "Brand-gradient call to action with a light sweep; fires a normal click event.",
      mintelGradientText: "Headline filled with a slowly moving brand gradient.",
      mintelStatCard: "KPI card whose number counts up when it appears.",
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
    componentsIndexBody: "45 รายการใน registry: core UI และฟอร์ม, glass, fluid motion, mobile และ effects — ใช้ brand tokens ของ Mintel ทั้งหมด",
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
      salesforce: "ถ้าทำงานบน Salesforce ดูคู่มือ Salesforce",
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
        body: "CSS module c/mintelTokens ให้สี ฟอนต์ radius และ spring easing ของแบรนด์เป็นตัวแปร --mintel-* ใช้ได้ทุก component",
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
    previewCaption: "ใช้ CSS ของ SLDS 2.264 จาก npm ส่วน component ของ Mintel ใช้ stylesheet จริงของ LWC ใน packages/salesforce ทั้งนี้ Path ของ SLDS 1 กำหนดสีตายตัวโดยไม่มี styling hook และ hook ที่มีเฉพาะ SLDS 2 (Cosmos) จะไม่เห็นในตัวอย่างนี้",
    previewLabel: "ตัวอย่าง component ของ SLDS",
    componentsTitle: "Lightning Web Components ของ Mintel",
    componentsBody: "ทุกตัวใช้ใน Lightning App Builder และ Experience Builder ได้ รองรับมือถือ และหยุด animation เมื่อผู้ใช้ตั้งค่าลดการเคลื่อนไหว",
    usage: "วิธีใช้",
    source: "Source",
    looksLike: "หน้าตา",
    components: {
      mintelGlassCard: "การ์ดกระจกฝ้า ใส่หัวข้อ คำอธิบาย และเนื้อหาอะไรก็ได้",
      mintelShimmerButton: "ปุ่ม call to action สีแบรนด์ มีแสงวิ่งรอบขอบ ส่ง click event ปกติ",
      mintelGradientText: "หัวข้อที่เติมสีไล่เฉดแบรนด์ซึ่งค่อยๆ เคลื่อนที่",
      mintelStatCard: "การ์ด KPI ที่ตัวเลขนับขึ้นตอนแสดงผล",
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
