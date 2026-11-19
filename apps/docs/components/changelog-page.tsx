import { Cloud, Component, GitPullRequest, Palette, Tag } from "lucide-react"

import { DocsShell } from "@/components/docs-shell"
import { readReleases, type ChangeKind, type PackageKey } from "@/lib/changelog"
import type { Lang } from "@/lib/i18n"
import { REPO_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

const COPY = {
  en: {
    eyebrow: "Releases",
    title: "Changelog",
    lead: "What changed in each version of Mintel UI. Tokens, the React registry and the Salesforce components share one version number.",
    packages: { registry: "React registry & docs", tokens: "Tokens", salesforce: "Salesforce" } satisfies Record<PackageKey, string>,
    kinds: { breaking: "Breaking", major: "Major", minor: "New", patch: "Fix" } satisfies Record<ChangeKind, string>,
    how: "How releases work",
    howBody: "Each pull request adds a changeset. A release applies them, bumps the version and writes these notes.",
    latest: "Latest",
    notesLang: "",
  },
  th: {
    eyebrow: "เวอร์ชัน",
    title: "บันทึกการเปลี่ยนแปลง",
    lead: "แต่ละเวอร์ชันของ Mintel UI เปลี่ยนอะไรบ้าง ทั้ง tokens, React registry และ component ฝั่ง Salesforce ใช้เลขเวอร์ชันเดียวกัน",
    packages: { registry: "React registry และ docs", tokens: "Tokens", salesforce: "Salesforce" } satisfies Record<PackageKey, string>,
    kinds: { breaking: "เปลี่ยนแบบไม่เข้ากับของเดิม", major: "Major", minor: "ใหม่", patch: "แก้ไข" } satisfies Record<ChangeKind, string>,
    how: "ออกเวอร์ชันยังไง",
    howBody: "ทุก pull request แนบ changeset ไว้ ตอนออกเวอร์ชันจะรวม changeset ทั้งหมด ขยับเลขเวอร์ชัน แล้วเขียนบันทึกนี้ให้อัตโนมัติ",
    latest: "ล่าสุด",
    notesLang: "บันทึกแต่ละรายการเขียนเป็นภาษาอังกฤษ ตรงกับ CHANGELOG.md และ release notes บน GitHub",
  },
}

const PACKAGE_ICON: Record<PackageKey, typeof Palette> = { tokens: Palette, registry: Component, salesforce: Cloud }
const KIND_STYLE: Record<ChangeKind, string> = {
  breaking: "bg-destructive/12 text-destructive",
  major: "bg-destructive/12 text-destructive",
  minor: "bg-brand/12 text-brand",
  patch: "bg-success/12 text-success",
}
const KIND_ORDER: ChangeKind[] = ["breaking", "major", "minor", "patch"]

/** Inline markdown used in the notes: `code`, **bold** and (#12) pull request links. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|#\d{1,4}(?=[),]))/g)
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("`")) return <code key={i} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]">{p.slice(1, -1)}</code>
        if (p.startsWith("**")) return <strong key={i} className="font-semibold text-foreground">{p.slice(2, -2)}</strong>
        if (/^#\d{1,4}$/.test(p))
          return (
            <a key={i} href={`${REPO_URL}/pull/${p.slice(1)}`} className="font-medium text-brand underline-offset-2 hover:underline">
              {p}
            </a>
          )
        return p
      })}
    </>
  )
}

export function ChangelogPage({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const releases = readReleases()
  return (
    <DocsShell lang={lang} current="changelog">
      <article className="max-w-3xl">
        <p className="text-sm font-semibold tracking-wide text-brand uppercase">{t.eyebrow}</p>
        <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">{t.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t.lead}</p>
        {t.notesLang && <p className="mt-2 text-sm text-muted-foreground">{t.notesLang}</p>}

        <ol className="mt-12 space-y-14">
          {releases.map((r, ri) => (
            <li key={r.version} id={`v${r.version}`} className="scroll-mt-24 sm:grid sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8">
              <div className="mb-4 sm:sticky sm:top-24 sm:mb-0 sm:self-start">
                <a href={`#v${r.version}`} className="inline-flex items-center gap-1.5 font-heading text-2xl font-bold tabular-nums hover:text-brand">
                  <Tag className="size-4 text-muted-foreground" />
                  {r.version}
                </a>
                {r.date && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    <time dateTime={r.date}>
                      {new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-GB", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${r.date}T00:00:00Z`))}
                    </time>
                  </p>
                )}
                {ri === 0 && <span className="mt-2 inline-block rounded-full bg-[image:var(--brand-gradient)] px-2.5 py-0.5 text-xs font-semibold text-white">{t.latest}</span>}
              </div>
              <div className="space-y-6">
                {r.packages.map((p) => {
                  const Icon = PACKAGE_ICON[p.key]
                  return (
                    <section key={p.key} className="rounded-2xl border bg-card p-5">
                      <h2 className="flex items-center gap-2 font-heading font-semibold">
                        <span className="inline-flex size-7 items-center justify-center rounded-lg bg-brand/10 text-brand">
                          <Icon className="size-4" />
                        </span>
                        {t.packages[p.key]}
                      </h2>
                      <ul className="mt-4 space-y-3 text-sm">
                        {[...p.groups]
                          .sort((a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind))
                          .flatMap((g) =>
                            g.items.map((item) => (
                              <li key={item} className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-3">
                                <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap", KIND_STYLE[g.kind])}>{t.kinds[g.kind]}</span>
                                <span className="text-muted-foreground">
                                  <Inline text={item} />
                                </span>
                              </li>
                            ))
                          )}
                      </ul>
                    </section>
                  )
                })}
              </div>
            </li>
          ))}
        </ol>

        <aside className="mt-16 flex gap-3 rounded-2xl border bg-muted/30 p-5 text-sm">
          <GitPullRequest className="mt-0.5 size-5 shrink-0 text-brand" />
          <div>
            <p className="font-semibold">{t.how}</p>
            <p className="mt-1 text-muted-foreground">{t.howBody}</p>
          </div>
        </aside>
      </article>
    </DocsShell>
  )
}
