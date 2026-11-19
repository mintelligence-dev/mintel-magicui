import { createElement } from 'lwc';
import KpiTrend from 'c/kpiTrend';
import { getRecord } from 'lightning/uiRecordApi';

const flush = () => Promise.resolve();
function make(props) {
    const el = createElement('c-kpi-trend', { is: KpiTrend });
    Object.assign(el, { locale: 'en', ...props });
    document.body.appendChild(el);
    return el;
}

describe('c-kpi-trend', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    it('uses the last trend point, shows the change and draws a sparkline', async () => {
        const el = make({ label: 'Open cases', trend: '10, 12, 15' });
        await flush();
        const root = el.shadowRoot;
        expect(root.querySelector('.number').textContent).toBe('15');
        expect(root.querySelector('.delta').textContent).toBe('▲ 25.0%');
        expect(root.querySelector('.delta').classList).toContain('good');
        expect(root.querySelector('.line').getAttribute('d')).toMatch(/^M0\.00,/);
    });

    it('treats a rise as bad when lower is better', async () => {
        const el = make({ trend: [5, 6], goodDirection: 'down' });
        await flush();
        expect(el.shadowRoot.querySelector('.delta').classList).toContain('bad');
    });

    it('reads the value from a record field', async () => {
        const el = make({ recordId: '001xx', objectApiName: 'Account', fieldApiName: 'AnnualRevenue', trend: '' });
        getRecord.emit({ apiName: 'Account', fields: { AnnualRevenue: { value: 1250000 } } });
        await flush();
        expect(el.shadowRoot.querySelector('.number').textContent).toBe('1,250,000');
        expect(el.shadowRoot.querySelector('svg')).toBeNull();
    });
});
