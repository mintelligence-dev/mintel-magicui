import { LightningElement, api } from 'lwc';

/** Test-only host that composes c-tabs the way a real LWC would. */
export default class TabsHost extends LightningElement {
    @api active;
    @api changes = [];

    handleChange(event) {
        this.changes.push(event.detail.value);
    }
}
