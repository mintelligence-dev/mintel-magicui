import { AlertTriangle, CheckCircle2, ChevronDown, Cloud, LayoutTemplate, MousePointerClick, Palette, Terminal } from "lucide-react"

import { CopyCommand } from "@/components/copy-command"
import { SfShell } from "@/components/sf-shell"
import { getDict, langPath, type Lang } from "@/lib/i18n"

type Step = { title: string; body: string; commands?: string[]; code?: string; icon: typeof Terminal }

const COPY = {
  en: {
    eyebrow: "Salesforce · Getting started",
    title: "From zero to a Mintel component on a Lightning page",
    lead: "About 15 minutes: install the project, check the org for name conflicts, deploy, then drag a component onto a page in App Builder.",
    needTitle: "You need",
    need: [
      "Salesforce CLI (sf) and Node.js 20 or later",
      "An org you own or were given access to for testing: a sandbox, scratch org or Developer Edition",
      "Permission to customize pages (Customize Application) in that org",
    ],
    warn: "Never deploy to a customer's production org without their approval. Try a sandbox first.",
    steps: [
      {
        title: "Get the project",
        body: "Clone the repository and install its dependencies once.",
        commands: ["git clone https://github.com/mintelligence-dev/mintel-magicui.git && cd mintel-magicui", "npm install"],
        icon: Terminal,
      },
      {
        title: "Log in to the org",
        body: "Give it a short alias. For a sandbox, add --instance-url https://test.salesforce.com.",
        commands: ["sf org login web --alias my-org"],
        icon: Cloud,
      },
      {
        title: "Check for name conflicts",
        body: "Without a package, our components go into the org's default namespace, where names like tabs or path may already be used. The check lists any such component and writes nothing.",
        commands: ["npm run deploy:check -w @mintelligence-dev/salesforce -- --target-org my-org"],
        icon: CheckCircle2,
      },
      {
        title: "Deploy",
        body: "Runs the same check, then deploys the LWC, the c/tokens module and the mintelGlobal stylesheet. Components from an earlier Mintel deploy are updated; anything else stops the deploy.",
        commands: ["npm run deploy -w @mintelligence-dev/salesforce -- --target-org my-org"],
        icon: Terminal,
      },
      {
        title: "Drag onto a page",
        body: "Open a record, select the gear icon, then Edit Page. Mintel components are listed under Custom with a [Mintel UI] description. Drop one on the page, set its properties in the right panel, then Save and Activate. To brand the standard components on that page too, add “Mintel Brand Loader” once.",
        icon: MousePointerClick,
      },
      {
        title: "Experience Cloud sites",
        body: "In Experience Builder, the components are under Components → Custom Components. To brand the standard site components too, add the mintelGlobal stylesheet in Settings → Advanced → Edit Head Markup.",
        code: '<link rel="stylesheet" href="{basePath}/assets/mintelGlobal" />',
        icon: LayoutTemplate,
      },
      {
        title: "Use the tokens in your own LWC",
        body: "Import the CSS-only module and use the --mintel-* variables: colors, fonts, radius and spring easings stay in step with the React components.",
        code: "@import 'c/tokens';",
        icon: Palette,
      },
    ] satisfies Step[],
    faqTitle: "If something goes wrong",
    faq: [
      ["The deploy stops with a list of conflicts", "Another component in the org already has that name. Rename or remove theirs only if you own it; otherwise wait for the Mintel package, which uses its own namespace."],
      ["The component is not in App Builder", "Check the component page here: Where to use lists the page types it supports. Some, like tabs, are meant to be composed inside your own LWC."],
      ["Colors look like plain SLDS", "The LWC carry their own styles. Standard components (lightning-button and others) only take the brand once the page has a “Mintel Brand Loader” (Lightning pages) or the site loads the mintelGlobal stylesheet (Experience Cloud)."],
    ],
    next: "Browse the components",
  },
  th: {
    eyebrow: "Salesforce · เริ่มต้นใช้งาน",
    title: "จากศูนย์จนวาง component ของ Mintel บนหน้า Lightning ได้",
    lead: "ใช้เวลาประมาณ 15 นาที: ติดตั้งโปรเจกต์ ตรวจชื่อซ้ำใน org แล้ว deploy จากนั้นลากวางใน App Builder",
    needTitle: "สิ่งที่ต้องมี",
    need: [
      "Salesforce CLI (sf) และ Node.js 20 ขึ้นไป",
      "org ที่เป็นของเราหรือได้รับสิทธิ์ให้ทดสอบ เช่น sandbox, scratch org หรือ Developer Edition",
      "สิทธิ์แก้หน้า (Customize Application) ใน org นั้น",
    ],
    warn: "ห้าม deploy ลง production ของลูกค้าโดยไม่ได้รับอนุญาต ลองบน sandbox ก่อนเสมอ",
    steps: [
      {
        title: "ดึงโปรเจกต์",
        body: "clone repository แล้วติดตั้ง dependency ครั้งเดียว",
        commands: ["git clone https://github.com/mintelligence-dev/mintel-magicui.git && cd mintel-magicui", "npm install"],
        icon: Terminal,
      },
      {
        title: "Login เข้า org",
        body: "ตั้ง alias สั้นๆ ถ้าเป็น sandbox ให้เพิ่ม --instance-url https://test.salesforce.com",
        commands: ["sf org login web --alias my-org"],
        icon: Cloud,
      },
      {
        title: "ตรวจชื่อซ้ำ",
        body: "ตอนที่ยังไม่มี package component จะเข้าไปอยู่ใน namespace หลักของ org ซึ่งอาจมีชื่ออย่าง tabs หรือ path อยู่แล้ว คำสั่งนี้แค่แสดงรายการที่ชนกัน ไม่เขียนอะไรลง org",
        commands: ["npm run deploy:check -w @mintelligence-dev/salesforce -- --target-org my-org"],
        icon: CheckCircle2,
      },
      {
        title: "Deploy",
        body: "ตรวจซ้ำแบบเดียวกันแล้ว deploy LWC, module c/tokens และ stylesheet mintelGlobal ตัวที่เคย deploy จาก Mintel จะถูกอัปเดต ถ้าเจอของคนอื่นชื่อซ้ำจะหยุดทันที",
        commands: ["npm run deploy -w @mintelligence-dev/salesforce -- --target-org my-org"],
        icon: Terminal,
      },
      {
        title: "ลากวางบนหน้า",
        body: "เปิดหน้า record กดไอคอนเฟือง แล้วเลือก Edit Page จะเห็น component ของ Mintel ในหมวด Custom (คำอธิบายขึ้นต้นด้วย [Mintel UI]) ลากไปวาง ตั้งค่าที่แผงด้านขวา แล้วกด Save และ Activate ถ้าอยากให้ component มาตรฐานในหน้านั้นเป็นสีแบรนด์ด้วย ให้ใส่ “Mintel Brand Loader” หน้าละ 1 ตัว",
        icon: MousePointerClick,
      },
      {
        title: "เว็บ Experience Cloud",
        body: "ใน Experience Builder อยู่ที่ Components → Custom Components ถ้าอยากให้ component มาตรฐานของเว็บเป็นสีแบรนด์ด้วย ให้ใส่ stylesheet mintelGlobal ที่ Settings → Advanced → Edit Head Markup",
        code: '<link rel="stylesheet" href="{basePath}/assets/mintelGlobal" />',
        icon: LayoutTemplate,
      },
      {
        title: "ใช้ token ใน LWC ของทีม",
        body: "import module ที่มีแต่ CSS แล้วใช้ตัวแปร --mintel-* ได้เลย ทั้งสี ฟอนต์ radius และ spring easing จะตรงกับฝั่ง React เสมอ",
        code: "@import 'c/tokens';",
        icon: Palette,
      },
    ] satisfies Step[],
    faqTitle: "ถ้าเจอปัญหา",
    faq: [
      ["Deploy หยุดพร้อมรายชื่อที่ชนกัน", "ใน org มี component อื่นใช้ชื่อนั้นอยู่แล้ว ให้เปลี่ยนชื่อหรือลบของเดิมเฉพาะเมื่อเป็นของเราเอง ถ้าไม่ใช่ ให้รอ package ของ Mintel ซึ่งจะมี namespace แยกของตัวเอง"],
      ["หา component ใน App Builder ไม่เจอ", "ดูหัวข้อ “ใช้ได้ที่” ในหน้า component ว่ารองรับหน้าแบบไหน บางตัวเช่น tabs ออกแบบมาให้ประกอบใน LWC ของเราเอง"],
      ["สีออกมาเป็น SLDS ปกติ", "LWC ของ Mintel มีสไตล์ในตัวอยู่แล้ว แต่ component มาตรฐาน (lightning-button และอื่นๆ) จะเป็นสีแบรนด์ก็ต่อเมื่อหน้านั้นมี “Mintel Brand Loader” (หน้า Lightning) หรือเว็บโหลด stylesheet mintelGlobal แล้ว (Experience Cloud)"],
    ],
    next: "ดู component ทั้งหมด",
  },
}

