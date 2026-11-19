import { createElement } from 'lwc';
import RecordForm from 'c/recordForm';

// Event name used by ShowToastEvent (lightning/platformShowToastEvent).
const ShowToastEventName = 'lightning__showtoast';

// The Save button is the last one (Cancel, when shown, comes first).
const saveButton = (el) => [...el.shadowRoot.querySelectorAll('lightning-button')].pop();

function mount(props) {
    const el = createElement('c-record-form', { is: RecordForm });
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
}

describe('c-record-form', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    it('groups the fields in titled sections', () => {
        const el = mount({
            recordId: '003000000000001',
            objectApiName: 'Contact',
            sections: 'Contact: FirstName, LastName , Phone | Address: MailingStreet,MailingCity'
        });
        const sections = el.shadowRoot.querySelectorAll('section');
        expect(sections).toHaveLength(2);
        expect([...el.shadowRoot.querySelectorAll('.section-title')].map((h) => h.textContent)).toEqual(['Contact', 'Address']);
        expect([...sections[0].querySelectorAll('lightning-input-field')].map((f) => f.fieldName)).toEqual(['FirstName', 'LastName', 'Phone']);
        const form = el.shadowRoot.querySelector('lightning-record-edit-form');
        expect(form.recordId).toBe('003000000000001');
        expect(form.objectApiName).toBe('Contact');
    });

    it('puts a plain field list in one untitled section', () => {
        const el = mount({ objectApiName: 'Lead', sections: 'FirstName, LastName' });
        expect(el.shadowRoot.querySelectorAll('section')).toHaveLength(1);
        expect(el.shadowRoot.querySelector('.section-title')).toBeNull();
    });

    it('uses one column when asked', () => {
        const el = mount({ objectApiName: 'Lead', sections: 'Name', columns: 1 });
        expect(el.shadowRoot.querySelector('.grid').classList.contains('grid-2')).toBe(false);
    });

    it('disables Save while saving, then toasts and fires success', async () => {
        const el = mount({ objectApiName: 'Lead', sections: 'LastName', locale: 'en' });
        const toast = jest.fn();
        const success = jest.fn();
        el.addEventListener(ShowToastEventName, toast);
        el.addEventListener('success', success);
        const form = el.shadowRoot.querySelector('lightning-record-edit-form');
        const save = () => saveButton(el);

        form.dispatchEvent(new CustomEvent('submit'));
        await Promise.resolve();
        expect(save().disabled).toBe(true);
        expect(save().label).toBe('Saving…');

        form.dispatchEvent(new CustomEvent('success', { detail: { id: '00Q000000000001' } }));
        await Promise.resolve();
        expect(save().disabled).toBe(false);
        expect(toast).toHaveBeenCalledTimes(1);
        expect(toast.mock.calls[0][0].detail.title).toBe('Record created');
        expect(success.mock.calls[0][0].detail).toEqual({ recordId: '00Q000000000001' });
    });

    it('re-enables Save and fires error when saving fails', async () => {
        const el = mount({ objectApiName: 'Lead', sections: 'LastName' });
        const error = jest.fn();
        el.addEventListener('error', error);
        const form = el.shadowRoot.querySelector('lightning-record-edit-form');
        form.dispatchEvent(new CustomEvent('submit'));
        form.dispatchEvent(new CustomEvent('error', { detail: { message: 'Required fields are missing' } }));
        await Promise.resolve();
        expect(saveButton(el).disabled).toBe(false);
        expect(error.mock.calls[0][0].detail.message).toBe('Required fields are missing');
    });

    it('shows Cancel only when enabled, and it fires cancel', async () => {
        const el = mount({ objectApiName: 'Lead', sections: 'LastName' });
        expect(el.shadowRoot.querySelectorAll('lightning-button')).toHaveLength(1);
        el.showCancel = true;
        await Promise.resolve();
        const cancel = jest.fn();
        el.addEventListener('cancel', cancel);
        const buttons = el.shadowRoot.querySelectorAll('lightning-button');
        expect(buttons).toHaveLength(2);
        expect(buttons[1].type).toBe('submit');
        buttons[0].click();
        expect(cancel).toHaveBeenCalled();
    });
});
