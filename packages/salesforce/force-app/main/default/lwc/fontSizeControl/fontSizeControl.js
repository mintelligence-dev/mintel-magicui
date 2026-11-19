import { LightningElement, api } from 'lwc';

const STEPS = [87.5, 100, 112.5, 125];
const DEFAULT_INDEX = 1;
const STORAGE_KEY = 'mintel-font-scale';
const STRINGS = {
    th: { group: 'ขนาดตัวอักษร', smaller: 'ลดขนาดตัวอักษร', reset: 'ขนาดตัวอักษรปกติ', larger: 'เพิ่มขนาดตัวอักษร', glyph: 'ก' },
    en: { group: 'Text size', smaller: 'Decrease text size', reset: 'Default text size', larger: 'Increase text size', glyph: 'A' }
};

/**
 * Text-size control (ก- ก ก+) for Experience Cloud sites. Scales the page's root font size and remembers
 * the choice. Always fires a `fontscalechange` event (detail: { percent }) so a parent can apply the scale
 * itself when `applyToPage` is false. Not meant for Lightning Experience, whose global font size
 * should not be changed.
 */
export default class FontSizeControl extends LightningElement {
    /** "th" or "en". */
    @api locale = 'th';
    /** Scale the whole page (Experience Cloud). Set false to only fire the event. */
    @api applyToPage = false;

    index = DEFAULT_INDEX;

    get labels() {
        return STRINGS[this.locale] || STRINGS.th;
    }
    get atMin() {
        return this.index === 0;
    }
    get atMax() {
        return this.index === STEPS.length - 1;
    }
    get isDefault() {
        return this.index === DEFAULT_INDEX ? 'true' : 'false';
    }
    // The button matching the current size is highlighted: smaller, default or larger.
    get smallerClass() {
        return this.index < DEFAULT_INDEX ? 'step small active' : 'step small';
    }
    get resetClass() {
        return this.index === DEFAULT_INDEX ? 'step base active' : 'step base';
    }
    get largerClass() {
        return this.index > DEFAULT_INDEX ? 'step large active' : 'step large';
    }
    get currentLabel() {
        return `${this.labels.group} ${STEPS[this.index]}%`;
    }

    connectedCallback() {
        try {
            const saved = Number(window.localStorage.getItem(STORAGE_KEY));
            const i = STEPS.indexOf(saved);
            if (i >= 0) this.apply(i);
        } catch (e) {
            // storage unavailable: keep the default size
        }
    }

    handleSmaller() {
        this.apply(this.index - 1);
    }
    handleReset() {
        this.apply(DEFAULT_INDEX);
    }
    handleLarger() {
        this.apply(this.index + 1);
    }

    apply(i) {
        this.index = Math.min(STEPS.length - 1, Math.max(0, i));
        const percent = STEPS[this.index];
        if (this.applyToPage) {
            document.documentElement.style.fontSize = this.index === DEFAULT_INDEX ? '' : `${percent}%`;
        }
        try {
            if (this.index === DEFAULT_INDEX) window.localStorage.removeItem(STORAGE_KEY);
            else window.localStorage.setItem(STORAGE_KEY, String(percent));
        } catch (e) {
            // storage unavailable: the size still applies for this page view
        }
        this.dispatchEvent(new CustomEvent('fontscalechange', { detail: { percent } }));
    }
}
