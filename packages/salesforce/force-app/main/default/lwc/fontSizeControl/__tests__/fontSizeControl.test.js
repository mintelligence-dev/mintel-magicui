import { createElement } from 'lwc';
import FontSizeControl from 'c/fontSizeControl';

const KEY = 'mintel-font-scale';
const flush = () => new Promise((resolve) => setTimeout(resolve, 0));
afterEach(() => {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
});

function make(props) {
    const el = createElement('c-font-size-control', { is: FontSizeControl });
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
}
const buttons = (el) => [...el.shadowRoot.querySelectorAll('button')];

describe('c-font-size-control', () => {
    afterEach(() => {
        window.localStorage.clear();
        document.documentElement.style.fontSize = '';
    });

    it('steps up to 125% and stops there, scaling the page and remembering the choice', async () => {
        const el = make({ applyToPage: true, locale: 'en' });
        const onChange = jest.fn();
        el.addEventListener('fontscalechange', onChange);
        const [, , larger] = buttons(el);

        larger.click();
        await flush();
        expect(document.documentElement.style.fontSize).toBe('112.5%');
        expect(window.localStorage.getItem(KEY)).toBe('112.5');
        expect(onChange.mock.calls[0][0].detail).toEqual({ percent: 112.5 });

        larger.click();
        await flush();
        expect(document.documentElement.style.fontSize).toBe('125%');
        expect(larger.disabled).toBe(true);
    });

    it('reset returns to the default and clears the saved value', async () => {
        const el = make({ applyToPage: true });
        const [smaller, reset] = buttons(el);
        smaller.click();
        await flush();
        expect(document.documentElement.style.fontSize).toBe('87.5%');
        expect(smaller.disabled).toBe(true);
        expect(reset.getAttribute('aria-pressed')).toBe('false');

        reset.click();
        await flush();
        expect(document.documentElement.style.fontSize).toBe('');
        expect(window.localStorage.getItem(KEY)).toBeNull();
        expect(reset.getAttribute('aria-pressed')).toBe('true');
    });

    it('restores a saved size on load', async () => {
        window.localStorage.setItem(KEY, '125');
        const el = make({ applyToPage: true });
        await flush();
        expect(document.documentElement.style.fontSize).toBe('125%');
        expect(buttons(el)[2].disabled).toBe(true);
    });

    it('ignores a saved value that is not one of the steps', async () => {
        window.localStorage.setItem(KEY, '300');
        make({ applyToPage: true });
        await flush();
        expect(document.documentElement.style.fontSize).toBe('');
    });

    it('leaves the page alone unless applyToPage is on', async () => {
        const el = make({});
        buttons(el)[2].click();
        await flush();
        expect(document.documentElement.style.fontSize).toBe('');
        expect(window.localStorage.getItem(KEY)).toBe('112.5');
    });

    it('labels the buttons in Thai by default and in English on request', async () => {
        const el = make({});
        expect(buttons(el)[2].getAttribute('aria-label')).toBe('เพิ่มขนาดตัวอักษร');
        el.locale = 'en';
        await flush();
        expect(buttons(el)[2].getAttribute('aria-label')).toBe('Increase text size');
    });
});
