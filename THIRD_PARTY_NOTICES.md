# Third-party notices

## Magic UI

Components in `apps/docs/registry/mintel/effects/` contain portions of
[Magic UI](https://github.com/magicuidesign/magicui), used under the MIT License below.

```
MIT License

Copyright (c) 2023 Magic UI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## shadcn/ui

`apps/docs/registry/mintel/ui/` follows the structure of [shadcn/ui](https://github.com/shadcn-ui/ui)
components (MIT License, Copyright (c) 2023 shadcn).

## Thai province data

`apps/docs/public/mintel/thai-address.json` and
`packages/salesforce/force-app/main/default/staticresources/mintelThaiAddress.json` are generated from
[kongvut/thai-province-data](https://github.com/kongvut/thai-province-data) by
`apps/docs/scripts/build-thai-address.mjs` (MIT License, Copyright (c) 2025 Kongvut Sangkla).

## Fonts

The docs site, and apps set up as the Getting started guide describes, load these fonts from Google Fonts
through `next/font`. The font files are not stored in this repository. All four are licensed under the
[SIL Open Font License 1.1](https://openfontlicense.org).

- Manrope: Copyright The Manrope Project Authors
- Rubik: Copyright The Rubik Project Authors
- IBM Plex Sans Thai: Copyright IBM Corp.
- JetBrains Mono: Copyright The JetBrains Mono Project Authors

## Salesforce Lightning Design System

The Salesforce previews on the docs site load the Salesforce Lightning Design System stylesheet from a CDN
(`@salesforce-ux/design-system`, BSD 3-Clause License, Copyright Salesforce, Inc.). It is not stored in this
repository and is not part of what Mintel UI installs.

## npm dependencies

Components declare the npm packages they need (Radix UI, TanStack, React Hook Form, Zod, React DayPicker,
Recharts, Motion, cmdk, Sonner, Lucide, class-variance-authority and others). They are installed from npm
under their own licenses (MIT, ISC or Apache-2.0) and are not copied into this repository.
