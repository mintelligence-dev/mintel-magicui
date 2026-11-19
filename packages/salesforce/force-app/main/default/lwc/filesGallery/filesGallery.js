import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

const STRINGS = {
    th: { title: 'ไฟล์', empty: 'ยังไม่มีไฟล์', failed: 'โหลดไฟล์ไม่สำเร็จ' },
    en: { title: 'Files', empty: 'No files yet', failed: 'Could not load files' }
};
const IMAGES = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'];

function size(bytes) {
    if (!bytes && bytes !== 0) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
}

/**
 * The record's files as cards with thumbnails (images) or a file-type tile; clicking opens Salesforce's own
 * file preview. Reads the Files related list (AttachedContentDocuments) through the UI API, so sharing applies
 * and there is no Apex.
 */
export default class FilesGallery extends NavigationMixin(LightningElement) {
    @api recordId;
    @api label;
    @api pageSize = 12;
    @api locale = 'th';

    files = [];
    total;
    loaded = false;
    errorText;

    get labels() {
        return STRINGS[this.locale === 'en' ? 'en' : 'th'];
    }
    get heading() {
        return this.label || this.labels.title;
    }
    get countText() {
        return this.loaded && !this.errorText ? String(this.total ?? this.files.length) : '';
    }
    get isEmpty() {
        return this.loaded && !this.errorText && this.files.length === 0;
    }

    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'AttachedContentDocuments',
        fields: [
            'AttachedContentDocument.Title',
            'AttachedContentDocument.FileExtension',
            'AttachedContentDocument.ContentSize',
            'AttachedContentDocument.ContentDocumentId',
            'AttachedContentDocument.LatestPublishedVersionId',
            'AttachedContentDocument.LastModifiedDate'
        ],
        sortBy: ['-AttachedContentDocument.LastModifiedDate'],
        pageSize: '$pageSize'
    })
    wired({ data, error }) {
        if (data) {
            const v = (r, f) => (r.fields[f] ? r.fields[f].value : null);
            this.files = (data.records || []).map((r) => {
                const ext = (v(r, 'FileExtension') || '').toLowerCase();
                const versionId = v(r, 'LatestPublishedVersionId');
                return {
                    id: v(r, 'ContentDocumentId') || r.id,
                    title: v(r, 'Title') || '—',
                    ext: ext ? ext.toUpperCase().slice(0, 4) : 'FILE',
                    isImage: IMAGES.includes(ext) && Boolean(versionId),
                    thumbUrl: versionId ? `/sfc/servlet.shepherd/version/renditionDownload?rendition=THUMB240BY180&versionId=${versionId}` : '',
                    meta: [ext.toUpperCase(), size(v(r, 'ContentSize'))].filter(Boolean).join(' · ')
                };
            });
            this.total = data.count;
            this.errorText = undefined;
            this.loaded = true;
        } else if (error) {
            this.errorText = this.labels.failed;
            this.loaded = true;
        }
    }

    handleOpen(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: { pageName: 'filePreview' },
            state: { selectedRecordId: event.currentTarget.dataset.id }
        });
    }
}
