import { createElement } from 'lwc';
import MintelProgressRing from 'c/mintelProgressRing';
import { getRecord } from 'lightning/uiRecordApi';

const flush = () => new Promise((resolve) => setTimeout(resolve, 20));

describe('c-mintel-progress-ring', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    it('clamps the value, sweeps in and colors by status', async () => {
        const el = createElement('c-mintel-progress-ring', { is: MintelProgressRing });
        Object.assign(el, { value: 130, variant: 'status', label: 'Win rate' });
        document.body.appendChild(el);
        await flush();
        const bar = el.shadowRoot.querySelector('[role="progressbar"]');
        expect(bar.getAttribute('aria-valuenow')).toBe('100');
        expect(bar.classList).toContain('high');
        expect(el.shadowRoot.querySelector('.value').getAttribute('style')).toContain('stroke-dashoffset:0');
        el.value = 25;
        await flush();
        expect(bar.classList).toContain('low');
    });

    it('reads a percent field from the record', async () => {
        const el = createElement('c-mintel-progress-ring', { is: MintelProgressRing });
        Object.assign(el, { recordId: '006xx', objectApiName: 'Opportunity', fieldApiName: 'Probability' });
        document.body.appendChild(el);
        getRecord.emit({ apiName: 'Opportunity', fields: { Probability: { value: 60 } } });
        await flush();
        expect(el.shadowRoot.querySelector('.number').textContent).toBe('60%');
    });
});
