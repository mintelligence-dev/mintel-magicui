import { createElement } from 'lwc';
import MintelThaiAddress from 'c/mintelThaiAddress';

const DATA = {
    v: 1,
    p: [
        [1, 'กรุงเทพมหานคร', 'Bangkok'],
        [38, 'เชียงใหม่', 'Chiang Mai']
    ],
    d: [
        [1001, 1, 'พระนคร', 'Phra Nakhon'],
        [3801, 38, 'เมืองเชียงใหม่', 'Mueang Chiang Mai']
    ],
    s: [
        [100101, 1001, 'พระบรมมหาราชวัง', 'Phra Borom Maha Ratchawang', '10200'],
        [100102, 1001, 'วังบูรพาภิรมย์', 'Wang Burapha Phirom', '10200'],
        [380101, 3801, 'ศรีภูมิ', 'Si Phum', '50200'],
        [380102, 3801, 'พระสิงห์', 'Phra Sing', '50200'],
        [380103, 3801, 'หายยา', 'Hai Ya', '50100']
    ]
};

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));
const combos = (el) => Array.from(el.shadowRoot.querySelectorAll('lightning-combobox'));
const zipInput = (el) => el.shadowRoot.querySelector('lightning-input');
const change = (node, value) => node.dispatchEvent(new CustomEvent('change', { detail: { value } }));

async function make(props = {}) {
    const el = createElement('c-mintel-thai-address', { is: MintelThaiAddress });
    Object.assign(el, props);
    const events = [];
    el.addEventListener('change', (e) => events.push(e.detail));
    document.body.appendChild(el);
    await flush();
    await flush();
    return { el, events };
}

describe('c-mintel-thai-address', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(DATA) }));
    });
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    it('cascades province -> district -> sub-district and fills the postal code', async () => {
        const { el, events } = await make();
        expect(combos(el)[0].options.map((o) => o.label)).toEqual(['กรุงเทพมหานคร', 'เชียงใหม่']);
        change(combos(el)[0], '38');
        await flush();
        expect(combos(el)[1].options).toEqual([{ value: '3801', label: 'เมืองเชียงใหม่' }]);
        change(combos(el)[1], '3801');
        await flush();
        change(combos(el)[2], '380103');
        await flush();
        expect(events.pop()).toMatchObject({ province: 'เชียงใหม่', district: 'เมืองเชียงใหม่', subDistrict: 'หายยา', zip: '50100' });
        expect(el.zip).toBe('50100');
    });

    it('fills up to the district from a shared postal code and narrows the sub-districts', async () => {
        const { el } = await make();
        change(zipInput(el), '50200');
        await flush();
        expect(el.districtId).toBe(3801);
        expect(combos(el)[2].options.map((o) => o.label)).toEqual(['ศรีภูมิ', 'พระสิงห์']);
        expect(el.shadowRoot.querySelector('.hint').textContent).toContain('หลายตำบล');
    });

    it('uses Bangkok labels and English names', async () => {
        const { el, events } = await make({ locale: 'en' });
        change(combos(el)[0], '1');
        await flush();
        expect(combos(el)[1].label).toBe('District (Khet)');
        change(combos(el)[1], '1001');
        await flush();
        change(combos(el)[2], '100102');
        await flush();
        expect(events.pop()).toMatchObject({ province: 'Bangkok', subDistrict: 'Wang Burapha Phirom', zip: '10200' });
    });

    it('validates for Flow when required', async () => {
        const { el } = await make({ required: true });
        expect(el.validate().isValid).toBe(false);
        change(zipInput(el), '50100');
        await flush();
        expect(el.validate().isValid).toBe(true);
    });
});
