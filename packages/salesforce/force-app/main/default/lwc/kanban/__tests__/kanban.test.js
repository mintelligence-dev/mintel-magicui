import { createElement } from 'lwc';
import MintelKanban from 'c/kanban';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { updateRecord } from 'lightning/uiRecordApi';

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));
const opp = (id, name, stage, amount) => ({
    id,
    fields: { Name: { value: name, displayValue: null }, StageName: { value: stage, displayValue: stage }, Amount: { value: amount, displayValue: `฿${amount}` } }
});

async function make(props = {}) {
    const el = createElement('c-kanban', { is: MintelKanban });
    Object.assign(el, { recordId: '001xx', locale: 'en', hideValues: 'Closed Lost', ...props });
    document.body.appendChild(el);
    getObjectInfo.emit({ labelPlural: 'Opportunities', defaultRecordTypeId: '012000000000000AAA', fields: {} });
    getPicklistValues.emit({
        values: [
            { value: 'Prospecting', label: 'Prospecting' },
            { value: 'Proposal', label: 'Proposal' },
            { value: 'Closed Won', label: 'Closed Won' },
            { value: 'Closed Lost', label: 'Closed Lost' }
        ]
    });
    getRelatedListRecords.emit({ records: [opp('006a', 'Acme renewal', 'Prospecting', 1000), opp('006b', 'Siam upsell', 'Proposal', 5000)] });
    await flush();
    return el;
}
const column = (el, value) => el.shadowRoot.querySelector(`section[data-value="${value}"]`);
const titles = (el, value) => Array.from(column(el, value).querySelectorAll('.card-open')).map((b) => b.textContent);

describe('c-kanban', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
        jest.clearAllMocks();
    });

    it('builds columns from the picklist (minus hidden values) and places cards', async () => {
        const el = await make();
        const cols = Array.from(el.shadowRoot.querySelectorAll('section[data-value]')).map((s) => s.dataset.value);
        expect(cols).toEqual(['Prospecting', 'Proposal', 'Closed Won']);
        expect(titles(el, 'Prospecting')).toEqual(['Acme renewal']);
        expect(column(el, 'Proposal').querySelector('.card-sub').textContent).toBe('฿5000');
    });

    it('moves a card with the menu and saves the picklist value', async () => {
        updateRecord.mockResolvedValue({});
        const el = await make();
        const handler = jest.fn();
        el.addEventListener('move', handler);
        const menu = column(el, 'Prospecting').querySelector('lightning-button-menu');
        menu.dispatchEvent(new CustomEvent('select', { detail: { value: 'Closed Won' } }));
        await flush();
        expect(titles(el, 'Closed Won')).toEqual(['Acme renewal']);
        expect(updateRecord).toHaveBeenCalledWith({ fields: { Id: '006a', StageName: 'Closed Won' } });
        expect(handler.mock.calls[0][0].detail).toEqual({ recordId: '006a', from: 'Prospecting', to: 'Closed Won' });
        expect(el.shadowRoot.querySelector('.status').textContent).toContain('Moved Acme renewal to Closed Won');
    });

    it('reverts and shows the error when the update fails', async () => {
        updateRecord.mockRejectedValue({ body: { output: { errors: [{ message: 'Amount is required' }] } } });
        const el = await make();
        const menu = column(el, 'Proposal').querySelector('lightning-button-menu');
        menu.dispatchEvent(new CustomEvent('select', { detail: { value: 'Closed Won' } }));
        await flush();
        expect(titles(el, 'Proposal')).toEqual(['Siam upsell']);
        expect(el.shadowRoot.querySelector('.error').textContent).toBe('Could not move: Amount is required');
    });

    it('moves a card by drag and drop', async () => {
        updateRecord.mockResolvedValue({});
        const el = await make();
        const store = {};
        const dataTransfer = { setData: (k, val) => (store[k] = val), getData: (k) => store[k], effectAllowed: '', dropEffect: '' };
        const card = column(el, 'Prospecting').querySelector('.card');
        const start = new CustomEvent('dragstart');
        start.dataTransfer = dataTransfer;
        card.dispatchEvent(start);
        const drop = new CustomEvent('drop');
        drop.dataTransfer = dataTransfer;
        column(el, 'Proposal').dispatchEvent(drop);
        await flush();
        expect(titles(el, 'Proposal')).toEqual(['Acme renewal', 'Siam upsell']);
    });
});
