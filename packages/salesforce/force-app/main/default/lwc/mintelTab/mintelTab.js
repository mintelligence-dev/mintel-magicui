import { LightningElement, api } from 'lwc';

/** One tab inside <c-mintel-tabs>. Its content is shown while the tab is active. */
export default class MintelTab extends LightningElement {
    @api label;
    @api value;
    /** Set by the parent <c-mintel-tabs>. */
    @api active = false;

    get hidden() {
        return !this.active;
    }
}
