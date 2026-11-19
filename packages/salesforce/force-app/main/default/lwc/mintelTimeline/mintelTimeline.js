import { LightningElement, api } from 'lwc';

/** Vertical event list. Put <c-mintel-timeline-item> children inside, in the order you want. */
export default class MintelTimeline extends LightningElement {
    @api label = 'Timeline';
}