/** Salesforce getting started: install, conflict check, deploy, App Builder, Experience Cloud, tokens. */
export function SfGetStartedPage({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const d = getDict(lang)
  return (
    <SfShell lang={lang} current="get-started">
      <article className="max-w-3xl">
        <p className="text-sm font-semibold tracking-wide text-brand uppercase">{t.eyebrow}</p>
        <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-balance sm:text-5xl">{t.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t.lead}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 [&>*]:min-w-0">
          <section className="rounded-2xl border bg-card p-5">
            <h2 className="font-heading font-semibold">{t.needTitle}</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {t.need.map((n) => (
                <li key={n} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                  {n}
                </li>
              ))}
            </ul>
          </section>
          <p role="note" className="flex gap-3 self-start rounded-2xl border border-warning/35 bg-warning/8 p-5 text-sm">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" />
            {t.warn}
          </p>
        </div>

        <ol className="relative mt-12 space-y-10 before:absolute before:top-2 before:bottom-2 before:left-5 before:w-px before:bg-border">
          {t.steps.map((s, i) => {
            const Icon = s.icon
            return (
              <li key={s.title} className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4">
                <span className="relative z-10 inline-flex size-10 items-center justify-center rounded-xl bg-[image:var(--brand-gradient)] text-white shadow-[0_8px_20px_-10px_var(--brand)]">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 pt-1.5">
                  <h2 className="font-heading text-lg font-semibold">
                    <span className="mr-2 text-muted-foreground tabular-nums">{i + 1}.</span>
                    {s.title}
                  </h2>
                  <p className="mt-1.5 text-muted-foreground">{s.body}</p>
                  {"code" in s && s.code && (
                    <pre tabIndex={0} className="mt-3 overflow-x-auto rounded-xl bg-muted px-4 py-3 font-mono text-[13px]">
                      <code>{s.code}</code>
                    </pre>
                  )}
                  {"commands" in s && s.commands && (
                    <div className="mt-3 space-y-2">
                      {s.commands.map((c) => (
                        <CopyCommand key={c} label={d.nav.copy} command={c} />
                      ))}
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ol>

        <section className="mt-14">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">{t.faqTitle}</h2>
          <div className="mt-4 divide-y rounded-2xl border">
            {t.faq.map(([q, a]) => (
              <details key={q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium marker:hidden [&::-webkit-details-marker]:hidden">
                  {q}
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-spring-snappy group-open:rotate-180 motion-reduce:transition-none" />
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <a
          href={`${langPath(lang, "/salesforce")}#lwc`}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-[image:var(--brand-gradient)] px-5 py-2.5 text-sm font-semibold text-white"
        >
          {t.next} →
        </a>
      </article>
    </SfShell>
  )
}
