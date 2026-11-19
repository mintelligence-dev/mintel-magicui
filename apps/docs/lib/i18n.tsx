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
    switchLang: "ไทย",
    switchLangLabel: "อ่านเป็นภาษาไทย",
    themeToggle: "Toggle light/dark theme",
    copy: "Copy command",
  },
  mobileNav: { label: "Docs menu", start: "Start", tokens: "Tokens", components: "Components", salesforce: "Salesforce" },
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
  },
  motion: {
    reveal:
      "We design customer experiences that flow — every tap and every scroll responds naturally, like a real object with weight.",
    dockDesc: "Move your mouse across to magnify — on phones it becomes a spring press instead.",
    tabsDesc: "The tab indicator glides with a spring — pill and underline styles.",
    zoomHint: "Scroll down to see the image settle into a card",
  },
  salesforceTeaser: {
    eyebrow: "Salesforce",
    title: "Built for Salesforce too",
    body: "The same tokens power Lightning Web Components, and SLDS styling hooks rebrand standard lightning-* components.",
    cta: "Open the Salesforce guide",
  },
  footer: "M Intelligence Co., Ltd. · MIT License",
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
    switchLang: "EN",
    switchLangLabel: "Read in English",
    themeToggle: "สลับธีมสว่าง/มืด",
    copy: "คัดลอกคำสั่ง",
  },
  mobileNav: { label: "เมนูเอกสาร", start: "เริ่มต้น", tokens: "Tokens", components: "Components", salesforce: "Salesforce" },
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
  },
  motion: {
    reveal:
      "เราออกแบบประสบการณ์ลูกค้าที่ลื่นไหล ทุกการแตะ ทุกการเลื่อน ตอบสนองอย่างเป็นธรรมชาติ เหมือนสิ่งของจริงที่มีน้ำหนัก",
    dockDesc: "เลื่อนเมาส์ผ่านเพื่อขยายไอคอน — บนมือถือจะเป็นการกดแบบ spring แทน",
    tabsDesc: "ตัวชี้แท็บเลื่อนตามด้วย spring — มีแบบ pill และ underline",
    zoomHint: "เลื่อนลงเพื่อดูภาพย่อเข้าเป็นการ์ด",
  },
  salesforceTeaser: {
    eyebrow: "Salesforce",
    title: "ใช้กับ Salesforce ได้ด้วย",
    body: "Token ชุดเดียวกันใช้ใน Lightning Web Components ได้ และ SLDS styling hooks เปลี่ยนสี lightning-* มาตรฐานให้เป็นสีแบรนด์",
    cta: "เปิดคู่มือ Salesforce",
  },
  footer: "M Intelligence Co., Ltd. · MIT License",
}

export const dictionaries: Record<Lang, Dict> = { en, th }
export const getDict = (lang: Lang) => dictionaries[lang]
