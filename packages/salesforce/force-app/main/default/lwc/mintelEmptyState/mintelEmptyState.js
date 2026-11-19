import { LightningElement, api } from 'lwc';

/**
 * Branded "nothing here yet" block for related lists, tabs and pages: an icon in a soft halo, a title,
 * a description and an optional button (fires `action`) or slotted content.
 */
export default class MintelEmptyState extends LightningElement {
    @api title = 'Nothing here yet';
    @api description;
    @api iconName = 'utility:inbox';
    @api actionLabel;

    handleAction() {
        this.dispatchEvent(new CustomEvent('action'));
    }
}
