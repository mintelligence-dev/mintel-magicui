import { createElement } from 'lwc';
import MintelActivityTimeline from 'c/mintelActivityTimeline';
import { graphql } from 'lightning/uiGraphQLApi';

const flush = () => Promise.resolve();
const v = (value) => ({ value });

const DATA = {
    uiapi: {
        query: {
            Task: {
                edges: [
                    { node: { Id: 't1', Subject: v('Call back'), Status: v('Not Started'), IsClosed: v(false), ActivityDate: v('2020-01-01'), Description: v(null) } },
                    { node: { Id: 't2', Subject: v('Send quote'), Status: v('Completed'), IsClosed: v(true), ActivityDate: v('2099-01-05'), Description: v(null) } }
                ]
            },
            Event: { edges: [{ node: { Id: 'e1', Subject: v('Demo'), StartDateTime: v('2099-02-01T03:00:00.000Z'), Location: v('Zoom') } }] }
        }
    }
};

describe('c-mintel-activity-timeline', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    function make() {
        const el = createElement('c-mintel-activity-timeline', { is: MintelActivityTimeline });
        Object.assign(el, { recordId: '001xx', locale: 'en' });
        document.body.appendChild(el);
        return el;
    }
    const items = (el) => Array.from(el.shadowRoot.querySelectorAll('c-mintel-timeline-item'));

    it('merges tasks and events newest first, marking overdue and completed', async () => {
        const el = make();
        graphql.emit(DATA);
        await flush();
        expect(graphql.getLastConfig().variables).toEqual({ recordId: '001xx', limit: 20 });
        const list = items(el);
        expect(list.map((i) => i.title)).toEqual(['Demo', 'Send quote', 'Call back']);
        expect(list[1].variant).toBe('success');
        expect(list[2].variant).toBe('destructive');
        expect(list[2].time).toContain('Overdue');
    });

    it('filters to tasks or events', async () => {
        const el = make();
        graphql.emit(DATA);
        await flush();
        el.shadowRoot.querySelector('[data-value="events"]').click();
        await flush();
        expect(items(el).map((i) => i.title)).toEqual(['Demo']);
        el.shadowRoot.querySelector('[data-value="tasks"]').click();
        await flush();
        expect(items(el).map((i) => i.title)).toEqual(['Send quote', 'Call back']);
    });

    it('shows an error from GraphQL', async () => {
        const el = make();
        graphql.emitErrors([{ message: 'nope' }]);
        await flush();
        expect(el.shadowRoot.querySelector('.error').textContent).toBe('Could not load activity');
    });
});
