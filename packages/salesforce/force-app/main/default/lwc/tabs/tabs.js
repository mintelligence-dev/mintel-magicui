import { LightningElement, api } from 'lwc';

/**
 * Tabs with a spring-animated indicator (pill or underline). Put <c-tab label value> children
 * inside; the active tab's content is shown. Arrow keys move between tabs. Fires `tabchange`.
 */
export default class Tabs extends LightningElement {
    /** "pill" or "underline". */
    @api variant = 'pill';
    /** Accessible name of the tab list. */
    @api label = 'Tabs';

    @api
    get activeValue() {
        return this._active;
    }
    set activeValue(value) {
        this._active = value;
        this.syncChildren();
    }

    _active;
    tabs = [];
    indicatorStyle = '';

    get rootClass() {
        return `tabs ${this.variant === 'underline' ? 'underline' : 'pill'}`;
    }

    connectedCallback() {
        this.readTabs();
    }

    renderedCallback() {
        if (!this.tabs.length) this.readTabs();
        this.positionIndicator();
        this.observeSize();
    }

    disconnectedCallback() {
        if (this._resizeObserver) this._resizeObserver.disconnect();
        this._resizeObserver = undefined;
    }

    // Re-measure when the list changes size: first shown inside a hidden tabset or collapsed
    // section, web fonts finishing loading, or the page resizing.
    observeSize() {
        if (this._resizeObserver || typeof ResizeObserver === 'undefined') return;
        const list = this.template.querySelector('.list');
        if (!list) return;
        this._resizeObserver = new ResizeObserver(() => this.positionIndicator());
        this._resizeObserver.observe(list);
    }

    handleSlotChange() {
        this.readTabs();
    }

    readTabs() {
        const children = Array.from(this.querySelectorAll('c-tab'));
        if (!children.length) return;
        if (!this._active || !children.some((c) => c.value === this._active)) this._active = children[0].value;
        this.tabs = children.map((c) => this.toTab(c.label, c.value));
        this.syncChildren();
    }

    toTab(label, value) {
        const selected = value === this._active;
        return {
            label,
            value,
            ariaSelected: selected ? 'true' : 'false',
            tabindex: selected ? '0' : '-1',
            className: selected ? 'tab active' : 'tab'
        };
    }

    syncChildren() {
        Array.from(this.querySelectorAll('c-tab')).forEach((c) => {
            c.active = c.value === this._active;
        });
        if (this.tabs.length) this.tabs = this.tabs.map((t) => this.toTab(t.label, t.value));
    }

    select(value, focus) {
        if (value === this._active) return;
        this._active = value;
        this.syncChildren();
        this.dispatchEvent(new CustomEvent('tabchange', { detail: { value } }));
        if (focus) {
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            requestAnimationFrame(() => {
                const btn = this.template.querySelector(`button[data-value="${value}"]`);
                if (btn) btn.focus();
            });
        }
    }

    handleClick(event) {
        this.select(event.currentTarget.dataset.value, false);
    }

    handleKeydown(event) {
        const dir = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
        if (!dir || !this.tabs.length) return;
        event.preventDefault();
        const i = this.tabs.findIndex((t) => t.value === this._active);
        const next = this.tabs[(i + dir + this.tabs.length) % this.tabs.length];
        this.select(next.value, true);
    }

    positionIndicator() {
        const btn = this.template.querySelector('button.active');
        if (!btn) return;
        const style = `width:${btn.offsetWidth}px;transform:translateX(${btn.offsetLeft}px)`;
        if (style !== this.indicatorStyle) this.indicatorStyle = style;
    }
}
