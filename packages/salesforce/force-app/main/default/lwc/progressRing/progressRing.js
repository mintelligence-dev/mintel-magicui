import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

const CIRCUMFERENCE = 2 * Math.PI * 42;

/**
 * Percentage ring that sweeps in when it appears. On a record page it reads a number/percent field
 * (e.g. Opportunity.Probability); otherwise set `value`. `variant`: brand (gradient) or status
 * (red below 40, amber below 70, green above).
 */
export default class ProgressRing extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api fieldApiName;
    @api value = 0;
    @api label;
    /** small | medium | large */
    @api size = 'medium';
    /** brand | status */
    @api variant = 'brand';

    recordValue;
    shown = false;

    get fields() {
        return this.recordId && this.objectApiName && this.fieldApiName ? [`${this.objectApiName}.${this.fieldApiName}`] : undefined;
    }

    @wire(getRecord, { recordId: '$recordId', optionalFields: '$fields' })
    wiredRecord({ data }) {
        if (data) this.recordValue = getFieldValue(data, `${this.objectApiName}.${this.fieldApiName}`);
    }

    renderedCallback() {
        // Start from empty, then sweep to the value on the next frame.
        if (!this.shown) {
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            requestAnimationFrame(() => {
                this.shown = true;
            });
        }
    }

    get percent() {
        const raw = Number(this.recordId && this.fieldApiName ? this.recordValue : this.value);
        return Number.isFinite(raw) ? Math.max(0, Math.min(100, Math.round(raw))) : 0;
    }
    get tone() {
        if (this.variant !== 'status') return 'brand';
        if (this.percent < 40) return 'low';
        if (this.percent < 70) return 'mid';
        return 'high';
    }
    get rootClass() {
        return `ring ${this.size} ${this.tone}`;
    }
    get dashStyle() {
        const shownPercent = this.shown ? this.percent : 0;
        return `stroke-dasharray:${CIRCUMFERENCE};stroke-dashoffset:${CIRCUMFERENCE * (1 - shownPercent / 100)}`;
    }
}
