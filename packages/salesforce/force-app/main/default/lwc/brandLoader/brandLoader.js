import { LightningElement, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import MINTEL_GLOBAL from '@salesforce/resourceUrl/mintelGlobal';
import MINTEL_FOLLOW_ORG from '@salesforce/resourceUrl/mintelFollowOrg';

const STYLESHEETS = {
    brand: MINTEL_GLOBAL,
    'follow-org': MINTEL_FOLLOW_ORG
};

// Stylesheets already requested on this page (shared by every Brand Loader instance).
const requested = new Set();

/**
 * Invisible helper: drop it once on a Lightning page.
 * - theme "brand" (default): loads the Mintel brand stylesheet (CSS variables + SLDS styling hooks),
 *   which rebrands standard lightning-* components.
 * - theme "follow-org": Mintel LWC on the page take their colors, radius and font from the org's
 *   SLDS 2 theme instead; standard components are left as they are.
 * For Experience Cloud LWR sites, link the static resource from the head markup instead.
 */
export default class BrandLoader extends LightningElement {
    @api theme = 'brand';

    connectedCallback() {
        const url = STYLESHEETS[this.theme] || STYLESHEETS.brand;
        if (requested.has(url)) return;
        requested.add(url);
        loadStyle(this, url).catch((error) => {
            requested.delete(url);
            // eslint-disable-next-line no-console
            console.error('Mintel stylesheet failed to load', error);
        });
    }
}
