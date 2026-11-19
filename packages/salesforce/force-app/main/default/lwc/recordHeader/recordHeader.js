import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldDisplayValue, getFieldValue } from 'lightning/uiRecordApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

/**
 * Branded record header: object icon and label, the record's title, a status badge and up to four
 * highlight fields (label from the object, formatted value from the record). Put buttons in
 * slot="actions" when composing it in your own LWC.
 */
export default class RecordHeader extends LightningElement {
    @api recordId;
    @api objectApiName;
    /** Field used as the title, e.g. "Name" or "CaseNumber". */
    @api titleField = 'Name';
    /** Comma-separated highlight fields, e.g. "Account.Name,Priority,Origin". */
    @api fields = '';
    /** Picklist shown as a c-status-badge, e.g. "Status". */
    @api statusField;
    /** Passed to the badge, e.g. "Escalated:destructive". */
    @api statusVariants;

    record;
    objectInfo;

    get fieldList() {
        return String(this.fields || '')
            .split(',')
            .map((f) => f.trim())
            .filter(Boolean)
            .slice(0, 4);
    }

    get qualifiedFields() {
        if (!this.objectApiName) return undefined;
        return [this.titleField, ...this.fieldList].filter(Boolean).map((f) => `${this.objectApiName}.${f}`);
    }

    @wire(getRecord, { recordId: '$recordId', optionalFields: '$qualifiedFields' })
    wiredRecord({ data }) {
        if (data) this.record = data;
    }

    @wire(getObjectInfo, { objectApiName: '$objectApiName' })
    wiredInfo({ data }) {
        if (data) this.objectInfo = data;
    }

    value(field) {
        if (!this.record) return '';
        const path = `${this.objectApiName}.${field}`;
        const shown = getFieldDisplayValue(this.record, path);
        const raw = getFieldValue(this.record, path);
        return shown ?? (raw === null || raw === undefined ? '—' : String(raw));
    }

    get titleText() {
        return this.value(this.titleField) || '';
    }
    get objectLabel() {
        return this.objectInfo ? this.objectInfo.label : this.objectApiName;
    }
    get iconUrl() {
        return this.objectInfo && this.objectInfo.themeInfo ? this.objectInfo.themeInfo.iconUrl : null;
    }
    get iconStyle() {
        const color = this.objectInfo && this.objectInfo.themeInfo ? this.objectInfo.themeInfo.color : null;
        return color ? `background:#${color}` : '';
    }
    get highlights() {
        return this.fieldList.map((f) => {
            const top = f.split('.')[0];
            const info = this.objectInfo && this.objectInfo.fields[top];
            const label = info ? (f.includes('.') && info.relationshipName ? info.label.replace(/ ID$/, '') : info.label) : f;
            return { key: f, label, value: this.value(f) };
        });
    }
}
