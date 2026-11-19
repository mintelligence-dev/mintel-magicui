import { createElement } from 'lwc';
import MintelSegmentedControl from 'c/mintelSegmentedControl';

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));
const radios = (el) => Array.from(el.shadowRoot.querySelectorAll('[role="radio"]'));

describe('c-mintel-segmented-control', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    it('parses "value:Label" options and selects the given value', async () => {
        const el = createElement('c-mintel-segmented-control', { is: MintelSegmentedControl });
        el.options = 'day:Day, week:Week, month:Month';
        el.value = 'week';
        document.body.appendChild(el);
        await flush();
        expect(radios(el).map((r) => r.textContent.trim())).toEqual(['Day', 'Week', 'Month']);
        expect(radios(el).map((r) => r.getAttribute('aria-checked'))).toEqual(['false', 'true', 'false']);
    });

    it('accepts an options array, fires change on click and on arrow keys', async () => {
        const el = createElement('c-mintel-segmented-control', { is: MintelSegmentedControl });
        el.options = [
            { value: 'list', label: 'List' },
            { value: 'board', label: 'Board' }
        ];
        const handler = jest.fn();
        el.addEventListener('change', handler);
        document.body.appendChild(el);
        await flush();
        expect(radios(el)[0].getAttribute('aria-checked')).toBe('true');

        radios(el)[1].click();
        await flush();
        expect(handler.mock.calls[0][0].detail).toEqual({ value: 'board' });

        el.shadowRoot.querySelector('[role="radiogroup"]').dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        await flush();
        expect(handler.mock.calls[1][0].detail).toEqual({ value: 'list' });
        expect(radios(el)[0].getAttribute('aria-checked')).toBe('true');
    });
});
