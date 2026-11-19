import { LightningElement, api } from 'lwc';

const TINTS = ['--mintel-brand', '--mintel-brand-accent', '--mintel-brand-cyan', '--mintel-success', '--mintel-warning'];

/**
 * Overlapping avatars (case team, account owners …). `people` is an array of { name, photoUrl } from a
 * parent LWC, or `names` is a comma list for App Builder. Extra people collapse into "+N".
 */
export default class MintelAvatarGroup extends LightningElement {
    @api people;
    @api names = '';
    @api max = 4;
    @api label = 'People';
    /** small | medium | large */
    @api size = 'medium';

    get list() {
        if (Array.isArray(this.people)) return this.people;
        return String(this.names || '')
            .split(',')
            .map((n) => n.trim())
            .filter(Boolean)
            .map((name) => ({ name }));
    }

    get shown() {
        return this.list.slice(0, Number(this.max) || 4).map((p, i) => {
            const tint = TINTS[i % TINTS.length];
            return {
                key: `${p.name}-${i}`,
                name: p.name,
                photoUrl: p.photoUrl,
                initials: p.name
                    .split(/\s+/)
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase(),
                style: `--tint: var(${tint}); z-index:${20 - i}`
            };
        });
    }

    get extra() {
        const n = this.list.length - this.shown.length;
        return n > 0 ? n : 0;
    }

    get extraTitle() {
        return this.list
            .slice(this.shown.length)
            .map((p) => p.name)
            .join(', ');
    }

    connectedCallback() {
        this.classList.add(`size-${this.size}`);
    }
}
