import { createElement } from 'lwc';
import Tab from 'c/tab';

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));
afterEach(() => {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
});

describe('c-tab', () => {
    it('is a labelled tabpanel that is hidden until active', async () => {
        const el = createElement('c-tab', { is: Tab });
        el.label = 'Cases';
        el.value = 'cases';
        document.body.appendChild(el);
        const panel = el.shadowRoot.querySelector('[role="tabpanel"]');
        expect(panel.getAttribute('aria-label')).toBe('Cases');
        expect(panel.hidden).toBe(true);

        el.active = true;
        await flush();
        expect(panel.hidden).toBe(false);
        expect(el.value).toBe('cases');
    });
});
