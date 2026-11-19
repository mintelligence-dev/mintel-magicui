import { createElement } from 'lwc';
import MintelEmptyState from 'c/mintelEmptyState';

describe('c-mintel-empty-state', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    it('renders title, description and fires action', async () => {
        const el = createElement('c-mintel-empty-state', { is: MintelEmptyState });
        Object.assign(el, { title: 'No cases', description: 'All caught up', actionLabel: 'New case' });
        const handler = jest.fn();
        el.addEventListener('action', handler);
        document.body.appendChild(el);
        await Promise.resolve();
        expect(el.shadowRoot.querySelector('.title').textContent).toBe('No cases');
        expect(el.shadowRoot.querySelector('.description').textContent).toBe('All caught up');
        el.shadowRoot.querySelector('.action').click();
        expect(handler).toHaveBeenCalled();
    });
});
