import { createElement } from 'lwc';
import TimelineItem from 'c/timelineItem';

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));
afterEach(() => {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
});

function make(props) {
    const el = createElement('c-timeline-item', { is: TimelineItem });
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
}

describe('c-timeline-item', () => {
    it('is a list item with title and time', () => {
        const el = make({ title: 'Case created', time: '09:12' });
        expect(el.getAttribute('role')).toBe('listitem');
        expect(el.getAttribute('aria-current')).toBeNull();
        expect(el.shadowRoot.querySelector('.title').textContent).toBe('Case created');
        expect(el.shadowRoot.querySelector('.time').textContent).toBe('09:12');
        expect(el.shadowRoot.querySelector('.pulse')).toBeNull();
    });

    it('marks the current step and pulses in its color', () => {
        const el = make({ title: 'Working', current: true, variant: 'warning' });
        expect(el.getAttribute('aria-current')).toBe('step');
        expect(el.shadowRoot.querySelector('.pulse').classList).toContain('warning');
        expect(el.shadowRoot.querySelector('.dot').classList).toContain('warning');
    });

    it('falls back to the default color for an unknown variant', () => {
        const el = make({ title: 'x', variant: 'rainbow' });
        expect(el.shadowRoot.querySelector('.dot').classList).toContain('default');
    });

    it('omits the time when there is none', () => {
        const el = make({ title: 'x' });
        expect(el.shadowRoot.querySelector('.time')).toBeNull();
    });
});
