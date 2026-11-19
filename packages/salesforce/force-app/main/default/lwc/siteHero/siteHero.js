import { LightningElement, api } from 'lwc';

/** Centered hero for Experience Cloud pages: eyebrow, title with a gradient highlight, copy and two buttons. */
export default class SiteHero extends LightningElement {
    @api eyebrow;
    @api title = 'Customer service that';
    @api highlight = 'feels personal';
    @api description;
    @api primaryLabel = 'Get started';
    @api primaryUrl = '#';
    @api secondaryLabel;
    @api secondaryUrl = '#';
}
