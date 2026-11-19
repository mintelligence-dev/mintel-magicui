"use client"

import * as React from "react"
import { EraserIcon, PenLineIcon, TypeIcon, Undo2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

const LABELS = {
  en: {
    draw: "Draw",
    type: "Type",
    hint: "Sign here",
    typed: "Type your full name",
    undo: "Undo",
    clear: "Clear",
    canvas: "Signature area. Draw with a mouse, pen or finger, or switch to Type.",
    signed: "Signed",
  },
  th: {
    draw: "เขียน",
    type: "พิมพ์",
    hint: "ลงชื่อที่นี่",
    typed: "พิมพ์ชื่อ-นามสกุล",
    undo: "ย้อนกลับ",
    clear: "ล้าง",
    canvas: "พื้นที่ลงชื่อ ใช้เมาส์ ปากกา หรือนิ้วเขียน หรือเปลี่ยนเป็นแบบพิมพ์",
    signed: "ลงชื่อแล้ว",
  },
}

type Point = { x: number; y: number; p: number }

type SignaturePadProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  /** PNG data URL of the signature, or null when empty. */
  onChange?: (dataUrl: string | null) => void
  locale?: "th" | "en"
  /** Canvas height in px (the width follows the container). */
  height?: number
  /** Ink color; defaults to the foreground color. */
  color?: string
  /** Offer a typed signature for people who cannot draw (keyboard, screen readers). */
  allowTyped?: boolean
  disabled?: boolean
}

/**
 * Signature field: draw with mouse, pen or finger (pressure-aware, smoothed strokes), undo and clear,
 * or type a name instead. Reports a PNG data URL with a transparent background.
 */
