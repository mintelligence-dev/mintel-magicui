import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

/**
 * Big tap targets for the actions people use most on a page. Each line of `actions` is
 * "Label | icon | type | target", where type is:
 *   flow    target = Flow API name (opens /flow/<name>?recordId=…)
 *   action  target = quick action API name with its object, e.g. "Global.NewTask" or "Case.LogACall"
 *   url     target = a URL
 *   event   target = any name; fires an `action` event for a parent LWC
 * Lines are separated by semicolons. Unknown lines are skipped.
 */
export default class QuickActions extends NavigationMixin(LightningElement) {
    @api recordId;
    @api objectApiName;
    @api heading;
    @api actions = 'New task | utility:task | action | Global.NewTask; Log a call | utility:call | action | Global.LogACall; Help | utility:help | url | https://help.salesforce.com';

    get items() {
        return String(this.actions || '')
            .split(';')
            .map((line) => line.split('|').map((s) => s.trim()))
            .filter((parts) => parts.length === 4 && parts[0] && ['flow', 'action', 'url', 'event'].includes(parts[2]))
            .map(([label, icon, type, target], index) => ({ key: `${index}-${label}`, index, label, icon: icon || 'utility:apps', type, target }));
    }

    handleClick(event) {
        const a = this.items[Number(event.currentTarget.dataset.index)];
        if (!a) return;
        if (a.type === 'event') {
            this.dispatchEvent(new CustomEvent('action', { detail: { name: a.target, label: a.label } }));
            return;
        }
        const pageReference =
            a.type === 'url'
                ? { type: 'standard__webPage', attributes: { url: a.target } }
                : a.type === 'flow'
                ? { type: 'standard__webPage', attributes: { url: `/flow/${encodeURIComponent(a.target)}${this.recordId ? `?recordId=${this.recordId}` : ''}` } }
                : {
                      type: 'standard__quickAction',
                      // "Object.Action" as given; a bare name belongs to this page's object, or is global where there is none.
                      attributes: { apiName: a.target.includes('.') ? a.target : `${this.objectApiName || 'Global'}.${a.target}` },
                      state: this.recordId ? { recordId: this.recordId } : {}
                  };
        this[NavigationMixin.Navigate](pageReference);
    }
}
