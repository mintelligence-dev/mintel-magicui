import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { updateRecord } from 'lightning/uiRecordApi';

const STRINGS = {
    th: { moveTo: 'ย้ายไป', moved: (t, c) => `ย้าย ${t} ไป ${c} แล้ว`, failed: 'ย้ายไม่สำเร็จ', loadFailed: 'โหลดข้อมูลไม่สำเร็จ', saving: 'กำลังบันทึก…' },
    en: { moveTo: 'Move to', moved: (t, c) => `Moved ${t} to ${c}`, failed: 'Could not move', loadFailed: 'Could not load records', saving: 'Saving…' }
};

/**
 * Board of a record's related records grouped by a picklist (e.g. an Account's Opportunities by Stage or
 * Cases by Status). Drag a card to another column, or use its "Move to" menu (keyboard and the mobile
 * app). The change is shown at once and reverted with the error if Salesforce rejects it (validation
 * rules, permissions). UI API only, no Apex.
 */
export default class MintelKanban extends NavigationMixin(LightningElement) {
    @api recordId;
    @api relatedListId = 'Opportunities';
    @api childObjectApiName = 'Opportunity';
    /** Picklist the columns come from. */
    @api groupField = 'StageName';
    @api titleField = 'Name';
    /** Optional second line, e.g. "Amount". */
    @api subtitleField = 'Amount';
    /** Comma-separated picklist values to leave out, e.g. "Closed Lost". */
    @api hideValues = '';
    @api pageSize = 50;
    @api label;
    @api locale = 'th';

    records = [];
    picklist = [];
    recordTypeId;
    childInfo;
    draggingId;
    overColumn;
    statusText;
    errorText;

    get t() {
        return STRINGS[this.locale === 'en' ? 'en' : 'th'];
    }
    q(field) {
        return `${this.childObjectApiName}.${field}`;
    }
    get qualifiedFields() {
        return [this.titleField, this.groupField, this.subtitleField].filter(Boolean).map((f) => this.q(f));
    }
    get picklistField() {
        return this.q(this.groupField);
    }

    @wire(getObjectInfo, { objectApiName: '$childObjectApiName' })
    wiredInfo({ data }) {
        if (data) {
            this.childInfo = data;
            this.recordTypeId = data.defaultRecordTypeId;
        }
    }

    @wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: '$picklistField' })
    wiredPicklist({ data }) {
        if (data) this.picklist = data.values.map((v) => ({ value: v.value, label: v.label }));
    }

    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: '$relatedListId',
        fields: '$qualifiedFields',
        pageSize: '$pageSize'
    })
    wiredRecords({ data, error }) {
        if (data) {
            this.records = (data.records || []).map((r) => ({
                id: r.id,
                group: r.fields[this.groupField] ? r.fields[this.groupField].value : null,
                title: this.show(r, this.titleField),
                subtitle: this.subtitleField ? this.show(r, this.subtitleField) : ''
            }));
            this.errorText = undefined;
        } else if (error) {
            this.errorText = this.t.loadFailed;
        }
    }

    show(record, field) {
        const f = record.fields[field];
        if (!f) return '';
        return f.displayValue ?? (f.value === null || f.value === undefined ? '' : String(f.value));
    }

    get heading() {
        return this.label || (this.childInfo ? this.childInfo.labelPlural : this.relatedListId);
    }
    get hidden() {
        return String(this.hideValues || '')
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean);
    }
    get visibleValues() {
        return this.picklist.filter((p) => !this.hidden.includes(p.value));
    }

    get columns() {
        return this.visibleValues.map((col) => {
            const cards = this.records
                .filter((r) => r.group === col.value)
                .map((r) => ({
                    ...r,
                    className: `card${r.id === this.draggingId ? ' dragging' : ''}`,
                    moveLabel: `${this.t.moveTo}… (${r.title})`,
                    targets: this.visibleValues.filter((v) => v.value !== col.value)
                }));
            return {
                ...col,
                cards,
                count: cards.length,
                className: `column${this.overColumn === col.value ? ' over' : ''}`
            };
        });
    }

    handleDragStart(event) {
        this.draggingId = event.currentTarget.dataset.id;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', this.draggingId);
    }
    handleDragEnd() {
        this.draggingId = undefined;
        this.overColumn = undefined;
    }
    handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        this.overColumn = event.currentTarget.dataset.value;
    }
    handleDragLeave(event) {
        if (this.overColumn === event.currentTarget.dataset.value) this.overColumn = undefined;
    }
    handleDrop(event) {
        event.preventDefault();
        const id = event.dataTransfer.getData('text/plain') || this.draggingId;
        const target = event.currentTarget.dataset.value;
        this.draggingId = undefined;
        this.overColumn = undefined;
        if (id) this.move(id, target);
    }
    handleMenuMove(event) {
        this.move(event.currentTarget.dataset.id, event.detail.value);
    }

    /** Optimistic move; reverted with the error message if the update fails. */
    async move(id, target) {
        const record = this.records.find((r) => r.id === id);
        if (!record || record.group === target) return;
        const previous = record.group;
        const targetLabel = (this.picklist.find((p) => p.value === target) || {}).label || target;
        this.records = this.records.map((r) => (r.id === id ? { ...r, group: target } : r));
        this.statusText = this.t.saving;
        this.errorText = undefined;
        try {
            await updateRecord({ fields: { Id: id, [this.groupField]: target } });
            this.statusText = this.t.moved(record.title, targetLabel);
            this.dispatchEvent(new CustomEvent('move', { detail: { recordId: id, from: previous, to: target } }));
        } catch (error) {
            this.records = this.records.map((r) => (r.id === id ? { ...r, group: previous } : r));
            this.statusText = undefined;
            const message = (error && error.body && (error.body.output?.errors?.[0]?.message || error.body.message)) || '';
            this.errorText = `${this.t.failed}${message ? `: ${message}` : ''}`;
        }
    }

    handleOpen(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: { recordId: event.currentTarget.dataset.id, actionName: 'view' }
        });
    }
}
