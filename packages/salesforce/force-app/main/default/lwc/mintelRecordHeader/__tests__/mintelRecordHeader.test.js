import { createElement } from 'lwc';
import MintelRecordHeader from 'c/mintelRecordHeader';
import { getRecord } from 'lightning/uiRecordApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

const flush = () => Promise.resolve();

describe('c-mintel-record-header', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    it('shows object label, title, status badge and highlight fields', async () => {
        const el = createElement('c-mintel-record-header', { is: MintelRecordHeader });
        Object.assign(el, {
            recordId: '500xx',
            objectApiName: 'Case',
            titleField: 'CaseNumber',
            fields: 'Priority, Origin',
            statusField: 'Status'
        });
        document.body.appendChild(el);
        getObjectInfo.emit({
            label: 'Case',
            themeInfo: { color: '22A48A', iconUrl: '/case.svg' },
            fields: { Priority: { label: 'Priority' }, Origin: { label: 'Case Origin' } }
        });
        getRecord.emit({
            apiName: 'Case',
            fields: {
                CaseNumber: { value: '00012345', displayValue: null },
                Priority: { value: 'High', displayValue: 'High' },
                Origin: { value: 'LINE', displayValue: 'LINE' }
            }
        });
        await flush();
        const root = el.shadowRoot;
        expect(root.querySelector('.eyebrow').textContent).toBe('Case');
        expect(root.querySelector('.title').textContent).toBe('00012345');
        expect(root.querySelector('c-mintel-status-badge').fieldApiName).toBe('Status');
        expect(Array.from(root.querySelectorAll('dt')).map((d) => d.textContent)).toEqual(['Priority', 'Case Origin']);
        expect(Array.from(root.querySelectorAll('dd')).map((d) => d.textContent)).toEqual(['High', 'LINE']);
    });
});
