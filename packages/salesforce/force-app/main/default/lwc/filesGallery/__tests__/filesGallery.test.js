import { createElement } from 'lwc';
import FilesGallery from 'c/filesGallery';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { getNavigateCalledWith } from 'lightning/navigation';

const flush = () => Promise.resolve();
const f = (id, title, ext, size, version) => ({
    id: `a${id}`,
    fields: {
        Title: { value: title },
        FileExtension: { value: ext },
        ContentSize: { value: size },
        ContentDocumentId: { value: id },
        LatestPublishedVersionId: { value: version },
        LastModifiedDate: { value: '2026-11-19T00:00:00.000Z' }
    }
});

describe('c-files-gallery', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    it('shows images as thumbnails and other files as a type tile, and opens the preview', async () => {
        const el = createElement('c-files-gallery', { is: FilesGallery });
        Object.assign(el, { recordId: '001xx', locale: 'en' });
        document.body.appendChild(el);
        getRelatedListRecords.emit({ count: 2, records: [f('069a', 'Receipt', 'png', 52000, '068a'), f('069b', 'Contract', 'pdf', 2400000, '068b')] });
        await flush();
        const root = el.shadowRoot;
        expect(getRelatedListRecords.getLastConfig().relatedListId).toBe('AttachedContentDocuments');
        expect(root.querySelector('img').getAttribute('src')).toContain('versionId=068a');
        expect(root.querySelector('.ext').textContent).toBe('PDF');
        expect(Array.from(root.querySelectorAll('.meta')).map((m) => m.textContent)).toEqual(['PNG · 51 KB', 'PDF · 2.3 MB']);
        root.querySelectorAll('.file')[1].click();
        expect(getNavigateCalledWith()).toEqual({ type: 'standard__namedPage', attributes: { pageName: 'filePreview' }, state: { selectedRecordId: '069b' } });
    });

    it('shows the empty state', async () => {
        const el = createElement('c-files-gallery', { is: FilesGallery });
        el.recordId = '001xx';
        document.body.appendChild(el);
        getRelatedListRecords.emit({ count: 0, records: [] });
        await flush();
        expect(el.shadowRoot.querySelector('c-empty-state')).not.toBeNull();
    });
});
