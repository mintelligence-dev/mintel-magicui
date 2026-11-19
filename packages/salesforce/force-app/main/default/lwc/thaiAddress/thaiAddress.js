import { LightningElement, api } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';
import DATA_URL from '@salesforce/resourceUrl/mintelThaiAddress';

const BANGKOK = 1;
const STRINGS = {
    th: {
        province: 'จังหวัด',
        district: 'อำเภอ',
        districtBkk: 'เขต',
        subDistrict: 'ตำบล',
        subDistrictBkk: 'แขวง',
        zip: 'รหัสไปรษณีย์',
        zipFormat: 'กรอกตัวเลข 5 หลัก',
        pick: 'เลือก...',
        zipMany: 'พบหลายตำบลที่ใช้รหัสนี้ เลือกตำบลด้านบน',
        zipNone: 'ไม่พบรหัสไปรษณีย์นี้',
        failed: 'โหลดข้อมูลที่อยู่ไม่สำเร็จ'
    },
    en: {
        province: 'Province',
        district: 'District',
        districtBkk: 'District (Khet)',
        subDistrict: 'Sub-district',
        subDistrictBkk: 'Sub-district (Khwaeng)',
        zip: 'Postal code',
        zipFormat: 'Enter 5 digits',
        pick: 'Select...',
        zipMany: 'Several sub-districts use this code; pick one above',
        zipNone: 'No sub-district has this postal code',
        failed: 'Could not load address data'
    }
};

// One fetch per page, shared by every instance.
let dataPromise;
function loadData() {
    if (!dataPromise) {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        dataPromise = fetch(DATA_URL).then((r) => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        });
        dataPromise.catch(() => {
            dataPromise = undefined;
        });
    }
    return dataPromise;
}

/**
 * Thai address fields for Flow screens and Lightning pages: province -> district -> sub-district with the
 * postal code filled in, or type the postal code first. Bangkok uses khet / khwaeng. Fires `change` with
 * ids and names; in Flow the names are output properties.
 */
export default class ThaiAddress extends LightningElement {
    @api locale = 'th';
    @api required = false;

    // Flow outputs (also readable from a parent LWC).
    @api province;
    @api district;
    @api subDistrict;
    @api zip = '';
    @api provinceId;
    @api districtId;
    @api subDistrictId;

    data;
    errorText;
    zipMatches = [];

    connectedCallback() {
        loadData()
            .then((data) => {
                this.data = data;
                this.syncNames();
            })
            .catch(() => {
                this.errorText = this.labels.failed;
            });
    }

    get en() {
        return this.locale === 'en';
    }
    get labels() {
        return STRINGS[this.en ? 'en' : 'th'];
    }
    get bkk() {
        return Number(this.provinceId) === BANGKOK;
    }
    get districtLabel() {
        return this.bkk ? this.labels.districtBkk : this.labels.district;
    }
    get subDistrictLabel() {
        return this.bkk ? this.labels.subDistrictBkk : this.labels.subDistrict;
    }
    get notReady() {
        return !this.data;
    }
    get noProvince() {
        return !this.data || !this.provinceId;
    }
    get noSubDistrictChoices() {
        return !this.data || !this.districtId;
    }
    get provinceValue() {
        return this.provinceId ? String(this.provinceId) : null;
    }
    get districtValue() {
        return this.districtId ? String(this.districtId) : null;
    }
    get subDistrictValue() {
        return this.subDistrictId ? String(this.subDistrictId) : null;
    }

    name(row, th, en) {
        return this.en ? row[en] : row[th];
    }

