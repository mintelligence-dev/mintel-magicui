import { createElement } from 'lwc';
import MintelAvatarGroup from 'c/mintelAvatarGroup';

describe('c-mintel-avatar-group', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    it('shows initials up to max and collapses the rest into +N', async () => {
        const el = createElement('c-mintel-avatar-group', { is: MintelAvatarGroup });
        Object.assign(el, { names: 'Nina Park, Somchai K, Beam T, Ploy S, Nok R', max: 3 });
        document.body.appendChild(el);
        await Promise.resolve();
        const items = Array.from(el.shadowRoot.querySelectorAll('[role="listitem"]'));
        expect(items.map((i) => i.textContent.trim())).toEqual(['NP', 'SK', 'BT', '+2']);
        expect(items[3].getAttribute('title')).toBe('Ploy S, Nok R');
    });

    it('uses photos when given an array', async () => {
        const el = createElement('c-mintel-avatar-group', { is: MintelAvatarGroup });
        el.people = [{ name: 'Nina', photoUrl: '/nina.png' }];
        document.body.appendChild(el);
        await Promise.resolve();
        expect(el.shadowRoot.querySelector('img').getAttribute('src')).toBe('/nina.png');
    });
});
