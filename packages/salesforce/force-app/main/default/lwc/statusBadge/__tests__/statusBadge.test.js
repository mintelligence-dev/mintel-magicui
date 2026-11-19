import { createElement } from 'lwc';
import MintelStatusBadge from 'c/statusBadge';
import { getRecord } from 'lightning/uiRecordApi';

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));
const badge = (el) => el.shadowRoot.querySelector('.badge');

function make(props) {
    const el = createElement('c-status-badge', { is: MintelStatusBadge });
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
}

describe('c-status-badge', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    it('guesses the color from keywords in manual mode', async () => {
        const el = make({ value: 'Closed' });
        await flush();
        expect(badge(el).textContent.trim()).toBe('Closed');
        expect(badge(el).classList).toContain('success');

        el.value = 'Escalated';
        await flush();
        expect(badge(el).classList).toContain('destructive');

        el.value = 'Something else';
        await flush();
        expect(badge(el).classList).toContain('neutral');
    });

    it('prefers the explicit variants map and supports solid', async () => {
        const el = make({ value: 'Closed', variants: 'closed:info, New:brand', appearance: 'solid' });
        await flush();
        expect(badge(el).classList).toContain('info');
        expect(badge(el).classList).toContain('solid');
    });

    it('shows the record field label and colors by its value', async () => {
        const el = make({ recordId: '500xx0000000001', objectApiName: 'Case', fieldApiName: 'Status' });
        getRecord.emit({
            apiName: 'Case',
            fields: { Status: { value: 'Working', displayValue: 'กำลังดำเนินการ' } }
        });
        await flush();
        expect(badge(el).textContent.trim()).toBe('กำลังดำเนินการ');
        expect(badge(el).classList).toContain('brand');
    });

    it('renders nothing without a value', async () => {
        const el = make({});
        await flush();
        expect(badge(el)).toBeNull();
    });
});
