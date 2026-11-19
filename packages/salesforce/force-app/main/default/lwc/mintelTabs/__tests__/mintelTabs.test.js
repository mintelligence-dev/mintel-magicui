import { createElement } from 'lwc';
import TabsHost from 'c/tabsHost';

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

async function build(active) {
    const host = createElement('c-tabs-host', { is: TabsHost });
    if (active) host.active = active;
    document.body.appendChild(host);
    await flush();
    await flush();
    return host;
}

const tabsEl = (host) => host.shadowRoot.querySelector('c-mintel-tabs');
const tabButtons = (host) => Array.from(tabsEl(host).shadowRoot.querySelectorAll('button[role="tab"]'));
const activeFlags = (host) => Array.from(host.shadowRoot.querySelectorAll('c-mintel-tab')).map((p) => p.active);
const pressKey = (host, key) =>
    tabsEl(host).shadowRoot.querySelector('[role="tablist"]').dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));

describe('c-mintel-tabs', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    it('builds the tab list from children and shows only the active panel', async () => {
        const host = await build();
        expect(tabButtons(host).map((b) => b.textContent.trim())).toEqual(['Overview', 'Cases', 'Settings']);
        expect(tabButtons(host)[0].getAttribute('aria-selected')).toBe('true');
        expect(activeFlags(host)).toEqual([true, false, false]);
    });

    it('switches on click and fires tabchange', async () => {
        const host = await build();
        tabButtons(host)[2].click();
        await flush();
        expect(host.changes).toEqual(['settings']);
        expect(tabButtons(host)[2].getAttribute('aria-selected')).toBe('true');
        expect(activeFlags(host)).toEqual([false, false, true]);
    });

    it('moves with arrow keys (wrapping) and respects activeValue', async () => {
        const host = await build('cases');
        expect(activeFlags(host)).toEqual([false, true, false]);
        pressKey(host, 'ArrowRight');
        await flush();
        expect(activeFlags(host)).toEqual([false, false, true]);
        pressKey(host, 'ArrowRight');
        await flush();
        expect(activeFlags(host)).toEqual([true, false, false]);
    });
});
