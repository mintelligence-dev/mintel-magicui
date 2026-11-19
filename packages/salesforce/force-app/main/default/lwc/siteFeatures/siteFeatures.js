import { LightningElement, api } from 'lwc';

/**
 * Feature grid for Experience Cloud pages. `features` is "Title | Description | icon; …" (icon optional, an SLDS
 * name such as utility:chat). Cards rise in one after another.
 */
export default class SiteFeatures extends LightningElement {
    @api eyebrow;
    @api title = 'Everything your customers need';
    @api description;
    @api features =
        'One inbox | LINE, Facebook and web chat in one place | utility:chat; Fast answers | AI suggests replies in Thai or English | utility:einstein; Always on track | SLA timers keep every case moving | utility:clock';

    get items() {
        return String(this.features || '')
            .split(';')
            .map((line) => line.split('|').map((s) => s.trim()))
            .filter((p) => p[0])
            .map(([title, text, icon], i) => ({ key: `${i}-${title}`, title, text: text || '', icon: icon || 'utility:check', style: `animation-delay:${Math.min(i, 8) * 70}ms` }));
    }
}
