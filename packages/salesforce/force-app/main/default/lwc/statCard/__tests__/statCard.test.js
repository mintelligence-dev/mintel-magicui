import { createElement } from 'lwc';
import StatCard from 'c/statCard';

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));
afterEach(() => {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
});

const number = (el) => el.shadowRoot.querySelector('.number').textContent;

function make(props) {
    const el = createElement('c-stat-card', { is: StatCard });
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
}

// Drives requestAnimationFrame by hand so the count-up can be stepped.
function fakeFrames() {
    let now = 0;
    let queue = [];
    jest.spyOn(performance, 'now').mockImplementation(() => now);
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => queue.push(cb));
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {
        queue = [];
    });
    return (ms) => {
        now += ms;
        const run = queue;
        queue = [];
        run.forEach((cb) => cb(now));
    };
}

describe('c-stat-card', () => {
    afterEach(() => {
        jest.restoreAllMocks();
        delete window.matchMedia;
    });

    it('counts up from 0 to the value and formats it for the locale', async () => {
        const advance = fakeFrames();
        const el = make({ value: 1284, locale: 'en-US', label: 'Messages today' });
        await flush();
        expect(number(el)).toBe('0');

        advance(600);
        await flush();
        const mid = Number(number(el).replace(/,/g, ''));
        expect(mid).toBeGreaterThan(0);
        expect(mid).toBeLessThan(1284);

        advance(700);
        await flush();
        expect(number(el)).toBe('1,284');
        expect(el.shadowRoot.querySelector('.label').textContent).toBe('Messages today');
    });

    it('shows the value at once when the user prefers reduced motion', async () => {
        window.matchMedia = jest.fn(() => ({ matches: true }));
        const el = make({ value: 37, locale: 'en-US' });
        await flush();
        expect(number(el)).toBe('37');
    });

    it('treats a value that is not a number as 0', async () => {
        window.matchMedia = jest.fn(() => ({ matches: true }));
        const el = make({ value: 'abc', locale: 'en-US' });
        await flush();
        expect(number(el)).toBe('0');
    });

    it('renders suffix and caption only when set', async () => {
        window.matchMedia = jest.fn(() => ({ matches: true }));
        const el = make({ value: 96 });
        await flush();
        expect(el.shadowRoot.querySelector('.suffix')).toBeNull();
        expect(el.shadowRoot.querySelector('.caption')).toBeNull();
        el.suffix = '%';
        el.caption = '+4% this month';
        await flush();
        expect(el.shadowRoot.querySelector('.suffix').textContent).toBe('%');
        expect(el.shadowRoot.querySelector('.caption').textContent).toBe('+4% this month');
    });
});
