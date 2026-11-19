import { LightningElement, api, wire } from 'lwc';
import { gql, graphql } from 'lightning/uiGraphQLApi';

const STRINGS = {
    th: { title: 'กิจกรรม', show: 'แสดง', all: 'ทั้งหมด', tasks: 'งาน', events: 'นัดหมาย', empty: 'ยังไม่มีกิจกรรม', failed: 'โหลดกิจกรรมไม่สำเร็จ', overdue: 'เลยกำหนด', due: 'กำหนด' },
    en: { title: 'Activity', show: 'Show', all: 'All', tasks: 'Tasks', events: 'Events', empty: 'No activity yet', failed: 'Could not load activity', overdue: 'Overdue', due: 'Due' }
};

// UI API GraphQL: Task and Event linked to the record (WhatId for accounts/cases/opportunities, WhoId for
// contacts/leads). Respects sharing and field-level security; no Apex needed.
const QUERY = gql`
    query activities($recordId: ID, $limit: Int) {
        uiapi {
            query {
                Task(
                    where: { or: [{ WhatId: { eq: $recordId } }, { WhoId: { eq: $recordId } }] }
                    orderBy: { ActivityDate: { order: DESC, nulls: LAST } }
                    first: $limit
                ) {
                    edges {
                        node {
                            Id
                            Subject {
                                value
                            }
                            Status {
                                value
                            }
                            IsClosed {
                                value
                            }
                            ActivityDate {
                                value
                            }
                            Description {
                                value
                            }
                        }
                    }
                }
                Event(
                    where: { or: [{ WhatId: { eq: $recordId } }, { WhoId: { eq: $recordId } }] }
                    orderBy: { StartDateTime: { order: DESC } }
                    first: $limit
                ) {
                    edges {
                        node {
                            Id
                            Subject {
                                value
                            }
                            StartDateTime {
                                value
                            }
                            Location {
                                value
                            }
                        }
                    }
                }
            }
        }
    }
`;

/**
 * Tasks and events for the record in one timeline, newest first, with an All / Tasks / Events filter.
 * Open tasks past their due date are red; open ones are marked current; completed ones are green.
 */
export default class ActivityTimeline extends LightningElement {
    @api recordId;
    @api limit = 20;
    @api label;
    @api locale = 'th';

    filter = 'all';
    tasks = [];
    events = [];
    errorText;
    loaded = false;

    get query() {
        return this.recordId ? QUERY : undefined;
    }
    get variables() {
        return { recordId: this.recordId, limit: Number(this.limit) || 20 };
    }

    @wire(graphql, { query: '$query', variables: '$variables' })
    wiredActivities({ data, errors }) {
        if (errors && errors.length) {
            this.errorText = this.labels.failed;
            this.loaded = true;
        } else if (data && data.uiapi) {
            const q = data.uiapi.query;
            this.tasks = (q.Task ? q.Task.edges : []).map((e) => e.node);
            this.events = (q.Event ? q.Event.edges : []).map((e) => e.node);
            this.errorText = undefined;
            this.loaded = true;
        }
    }

    get labels() {
        return STRINGS[this.locale === 'en' ? 'en' : 'th'];
    }
    get heading() {
        return this.label || this.labels.title;
    }
    get dateLocale() {
        return this.locale === 'en' ? 'en-GB' : 'th-TH';
    }
    get filterOptions() {
        return ['all', 'tasks', 'events'].map((v) => ({
            value: v,
            label: this.labels[v],
            checked: this.filter === v ? 'true' : 'false',
            className: this.filter === v ? 'chip on' : 'chip'
        }));
    }

    handleFilter(event) {
        this.filter = event.currentTarget.dataset.value;
    }

    get items() {
        const today = new Date().toISOString().slice(0, 10);
        const fmt = (iso, withTime) =>
            iso
                ? new Date(iso).toLocaleString(this.dateLocale, withTime ? { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' } : { day: 'numeric', month: 'short', year: 'numeric' })
                : '';
        const tasks =
            this.filter === 'events'
                ? []
                : this.tasks.map((t) => {
                      const due = t.ActivityDate.value;
                      const closed = t.IsClosed.value;
                      const overdue = !closed && due && due < today;
                      return {
                          id: t.Id,
                          sort: due || '',
                          title: t.Subject.value || '—',
                          time: due ? `${overdue ? this.labels.overdue : this.labels.due} ${fmt(due, false)}` : '',
                          description: t.Status.value,
                          variant: closed ? 'success' : overdue ? 'destructive' : 'brand',
                          current: !closed
                      };
                  });
        const events =
            this.filter === 'tasks'
                ? []
                : this.events.map((e) => ({
                      id: e.Id,
                      sort: e.StartDateTime.value || '',
                      title: e.Subject.value || '—',
                      time: fmt(e.StartDateTime.value, true),
                      description: e.Location.value || '',
                      variant: 'default',
                      current: false
                  }));
        return [...tasks, ...events].sort((a, b) => (a.sort < b.sort ? 1 : a.sort > b.sort ? -1 : 0));
    }

    get isEmpty() {
        return this.loaded && this.items.length === 0;
    }
}
