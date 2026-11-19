import { LightningElement, api } from 'lwc';

const KEY = 'mintel-announcement:';

/**
 * Banner for a page-wide message (maintenance, new feature, policy). Admins set it in App Builder.
 * When dismissible, closing it is remembered on this device until `version` changes, so a new message shows
 * again. Storage errors (private mode, blocked storage) just mean it shows every time.
 */
export default class Announcement extends LightningElement {
    @api title;
    @api message = '';
    /** info | success | warning | brand */
    @api variant = 'info';
    @api linkLabel;
    @api linkUrl;
    @api dismissible = false;
    /** Change it to show a dismissed banner again. */
    @api version = '1';
    @api locale = 'th';

    dismissed = false;

    connectedCallback() {
        try {
            this.dismissed = this.dismissible && window.localStorage.getItem(this.storageKey) === '1';
        } catch {
            this.dismissed = false;
        }
    }

    get storageKey() {
        return `${KEY}${this.title || ''}:${this.version}`;
    }
    get visible() {
        return Boolean(this.message) && !this.dismissed;
    }
    get rootClass() {
        const v = ['info', 'success', 'warning', 'brand'].includes(this.variant) ? this.variant : 'info';
        return `banner ${v}`;
    }
    get role() {
        return this.variant === 'warning' ? 'alert' : 'status';
    }
    get linkTarget() {
        return /^https?:/.test(this.linkUrl || '') ? '_blank' : '_self';
    }
    get closeLabel() {
        return this.locale === 'en' ? 'Dismiss' : 'ปิด';
    }

    handleDismiss() {
        this.dismissed = true;
        try {
            window.localStorage.setItem(this.storageKey, '1');
        } catch {
            // Not remembered; fine.
        }
        this.dispatchEvent(new CustomEvent('dismiss'));
    }
}