function SignaturePad({ onChange, locale = "th", height = 180, color, allowTyped = true, disabled, className, ...props }: SignaturePadProps) {
  const t = LABELS[locale]
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const strokes = React.useRef<Point[][]>([])
  const drawing = React.useRef(false)
  const [mode, setMode] = React.useState<"draw" | "type">("draw")
  const [typed, setTyped] = React.useState("")
  const [count, setCount] = React.useState(0)
  const onChangeRef = React.useRef(onChange)
  onChangeRef.current = onChange
  const inputId = React.useId()

  const ink = React.useCallback(() => color ?? getComputedStyle(canvasRef.current!).color, [color])

  const redraw = React.useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    const ratio = window.devicePixelRatio || 1
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = ctx.strokeStyle = ink()
    ctx.lineCap = ctx.lineJoin = "round"
    if (mode === "type") {
      if (!typed.trim()) return
      const w = canvas.width / ratio
      // Canvas fonts cannot read CSS variables: resolve the heading font first.
      const family = getComputedStyle(canvas).getPropertyValue("--font-heading").trim() || "cursive"
      let size = 44
      ctx.font = `italic 600 ${size}px ${family}`
      while (ctx.measureText(typed).width > w - 32 && size > 16) ctx.font = `italic 600 ${(size -= 2)}px ${family}`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(typed, w / 2, height / 2)
      return
    }
    for (const s of strokes.current) {
      if (s.length === 1) {
        ctx.beginPath()
        ctx.arc(s[0].x, s[0].y, 1.4, 0, Math.PI * 2)
        ctx.fill()
        continue
      }
      // Quadratic curves through the midpoints: smooth lines without a dependency.
      for (let i = 1; i < s.length; i++) {
        const a = s[i - 1]
        const b = s[i]
        const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
        ctx.lineWidth = 1.2 + b.p * 2.4
        ctx.beginPath()
        ctx.moveTo(i === 1 ? a.x : (s[i - 2].x + a.x) / 2, i === 1 ? a.y : (s[i - 2].y + a.y) / 2)
        ctx.quadraticCurveTo(a.x, a.y, mid.x, mid.y)
        ctx.stroke()
      }
    }
  }, [height, ink, mode, typed])

  const modeRef = React.useRef(mode)
  modeRef.current = mode
  const typedRef = React.useRef(typed)
  typedRef.current = typed
  const emit = React.useCallback(() => {
    const empty = modeRef.current === "draw" ? strokes.current.length === 0 : !typedRef.current.trim()
    onChangeRef.current?.(empty ? null : canvasRef.current!.toDataURL("image/png"))
  }, [])

  // Size the backing store to the element (sharp on HiDPI) and redraw on resize.
  React.useEffect(() => {
    const canvas = canvasRef.current!
    const resize = () => {
      const ratio = window.devicePixelRatio || 1
      canvas.width = Math.round(canvas.clientWidth * ratio)
      canvas.height = Math.round(height * ratio)
      redraw()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [height, redraw])

  React.useEffect(() => {
    if (mode === "type") {
      redraw()
      emit()
    }
  }, [mode, typed, redraw, emit])

  // Back to drawing: report the drawn signature again (after the strokes are repainted).
  React.useEffect(() => {
    if (mode === "draw") emit()
  }, [mode, emit])

  const point = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const r = e.currentTarget.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top, p: e.pointerType === "pen" ? e.pressure || 0.5 : 0.5 }
  }

  const change = () => {
    setCount(strokes.current.length)
    emit()
  }

  return (
    <div data-slot="signature-pad" className={cn("grid gap-2", className)} {...props}>
      {allowTyped && (
        <div role="radiogroup" aria-label={`${t.draw} / ${t.type}`} className="inline-flex w-fit rounded-lg bg-muted p-0.5 text-xs font-medium">
          {(["draw", "type"] as const).map((m) => {
            const Icon = m === "draw" ? PenLineIcon : TypeIcon
            return (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={mode === m}
                disabled={disabled}
                onClick={() => setMode(m)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-[background-color,color,box-shadow] duration-200",
                  mode === m ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-3.5" />
                {t[m]}
              </button>
            )
          })}
        </div>
      )}

      <div className={cn("relative rounded-xl border bg-card text-foreground transition-colors focus-within:border-ring", disabled && "opacity-50")}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={count || typed.trim() ? `${t.signed}. ${t.canvas}` : t.canvas}
          style={{ height }}
          className={cn("block w-full touch-none", mode === "draw" && !disabled ? "cursor-crosshair" : "pointer-events-none")}
          onPointerDown={(e) => {
            if (disabled || mode !== "draw") return
            e.currentTarget.setPointerCapture(e.pointerId)
            drawing.current = true
            strokes.current.push([point(e)])
            redraw()
          }}
          onPointerMove={(e) => {
            if (!drawing.current) return
            strokes.current[strokes.current.length - 1].push(point(e))
            redraw()
          }}
          onPointerUp={() => {
            if (!drawing.current) return
            drawing.current = false
            change()
          }}
          onPointerCancel={() => {
            drawing.current = false
            change()
          }}
        />
        {/* Baseline and hint, under the ink. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-6 bottom-8 flex items-end gap-2 border-b border-dashed text-muted-foreground">
          <span className="pb-1 text-lg leading-none">×</span>
          <span className={cn("pb-1 text-xs transition-opacity duration-300", (mode === "draw" ? count : typed.trim()) && "opacity-0")}>{t.hint}</span>
        </div>
      </div>

      {mode === "type" ? (
        <div className="grid gap-1">
          <label htmlFor={inputId} className="text-xs text-muted-foreground">
            {t.typed}
          </label>
          <input
            id={inputId}
            value={typed}
            disabled={disabled}
            onChange={(e) => setTyped(e.target.value)}
            autoComplete="name"
            className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
          />
        </div>
      ) : (
        <div className="flex justify-end gap-1">
          <button
            type="button"
            disabled={disabled || !count}
            onClick={() => {
              strokes.current.pop()
              redraw()
              change()
            }}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <Undo2Icon className="size-3.5" />
            {t.undo}
          </button>
          <button
            type="button"
            disabled={disabled || !count}
            onClick={() => {
              strokes.current = []
              redraw()
              change()
            }}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <EraserIcon className="size-3.5" />
            {t.clear}
          </button>
        </div>
      )}
    </div>
  )
}

export { SignaturePad }
