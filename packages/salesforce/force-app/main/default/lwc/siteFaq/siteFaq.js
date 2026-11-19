import { LightningElement, api } from 'lwc';

/**
 * FAQ for Experience Cloud pages, built on native <details> (keyboard and screen-reader friendly, no script).
 * `questions` is "Question | Answer; …". The first one starts open.
 */
export default class SiteFaq extends LightningElement {
    @api title = 'Questions, answered';
    @api description;
    @api questions =
        'Which channels can I use? | LINE, Facebook Messenger and web chat. ; How fast will you reply? | Usually within a few minutes during business hours. ; Is my data safe? | Yes. It is stored in Salesforce with your organisation’s security settings.';

    get items() {
        return String(this.questions || '')
            .split(';')
            .map((line) => line.split('|').map((s) => s.trim()))
            .filter((p) => p[0] && p[1])
            .map(([question, answer], i) => ({ key: `${i}-${question}`, question, answer, open: i === 0 }));
    }
}
