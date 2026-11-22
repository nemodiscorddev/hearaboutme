# HearAboutMe

A static dual-profile site for **hearabout.me**. No framework, no build step.

| URL | What it is |
| --- | --- |
| `/` | Email call-to-action for requesting a HearAboutMe page (static HTML, works without JavaScript) |
| `/OwenBates/` | Professional CV (static HTML, works without JavaScript). The portfolio lives on a separate site |
| `/N3moz` | Gaming profile (client-rendered by `script.js`, unchanged) |

## Repository structure

```
index.html            landing page (+ shell used by /N3moz)
OwenBates/index.html  professional profile: edit your content here
styles.css            shared styles; professional styles are scoped under `body.pro`
script.js             N3moz profile + small progressive enhancements for /OwenBates/
404.html              fallback for unknown URLs; keeps /N3moz working on GitHub Pages
CNAME                 custom domain (hearabout.me)
assets/
  images/             og-owen-bates.png (social preview) and any other images
  cv/                 downloadable CV PDF (optional)
  icons/              favicon.svg
  music/, video/, lyrics/, *.jpg|png   N3moz profile assets (leave as they are)
```

## Local preview

Use a local server (not `file://`) so URLs behave like production:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`, `http://localhost:8000/OwenBates/` and `http://localhost:8000/N3moz`.

> `/N3moz` relies on the 404 fallback, which `python -m http.server` does not emulate. Locally, use `http://localhost:8000/?profile=N3moz`. On GitHub Pages `/N3moz` works directly.

## GitHub Pages deployment

1. Push this folder to the root of a GitHub repository (branch `main`).
2. **Settings → Pages → Build and deployment**: Source **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Wait for the Pages workflow to finish; the site appears at `https://<user>.github.io/<repo>/` until the custom domain is set up.

How routing works on GitHub Pages:
- `/OwenBates` redirects to `/OwenBates/` and serves a real file with a normal 200 status (good for SEO and no-JS visitors).
- `/N3moz` has no matching file, so GitHub serves `404.html`, which forwards to `/?profile=N3moz`.
- Unknown URLs show the 404 page.

## Custom domain (hearabout.me)

1. Keep the `CNAME` file in the repo root containing `hearabout.me`.
2. At your DNS provider, add for the apex domain four `A` records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (optionally the matching `AAAA` records from GitHub's docs), and a `CNAME` for `www` pointing to `<user>.github.io`.
3. **Settings → Pages → Custom domain**: enter `hearabout.me`, save, then tick **Enforce HTTPS** once the certificate is issued (can take up to an hour).
4. Check the canonical and Open Graph URLs in `OwenBates/index.html` and `index.html` match your final domain.

## Replacing placeholder content

Everything for the professional profile is plain HTML in `OwenBates/index.html`.

- Anything in `[square brackets]`, or marked with `data-placeholder` (a faint hatched background), is a placeholder. Remove the `data-placeholder` attribute once the text is real.
- Delete the grey-red `<p class="pro-note" data-placeholder>` lines when a section is finished.
- The experience, education, skills and awards come from your CV (`CV.docx`). The CV lists Sutton in Ashfield, West Notts College, and the current working preferences.
- Your phone number and your referees' names and email addresses are deliberately **not** on the public page; it says "References available on request". Add them only if you are comfortable with them being public.
- This site is a CV only: there is no projects section.
- Update the headline, intro, email and location in the hero, the **About** section and the `<head>` (title, description, `og:*`, JSON-LD) so they stay consistent.

## Updating experience, education and links

- **Experience / Education:** each role is one `<li class="pro-entry">`. Edit the dates, title, organisation and bullet points; copy an entry to add one. Keep the most recent first.
- **Skills:** edit the lists inside the four `.pro-skills` groups; rename or add groups as needed.
- **Contact:** the `#contact` form opens the visitor's default email app with their email address and message addressed to you. A static site cannot send email in the background; use a form service or backend if that is needed. If your email address changes, update it in the hero, the Contact section, the form handler in `script.js`, and the JSON-LD in the `<head>`.
- **Social preview:** replace `assets/images/og-owen-bates.png` (1200 × 630) with your own artwork, keeping the file name or updating the `og:image` / `twitter:image` URLs.

## Printing or downloading the CV

- **Print / save as PDF:** click **Print / save CV as PDF** in the Contact section (or press `Ctrl/Cmd + P`). The built-in print stylesheet (`@media print` in `styles.css`) produces a clean black-on-white one-column CV and hides navigation, buttons and image placeholders. Choose **Save as PDF** as the destination, and set margins to *Default* and enable *Background graphics* if you want the dots and rules.
- **Downloadable file:** save the exported PDF as `assets/cv/Owen-Bates-CV.pdf`, then uncomment the "Download CV (PDF)" link in the Contact section of `OwenBates/index.html`.
- Remove any remaining placeholders before exporting.

## Accessibility and performance notes

- Semantic landmarks, one `h1` per page, skip link, visible focus states, and WCAG AA contrast (the page uses a darkened red, `#b8301a`, for text; the brighter brand orange is not used for text).
- Animations are subtle and are disabled under `prefers-reduced-motion`.
- With JavaScript disabled the whole professional page and the landing page still work; JS only adds the active-section highlight, scroll reveal and the print button.
- The only external request is Google Fonts (with system-font fallbacks).
