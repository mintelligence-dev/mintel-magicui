import { LightningElement, api } from 'lwc';

/** One tab inside <c-tabs>. Its content is shown while the tab is active. */
export default class Tab extends LightningElement {
    @api label;
    @api value;
    /** Set by the parent <c-tabs>. */
    @api active = false;

    get hidden() {
        return !this.active;
    }
}
