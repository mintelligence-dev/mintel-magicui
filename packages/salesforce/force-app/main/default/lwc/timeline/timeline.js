import { LightningElement, api } from 'lwc';

/** Vertical event list. Put <c-timeline-item> children inside, in the order you want. */
export default class Timeline extends LightningElement {
    @api label = 'Timeline';
}
