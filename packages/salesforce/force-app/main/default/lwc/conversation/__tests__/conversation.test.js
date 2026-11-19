import { createElement } from 'lwc';
import MintelConversation from 'c/conversation';

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));
const now = Date.now();
const MESSAGES = [
    { id: '1', direction: 'in', author: { name: 'Somchai K' }, time: new Date(now - 120000).toISOString(), text: 'Hi' },
    { id: '2', direction: 'in', author: { name: 'Somchai K' }, time: new Date(now - 110000).toISOString(), text: 'Order #A-1' },
    { id: '3', direction: 'system', time: new Date(now - 100000).toISOString(), text: 'Assigned to Nina' },
    { id: '4', direction: 'out', author: { name: 'Nina' }, time: new Date(now - 90000).toISOString(), text: 'Checking!', status: 'read' }
];

function make(props) {
    const el = createElement('c-conversation', { is: MintelConversation });
    Object.assign(el, { locale: 'en', ...props });
    document.body.appendChild(el);
    return el;
}

describe('c-conversation', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    it('renders a day divider, grouped bubbles, a system note and read status', async () => {
        const el = make({ messages: MESSAGES, channel: 'line', title: 'Somchai K' });
        await flush();
        const root = el.shadowRoot;
        expect(root.querySelector('.day').textContent).toContain('Today');
        expect(Array.from(root.querySelectorAll('.bubble')).map((b) => b.textContent)).toEqual(['Hi', 'Order #A-1', 'Checking!']);
        // Only the first of two quick messages shows the avatar.
        expect(root.querySelectorAll('.avatar').length).toBe(1);
        expect(root.querySelector('.system').textContent).toBe('Assigned to Nina');
        expect(root.querySelector('.status-read').textContent).toContain('Read');
        expect(root.querySelector('.channel').textContent).toBe('LINE');
    });

    it('sends on Enter and clears the composer', async () => {
        const el = make({ messages: MESSAGES, showComposer: true });
        const handler = jest.fn();
        el.addEventListener('send', handler);
        await flush();
        const input = el.shadowRoot.querySelector('.input');
        input.value = 'Hello there';
        input.dispatchEvent(new CustomEvent('input'));
        await flush();
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await flush();
        expect(handler.mock.calls[0][0].detail).toEqual({ text: 'Hello there' });
        expect(el.shadowRoot.querySelector('.send').disabled).toBe(true);
    });

    it('shows the typing indicator', async () => {
        const el = make({ messages: MESSAGES, typing: 'Somchai K' });
        await flush();
        expect(el.shadowRoot.querySelector('.typing').textContent).toContain('Somchai K typing');
    });
});
