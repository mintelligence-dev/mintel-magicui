import { createElement } from 'lwc';
import GradientText from 'c/gradientText';

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));
afterEach(() => {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
});

describe('c-gradient-text', () => {
    it('renders the text at the given size', async () => {
        const el = createElement('c-gradient-text', { is: GradientText });
        document.body.appendChild(el);
        const span = el.shadowRoot.querySelector('.gradient');
        expect(span.textContent).toBe('Customer Experience');
        expect(span.dataset.size).toBe('large');

        el.text = 'Mintel';
        el.size = 'small';
        await flush();
        expect(span.textContent).toBe('Mintel');
        expect(span.dataset.size).toBe('small');
    });
});
