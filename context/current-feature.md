# Current Feature

**Dashboard UI Phase 2** — Main dashboard layout, dark mode, top bar with search and new item button (phase 2 of 4).

## Status 

Completed

## Goals

- Main dashboard layout and global styles
- Dark mode by default
- Top bar with search and new item button (display only)
- Placeholder sidebar and main area

## Notes

<!-- Any extra notes -->

## History

<!-- Keep this updated. Earliest to latest -->

### Phase 1 - Project Scaffolding

#### Backend (Express v5.2.1)

- Initialized with `npm init` and installed `express`, `typescript`, `ts-node`, `nodemon`, `@types/express`, `@types/node`
- Created `src/app.ts` — Express app with JSON middleware and health check route (`GET /`)
- Created `src/server.ts` — Entry point listening on `process.env.PORT || 3000`
- Configured `tsconfig.json` — target ES2016, module commonjs, strict mode enabled
- Dev script: `npm run dev` runs nodemon with ts-node for hot reload

#### Frontend (Angular v22.0.0)

- Scaffolded with Angular CLI v22.0.4 (`ng new`)
- Installed Tailwind CSS v4.3.2 with `@tailwindcss/postcss` plugin, configured via `.postcssrc.json`
- Uses Angular v22 defaults: standalone components, signals, esbuild builder (`@angular/build:application`), lazy-loaded routes
- Test runner: Vitest v4.0.8 (no Karma/Jasmine)
- Scripts: `npm run start` (ng serve), `npm run build` (production), `npm run watch` (dev build), `npm run test` (vitest)

### Phase 1 - Dashboard UI

- Initialized Zard UI library via `components.json` with Neutral theme, `@/` path aliases
- Installed Zard dependencies: `@angular/cdk`, `class-variance-authority`, `clsx`, `tailwind-merge`, `@ng-icons/core`, `@ng-icons/lucide`, `tailwindcss-animate`
- Configured `provideZard()` in app.config.ts, set up theme CSS with dark/light mode variables
- Added Zard components: card, button, sheet, skeleton, badge, input, tooltip
- Created `/dashboard` lazy-loaded route with sidebar, collection cards, item cards, and item detail drawer
- Sidebar shows item types (with Lucide icons and type colors) and collections (collapsible)
- Collection cards are color-coded by dominant item type
- Item cards have type-colored left borders, show language, tags, favorite/pin status
- Item detail drawer opens from the right side showing full item metadata

### Phase 2 - Main Dashboard Layout

- Created `TopBarComponent` with search input (display only) and "New Resource" button (display only, emerald green)
- Restructured dashboard layout: sidebar occupies full left side height, top bar and main content in right flex column
- Dark mode default via `class="dark"` on `<html>`
- Mobile hamburger menu button in top bar toggles sidebar visibility
- Updated `app.spec.ts` to test router outlet instead of default Angular placeholder content
- Adjusted dark theme colors with three distinct tonalities matching reference image:
  - Sidebar: `#050507` (darkest)
  - Top bar: `#0a0c10` (medium-dark)
  - Background: `#11131a` (lighter dark)
  - Cards: `#181b24` (lightest dark)
  - Borders: subtle (`rgba(255,255,255,0.06)`)
- Section headings: emerald green with dot indicator, uppercase tracking-wide
- Collection cards: solid dark background with colored left border (3px)
- Item cards: solid dark background with colored left border (3px)
- Removed unused `ZardBadgeComponent` import from `CollectionCardComponent`