import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue, updateRecord } from 'lightning/uiRecordApi';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';

const STRINGS = {
    th: {
        progress: 'ความคืบหน้า',
        mark: 'ตั้งเป็นขั้นปัจจุบัน',
        readOnly: 'คุณไม่มีสิทธิ์แก้ไขฟิลด์นี้',
        failed: 'บันทึกไม่สำเร็จ'
    },
    en: {
        progress: 'Progress',
        mark: 'Mark as current stage',
        readOnly: 'You do not have permission to edit this field.',
        failed: 'Could not save'
    }
};

const errorText = (error) =>
    (error && error.body && (error.body.message || (error.body.output && error.body.output.errors && error.body.output.errors[0] && error.body.output.errors[0].message))) ||
    (error && error.message) ||
    '';

/**
 * Mintel stage path. On a record page it reads a picklist field (e.g. Case.Status), shows its values as
 * stages and updates the record in two steps — select a stage, then "Mark as current stage" — like the
 * standard Path. Without a record it uses the `stages` / `current` properties and fires `stagechange`.
 */
export default class MintelPath extends LightningElement {
    /** Provided on record pages. */
    @api recordId;
    @api objectApiName;
    /** Picklist field to show, e.g. "Status" on Case or "StageName" on Opportunity. */
    @api fieldApiName = 'Status';
    /** Manual mode: comma-separated stage labels. */
    @api stages;
    /** Manual mode: current stage. */
    @api current;
    /** "th" or "en". */
    @api locale = 'th';

    recordValue;
    recordTypeId;
    defaultRecordTypeId;
    picklist;
    updateable = true;
    selected;
    manualValue;
    saving = false;
    errorMessage;

    get labels() {
        return STRINGS[this.locale] || STRINGS.th;
    }

    get isRecordMode() {
        return Boolean(this.recordId && this.objectApiName && this.fieldApiName);
    }

    get qualifiedField() {
        return this.isRecordMode ? `${this.objectApiName}.${this.fieldApiName}` : undefined;
    }

    get recordFields() {
        return this.qualifiedField ? [this.qualifiedField] : undefined;
    }

    get picklistRecordTypeId() {
        return this.qualifiedField ? this.recordTypeId || this.defaultRecordTypeId : undefined;
    }

    @wire(getRecord, { recordId: '$recordId', fields: '$recordFields' })
    wiredRecord({ data, error }) {
        if (data) {
            this.recordValue = getFieldValue(data, this.qualifiedField);
            this.recordTypeId = data.recordTypeId;
            this.errorMessage = undefined;
        } else if (error) {
            this.errorMessage = errorText(error);
        }
    }

    @wire(getObjectInfo, { objectApiName: '$objectApiName' })
    wiredObjectInfo({ data }) {
        if (data) {
            this.defaultRecordTypeId = data.defaultRecordTypeId;
            const field = data.fields && data.fields[this.fieldApiName];
            this.updateable = !field || field.updateable !== false;
        }
    }

    @wire(getPicklistValues, { recordTypeId: '$picklistRecordTypeId', fieldApiName: '$qualifiedField' })
    wiredPicklist({ data }) {
        if (data) {
            this.picklist = data.values.map((v) => ({ value: v.value, label: v.label }));
        }
    }

    get stageList() {
        if (this.isRecordMode) return this.picklist || [];
        return (this.stages || '')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
            .map((s) => ({ value: s, label: s }));
    }

    get currentValue() {
        return this.isRecordMode ? this.recordValue : this.manualValue || this.current;
    }

    get steps() {
        const list = this.stageList;
        const currentIndex = list.findIndex((s) => s.value === this.currentValue);
        return list.map((s, i) => {
            const state = currentIndex < 0 ? 'upcoming' : i < currentIndex ? 'complete' : i === currentIndex ? 'current' : 'upcoming';
            const classes = ['stage', state];
            if (i === 0) classes.push('first');
            if (i === list.length - 1) classes.push('last');
            if (this.selected === s.value && state !== 'current') classes.push('selected');
            return {
                ...s,
                complete: state === 'complete',
                ariaCurrent: state === 'current' ? 'step' : undefined,
                className: classes.join(' ')
            };
        });
    }

    get showMark() {
        return Boolean(this.selected) && this.selected !== this.currentValue;
    }

    get markDisabled() {
        return this.saving || (this.isRecordMode && !this.updateable);
    }

    handleSelect(event) {
        this.selected = event.currentTarget.dataset.value;
        this.errorMessage = this.isRecordMode && !this.updateable ? this.labels.readOnly : undefined;
    }

    async handleMark() {
        const value = this.selected;
        if (!value) return;
        if (!this.isRecordMode) {
            this.manualValue = value;
            this.selected = undefined;
            this.dispatchEvent(new CustomEvent('stagechange', { detail: { value } }));
            return;
        }
        this.saving = true;
        try {
            await updateRecord({ fields: { Id: this.recordId, [this.fieldApiName]: value } });
            this.recordValue = value;
            this.selected = undefined;
            this.errorMessage = undefined;
            this.dispatchEvent(new CustomEvent('stagechange', { detail: { value } }));
        } catch (error) {
            this.errorMessage = `${this.labels.failed}: ${errorText(error)}`;
        } finally {
            this.saving = false;
        }
    }
}
