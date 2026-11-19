import { loadStyle } from 'lightning/platformResourceLoader';

jest.mock('lightning/platformResourceLoader', () => ({ loadStyle: jest.fn(() => Promise.resolve()) }), { virtual: true });

// The module keeps a page-wide record of loaded stylesheets, so each test gets a fresh copy
// (and its own tag name, since each copy of the engine registers its own custom element).
let n = 0;
function mount(theme) {
    n += 1;
    const tag = `c-brand-loader-${n}`;
    let BrandLoader;
    let createElement;
    jest.isolateModules(() => {
        ({ createElement } = require('lwc'));
        BrandLoader = require('c/brandLoader').default;
    });
    const el = createElement(tag, { is: BrandLoader });
    if (theme) el.theme = theme;
    document.body.appendChild(el);
    return { el, BrandLoader, createElement, tag };
}

describe('c-brand-loader', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
        loadStyle.mockClear();
    });

    it('loads the Mintel brand stylesheet by default', () => {
        mount();
        expect(loadStyle).toHaveBeenCalledTimes(1);
        expect(String(loadStyle.mock.calls[0][1])).toContain('mintelGlobal');
    });

    it('loads the follow-org stylesheet when theme is follow-org', () => {
        mount('follow-org');
        expect(loadStyle).toHaveBeenCalledTimes(1);
        expect(String(loadStyle.mock.calls[0][1])).toContain('mintelFollowOrg');
    });

    it('loads a stylesheet once per page, however many loaders there are', () => {
        const { BrandLoader, createElement, tag } = mount();
        const second = createElement(tag, { is: BrandLoader });
        document.body.appendChild(second);
        expect(loadStyle).toHaveBeenCalledTimes(1);
    });

    it('falls back to the brand stylesheet for an unknown theme', () => {
        mount('neon');
        expect(String(loadStyle.mock.calls[0][1])).toContain('mintelGlobal');
    });
});
