import { createElement } from 'lwc';
import QuickActions from 'c/quickActions';
import { getNavigateCalledWith } from 'lightning/navigation';

const flush = () => Promise.resolve();
function make(props) {
    const el = createElement('c-quick-actions', { is: QuickActions });
    Object.assign(el, { recordId: '500xx', objectApiName: 'Case', ...props });
    document.body.appendChild(el);
    return el;
}
const buttons = (el) => Array.from(el.shadowRoot.querySelectorAll('.action'));

describe('c-quick-actions', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    it('parses actions and skips bad lines', async () => {
        const el = make({ actions: 'Task | utility:task | action | NewTask; broken line; Help | utility:help | url | https://example.com' });
        await flush();
        expect(buttons(el).map((b) => b.textContent.trim())).toEqual(['Task', 'Help']);
    });

    it('opens a record quick action with the object prefix', async () => {
        const el = make({ actions: 'Task | utility:task | action | NewTask' });
        await flush();
        buttons(el)[0].click();
        expect(getNavigateCalledWith()).toEqual({ type: 'standard__quickAction', attributes: { apiName: 'Case.NewTask' }, state: { recordId: '500xx' } });
    });

    it('opens a flow with the record id', async () => {
        const el = make({ actions: 'Send LINE | utility:chat | flow | Send_Line' });
        await flush();
        buttons(el)[0].click();
        expect(getNavigateCalledWith()).toEqual({ type: 'standard__webPage', attributes: { url: '/flow/Send_Line?recordId=500xx' } });
    });

    it('fires an action event for event-type buttons', async () => {
        const el = make({ actions: 'Escalate | utility:priority | event | escalate' });
        const handler = jest.fn();
        el.addEventListener('action', handler);
        await flush();
        buttons(el)[0].click();
        expect(handler.mock.calls[0][0].detail).toEqual({ name: 'escalate', label: 'Escalate' });
    });

    it('treats a bare action name as global when the page has no object (app and home pages)', async () => {
        const el = make({ recordId: undefined, objectApiName: undefined, actions: 'Task | utility:task | action | NewTask' });
        await flush();
        buttons(el)[0].click();
        expect(getNavigateCalledWith()).toEqual({ type: 'standard__quickAction', attributes: { apiName: 'Global.NewTask' }, state: {} });
    });

    it('keeps an action name that already has its object', async () => {
        const el = make({ actions: 'Call | utility:call | action | Global.LogACall' });
        await flush();
        buttons(el)[0].click();
        expect(getNavigateCalledWith().attributes.apiName).toBe('Global.LogACall');
    });
});
