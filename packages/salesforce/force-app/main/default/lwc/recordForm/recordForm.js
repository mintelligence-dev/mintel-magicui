import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const LABELS = {
    th: { save: 'บันทึก', cancel: 'ยกเลิก', saved: 'บันทึกแล้ว', created: 'สร้างรายการแล้ว', saving: 'กำลังบันทึก…', details: 'รายละเอียด' },
    en: { save: 'Save', cancel: 'Cancel', saved: 'Saved', created: 'Record created', saving: 'Saving…', details: 'Details' }
};

/**
 * Record form in Mintel style, built on lightning-record-edit-form (field types, validation, field-level
 * security and saving come from the platform; no Apex). Fields are grouped in sections:
 *   "Contact: FirstName, LastName, Phone | Address: MailingStreet, MailingCity"
 * Without a record id it creates a new record of objectApiName.
 */
export default class RecordForm extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api title;
    /** "Section: Field, Field | Section: Field" (a list without "Section:" goes in one untitled section). */
    @api sections = '';
    /** 1 or 2 columns on wide screens (always 1 on phones). */
    @api columns = 2;
    @api saveLabel;
    @api showCancel = false;
    @api locale = 'th';

    saving = false;

    get t() {
        return LABELS[this.locale] || LABELS.th;
    }

    get parsedSections() {
        return String(this.sections || '')
            .split('|')
            .map((chunk, i) => {
                const colon = chunk.indexOf(':');
                const title = colon >= 0 ? chunk.slice(0, colon).trim() : '';
                const fields = (colon >= 0 ? chunk.slice(colon + 1) : chunk)
                    .split(',')
                    .map((f) => f.trim())
                    .filter(Boolean);
                return { key: `s${i}`, title, fields: fields.map((name) => ({ key: `s${i}-${name}`, name })) };
            })
            .filter((s) => s.fields.length);
    }

    get hasSections() {
        return this.parsedSections.length > 0;
    }

    get gridClass() {
        return Number(this.columns) === 1 ? 'grid' : 'grid grid-2';
    }

    get buttonLabel() {
        return this.saving ? this.t.saving : this.saveLabel || this.t.save;
    }

    handleSubmit() {
        this.saving = true;
    }

    handleSuccess(event) {
        this.saving = false;
        const id = event.detail && event.detail.id;
        this.dispatchEvent(
            new ShowToastEvent({ title: this.recordId ? this.t.saved : this.t.created, variant: 'success' })
        );
        this.dispatchEvent(new CustomEvent('success', { detail: { recordId: id } }));
    }

    handleError(event) {
        this.saving = false;
        this.dispatchEvent(new CustomEvent('error', { detail: event.detail }));
    }

    handleCancel() {
        this.template.querySelectorAll('lightning-input-field').forEach((field) => {
            if (field.reset) field.reset();
        });
        this.dispatchEvent(new CustomEvent('cancel'));
    }
}
