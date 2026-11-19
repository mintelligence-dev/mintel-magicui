import { LightningElement, api } from 'lwc';

/** Frosted glass card. Falls back to a solid surface when backdrop-filter is unavailable. */
export default class MintelGlassCard extends LightningElement {
    /** Card heading (optional). */
    @api title;
    /** Secondary line under the heading (optional). */
    @api subtitle;
    /** "default" (frosted white/navy) or "brand" (brand-tinted glass). */
    @api variant = 'default';
}
