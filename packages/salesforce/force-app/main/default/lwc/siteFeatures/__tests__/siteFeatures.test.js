import { createElement } from 'lwc';
import SiteFeatures from 'c/siteFeatures';
import SiteFaq from 'c/siteFaq';
import SiteHero from 'c/siteHero';
import SiteCta from 'c/siteCta';

const flush = () => Promise.resolve();
const mount = (name, Ctor, props) => {
    const el = createElement(name, { is: Ctor });
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
};

describe('Experience Cloud sections', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    it('site features parses "Title | Description | icon" lines and staggers them', async () => {
        const el = mount('c-site-features', SiteFeatures, { features: 'A | first | utility:chat; B | second' });
        await flush();
        const cards = el.shadowRoot.querySelectorAll('.card');
        expect(Array.from(cards).map((c) => c.querySelector('.card-title').textContent)).toEqual(['A', 'B']);
        expect(cards[1].getAttribute('style')).toContain('70ms');
        expect(cards[1].querySelector('lightning-icon').iconName).toBe('utility:check');
    });

    it('site FAQ opens the first question and skips lines without an answer', async () => {
        const el = mount('c-site-faq', SiteFaq, { questions: 'Q1 | A1; Q2 | A2; Q3' });
        await flush();
        const items = el.shadowRoot.querySelectorAll('details');
        expect(items.length).toBe(2);
        expect(items[0].open).toBe(true);
        expect(items[1].open).toBe(false);
    });

    it('site hero and CTA hide empty buttons', async () => {
        const hero = mount('c-site-hero', SiteHero, { secondaryLabel: '' });
        const cta = mount('c-site-cta', SiteCta, { secondaryLabel: 'Call us' });
        await flush();
        expect(hero.shadowRoot.querySelectorAll('.btn').length).toBe(1);
        expect(hero.shadowRoot.querySelector('.highlight').textContent).toBe('feels personal');
        expect(cta.shadowRoot.querySelectorAll('.btn').length).toBe(2);
    });
});
