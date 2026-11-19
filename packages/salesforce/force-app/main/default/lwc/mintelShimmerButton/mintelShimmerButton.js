import { LightningElement, api } from 'lwc';

/**
 * Brand-gradient call-to-action button with a light sweep around its edge.
 * Fires a standard `click` event; the animation stops when the user prefers reduced motion.
 */
export default class MintelShimmerButton extends LightningElement {
    @api label = 'Get started';
    @api disabled = false;

    handleClick(event) {
        if (this.disabled) {
            event.stopPropagation();
        }
    }
}
