import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

const STRINGS = {
    th: { label: 'SLA', onTrack: 'ตามเวลา', atRisk: 'ใกล้ครบ', overdue: 'เกินเวลา', met: 'เสร็จแล้ว', none: 'ไม่มีกำหนด', due: 'กำหนด', late: 'เกินมา' },
    en: { label: 'SLA', onTrack: 'On track', atRisk: 'At risk', overdue: 'Overdue', met: 'Completed', none: 'No deadline', due: 'Due', late: 'Late by' }
};
const pad = (n) => String(n).padStart(2, '0');

/**
 * Countdown to a deadline (e.g. a Case SLA). Green while on track, amber inside `warning-minutes`,
 * red once overdue (then counts up). On a record page it reads DateTime fields; otherwise set
 * `deadline` (and optionally `start` for the progress bar). A true `completed-field` stops the clock.
 */
export default class SlaTimer extends LightningElement {
    @api recordId;
    @api objectApiName;
    /** DateTime field with the deadline, e.g. "Resolution_Due__c". (Case.SlaExitDate is not one: it is when the case left the entitlement process.) */
    @api deadlineField;
    /** Optional DateTime field the SLA started from, for the bar (e.g. "CreatedDate"). */
    @api startField;
    /** Optional Boolean field that means "done", e.g. "IsClosed". */
    @api completedField;
    @api deadline;
    @api start;
    @api completed = false;
    @api warningMinutes = 30;
    @api locale = 'th';

    now = Date.now();
    record;
    timer;

    get fields() {
        if (!this.recordId || !this.objectApiName || !this.deadlineField) return undefined;
        return [this.deadlineField, this.startField, this.completedField]
            .filter(Boolean)
            .map((f) => `${this.objectApiName}.${f}`);
    }

    @wire(getRecord, { recordId: '$recordId', optionalFields: '$fields' })
    wiredRecord({ data }) {
        if (data) this.record = data;
    }

    connectedCallback() {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.timer = setInterval(() => {
            this.now = Date.now();
        }, 1000);
    }

    disconnectedCallback() {
        clearInterval(this.timer);
    }

    field(name) {
        return this.record && name ? getFieldValue(this.record, `${this.objectApiName}.${name}`) : undefined;
    }

    get t() {
        return STRINGS[this.locale === 'en' ? 'en' : 'th'];
    }
    get deadlineMs() {
        const v = this.recordId ? this.field(this.deadlineField) : this.deadline;
        const ms = v ? new Date(v).getTime() : NaN;
        return Number.isNaN(ms) ? null : ms;
    }
    get startMs() {
        const v = this.recordId ? this.field(this.startField) : this.start;
        const ms = v ? new Date(v).getTime() : NaN;
        return Number.isNaN(ms) ? null : ms;
    }
    get isCompleted() {
        return this.recordId ? Boolean(this.field(this.completedField)) : Boolean(this.completed);
    }
    get remaining() {
        return this.deadlineMs === null ? null : this.deadlineMs - this.now;
    }
    get state() {
        if (this.isCompleted) return 'met';
        if (this.remaining === null) return 'none';
        if (this.remaining < 0) return 'overdue';
        if (this.remaining <= this.warningMinutes * 60000) return 'at-risk';
        return 'on-track';
    }
    get rootClass() {
        return `sla ${this.state}`;
    }
    get stateText() {
        return { met: this.t.met, none: this.t.none, overdue: this.t.overdue, 'at-risk': this.t.atRisk, 'on-track': this.t.onTrack }[this.state];
    }
    get clockText() {
        if (this.remaining === null || this.isCompleted) return '--:--:--';
        const total = Math.floor(Math.abs(this.remaining) / 1000);
        const days = Math.floor(total / 86400);
        const hms = `${pad(Math.floor((total % 86400) / 3600))}:${pad(Math.floor((total % 3600) / 60))}:${pad(total % 60)}`;
        const text = days ? `${days}d ${hms}` : hms;
        return this.remaining < 0 ? `+${text}` : text;
    }
    get showBar() {
        return this.startMs !== null && this.deadlineMs !== null && !this.isCompleted;
    }
    get elapsedPercent() {
        const span = this.deadlineMs - this.startMs;
        if (!span || span < 0) return 100;
        return Math.max(0, Math.min(100, Math.round(((this.now - this.startMs) / span) * 100)));
    }
    get fillStyle() {
        return `width:${this.elapsedPercent}%`;
    }
    get deadlineText() {
        if (this.deadlineMs === null) return null;
        const when = new Date(this.deadlineMs).toLocaleString(this.locale === 'en' ? 'en-GB' : 'th-TH', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
        return `${this.t.due} ${when}`;
    }
    @api
    get label() {
        return this._label || this.t.label;
    }
    set label(v) {
        this._label = v;
    }
}
