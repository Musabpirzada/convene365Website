# Convene365 website

A static marketing website for Convene365: plain HTML, CSS and JavaScript. No build step, no framework, no dependencies.

## Open it

- **VS Code:** open this folder, install the *Live Server* extension, right-click `index.html` > *Open with Live Server*.
- **Without VS Code:** double-click `index.html`. Everything works from the file system.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: the problem, the solution, the three apps with screenshots, the "last seat" proof, why Convene365 |
| `features.html` | Planning, ticketing, attendee website, check-in, the four Power BI report pages (tabbed gallery), security |
| `compare.html` | Interactive comparison with spreadsheets, standalone ticketing sites and D365 Customer Insights – Journeys, plus a fair-fit section |
| `pricing.html` | Starter, Professional, Enterprise with yearly prices; how billing works (annual invoice); setup services; Microsoft licences; FAQ |
| `contact.html` | Contact form that opens the visitor's email app with the message filled in |

## Before you publish

1. **Contact email.** Set `CONTACT_EMAIL` at the top of `assets/js/main.js`. It is used by every "Email us" link and by the contact form. It is currently `business@branqorinc.com`.
2. **Prices.** `pricing.html` shows yearly starting prices (Starter from $1,500, Professional from $4,000, Enterprise custom, setup from $1,500). Search the file for `From $` and `from $1,500` to change them.
3. **Customer Insights price.** `compare.html` quotes Microsoft's list price as checked in October 2026. Check it again before publishing and update the footnote date.

## Files

```
index.html  features.html  compare.html  pricing.html  contact.html
assets/
  css/styles.css        all styles; brand colours are CSS variables at the top
  js/main.js            menu, scroll reveal, comparison toggles, contact form
  img/logo-mark.svg            the gathering-C mark (navy dots, amber centre)
  img/logo-mark-reversed.svg   for dark backgrounds
  img/favicon.svg              simplified 8-dot mark
  img/screens/*.webp           app screenshots (website, Admin app, Check-in app, Power BI pbi-*.webp)
```

## Notes

- Fonts: Sora (headings, wordmark) and Source Sans 3 (body) from Google Fonts, with system fallbacks.
- The contact form doesn't send anything from the website; it opens the visitor's email app. To receive submissions without email, connect it later to a form service or a Power Automate HTTP flow.
- Accessible by default: skip link, keyboard-friendly menu, visible focus, labelled form fields, reduced-motion support.
- `checkin-search.webp` is included but not used: in that screenshot a label overlaps the attendee name. Retake it if you want to show search.
