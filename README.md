# Convene365

A complete five-page marketing site in plain HTML, CSS and vanilla JavaScript. No framework, build step or package installation. Fonts, photography and product screenshots are served locally. The contact form loads from HubSpot.

## Preview

Open `index.html` directly, use VS Code Live Server, or run:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Then visit http://127.0.0.1:4173. Deploy the five HTML files and the `assets/` directory to any static host.

## Pages

- `index.html`: editorial introduction, interactive product walkthrough, check-in, Microsoft foundation and pricing introduction.
- `features.html`: planning, ticketing, registration, check-in, keyboard-accessible Power BI gallery and security.
- `compare.html`: focused side-by-side comparison. Choose spreadsheets, ticketing platforms or Customer Insights; all alternatives remain available without JavaScript.
- `pricing.html`: annual packages, separate setup and licensing costs, billing information and FAQs. Roadmap features are explicitly labelled.
- `contact.html`: embedded HubSpot enquiry form, with direct email and copy-email alternatives.

## Editing

- Shared styles and design tokens: `assets/css/styles.css`.
- Interactive behavior: `assets/js/main.js`.
- Recipient: `CONTACT_EMAIL` in JavaScript. Update the matching `mailto:` links and visible email addresses in the HTML too, so contact still works without JavaScript.
- Prices and package content: `pricing.html`; also update the price introduction in `index.html`.
- Header and footer are plain HTML in each page. Update all five for navigation changes.
- The site uses Manrope and DM Sans, self-hosted as WOFF2. Their SIL Open Font License files are in `assets/fonts/`.

## Contact behavior

The contact page embeds HubSpot form `03453363-2b64-4092-8175-9bf2694109c7` from portal `246852561` in region `na2`. HubSpot handles the form fields, validation, submissions and confirmation behavior. Manage these in HubSpot.

The embed requires JavaScript and internet access. The direct email link and copy-email control remain available, with additional instructions when JavaScript is disabled. The former local enquiry builder and its automatic `topic` prefill have been removed; any HubSpot field prefill should be configured against the actual HubSpot fields.

## Design references and assets

The redesign takes inspiration from [Luma](https://luma.com/) for an event-first presentation and [Linear](https://linear.app/) for product exploration through actual interfaces. Layouts, copy and styling are original to this site; no reference-site assets were copied.

The existing Convene365 mark, navy/amber identity and product screenshots are retained. The visual system combines warm paper backgrounds, Manrope headings, italic serif accents, fine rules, ticket details and asymmetric editorial sections. Product screens use demo data, not customer results.

Conference photograph: [Unsplash image source](https://images.unsplash.com/photo-1540575467063-178a50c2df87), downloaded to `assets/img/editorial/conference.jpg`. Used as atmospheric event photography, not a customer endorsement.

## Verification

The rebuild was checked in Chromium at desktop, tablet and mobile widths (1440, 768, 390 and 320 pixels), including navigation, keyboard tabs, comparison switching, FAQ disclosure, the original enquiry flow, clipboard behavior and no-JavaScript fallbacks. The original enquiry flow has since been replaced by the HubSpot embed. Local links, fragment targets and image loading were checked. Automated accessibility checks cover WCAG A/AA rules; these are not a substitute for a full manual accessibility audit.
