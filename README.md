# Harmony — presentation site

The marketing site for [Harmony](https://github.com/R4duQ/HarmonyApp), an Android music
player. Plain static HTML, CSS and a little JavaScript — no build step, no dependencies.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000   # http://localhost:8000
```

## Deploy to Cloudflare Pages

Build settings:

- Build command: `npm run build`
- Build output directory: `dist`

`npm run build` has no dependencies; it just copies `index.html`, `assets/` and
`_headers` into `dist/`.

Or from your machine:

```sh
npm run build
npx wrangler pages deploy dist --project-name=harmonymusicapp
```

`_headers` sets long cache lifetimes for `/assets/*` and a couple of security headers;
Cloudflare picks it up automatically.

## Layout

```
index.html        the whole page
assets/
  site.css        styles
  site.js         mobile menu, FAQ deep links, current-section nav highlight
  img/            app screenshots (.webp, 1x and 2x)
  fonts/          Archivo, Figtree, JetBrains Mono (with their OFL licences)
  favicon.svg, favicon-32.png, apple-touch-icon.png, social-card.png
_headers          Cloudflare Pages headers
```

Download links (APKs, release notes, checksums) are written directly in `index.html`;
search for `releases/download` to update them for a new version.
