import { createElement } from 'lwc';
import TimelineHost from 'c/timelineHost';

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('c-timeline', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    it('renders items as a list with titles, times, variants and a current pulse', async () => {
        const host = createElement('c-timeline-host', { is: TimelineHost });
        document.body.appendChild(host);
        await flush();

        const timeline = host.shadowRoot.querySelector('c-timeline');
        expect(timeline.shadowRoot.querySelector('[role="list"]').getAttribute('aria-label')).toBe('Case history');

        const items = Array.from(host.shadowRoot.querySelectorAll('c-timeline-item'));
        expect(items.map((i) => i.getAttribute('role'))).toEqual(['listitem', 'listitem', 'listitem']);
        expect(items.map((i) => i.shadowRoot.querySelector('.title').textContent)).toEqual(['Case created', 'Assigned', 'Resolved']);
        expect(items[0].shadowRoot.querySelector('.time').textContent).toBe('09:12');
        expect(items[2].shadowRoot.querySelector('.time')).toBeNull();

        expect(items[1].getAttribute('aria-current')).toBe('step');
        expect(items[1].shadowRoot.querySelector('.pulse.brand')).not.toBeNull();
        expect(items[0].shadowRoot.querySelector('.pulse')).toBeNull();
        // A slotted icon switches to the large dot.
        expect(items[1].shadowRoot.querySelector('.dot').className).toBe('dot brand large');
        // Unknown variants fall back to default.
        expect(items[2].shadowRoot.querySelector('.dot').className).toBe('dot default');
    });
});
