"use client"

import * as React from "react"
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type UploadFile = { file: File; id: string; progress?: number; error?: string }

const LABELS = {
  en: {
    drop: "Drop files here or",
    browse: "browse",
    hint: (accept?: string, max?: string) => [accept && `Accepted: ${accept}`, max && `up to ${max}`].filter(Boolean).join(" · "),
    remove: "Remove",
    tooBig: (max: string) => `Larger than ${max}`,
    wrongType: "File type not allowed",
  },
  th: {
    drop: "ลากไฟล์มาวางที่นี่ หรือ",
    browse: "เลือกไฟล์",
    hint: (accept?: string, max?: string) => [accept && `รองรับ: ${accept}`, max && `ไม่เกิน ${max}`].filter(Boolean).join(" · "),
    remove: "ลบ",
    tooBig: (max: string) => `ใหญ่เกิน ${max}`,
    wrongType: "ไม่รองรับไฟล์ประเภทนี้",
  },
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  const units = ["KB", "MB", "GB"]
  let value = bytes / 1024
  let i = 0
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024
    i++
  }
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[i]}`
}

function matchesAccept(file: File, accept?: string) {
  if (!accept) return true
  return accept.split(",").some((rule) => {
    const r = rule.trim().toLowerCase()
    if (r.startsWith(".")) return file.name.toLowerCase().endsWith(r)
    if (r.endsWith("/*")) return file.type.startsWith(r.slice(0, -1))
    return file.type === r
  })
}

/**
 * Drag-and-drop file picker with a file list. Controlled: you own `files` and `onFilesChange`;
 * set `progress` (0–100) on an entry while you upload it. Invalid files are kept with an `error`.
 */
function FileUpload({
  files,
  onFilesChange,
  accept,
  maxSize,
  multiple = true,
  disabled = false,
  locale = "th",
  className,
}: {
  files: UploadFile[]
  onFilesChange: (files: UploadFile[]) => void
  /** Same syntax as <input accept>: ".pdf,image/*". */
  accept?: string
  /** Bytes. */
  maxSize?: number
  multiple?: boolean
  disabled?: boolean
  locale?: "th" | "en"
  className?: string
}) {
  const t = LABELS[locale]
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)
  const maxLabel = maxSize ? formatBytes(maxSize) : undefined

  const add = (list: FileList | null) => {
    if (!list?.length) return
    const incoming = Array.from(list).map<UploadFile>((file) => ({
      file,
      id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
      error: !matchesAccept(file, accept) ? t.wrongType : maxSize && file.size > maxSize ? t.tooBig(maxLabel!) : undefined,
    }))
    onFilesChange(multiple ? [...files, ...incoming] : incoming.slice(0, 1))
  }

  return (
    <div data-slot="file-upload" className={cn("grid gap-3", className)}>
      <label
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          if (!disabled) add(e.dataTransfer.files)
        }}
        data-dragging={dragging || undefined}
        className={cn(
          "group/upload relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-[border-color,background-color,scale] duration-300 ease-spring-snappy",
          "hover:border-brand/50 hover:bg-brand/4 has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-ring/50",
          "data-[dragging]:scale-[1.01] data-[dragging]:border-brand data-[dragging]:bg-brand/8 motion-reduce:data-[dragging]:scale-100",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand transition-transform duration-500 ease-spring-bouncy group-data-[dragging]/upload:-translate-y-1 motion-reduce:transition-none">
          <UploadCloudIcon className="size-6" />
        </span>
        <span className="text-sm">
          {t.drop} <span className="font-semibold text-brand underline-offset-4 group-hover/upload:underline">{t.browse}</span>
        </span>
        {(accept || maxLabel) && <span className="text-xs text-muted-foreground">{t.hint(accept, maxLabel)}</span>}
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => {
            add(e.target.files)
            e.target.value = ""
          }}
        />
      </label>

      {files.length > 0 && (
        <ul className="grid gap-2">
          {files.map((f) => (
            <li
              key={f.id}
              className={cn(
                "flex items-center gap-3 rounded-lg border bg-card px-3 py-2 text-sm animate-in fade-in-0 slide-in-from-top-1 duration-300",
                f.error && "border-destructive/40 bg-destructive/5"
              )}
            >
              <FileIcon className={cn("size-5 shrink-0", f.error ? "text-destructive" : "text-brand")} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate font-medium">{f.file.name}</p>
                  <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{formatBytes(f.file.size)}</span>
                </div>
                {f.error ? (
                  <p className="text-xs text-destructive">{f.error}</p>
                ) : (
                  f.progress !== undefined && (
                    <div
                      className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"
                      role="progressbar"
                      aria-valuenow={Math.round(f.progress)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={f.file.name}
                    >
                      <div
                        className="h-full rounded-full bg-[image:var(--brand-gradient)] transition-[width] duration-300 ease-out"
                        style={{ width: `${Math.min(100, Math.max(0, f.progress))}%` }}
                      />
                    </div>
                  )
                )}
              </div>
              <button
                type="button"
                className="relative flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors after:absolute after:-inset-2 hover:bg-muted hover:text-foreground pointer-fine:after:hidden"
                onClick={() => onFilesChange(files.filter((x) => x.id !== f.id))}
                aria-label={`${t.remove} ${f.file.name}`}
              >
                <XIcon className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { FileUpload, formatBytes, type UploadFile }
