// lightning/navigation for jest: records the last page reference passed to Navigate, so tests can assert it.
import { createTestWireAdapter } from '@salesforce/wire-service-jest-util';

export const CurrentPageReference = createTestWireAdapter(jest.fn());

let lastPageReference;
let lastReplace;
export const getNavigateCalledWith = () => lastPageReference;
export const getNavigateReplaceArg = () => lastReplace;

const Navigate = Symbol('Navigate');
const GenerateUrl = Symbol('GenerateUrl');
export const NavigationMixin = (Base) =>
    class extends Base {
        [Navigate](pageReference, replace) {
            lastPageReference = pageReference;
            lastReplace = replace;
        }
        [GenerateUrl]() {
            return Promise.resolve('https://www.example.com');
        }
    };
NavigationMixin.Navigate = Navigate;
NavigationMixin.GenerateUrl = GenerateUrl;
