import { LightningElement, api } from 'lwc';

const VARIANTS = ['default', 'brand', 'success', 'warning', 'destructive'];

/**
 * One event in <c-mintel-timeline>. Default slot = description; slot="icon" puts an icon in a larger dot.
 * `current` pulses the dot (off under reduced motion).
 */
export default class MintelTimelineItem extends LightningElement {
    @api title;
    @api time;
    @api variant = 'default';
    @api current = false;
    /** True when something is slotted into slot="icon" (switches to the large dot). */
    hasIcon = false;

    connectedCallback() {
        this.setAttribute('role', 'listitem');
        if (this.current) this.setAttribute('aria-current', 'step');
    }

    handleIconSlot(event) {
        this.hasIcon = event.target.assignedNodes().length > 0;
    }

    get tone() {
        return VARIANTS.includes(this.variant) ? this.variant : 'default';
    }

    get dotClass() {
        return `dot ${this.tone}${this.hasIcon ? ' large' : ''}`;
    }

    get pulseClass() {
        return `pulse ${this.tone}`;
    }
}
