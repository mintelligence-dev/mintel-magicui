import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

const STRINGS = {
    th: { viewAll: 'ดูทั้งหมด', empty: 'ยังไม่มีรายการ', failed: 'โหลดรายการไม่สำเร็จ' },
    en: { viewAll: 'View all', empty: 'Nothing here yet', failed: 'Could not load records' }
};

/**
 * A record page related list shown as cards (e.g. an Account's Cases or Opportunities). Uses the UI API,
 * so it respects sharing and field-level security and needs no Apex. Cards open the record; "View all"
 * opens the standard related list.
 */
export default class RelatedCards extends NavigationMixin(LightningElement) {
    @api recordId;
    /** Related list API name on the parent, e.g. "Cases", "Opportunities", "Contacts". */
    @api relatedListId = 'Cases';
    /** Child object API name, e.g. "Case". */
    @api childObjectApiName = 'Case';
    /** Field shown as the card title. */
    @api titleField = 'CaseNumber';
    /** Up to three more fields, comma-separated. */
    @api fields = 'Subject,Status,Priority';
    /** e.g. "-CreatedDate" (minus = descending). */
    @api sortBy = '-CreatedDate';
    @api pageSize = 6;
    @api label;
    @api locale = 'th';

    records = [];
    more = false;
    childInfo;
    errorText;
    loaded = false;

    get labels() {
        return STRINGS[this.locale === 'en' ? 'en' : 'th'];
    }
    get fieldList() {
        return String(this.fields || '')
            .split(',')
            .map((f) => f.trim())
            .filter(Boolean)
            .slice(0, 3);
    }
    get qualifiedFields() {
        return [`${this.childObjectApiName}.${this.titleField}`];
    }
    /** Optional, so a user without access to one of the extra fields still gets the cards. */
    get optionalFieldList() {
        return this.fieldList.map((f) => `${this.childObjectApiName}.${f}`);
    }
    get sortList() {
        if (!this.sortBy) return undefined;
        const desc = this.sortBy.startsWith('-');
        const field = `${this.childObjectApiName}.${this.sortBy.replace(/^-/, '')}`;
        return [desc ? `-${field}` : field];
    }

    @wire(getObjectInfo, { objectApiName: '$childObjectApiName' })
    wiredInfo({ data }) {
        if (data) this.childInfo = data;
    }

    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: '$relatedListId',
        fields: '$qualifiedFields',
        optionalFields: '$optionalFieldList',
        sortBy: '$sortList',
        pageSize: '$pageSize'
    })
    wiredRecords({ data, error }) {
        if (data) {
            this.records = data.records || [];
            // `count` is the size of this page, not of the list: a next page is the only sign there are more.
            this.more = Boolean(data.nextPageToken);
            this.errorText = undefined;
            this.loaded = true;
        } else if (error) {
            this.errorText = this.labels.failed;
            this.loaded = true;
        }
    }

    get heading() {
        return this.label || (this.childInfo ? this.childInfo.labelPlural : this.relatedListId);
    }
    get countText() {
        return this.loaded && !this.errorText ? `${this.records.length}${this.more ? '+' : ''}` : '';
    }
    get hasMore() {
        return this.loaded && this.more;
    }
    get isEmpty() {
        return this.loaded && this.records.length === 0;
    }
    get emptyIcon() {
        return 'utility:list';
    }

    show(record, field) {
        const f = record.fields[field];
        if (!f) return '—';
        return f.displayValue ?? (f.value === null || f.value === undefined ? '—' : String(f.value));
    }

    get cards() {
        return this.records.map((r) => ({
            id: r.id,
            title: this.show(r, this.titleField),
            fields: this.fieldList.map((f) => ({
                key: `${r.id}-${f}`,
                label: this.childInfo && this.childInfo.fields[f] ? this.childInfo.fields[f].label : f,
                value: this.show(r, f)
            }))
        }));
    }

    handleOpen(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: { recordId: event.currentTarget.dataset.id, actionName: 'view' }
        });
    }

    handleViewAll() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordRelationshipPage',
            attributes: { recordId: this.recordId, relationshipApiName: this.relatedListId, actionName: 'view' }
        });
    }
}
