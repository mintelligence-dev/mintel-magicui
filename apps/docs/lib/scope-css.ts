/**
 * Scopes an LWC component stylesheet for use outside Salesforce (e.g. the docs' SLDS preview):
 * `:host` becomes the given class, every other selector is prefixed with it, @import lines are dropped
 * and @keyframes are left untouched. Handles nested @media / @supports blocks.
 */
export function scopeLwcCss(css: string, scope: string): string {
  const src = css.replace(/@import[^;]+;/g, "").replace(/\/\*[\s\S]*?\*\//g, "")
  return walk(src, scope)
}

function walk(css: string, scope: string): string {
  let out = ""
  let i = 0
  while (i < css.length) {
    const open = css.indexOf("{", i)
    if (open === -1) break
    const head = css.slice(i, open).trim()
    // find the matching closing brace
    let depth = 1
    let j = open + 1
    while (j < css.length && depth > 0) {
      if (css[j] === "{") depth++
      else if (css[j] === "}") depth--
      j++
    }
    const body = css.slice(open + 1, j - 1)
    if (head.startsWith("@keyframes")) {
      out += `${head}{${body}}\n`
    } else if (head.startsWith("@")) {
      out += `${head}{${walk(body, scope)}}\n`
    } else {
      const selectors = head
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) =>
          s.startsWith(":host")
            ? s.replace(/^:host\(([^)]*)\)/, `${scope}$1`).replace(/^:host/, scope)
            : `${scope} ${s}`
        )
      out += `${selectors.join(", ")}{${body}}\n`
    }
    i = j
  }
  return out
}
