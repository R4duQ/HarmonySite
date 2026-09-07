# Harmony — presentation site

The marketing site for [Harmony](https://github.com/R4duQ/HarmonyApp), an Android music
player. Static React + TypeScript + Vite build, deployed to Cloudflare Pages.

## Run it locally

```sh
npm install
npm run dev        # http://localhost:5173
```

## Build for production

```sh
npm run build      # type-checks, then writes dist/
npm run preview    # serve dist/ locally to check the real build
npm test           # 25 tests: nav, tabs, Discover demo, APK states, a11y
```

The build output is a plain static site in `dist/` — no server, no backend.

## Deploy to Cloudflare Pages

**First time (connecting the repo):**

1. Push this project to a GitHub repository.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**, and pick the repo.
3. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 20 or newer (set `NODE_VERSION = 20` under
     Settings → Environment variables if the default is older)
4. **Save and Deploy.**

Every push to the production branch redeploys automatically.

**Or deploy straight from your machine:**

```sh
npm run build
npx wrangler pages deploy dist --project-name=harmonymusicapp
```

`public/_headers` sets long cache lifetimes for hashed assets; Cloudflare picks it
up automatically.

## The one file you edit for links

Everything external lives in **`src/config/links.ts`**:

| Constant | What it is |
| --- | --- |
| `APK_ARM64_URL` | ARM64 APK. `null` until you publish it. |
| `APK_X86_64_URL` | x86_64 APK. `null` until you publish it. |
| `GITHUB_URL` | Repository. |
| `RELEASES_URL` | Releases page — also the fallback when an APK URL is `null`. |
| `RELEASE_NOTES_URL` | Release notes. |
| `SUPPORT_URL` | Where feedback goes (currently GitHub issues). |
| `APP_VERSION`, `MIN_ANDROID` | Shown in the hero and download section. |

While an APK URL is `null`, that build shows a **"Not published yet"** state and
points people at the releases page instead of a dead link. Set the URL and the
button turns into a real download. Both states are covered by tests.

Your release workflow publishes assets named `Harmony-v1.0.0-arm64-v8a.apk` and
`Harmony-v1.0.0-x86_64.apk`, so after tagging `v1.0.0` the URLs will look like:

```
https://github.com/R4duQ/HarmonyApp/releases/download/v1.0.0/Harmony-v1.0.0-arm64-v8a.apk
```

Copy the exact link from the release page rather than typing it out.

## Replacing the screenshots

The four phone screens are CSS recreations right now, each labelled on the page as a
"website preview". To use real screenshots:

1. Drop the images into **`public/screens/`** (e.g. `library.png`).
2. Set the paths in **`src/config/screens.ts`**:

```ts
export const SCREENSHOTS: Record<ScreenKey, string | null> = {
  library: '/screens/library.png',
  nowPlaying: '/screens/now-playing.png',
  discover: '/screens/discover.png',
  downloads: '/screens/downloads.png',
};
```

Any screen you leave as `null` keeps its recreation. The "website preview" label
disappears automatically for screens backed by a real screenshot.

Screenshots should be portrait and roughly 21:9 (a full-height Xperia capture is
ideal, around 1096 × 2560). They're cropped with `object-fit: cover`, so a slightly
different ratio is fine. Compress them before committing — a 200 KB PNG per screen
is plenty.

## Replacing the logo

The mark is inline SVG copied from the app's own launcher vector
(`app/src/main/res/drawable/ic_launcher_h.xml`) so the site and the app icon stay in
sync. It lives in two places:

- **`src/components/Logo.tsx`** — the header and footer mark.
- **`public/favicon.svg`** — the browser tab icon.

Both contain the same path data. If the icon changes in the app, paste the new
`pathData` into both.

## Album artwork

The covers are generated in **`src/components/Artwork.tsx`** — a small deterministic
PRNG picks a palette and a shape per seed, so no real record sleeves are reproduced
anywhere on the site. Pass an `image` prop to any `<Artwork>` to use a real file
instead.

## Project layout

```
src/
  config/       links.ts, screens.ts  ← the two files you'll actually edit
  data/         sample songs & albums for the Discover demo
  lib/          recommend.ts — the demo's pure scoring function
  hooks/        reduced motion, media queries, scroll lock
  components/   Logo, Artwork, PhoneFrame, Nav, Reveal
    screens/    the four phone-screen recreations
  sections/     Hero, Showcase, Discover, Flow, Features, Download, About, Footer
  styles/       global.css — all design tokens live at the top
  test/         vitest + testing-library suites
```

## Notes on the copy

The site avoids claims the app can't back up: no "guaranteed lossless", no promises
about what any download source can reach, no invented users or ratings. The Discover
demo is labelled as a demonstration running on sample data, and the download progress
shown in the Downloads screen is labelled as simulated. If you edit the copy, keep
that intact — it's the difference between a description and a promise.
