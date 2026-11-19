import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import MINTEL_GLOBAL from '@salesforce/resourceUrl/mintelGlobal';

/**
 * Invisible helper: drop it once on a Lightning page to load the Mintel brand stylesheet
 * (CSS variables + SLDS styling hooks), which rebrands standard lightning-* components.
 * For Experience Cloud LWR sites, link the static resource from the head markup instead.
 */
export default class MintelBrandLoader extends LightningElement {
    static loaded = false;

    connectedCallback() {
        if (MintelBrandLoader.loaded) return;
        MintelBrandLoader.loaded = true;
        loadStyle(this, MINTEL_GLOBAL).catch((error) => {
            MintelBrandLoader.loaded = false;
            // eslint-disable-next-line no-console
            console.error('Mintel brand stylesheet failed to load', error);
        });
    }
}
