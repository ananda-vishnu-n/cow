# Cow Hostel — Static Website

A responsive, multi-page Cow Hostel / Cow Care & Shelter website built with HTML5, CSS3 and vanilla JavaScript.

## Pages

- `index.html` — Home
- `about.html` — About Us
- `mission-vision.html` — Mission & Vision
- `care.html` — Cow Care / Activities
- `facilities.html` — Facilities
- `gallery.html` — Gallery with category filters and lightbox
- `support.html` — Support / Donate / Volunteer
- `contact.html` — Contact and client-side validated form

## Run locally

No build step is required. Open `index.html` directly in a modern browser.

For a local development server, from the `cow-hostel` folder run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Replace placeholders

Search for square-bracket placeholders such as:

- `[COW HOSTEL NAME]`
- `[HOSTEL ADDRESS]`
- `[PHONE NUMBER]`
- `[EMAIL ADDRESS]`
- `[BANK NAME]`
- `[ACCOUNT NUMBER]`
- `[IFSC CODE]`
- `[UPI ID]`
- `[FOUNDING STORY PLACEHOLDER]`
- `[MISSION STATEMENT PLACEHOLDER]`
- `[VISION STATEMENT PLACEHOLDER]`

Also replace the example statistics and social-media `#` links with verified organization information.

## Images

The `images/` folders contain lightweight local SVG placeholders so the site works without broken image requests. Replace those files with optimized real photography while preserving filenames, or update the HTML paths.

## Form integration

The contact form currently performs browser-side validation only and does not send email. Connect it to PHP, Node.js, Formspree, EmailJS or a custom API before production use.

## Design notes

- Mobile-first responsive layout
- Sticky header with mobile menu
- Intersection Observer reveal animations
- Gallery filters and accessible lightbox
- Keyboard support for gallery: `Esc`, `Left Arrow`, `Right Arrow`
- Reduced-motion support
- Semantic sections, labels, focus states and descriptive alt text
