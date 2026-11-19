---
"@mintelligence-dev/tokens": minor
"@mintelligence-dev/salesforce": minor
---

Mintel LWC can follow the org's SLDS 2 theme: Brand Loader gets a Theme property (brand or follow-org), the new mintelFollowOrg stylesheet maps the components to the SLDS 2 global styling hooks, and class="mintel-follow-org" opts in a single component. Without the opt-in nothing changes. Also fixes the Brand Loader, which threw an error and never loaded the brand stylesheet after the components were renamed.
