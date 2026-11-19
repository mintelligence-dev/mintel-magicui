import { LightningElement, api } from 'lwc';

/** Closing call to action on a brand-gradient band, for Experience Cloud pages. */
export default class SiteCta extends LightningElement {
    @api title = 'Need help? We are one message away.';
    @api description;
    @api primaryLabel = 'Start a chat';
    @api primaryUrl = '#';
    @api secondaryLabel;
    @api secondaryUrl = '#';
}
