# phacks.dev

Nicolas Goutay’s personal website, published at [www.phacks.dev](https://www.phacks.dev).
It uses Next.js 16 (Pages Router), React 19, Tailwind CSS 4, and MDX 3. The design
comes from the Tailwind UI Spotlight template; its license is in [LICENSE.md](LICENSE.md).

## Local development

Use Node.js 24 LTS, matching `.nvmrc`, CI, and the `engines` setting used by Vercel.

```sh
nvm install
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

Open [localhost:3000](http://localhost:3000). `NEXT_PUBLIC_SITE_URL` is the canonical
public origin used in RSS links, and defaults to `https://www.phacks.dev`. Keep it
set to the production URL even on previews. No secrets are needed to build the site.

## Where things live

- `src/pages/`: each JSX or MDX file becomes a route. `index.jsx` is the homepage,
  including the Work section.
- `src/pages/articles/`: MDX posts export `meta` and use `ArticleLayout`. Posts with
  images use a directory containing `index.mdx` and their local assets.
- `src/components/`: shared navigation, footer, cards, and layouts.
- `src/images/`: imported photos and logos. `public/`: files served unchanged.
- `src/styles/`: Tailwind entry point and code highlighting. The existing custom
  typography theme is loaded from `tailwind.config.js` using `@config`.
- `src/lib/generateRssFeed.js`: generates `public/rss/feed.xml` and `feed.json`
  during a production build. Generated feeds are not committed.

Calendarons lives at `/projects/calendarons`, with `/support` and `/privacy`
under that route. These pages reuse the site shell, have French content and
canonical metadata, and are excluded from Vercel Analytics (including client
navigation from other pages). `src/content/calendarons-help.json` is a reviewed
copy of the app’s five offline FAQ articles; update it when app help changes.
Only the public support alias belongs in this public file, never the developer’s
private support address. The page displays in-app contact instructions while the
public alias is unset. Replace the availability label with the official App Store
link when the app is publicly released. Screenshots contain sample events only.

The Swaive logo is the [official website’s webclip asset](https://cdn.prod.website-files.com/66e95d61b49881437abf3ea4/66eaa5d23a5d542aa8cab429_webclip.png),
served locally as `src/images/logos/swaive.png`. Its three square cutouts are
transparent; a white CSS background preserves the white-on-black mark in either theme.

## Checks and production build

```sh
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

The browser tests start the production server automatically. They cover desktop
and mobile navigation, article rendering, the Work section, dark mode, public
pages, RSS feeds, every article URL, and the 404 response. To inspect the production
build manually, run `npm run start`.

To run the same tests against an accessible deployed preview, set
`PLAYWRIGHT_BASE_URL=https://your-preview.vercel.app npm run test:e2e`.

Development and production explicitly use Webpack because article discovery uses
dynamic MDX imports and the MDX pipeline has JavaScript remark/rehype plugins.
`next lint` was removed in Next.js 16; linting now uses ESLint’s flat configuration.
ESLint stays on the latest 9.x release because the React, accessibility, and import
plugins in `eslint-config-next` do not yet support ESLint 10.

## CI and Vercel

GitHub Actions (`.github/workflows/ci.yml`) runs a clean `npm ci`, lint, production
build, and Chromium browser tests on pull requests and pushes to `master`.
Dependabot checks npm packages and GitHub Actions monthly.

The existing Vercel project is **phacks-dev**, in **nicolas-goutays-projects**, linked
to **phacks/phacks.dev**. Vercel’s Git integration builds pushed branches as preview
deployments and publishes `master` to the production domain. GitHub Actions and
Vercel’s deployment check run independently; check both before merging.

Vercel uses the Next.js preset, repository root, `npm ci` for installation,
`npm run build`, and the default Next.js output directory. Both the project’s
runtime setting and the committed `engines.node` select Node 24.
`NEXT_PUBLIC_SITE_URL=https://www.phacks.dev` is configured in development,
preview, and production, matching the domain that `phacks.dev` redirects to.
No Vercel token is needed in GitHub Actions because the
Vercel Git integration handles deployment.

### Dependency maintenance notes

`npm audit --omit=dev` reports no known vulnerabilities after this update. The full
audit still reports the unpatched `braces` denial-of-service advisory through
`eslint-config-next` → `fast-glob` → `micromatch` (five affected package entries for
one underlying advisory). These packages process repository paths during linting;
they are not used by the deployed application. Do not use `npm audit fix --force`,
which currently proposes downgrading Next.js’s ESLint configuration to version 14.
Revisit this when the upstream tooling releases a fix.

The targeted `postcss-selector-parser` override uses the patched 7.1.6+ release for
Tailwind Typography; remove it once Typography updates its dependency. Tailwind 4
requires modern browsers (Safari 16.4+, Chrome 111+, Firefox 128+).
