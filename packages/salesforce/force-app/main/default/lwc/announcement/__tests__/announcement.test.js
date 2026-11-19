import { createElement } from 'lwc';
import Announcement from 'c/announcement';

const flush = () => Promise.resolve();
function make(props) {
    const el = createElement('c-announcement', { is: Announcement });
    Object.assign(el, { message: 'Maintenance tonight', locale: 'en', ...props });
    document.body.appendChild(el);
    return el;
}

describe('c-announcement', () => {
    beforeEach(() => window.localStorage.clear());
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    it('shows the message with the chosen color', async () => {
        const el = make({ variant: 'warning', title: 'Heads up' });
        await flush();
        const banner = el.shadowRoot.querySelector('.banner');
        expect(banner.classList).toContain('warning');
        expect(banner.getAttribute('role')).toBe('alert');
        expect(banner.textContent).toContain('Maintenance tonight');
    });

    it('remembers a dismissal until the version changes', async () => {
        const el = make({ dismissible: true, version: '1' });
        await flush();
        el.shadowRoot.querySelector('.close').click();
        await flush();
        expect(el.shadowRoot.querySelector('.banner')).toBeNull();
        document.body.removeChild(el);
        const again = make({ dismissible: true, version: '1' });
        await flush();
        expect(again.shadowRoot.querySelector('.banner')).toBeNull();
        const next = make({ dismissible: true, version: '2' });
        await flush();
        expect(next.shadowRoot.querySelector('.banner')).not.toBeNull();
    });

    it('still works when storage is blocked', async () => {
        const spy = jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => {
            throw new Error('blocked');
        });
        const el = make({ dismissible: true });
        await flush();
        expect(el.shadowRoot.querySelector('.banner')).not.toBeNull();
        spy.mockRestore();
    });
});
