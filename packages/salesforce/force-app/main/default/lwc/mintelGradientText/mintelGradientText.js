import { LightningElement, api } from 'lwc';

/** Text filled with a slowly moving brand gradient (blue, purple, cyan). */
export default class MintelGradientText extends LightningElement {
    @api text = 'Customer Experience';
    /** "small", "medium" or "large". */
    @api size = 'large';
}
