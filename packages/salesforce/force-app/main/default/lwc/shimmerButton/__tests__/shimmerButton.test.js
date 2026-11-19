import { createElement } from 'lwc';
import ShimmerButton from 'c/shimmerButton';

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));
afterEach(() => {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
});

function make(props) {
    const el = createElement('c-shimmer-button', { is: ShimmerButton });
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
}

describe('c-shimmer-button', () => {
    it('is a real button with the label, and its click reaches the host', () => {
        const el = make({ label: 'Assign' });
        const button = el.shadowRoot.querySelector('button');
        expect(button.type).toBe('button');
        expect(button.textContent.trim()).toBe('Assign');
        const onClick = jest.fn();
        el.addEventListener('click', onClick);
        button.click();
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not fire click when disabled', () => {
        const el = make({ disabled: true });
        const button = el.shadowRoot.querySelector('button');
        expect(button.disabled).toBe(true);
        const onClick = jest.fn();
        el.addEventListener('click', onClick);
        button.click();
        expect(onClick).not.toHaveBeenCalled();
    });

    it('hides the decorative spark from assistive technology', () => {
        const el = make({});
        expect(el.shadowRoot.querySelector('.spark').getAttribute('aria-hidden')).toBe('true');
    });
});
