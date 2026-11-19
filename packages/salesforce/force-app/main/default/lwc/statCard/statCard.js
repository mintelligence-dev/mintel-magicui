import { LightningElement, api } from 'lwc';

const DURATION_MS = 1200;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/**
 * KPI card whose number counts up when it first renders.
 * Shows the final value immediately when the user prefers reduced motion.
 */
export default class StatCard extends LightningElement {
    @api label = 'Cases today';
    @api suffix;
    @api caption;
    /** BCP 47 locale for number formatting. */
    @api locale = 'th-TH';

    _value = 0;
    current = 0;
    frame;
    connected = false;

    @api
    get value() {
        return this._value;
    }
    set value(v) {
        this._value = Number(v) || 0;
        if (this.connected) this.animate();
    }

    get displayValue() {
        return new Intl.NumberFormat(this.locale).format(Math.round(this.current));
    }

    connectedCallback() {
        this.connected = true;
        this.animate();
    }

    disconnectedCallback() {
        this.connected = false;
        cancelAnimationFrame(this.frame);
    }

    animate() {
        cancelAnimationFrame(this.frame);
        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const from = this.current;
        const to = this._value;
        if (reduce || from === to) {
            this.current = to;
            return;
        }
        const start = performance.now();
        const step = (now) => {
            const t = Math.min(1, (now - start) / DURATION_MS);
            this.current = from + (to - from) * easeOutCubic(t);
            if (t < 1) this.frame = requestAnimationFrame(step);
        };
        this.frame = requestAnimationFrame(step);
    }
}
