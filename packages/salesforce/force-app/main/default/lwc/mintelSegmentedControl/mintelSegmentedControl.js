import { LightningElement, api } from 'lwc';

/**
 * Segmented control: a tinted track with a thumb that springs to the selected option.
 * `options` is "value:Label,value:Label" (App Builder) or an array of { value, label } (from JS).
 * Arrow keys move the selection. Fires `change` with { value }.
 */
export default class MintelSegmentedControl extends LightningElement {
    @api label = 'Options';
    /** "default" (white thumb) or "brand". */
    @api variant = 'default';

    @api
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = value;
    }

    @api
    get value() {
        return this._value;
    }
    set value(v) {
        this._value = v;
    }

    _options = 'day:Day,week:Week,month:Month';
    _value;
    thumbStyle = '';

    get parsed() {
        const raw = this._options;
        if (Array.isArray(raw)) return raw;
        return String(raw || '')
            .split(',')
            .map((part) => part.trim())
            .filter(Boolean)
            .map((part) => {
                const [value, label] = part.split(':');
                return { value: value.trim(), label: (label || value).trim() };
            });
    }

    get selectedValue() {
        const list = this.parsed;
        return list.some((o) => o.value === this._value) ? this._value : list.length ? list[0].value : undefined;
    }

    get rootClass() {
        return `track ${this.variant === 'brand' ? 'brand' : 'default'}`;
    }

    get items() {
        const selected = this.selectedValue;
        return this.parsed.map((o) => {
            const on = o.value === selected;
            return {
                ...o,
                ariaChecked: on ? 'true' : 'false',
                tabindex: on ? '0' : '-1',
                className: on ? 'segment active' : 'segment'
            };
        });
    }

    renderedCallback() {
        this.positionThumb();
        this.observeSize();
    }

    disconnectedCallback() {
        if (this._resizeObserver) this._resizeObserver.disconnect();
        this._resizeObserver = undefined;
    }

    positionThumb() {
        const btn = this.template.querySelector('button.active');
        if (!btn) return;
        const style = `width:${btn.offsetWidth}px;transform:translateX(${btn.offsetLeft}px)`;
        if (style !== this.thumbStyle) this.thumbStyle = style;
    }

    // Re-measure when the track changes size (first shown while hidden, fonts loading, resizing).
    observeSize() {
        if (this._resizeObserver || typeof ResizeObserver === 'undefined') return;
        const track = this.template.querySelector('.track');
        if (!track) return;
        this._resizeObserver = new ResizeObserver(() => this.positionThumb());
        this._resizeObserver.observe(track);
    }

    choose(value, focus) {
        if (value === this.selectedValue) return;
        this._value = value;
        this.dispatchEvent(new CustomEvent('change', { detail: { value } }));
        if (focus) {
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            requestAnimationFrame(() => {
                const btn = this.template.querySelector(`button[data-value="${value}"]`);
                if (btn) btn.focus();
            });
        }
    }

    handleClick(event) {
        this.choose(event.currentTarget.dataset.value, false);
    }

    handleKeydown(event) {
        const dir = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
        const list = this.parsed;
        if (!dir || !list.length) return;
        event.preventDefault();
        const i = list.findIndex((o) => o.value === this.selectedValue);
        this.choose(list[(i + dir + list.length) % list.length].value, true);
    }
}
