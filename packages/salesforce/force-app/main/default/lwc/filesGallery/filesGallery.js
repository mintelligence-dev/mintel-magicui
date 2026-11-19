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
    more = false;
    loaded = false;
    errorText;

    get labels() {
        return STRINGS[this.locale === 'en' ? 'en' : 'th'];
    }
    get heading() {
        return this.label || this.labels.title;
    }
    get countText() {
        return this.loaded && !this.errorText ? `${this.files.length}${this.more ? '+' : ''}` : '';
    }
    get isEmpty() {
        return this.loaded && !this.errorText && this.files.length === 0;
    }

    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'AttachedContentDocuments',
        fields: ['AttachedContentDocument.Title'],
        // Optional: one unreadable or unknown field must not fail the whole list. The version id is asked for
        // on both paths, since which of them the UI API offers here has not been confirmed in an org.
        optionalFields: [
            'AttachedContentDocument.FileExtension',
            'AttachedContentDocument.ContentSize',
            'AttachedContentDocument.ContentDocumentId',
            'AttachedContentDocument.LastModifiedDate',
            'AttachedContentDocument.LatestPublishedVersionId',
            'AttachedContentDocument.ContentDocument.LatestPublishedVersionId'
        ],
        sortBy: ['-AttachedContentDocument.LastModifiedDate'],
        pageSize: '$pageSize'
    })
    wired({ data, error }) {
        if (data) {
            const v = (r, f) => (r.fields[f] ? r.fields[f].value : null);
            this.files = (data.records || []).map((r) => {
                const ext = (v(r, 'FileExtension') || '').toLowerCase();
                const document = r.fields.ContentDocument && r.fields.ContentDocument.value;
                const versionId =
                    v(r, 'LatestPublishedVersionId') ||
                    (document && document.fields && document.fields.LatestPublishedVersionId ? document.fields.LatestPublishedVersionId.value : null);
                return {
                    id: v(r, 'ContentDocumentId') || r.id,
                    title: v(r, 'Title') || '—',
                    ext: ext ? ext.toUpperCase().slice(0, 4) : 'FILE',
                    isImage: IMAGES.includes(ext) && Boolean(versionId),
                    thumbUrl: versionId ? `/sfc/servlet.shepherd/version/renditionDownload?rendition=THUMB240BY180&versionId=${versionId}` : '',
                    meta: [ext.toUpperCase(), size(v(r, 'ContentSize'))].filter(Boolean).join(' · ')
                };
            });
            // `count` is the size of this page, not of the list.
            this.more = Boolean(data.nextPageToken);
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
