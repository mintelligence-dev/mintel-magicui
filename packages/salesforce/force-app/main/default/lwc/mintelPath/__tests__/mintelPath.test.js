import { createElement } from 'lwc';
import MintelPath from 'c/mintelPath';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

const PICKLIST = {
    values: [
        { value: 'New', label: 'New' },
        { value: 'Working', label: 'Working' },
        { value: 'Escalated', label: 'Escalated' },
        { value: 'Closed', label: 'Closed' }
    ]
};

const stageButtons = (el) => Array.from(el.shadowRoot.querySelectorAll('button.stage'));
const currentStage = (el) => el.shadowRoot.querySelector('[aria-current="step"]');
const markButton = (el) => el.shadowRoot.querySelector('button.mark');

describe('c-mintel-path', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
        jest.clearAllMocks();
    });

    it('manual mode: renders stages, marks completed ones and changes stage in two steps', async () => {
        const el = createElement('c-mintel-path', { is: MintelPath });
        el.stages = 'New, Working, Closed';
        el.current = 'Working';
        el.locale = 'en';
        const handler = jest.fn();
        el.addEventListener('stagechange', handler);
        document.body.appendChild(el);
        await flush();

        expect(stageButtons(el).map((b) => b.dataset.value)).toEqual(['New', 'Working', 'Closed']);
        expect(currentStage(el).dataset.value).toBe('Working');
        expect(stageButtons(el)[0].classList.contains('complete')).toBe(true);
        expect(markButton(el)).toBeNull();

        stageButtons(el)[2].click();
        await flush();
        expect(markButton(el).textContent).toBe('Mark as current stage');

        markButton(el).click();
        await flush();
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler.mock.calls[0][0].detail).toEqual({ value: 'Closed' });
        expect(currentStage(el).dataset.value).toBe('Closed');
        expect(markButton(el)).toBeNull();
    });

    it('record mode: reads the picklist and current value, then updates the record', async () => {
        const el = createElement('c-mintel-path', { is: MintelPath });
        el.recordId = '500000000000001AAA';
        el.objectApiName = 'Case';
        el.fieldApiName = 'Status';
        document.body.appendChild(el);

        getObjectInfo.emit({ defaultRecordTypeId: '012000000000000AAA', fields: { Status: { updateable: true } } });
        getRecord.emit({ recordTypeId: '012000000000000AAA', fields: { Status: { value: 'Working' } } });
        getPicklistValues.emit(PICKLIST);
        await flush();

        expect(stageButtons(el)).toHaveLength(4);
        expect(currentStage(el).dataset.value).toBe('Working');

        // Selecting does not write; only "Mark as current stage" does.
        stageButtons(el)[2].click();
        await flush();
        expect(updateRecord).not.toHaveBeenCalled();
        expect(markButton(el).textContent).toBe('ตั้งเป็นขั้นปัจจุบัน');

        markButton(el).click();
        await flush();
        expect(updateRecord).toHaveBeenCalledWith({ fields: { Id: '500000000000001AAA', Status: 'Escalated' } });
        expect(currentStage(el).dataset.value).toBe('Escalated');
    });

    it('record mode: blocks saving when the field is read-only', async () => {
        const el = createElement('c-mintel-path', { is: MintelPath });
        el.recordId = '500000000000001AAA';
        el.objectApiName = 'Case';
        el.locale = 'en';
        document.body.appendChild(el);

        getObjectInfo.emit({ defaultRecordTypeId: '012000000000000AAA', fields: { Status: { updateable: false } } });
        getRecord.emit({ recordTypeId: '012000000000000AAA', fields: { Status: { value: 'New' } } });
        getPicklistValues.emit(PICKLIST);
        await flush();

        stageButtons(el)[1].click();
        await flush();
        expect(markButton(el).disabled).toBe(true);
        expect(el.shadowRoot.querySelector('.error').textContent).toBe('You do not have permission to edit this field.');
    });

    it('record mode: shows the error when the update fails', async () => {
        updateRecord.mockRejectedValueOnce({ body: { message: 'Validation rule failed' } });
        const el = createElement('c-mintel-path', { is: MintelPath });
        el.recordId = '500000000000001AAA';
        el.objectApiName = 'Case';
        el.locale = 'en';
        document.body.appendChild(el);

        getObjectInfo.emit({ defaultRecordTypeId: '012000000000000AAA', fields: { Status: { updateable: true } } });
        getRecord.emit({ recordTypeId: '012000000000000AAA', fields: { Status: { value: 'New' } } });
        getPicklistValues.emit(PICKLIST);
        await flush();

        stageButtons(el)[3].click();
        await flush();
        markButton(el).click();
        await flush();
        await flush();
        expect(el.shadowRoot.querySelector('.error').textContent).toBe('Could not save: Validation rule failed');
        expect(currentStage(el).dataset.value).toBe('New');
    });
});
