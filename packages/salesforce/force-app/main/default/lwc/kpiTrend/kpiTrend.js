import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

/**
 * KPI card with a sparkline. The value is a number field of the record (e.g. Account.AnnualRevenue) or a
 * fixed value; the trend is a comma list ("12,15,14,18,22") from App Builder or an array from a parent LWC.
 * The change badge compares the last two points. No Apex.
 */
export default class KpiTrend extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api fieldApiName;
    @api label = 'KPI';
    @api value;
    @api suffix;
    @api caption;
    /** "up" (default) means higher is good; "down" means lower is good (e.g. response time). */
    @api goodDirection = 'up';
    @api locale = 'th';

    @api
    get trend() {
        return this._trend;
    }
    set trend(v) {
        this._trend = v;
    }

    _trend = '';
    recordValue;

    get fields() {
        return this.recordId && this.objectApiName && this.fieldApiName ? [`${this.objectApiName}.${this.fieldApiName}`] : undefined;
    }

    @wire(getRecord, { recordId: '$recordId', optionalFields: '$fields' })
    wired({ data }) {
        if (data) this.recordValue = getFieldValue(data, `${this.objectApiName}.${this.fieldApiName}`);
    }

    get points() {
        const raw = Array.isArray(this._trend) ? this._trend : String(this._trend || '').split(',');
        return raw.map((n) => Number(String(n).trim())).filter((n) => Number.isFinite(n));
    }
    get hasTrend() {
        return this.points.length > 1;
    }
    get current() {
        if (this.recordId && this.fieldApiName) return this.recordValue;
        if (this.value !== undefined && this.value !== null && this.value !== '') return Number(this.value);
        return this.points.length ? this.points[this.points.length - 1] : undefined;
    }
    get displayValue() {
        const v = this.current;
        return v === undefined || v === null || Number.isNaN(v) ? '—' : Number(v).toLocaleString(this.locale === 'en' ? 'en-US' : 'th-TH');
    }
    get delta() {
        const p = this.points;
        if (p.length < 2 || p[p.length - 2] === 0) return null;
        return ((p[p.length - 1] - p[p.length - 2]) / Math.abs(p[p.length - 2])) * 100;
    }
    get deltaText() {
        const d = this.delta;
        if (d === null) return '';
        return `${d >= 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(1)}%`;
    }
    get deltaClass() {
        const d = this.delta;
        const good = this.goodDirection === 'down' ? d <= 0 : d >= 0;
        return `delta ${good ? 'good' : 'bad'}`;
    }
    get coords() {
        const p = this.points;
        const min = Math.min(...p);
        const max = Math.max(...p);
        const span = max - min || 1;
        return p.map((v, i) => [(i / (p.length - 1)) * 100, 28 - ((v - min) / span) * 24]);
    }
    get linePath() {
        return this.coords.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
    }
    get areaPath() {
        return `${this.linePath} L100,32 L0,32 Z`;
    }
    get lastX() {
        return this.coords.length ? this.coords[this.coords.length - 1][0] : 0;
    }
    get lastY() {
        return this.coords.length ? this.coords[this.coords.length - 1][1] : 0;
    }
    get trendLabel() {
        return `${this.label}: ${this.points.join(', ')}`;
    }
}
