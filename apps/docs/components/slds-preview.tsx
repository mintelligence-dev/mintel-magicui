"use client"

import { useState } from "react"

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

// Same record page with Mintel LWC placed on it. Markup mirrors the LWC templates in packages/salesforce;
// their real stylesheets are injected (scoped) via `componentCss`.
const BRAND_MARKUP = `
<div class="slds-p-around_medium" style="background:#f3f3f3;min-height:100vh">
  <div class="slds-page-header slds-page-header_record-home">
    <div class="slds-page-header__row">
      <div class="slds-page-header__col-title">
        <div class="slds-media">
          <div class="slds-media__figure">
            <span class="slds-avatar slds-avatar_medium" style="background:var(--mintel-brand-gradient)">
              <abbr class="slds-avatar__initials" title="Acme Retail" style="background:transparent">AR</abbr>
            </span>
          </div>
          <div class="slds-media__body">
            <span class="slds-text-body_small slds-text-color_weak">Account</span>
            <div class="c-mintelGradientText"><span class="gradient" data-size="medium">Acme Retail Co., Ltd.</span></div>
          </div>
        </div>
      </div>
      <div class="slds-page-header__col-actions" style="align-self:center">
        <div class="slds-grid slds-grid_vertical-align-center" style="gap:.5rem">
          <button class="slds-button slds-button_neutral">Follow</button>
          <div class="c-mintelShimmerButton"><button class="shimmer" type="button"><span class="spark" aria-hidden="true"></span><span class="label">New Case</span></button></div>
        </div>
      </div>
    </div>
  </div>

  <div class="c-mintelPath slds-m-top_medium"><div class="path"><ol class="track" aria-label="Progress">
    <li class="item"><button type="button" class="stage complete first"><svg class="check" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg><span class="label">New</span></button></li>
    <li class="item"><button type="button" class="stage current" aria-current="step"><span class="label">Working</span></button></li>
    <li class="item"><button type="button" class="stage upcoming"><span class="label">Escalated</span></button></li>
    <li class="item"><button type="button" class="stage upcoming last"><span class="label">Closed</span></button></li>
  </ol></div></div>

  <div class="slds-grid slds-wrap slds-gutters_x-small slds-m-top_medium">
    <div class="slds-col slds-size_1-of-1 slds-medium-size_1-of-3 slds-m-bottom_x-small"><div class="c-mintelStatCard"><div class="stat"><p class="label">Open cases</p><p class="value"><span class="number" data-count="37">37</span><span class="suffix">cases</span></p><p class="caption">3 due today</p></div></div></div>
    <div class="slds-col slds-size_1-of-1 slds-medium-size_1-of-3 slds-m-bottom_x-small"><div class="c-mintelStatCard"><div class="stat"><p class="label">Messages today</p><p class="value"><span class="number" data-count="1284">1,284</span></p><p class="caption">LINE · Facebook · TikTok</p></div></div></div>
    <div class="slds-col slds-size_1-of-1 slds-medium-size_1-of-3 slds-m-bottom_x-small"><div class="c-mintelStatCard"><div class="stat"><p class="label">Customer satisfaction</p><p class="value"><span class="number" data-count="96">96</span><span class="suffix">%</span></p><p class="caption">+4% this month</p></div></div></div>
  </div>

  <div class="slds-grid slds-wrap slds-gutters_x-small slds-m-top_medium">
    <div class="slds-col slds-size_1-of-1 slds-medium-size_2-of-3 slds-m-bottom_x-small">
      <article class="slds-card" style="margin:0">
        <div class="slds-card__header slds-grid">
          <header class="slds-media slds-media_center slds-has-flexi-truncate">
            <div class="slds-media__body"><h2 class="slds-card__header-title"><a href="#" class="slds-card__header-link">Open Cases (3)</a></h2></div>
            <div class="slds-no-flex"><button class="slds-button slds-button_brand">Assign</button></div>
          </header>
        </div>
        <div class="slds-card__body slds-card__body_inner">
          <div class="slds-form-element">
            <label class="slds-form-element__label" for="subject2">Subject</label>
            <div class="slds-form-element__control"><input type="text" id="subject2" class="slds-input" value="LINE OA message not syncing" /></div>
          </div>
          <div class="slds-grid slds-gutters slds-m-top_small">
            <div class="slds-col"><span class="slds-form-element__label">Status</span><div><span class="c-mintelStatusBadge"><span class="badge brand soft"><span class="dot" aria-hidden="true"></span><span class="text">Working</span></span></span> <span class="c-mintelStatusBadge"><span class="badge destructive soft"><span class="dot" aria-hidden="true"></span><span class="text">High priority</span></span></span></div></div>
            <div class="slds-col">
              <label class="slds-checkbox_toggle slds-grid">
                <span class="slds-form-element__label slds-m-bottom_none">Notify customer</span>
                <input type="checkbox" checked name="notify2" />
                <span class="slds-checkbox_faux_container"><span class="slds-checkbox_faux"></span></span>
              </label>
            </div>
          </div>
          <div class="slds-m-top_small">
            <span class="slds-form-element__label">SLA progress</span>
            <div class="slds-progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="65"><span class="slds-progress-bar__value" style="width:65%"></span></div>
          </div>
        </div>
        <footer class="slds-card__footer"><a class="slds-card__footer-action" href="#">View all cases</a></footer>
      </article>
    </div>
    <div class="slds-col slds-size_1-of-1 slds-medium-size_1-of-3">
      <div style="height:100%;padding:1rem;border-radius:18px;background:radial-gradient(120% 120% at 15% 10%,var(--mintel-brand-cyan),transparent 55%),radial-gradient(120% 120% at 90% 90%,var(--mintel-brand-accent),transparent 55%),var(--mintel-brand)">
        <div class="c-mintelGlassCard"><article class="glass" data-variant="default">
          <header class="header"><h2 class="title">AI case summary</h2><p class="subtitle">Agentforce · 2 min ago</p></header>
          <div class="body" style="font-size:.875rem;line-height:1.5">
            Customer reports LINE OA messages are not reaching Salesforce since this morning.
            Suggested next step: re-authorize the LINE channel token.
            <div style="margin-top:.75rem"><span class="slds-badge" style="background:rgba(255,255,255,.7)">Sentiment: neutral</span></div>
          </div>
        </article></div>
      </div>
    </div>
  </div>
</div>
<script>
  // Count-up like mintelStatCard (skipped for reduced motion).
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var to = +el.dataset.count, t0 = performance.now(), fmt = new Intl.NumberFormat('en-US');
      (function step(now) { var t = Math.min(1, (now - t0) / 1200), e = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt.format(Math.round(to * e)); if (t < 1) requestAnimationFrame(step); })(t0);
    });
  }
</script>`

