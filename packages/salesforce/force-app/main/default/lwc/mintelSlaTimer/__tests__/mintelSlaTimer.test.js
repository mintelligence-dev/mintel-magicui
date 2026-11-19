import { createElement } from 'lwc';
import MintelSlaTimer from 'c/mintelSlaTimer';
import { getRecord } from 'lightning/uiRecordApi';

const flush = () => Promise.resolve();

describe('c-mintel-sla-timer', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2026-11-19T10:00:00Z'));
    });
    afterEach(() => {
        jest.useRealTimers();
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    function make(props) {
        const el = createElement('c-mintel-sla-timer', { is: MintelSlaTimer });
        Object.assign(el, { locale: 'en', ...props });
        document.body.appendChild(el);
        return el;
    }
    const root = (el) => el.shadowRoot.querySelector('.sla');

    it('counts down, turns amber inside the warning window and red when overdue', async () => {
        const el = make({ deadline: '2026-11-19T10:31:00Z', warningMinutes: 30 });
        await flush();
        expect(root(el).classList).toContain('on-track');
        expect(el.shadowRoot.querySelector('.clock').textContent).toBe('00:31:00');

        jest.advanceTimersByTime(61000);
        await flush();
        expect(root(el).classList).toContain('at-risk');
        expect(el.shadowRoot.querySelector('.clock').textContent).toBe('00:29:59');

        jest.advanceTimersByTime(30 * 60000);
        await flush();
        expect(root(el).classList).toContain('overdue');
        expect(el.shadowRoot.querySelector('.clock').textContent).toBe('+00:00:01');
    });

    it('shows elapsed progress from start to deadline', async () => {
        const el = make({ start: '2026-11-19T09:00:00Z', deadline: '2026-11-19T11:00:00Z' });
        await flush();
        expect(el.shadowRoot.querySelector('[role="progressbar"]').getAttribute('aria-valuenow')).toBe('50');
    });

    it('reads record fields and stops when completed', async () => {
        const el = make({ recordId: '500xx', objectApiName: 'Case', deadlineField: 'SlaExitDate', completedField: 'IsClosed' });
        getRecord.emit({ apiName: 'Case', fields: { SlaExitDate: { value: '2026-11-19T09:00:00Z' }, IsClosed: { value: true } } });
        await flush();
        expect(root(el).classList).toContain('met');
        expect(el.shadowRoot.querySelector('.state').textContent).toBe('Completed');
    });
});
