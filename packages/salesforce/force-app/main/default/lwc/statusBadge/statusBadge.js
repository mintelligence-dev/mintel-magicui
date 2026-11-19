import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';

const VARIANTS = ['neutral', 'brand', 'info', 'success', 'warning', 'destructive'];

// Keyword guesses used when `variants` does not name the value. Matched case-insensitively.
const GUESSES = [
    ['success', /closed|resolved|won|complete|done|approved|active|paid|delivered/],
    ['destructive', /escalat|lost|reject|fail|cancel|overdue|error|blocked/],
    ['warning', /pending|waiting|hold|risk|review|draft|expir/],
    ['brand', /new|open|working|progress|assigned/]
];

/**
 * Status pill with a colored dot. On a record page it shows a field's value (picklist label);
 * otherwise set `value`. Colors come from `variants` ("Closed:success,Escalated:destructive"),
 * then keyword guesses, then neutral.
 */
export default class StatusBadge extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api fieldApiName = 'Status';
    /** Manual mode value (used when there is no record). */
    @api value;
    /** "Value:variant" pairs, comma-separated. Variants: neutral, brand, info, success, warning, destructive. */
    @api variants = '';
    /** "soft" (tinted) or "solid". */
    @api appearance = 'soft';

    recordValue;
    recordLabel;

    get qualifiedField() {
        return this.objectApiName && this.fieldApiName ? `${this.objectApiName}.${this.fieldApiName}` : undefined;
    }

    get recordFields() {
        return this.recordId && this.qualifiedField ? [this.qualifiedField] : undefined;
    }

    @wire(getRecord, { recordId: '$recordId', fields: '$recordFields' })
    wiredRecord({ data }) {
        if (!data) return;
        this.recordValue = getFieldValue(data, this.qualifiedField);
        this.recordLabel = getFieldDisplayValue(data, this.qualifiedField) || this.recordValue;
    }

    get rawValue() {
        return this.recordId ? this.recordValue : this.value;
    }

    get label() {
        return this.recordId ? this.recordLabel : this.value;
    }

    get variant() {
        const raw = this.rawValue;
        if (!raw) return 'neutral';
        const map = String(this.variants || '')
            .split(',')
            .map((pair) => pair.split(':').map((s) => s.trim()))
            .filter(([key, v]) => key && VARIANTS.includes(v));
        const explicit = map.find(([key]) => key.toLowerCase() === String(raw).toLowerCase());
        if (explicit) return explicit[1];
        const text = String(raw).toLowerCase();
        const guess = GUESSES.find(([, re]) => re.test(text));
        return guess ? guess[0] : 'neutral';
    }

    get badgeClass() {
        return `badge ${this.variant} ${this.appearance === 'solid' ? 'solid' : 'soft'}`;
    }
}