// The brand stylesheet is inlined (not fetched) so the preview also works on deployments behind login.
function srcDoc(brand: { css: string; componentCss: string } | null) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="${SLDS_CSS}">
${brand ? `<style>${brand.css}\n${brand.componentCss}</style>` : ""}
<style>body{margin:0}a{cursor:default}@media (max-width:640px){.slds-page-header__row{flex-wrap:wrap!important;gap:.75rem}.slds-page-header__col-title{flex:1 1 100%!important;min-width:0}.slds-page-header__col-actions{flex:1 1 100%!important}.c-mintelGradientText .gradient[data-size]{font-size:1.5rem}}</style></head>
<body>${brand ? BRAND_MARKUP : MARKUP}<script>document.addEventListener('click',function(e){e.preventDefault()})</script></body></html>`
}

/** Renders real SLDS markup/CSS in a sandboxed iframe, with and without the Mintel styling hooks. */
export function SldsPreview({
  labels,
  brandCss,
  componentCss,
}: {
  labels: { default: string; brand: string; caption: string; frame: string; changes: string }
  /** Contents of mintel-global.css (read at build time). */
  brandCss: string
  /** Scoped stylesheets of the Mintel LWC (read at build time). */
  componentCss: string
}) {
  const [mode, setMode] = useState("brand")

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
      <p className="text-sm text-muted-foreground">{labels.changes}</p>
      <div className="overflow-hidden rounded-2xl border shadow-sm">
        <iframe
          key={mode}
          title={labels.frame}
          loading="lazy"
          sandbox="allow-scripts"
          srcDoc={srcDoc(mode === "brand" ? { css: brandCss, componentCss } : null)}
          className="block h-[640px] w-full bg-[#f3f3f3]"
        />
      </div>
      <p className="text-xs text-muted-foreground">{labels.caption}</p>
    </div>
  )
}
