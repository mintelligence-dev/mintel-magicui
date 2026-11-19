import { createElement } from 'lwc';
import GlassCard from 'c/glassCard';

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));
afterEach(() => {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
});

function make(props) {
    const el = createElement('c-glass-card', { is: GlassCard });
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
}

describe('c-glass-card', () => {
    it('shows the title and subtitle in a header', () => {
        const el = make({ title: 'AI case summary', subtitle: 'Agentforce' });
        expect(el.shadowRoot.querySelector('.title').textContent).toBe('AI case summary');
        expect(el.shadowRoot.querySelector('.subtitle').textContent).toBe('Agentforce');
    });

    it('renders no header without a title, and no subtitle without one', async () => {
        const el = make({});
        expect(el.shadowRoot.querySelector('.header')).toBeNull();
        el.title = 'Only a title';
        await flush();
        expect(el.shadowRoot.querySelector('.header')).not.toBeNull();
        expect(el.shadowRoot.querySelector('.subtitle')).toBeNull();
    });

    it('passes the variant to the card and keeps a slot for content', () => {
        const el = make({ variant: 'brand' });
        expect(el.shadowRoot.querySelector('.glass').dataset.variant).toBe('brand');
        expect(el.shadowRoot.querySelector('.body slot')).not.toBeNull();
    });
});
