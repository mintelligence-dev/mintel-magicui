"use client"

import { useEffect, useState } from "react"

import { SegmentedControl } from "@/registry/mintel/glass/segmented-control"

const SLDS_CSS =
  "https://cdn.jsdelivr.net/npm/@salesforce-ux/design-system@2.264.3/assets/styles/salesforce-lightning-design-system.min.css"

// Standard SLDS blueprint markup (no Salesforce icons or images). Only styling hooks change between modes.
const MARKUP = `
<div class="slds-p-around_medium" style="background:#f3f3f3;min-height:100vh">
  <div class="slds-page-header slds-page-header_record-home">
    <div class="slds-page-header__row">
      <div class="slds-page-header__col-title">
        <div class="slds-media">
          <div class="slds-media__figure">
            <span class="slds-avatar slds-avatar_medium" style="background:var(--slds-g-color-brand-base-50,#0176d3)">
              <abbr class="slds-avatar__initials" title="Acme Retail" style="background:transparent">AR</abbr>
            </span>
          </div>
          <div class="slds-media__body">
            <div class="slds-page-header__name">
              <div class="slds-page-header__name-title">
                <h1>
                  <span>Account</span>
                  <span class="slds-page-header__title slds-truncate" title="Acme Retail Co., Ltd.">Acme Retail Co., Ltd.</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="slds-page-header__col-actions">
        <div class="slds-page-header__controls">
          <div class="slds-page-header__control">
            <div class="slds-button-group" role="group">
              <button class="slds-button slds-button_neutral">Follow</button>
              <button class="slds-button slds-button_neutral">Edit</button>
              <button class="slds-button slds-button_brand">New Case</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="slds-path slds-m-top_medium">
    <div class="slds-grid slds-path__track">
      <div class="slds-grid slds-path__scroller-container">
        <div class="slds-path__scroller">
          <div class="slds-path__scroller_inner">
            <ul class="slds-path__nav" role="listbox" aria-orientation="horizontal">
              <li class="slds-path__item slds-is-complete" role="presentation"><a class="slds-path__link" role="option" tabindex="-1"><span class="slds-path__title">New</span></a></li>
              <li class="slds-path__item slds-is-current slds-is-active" role="presentation"><a class="slds-path__link" role="option" aria-selected="true" tabindex="0"><span class="slds-path__title">Working</span></a></li>
              <li class="slds-path__item slds-is-incomplete" role="presentation"><a class="slds-path__link" role="option" tabindex="-1"><span class="slds-path__title">Escalated</span></a></li>
              <li class="slds-path__item slds-is-incomplete" role="presentation"><a class="slds-path__link" role="option" tabindex="-1"><span class="slds-path__title">Closed</span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="slds-tabs_default slds-m-top_medium" style="background:#fff;border-radius:.25rem;padding:0 1rem">
    <ul class="slds-tabs_default__nav" role="tablist">
      <li class="slds-tabs_default__item slds-is-active" role="presentation"><a class="slds-tabs_default__link" role="tab" aria-selected="true" tabindex="0">Details</a></li>
      <li class="slds-tabs_default__item" role="presentation"><a class="slds-tabs_default__link" role="tab" tabindex="-1">Activity</a></li>
      <li class="slds-tabs_default__item" role="presentation"><a class="slds-tabs_default__link" role="tab" tabindex="-1">Chatter</a></li>
    </ul>
  </div>

  <article class="slds-card slds-m-top_medium">
    <div class="slds-card__header slds-grid">
      <header class="slds-media slds-media_center slds-has-flexi-truncate">
        <div class="slds-media__body"><h2 class="slds-card__header-title"><a href="#" class="slds-card__header-link">Open Cases (3)</a></h2></div>
        <div class="slds-no-flex"><button class="slds-button slds-button_brand">Assign</button></div>
      </header>
    </div>
    <div class="slds-card__body slds-card__body_inner">
      <div class="slds-form-element">
        <label class="slds-form-element__label" for="subject">Subject</label>
        <div class="slds-form-element__control"><input type="text" id="subject" class="slds-input" value="LINE OA message not syncing" /></div>
      </div>
      <div class="slds-grid slds-gutters slds-m-top_small">
        <div class="slds-col">
          <div class="slds-form-element">
            <span class="slds-form-element__label">Channel</span>
            <div class="slds-form-element__control"><span class="slds-badge">LINE</span> <span class="slds-badge slds-badge_inverse">Priority</span></div>
          </div>
        </div>
        <div class="slds-col">
          <div class="slds-form-element">
            <label class="slds-checkbox_toggle slds-grid">
              <span class="slds-form-element__label slds-m-bottom_none">Notify customer</span>
              <input type="checkbox" checked name="notify" />
              <span class="slds-checkbox_faux_container"><span class="slds-checkbox_faux"></span></span>
            </label>
          </div>
        </div>
      </div>
      <div class="slds-m-top_small">
        <span class="slds-form-element__label">SLA progress</span>
        <div class="slds-progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="65"><span class="slds-progress-bar__value" style="width:65%"></span></div>
      </div>
    </div>
    <footer class="slds-card__footer"><a class="slds-card__footer-action" href="#">View all cases</a></footer>
  </article>
</div>`

function srcDoc(withBrand: boolean, origin: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="${SLDS_CSS}">
${withBrand ? `<link rel="stylesheet" href="${origin}/salesforce/mintel-global.css">` : ""}
<style>body{margin:0}a{cursor:default}</style></head>
<body>${MARKUP}<script>document.addEventListener('click',function(e){e.preventDefault()})</script></body></html>`
}

/** Renders real SLDS markup/CSS in a sandboxed iframe, with and without the Mintel styling hooks. */
export function SldsPreview({
  labels,
}: {
  labels: { default: string; brand: string; caption: string; frame: string }
}) {
  const [mode, setMode] = useState("brand")
  const [origin, setOrigin] = useState<string | null>(null)
  useEffect(() => setOrigin(window.location.origin), [])

  return (
    <div className="space-y-3">
      <SegmentedControl
        aria-label={labels.frame}
        variant="brand"
        value={mode}
        onValueChange={setMode}
        options={[
          { value: "default", label: labels.default },
          { value: "brand", label: labels.brand },
        ]}
      />
      <div className="overflow-hidden rounded-2xl border shadow-sm">
        {origin && (
          <iframe
            key={mode}
            title={labels.frame}
            loading="lazy"
            sandbox="allow-scripts"
            srcDoc={srcDoc(mode === "brand", origin)}
            className="block h-[640px] w-full bg-[#f3f3f3]"
          />
        )}
      </div>
      <p className="text-xs text-muted-foreground">{labels.caption}</p>
    </div>
  )
}
