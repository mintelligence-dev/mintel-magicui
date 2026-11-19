import { LightningElement, api } from 'lwc';

const CHANNELS = {
    line: { label: 'LINE', color: '#06C755' },
    facebook: { label: 'Messenger', color: '#0866FF' },
    instagram: { label: 'Instagram', color: '#E1306C' },
    tiktok: { label: 'TikTok', color: '#111111' },
    whatsapp: { label: 'WhatsApp', color: '#25D366' },
    web: { label: 'Web chat', color: 'var(--mintel-brand)' }
};
const STRINGS = {
    th: {
        today: 'วันนี้',
        yesterday: 'เมื่อวาน',
        placeholder: 'พิมพ์ข้อความ...',
        send: 'ส่ง',
        newMessages: 'ข้อความใหม่ ↓',
        typing: 'กำลังพิมพ์…',
        status: { sending: 'กำลังส่ง', sent: 'ส่งแล้ว', delivered: 'ถึงแล้ว', read: 'อ่านแล้ว', failed: 'ส่งไม่สำเร็จ' }
    },
    en: {
        today: 'Today',
        yesterday: 'Yesterday',
        placeholder: 'Type a message...',
        send: 'Send',
        newMessages: 'New messages ↓',
        typing: 'typing…',
        status: { sending: 'Sending', sent: 'Sent', delivered: 'Delivered', read: 'Read', failed: 'Failed' }
    }
};

const sameDay = (a, b) => a.toDateString() === b.toDateString();

/**
 * Chat thread for LINE / Messenger / TikTok / WhatsApp messages on a Case or Messaging Session. Pass
 * `messages` from a parent LWC (e.g. from Apex): { id, direction: in|out|system, text, time, author,
 * status, attachments: [{ url, name, size }] }. Sticks to the newest message unless the reader scrolled
 * up. With `show-composer`, fires `send` with { text }.
 */
export default class Conversation extends LightningElement {
    @api title;
    @api subtitle;
    @api channel;
    @api typing;
    @api locale = 'th';
    @api showComposer = false;

    @api
    get messages() {
        return this._messages;
    }
    set messages(value) {
        this._messages = Array.isArray(value) ? value : [];
    }

    _messages = [];
    draft = '';
    showNewPill = false;
    atBottom = true;
    lastSeenId;

    get labels() {
        return STRINGS[this.locale === 'en' ? 'en' : 'th'];
    }
    get dateLocale() {
        return this.locale === 'en' ? 'en-GB' : 'th-TH';
    }
    get hasHeader() {
        return Boolean(this.title || this.channel);
    }
    get channelInfo() {
        const c = CHANNELS[this.channel];
        return c ? { label: c.label, dotStyle: `background:${c.color}` } : null;
    }
    get typingText() {
        return `${this.typing} ${this.labels.typing}`;
    }
    get sendDisabled() {
        return !this.draft.trim();
    }

    dayLabel(d) {
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        if (sameDay(d, now)) return this.labels.today;
        if (sameDay(d, yesterday)) return this.labels.yesterday;
        return d.toLocaleDateString(this.dateLocale, { day: 'numeric', month: 'short', year: 'numeric' });
    }

    get rows() {
        const rows = [];
        this._messages.forEach((m, i) => {
            const date = new Date(m.time);
            const prev = this._messages[i - 1];
            const prevDate = prev ? new Date(prev.time) : null;
            if (!prevDate || !sameDay(prevDate, date)) {
                rows.push({ key: `day-${m.id}`, isDay: true, text: this.dayLabel(date), rowClass: 'day' });
            }
            if (m.direction === 'system') {
                rows.push({ key: m.id, isSystem: true, text: m.text, rowClass: 'row system-row' });
                return;
            }
            const out = m.direction === 'out';
            const authorName = m.author && m.author.name;
            const first =
                !prev ||
                prev.direction !== m.direction ||
                (prev.author && prev.author.name) !== authorName ||
                date - new Date(prev.time) > 5 * 60000;
            rows.push({
                key: m.id,
                rowClass: `row ${out ? 'out' : 'in'}${first ? ' first' : ''}`,
                bubbleClass: `bubble ${out ? 'bubble-out' : 'bubble-in'}`,
                text: m.text,
                author: authorName,
                showAuthor: first && Boolean(authorName),
                showAvatar: !out && first && Boolean(authorName),
                initials: (authorName || '')
                    .split(/\s+/)
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase(),
                time: date.toLocaleTimeString(this.dateLocale, { hour: '2-digit', minute: '2-digit' }),
                status: out && m.status ? this.labels.status[m.status] : null,
                statusClass: `status status-${m.status}`,
                files: (m.attachments || []).map((a, k) => ({ key: `${m.id}-${k}`, url: a.url, name: a.name || a.url, size: a.size }))
            });
        });
        return rows;
    }

    renderedCallback() {
        const last = this._messages[this._messages.length - 1];
        const lastId = last ? last.id : undefined;
        if (lastId === this.lastSeenId && !this.typing) return;
        const first = this.lastSeenId === undefined;
        this.lastSeenId = lastId;
        const log = this.template.querySelector('.log');
        if (!log) return;
        if (first || this.atBottom) {
            log.scrollTop = log.scrollHeight;
        } else if (!this.showNewPill) {
            this.showNewPill = true;
        }
    }

    handleScroll(event) {
        const el = event.currentTarget;
        this.atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
        if (this.atBottom && this.showNewPill) this.showNewPill = false;
    }

    handlePill() {
        const log = this.template.querySelector('.log');
        if (log) log.scrollTop = log.scrollHeight;
        this.atBottom = true;
        this.showNewPill = false;
    }

    handleInput(event) {
        this.draft = event.target.value;
    }

    handleKeydown(event) {
        if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
            event.preventDefault();
            this.send();
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.send();
    }

    send() {
        const text = this.draft.trim();
        if (!text) return;
        this.dispatchEvent(new CustomEvent('send', { detail: { text } }));
        this.draft = '';
        this.atBottom = true;
        const input = this.template.querySelector('.input');
        if (input) input.value = '';
    }
}
