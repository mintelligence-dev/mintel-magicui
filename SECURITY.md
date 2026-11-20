# Security policy

## Reporting a vulnerability

Please do not open a public issue for a security problem.

Report it privately through GitHub: on the repository's **Security** tab choose **Report a vulnerability**
([direct link](https://github.com/mintelligence-dev/mintel-magicui/security/advisories/new)). Include what is affected, how to reproduce it and what an attacker
could do with it.

We aim to reply within 5 working days, and will keep you informed until a fix is released. We are glad to
credit you in the release notes unless you prefer otherwise.

## Supported versions

Fixes go into the latest release. Components installed through the registry are copied into your project, so
after a fix you need to add the component again (`npx shadcn@latest add @mintel/<name>`) or apply the change by
hand.

## Scope

- Component source in `apps/docs/registry` and `packages/salesforce`.
- The docs site and registry at https://mintel-ui.vercel.app.
- The deploy scripts in `packages/salesforce/scripts`.

A vulnerability in a dependency is best reported to that project; tell us too if it affects how Mintel UI uses
it.
