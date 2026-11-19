import { createElement } from 'lwc';
import MintelRelatedCards from 'c/relatedCards';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

const flush = () => Promise.resolve();
const rec = (id, number, subject, status) => ({
    id,
    fields: { CaseNumber: { value: number, displayValue: null }, Subject: { value: subject, displayValue: null }, Status: { value: status, displayValue: status } }
});

function make(props = {}) {
    const el = createElement('c-related-cards', { is: MintelRelatedCards });
    Object.assign(el, { recordId: '001xx', fields: 'Subject,Status', locale: 'en', ...props });
    document.body.appendChild(el);
    return el;
}

describe('c-related-cards', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    it('asks the UI API for qualified fields and renders cards with field labels', async () => {
        const el = make({ pageSize: 2 });
        getObjectInfo.emit({ labelPlural: 'Cases', fields: { Subject: { label: 'Subject' }, Status: { label: 'Status' } } });
        getRelatedListRecords.emit({ count: 2, nextPageToken: 'next', records: [rec('500a', '00012345', 'Late delivery', 'New'), rec('500b', '00012346', 'Refund', 'Closed')] });
        await flush();
        const config = getRelatedListRecords.getLastConfig();
        // Only the title is required: a field the user cannot read must not fail the whole list.
        expect(config.fields).toEqual(['Case.CaseNumber']);
        expect(config.optionalFields).toEqual(['Case.Subject', 'Case.Status']);
        expect(config.sortBy).toEqual(['-Case.CreatedDate']);
        const root = el.shadowRoot;
        expect(root.querySelector('.title').textContent).toContain('Cases');
        expect(root.querySelector('.count').textContent).toBe('2+'); // page size, plus a next page
        expect(Array.from(root.querySelectorAll('.card-title')).map((n) => n.textContent)).toEqual(['00012345', '00012346']);
        expect(root.querySelector('dt').textContent).toBe('Subject');
        expect(root.querySelector('.link')).not.toBeNull(); // there is a next page
    });

    it('shows the empty state', async () => {
        const el = make();
        getRelatedListRecords.emit({ count: 0, records: [] });
        await flush();
        expect(el.shadowRoot.querySelector('c-empty-state')).not.toBeNull();
    });

    it('shows an error when the list cannot load', async () => {
        const el = make();
        getRelatedListRecords.error();
        await flush();
        expect(el.shadowRoot.querySelector('.error').textContent).toBe('Could not load records');
    });

    it('shows the plain count and no View all when everything fits on one page', async () => {
        const el = make();
        getRelatedListRecords.emit({ count: 1, records: [rec('500a', '00012345', 'Late delivery', 'New')] });
        await flush();
        expect(el.shadowRoot.querySelector('.count').textContent).toBe('1');
        expect(el.shadowRoot.querySelector('.link')).toBeNull();
    });
});