    get provinceOptions() {
        if (!this.data) return [];
        return this.data.p.map((p) => ({ value: String(p[0]), label: this.name(p, 1, 2) }));
    }
    get districtOptions() {
        if (!this.data || !this.provinceId) return [];
        const id = Number(this.provinceId);
        return this.data.d.filter((d) => d[1] === id).map((d) => ({ value: String(d[0]), label: this.name(d, 2, 3) }));
    }
    get subDistrictOptions() {
        if (!this.data || !this.districtId) return [];
        const id = Number(this.districtId);
        let rows = this.data.s.filter((s) => s[1] === id);
        // A postal code shared by several places in this district narrows the list.
        const narrowed = rows.filter((s) => this.zipMatches.some((m) => m[0] === s[0]));
        if (narrowed.length > 1 && !this.subDistrictId) rows = narrowed;
        return rows.map((s) => ({ value: String(s[0]), label: this.name(s, 2, 3) }));
    }
    get zipHint() {
        if (!this.data || !/^\d{5}$/.test(this.zip || '')) return null;
        if (!this.zipMatches.length) return this.labels.zipNone;
        if (this.zipMatches.length > 1 && !this.subDistrictId) return this.labels.zipMany;
        return null;
    }

    handleProvince(event) {
        this.provinceId = Number(event.detail.value);
        this.districtId = undefined;
        this.subDistrictId = undefined;
        this.zip = '';
        this.zipMatches = [];
        this.emit();
    }

    handleDistrict(event) {
        this.districtId = Number(event.detail.value);
        this.subDistrictId = undefined;
        this.zip = '';
        this.emit();
    }

    handleSubDistrict(event) {
        this.fillFromSubDistrict(Number(event.detail.value));
        this.emit();
    }

    handleZip(event) {
        const zip = String(event.detail.value || '')
            .replace(/\D/g, '')
            .slice(0, 5);
        this.zip = zip;
        this.zipMatches = zip.length === 5 && this.data ? this.data.s.filter((s) => s[4] === zip) : [];
        if (this.zipMatches.length === 1) {
            this.fillFromSubDistrict(this.zipMatches[0][0]);
        } else if (this.zipMatches.length > 1) {
            const districts = new Set(this.zipMatches.map((m) => m[1]));
            if (districts.size === 1) {
                const d = this.data.d.find((x) => x[0] === this.zipMatches[0][1]);
                this.provinceId = d[1];
                this.districtId = d[0];
            } else {
                // Several districts share this code: the earlier choice may no longer match it.
                this.provinceId = undefined;
                this.districtId = undefined;
            }
            this.subDistrictId = undefined;
        } else if (zip.length === 5) {
            // Unknown postal code: the earlier sub-district must not pass validation with it.
            this.subDistrictId = undefined;
        }
        this.emit();
    }

    fillFromSubDistrict(id) {
        const s = this.data.s.find((x) => x[0] === id);
        const d = this.data.d.find((x) => x[0] === s[1]);
        this.subDistrictId = s[0];
        this.districtId = d[0];
        this.provinceId = d[1];
        this.zip = s[4];
    }

    syncNames() {
        const p = this.data.p.find((x) => x[0] === Number(this.provinceId));
        const d = this.data.d.find((x) => x[0] === Number(this.districtId));
        const s = this.data.s.find((x) => x[0] === Number(this.subDistrictId));
        this.province = p ? this.name(p, 1, 2) : undefined;
        this.district = d ? this.name(d, 2, 3) : undefined;
        this.subDistrict = s ? this.name(s, 2, 3) : undefined;
    }

    emit() {
        this.syncNames();
        const detail = {
            provinceId: this.provinceId,
            districtId: this.districtId,
            subDistrictId: this.subDistrictId,
            province: this.province,
            district: this.district,
            subDistrict: this.subDistrict,
            zip: this.zip
        };
        this.dispatchEvent(new CustomEvent('change', { detail }));
        // Keep Flow variables in sync as the user picks (not only on Next).
        Object.entries(detail).forEach(([name, value]) => {
            this.dispatchEvent(new FlowAttributeChangeEvent(name, value));
        });
    }

    /** Flow screen validation: every part filled when required. */
    @api
    validate() {
        if (!this.required || (this.subDistrictId && /^\d{5}$/.test(this.zip || ''))) return { isValid: true };
        return { isValid: false, errorMessage: this.en ? 'Complete the address.' : 'กรอกที่อยู่ให้ครบ' };
    }
}
