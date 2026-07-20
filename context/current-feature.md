# Current Feature

**Neon Postgres + Sequelize** — Set up Sequelize ORM with Neon serverless PostgreSQL, initial schema, and migrations.

Spec: @context/features/database-spec.md

## Status

Completed

## Goals

- Use Neon PostgreSQL (serverless)
- Create initial schema based on data models in project-overview.md (this will evolve)
- Include passport.js models
- Add appropriate indexes and cascade deletes
- Always create migrations — never push directly unless specified (dev branch in `DATABASE_URL`, production branch separate)

## Notes

<!-- Any extra notes -->

## History

<!-- Keep this updated. Earliest to latest -->

### Project Scaffolding

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

### Phase 1 - Dashboard UI: Initial Setup

- Initialized Zard UI library via `components.json` with Neutral theme, `@/` path aliases
- Installed Zard dependencies: `@angular/cdk`, `class-variance-authority`, `clsx`, `tailwind-merge`, `@ng-icons/core`, `@ng-icons/lucide`, `tailwindcss-animate`
- Configured `provideZard()` in app.config.ts, set up theme CSS with dark/light mode variables
- Added Zard components: card, button, sheet, skeleton, badge, input, tooltip
- Created `/dashboard` lazy-loaded route with sidebar, collection cards, item cards, and item detail drawer
- Sidebar shows item types (with Lucide icons and type colors) and collections (collapsible)
- Collection cards are color-coded by dominant item type
- Item cards have type-colored left borders, show language, tags, favorite/pin status
- Item detail drawer opens from the right side showing full item metadata

### Phase 2 - Dashboard UI: Layout & Theme

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

### Phase 3 - Dashboard UI: Sidebar Enhancement

- Added `/items/:typeSlug` route for filtered item type views
- Updated `DashboardService` with `favoriteCollections`, `recentCollections`, `mobileSidebarOpen`, and `selectItemTypeBySlug`
- Updated `SidebarComponent` with `RouterLink`/`RouterLinkActive` for navigation
- Sidebar item types link to `/items/:slug` with active state highlighting
- Added collapsible "Favorites" section showing favorited collections with star icons and item counts
- Added collapsible "Recent" section showing 3 most recently updated collections
- Added collapsible "All Collections" section with all collections
- Added user avatar area at bottom with colored initials fallback, name, email, and settings gear
- Mobile drawer behavior: sidebar slides in from left with backdrop overlay, always w-60 on mobile
- Top bar hamburger toggles mobile drawer instead of desktop collapse
- Dashboard page handles route param changes via `ActivatedRoute.paramMap` subscription
- Moved sidebar, top-bar, item-sheet shell from `DashboardPage` to `AppComponent` for persistence across routes
- Mobile drawer animates with `transition-transform` slide (translateX), no animation on viewport resize via `preventResizeAnimation()` handler
- `lucidePanelLeft` icon as sidebar toggle (replaced grid + chevron)
- Escape key closes mobile drawer (and item sheet if open)
- `z-50` permanent on mobile sidebar to prevent cards overlapping during close animation
- Collapsible section headers (Item Types, Collections, Favorites, Recent, All Collections) with `hover:bg-sidebar-accent` backgrounds
- Removed "v1.0.0-mockup" text from sidebar header
- Desktop collapsed state shows only navigational icons (All Items + type links), hides Collections and user area
- Top bar: "+" icon only on mobile (`hidden lg:inline` on "New Resource" text)
- Responsive search placeholder: "Search" on mobile, full text on desktop
- Larger mobile tap targets: `px-3 py-3.5` on all sidebar items, collapsible headers, and sub-headers

### Phase 4 - Dashboard UI: Content Area

- Created `StatsCardComponent` (`dashboard/components/stats-card/`) — colored icon, value, and label
- Added 4 stats cards at the top: Items (blue, `lucideLayers`), Collections (emerald, `lucideFolders`), Favorite Items (yellow, `lucideStar`), Favorite Collections (purple, `lucideFolderHeart`)
- Added `DashboardService` computeds: `favoriteItems`, `pinnedItems`, `collectionsByRecency`, `itemsByRecency`, `recentItems` (10 most recent by `updatedAt`)
- Dashboard home (`/dashboard`) now shows: stats cards, Recent Collections (5 most recent), Pinned Items (pin icon heading), Recent Items (10 latest with "Showing X of Y" count)
- Reused existing `CollectionCardComponent` and `ItemCardComponent` for the new sections
- Type-filtered view (`/items/:typeSlug`) unchanged — still shows all items of the selected type
- Stats grid: 1 columns on mobile, 4 on desktop (`grid-cols-1 lg:grid-cols-4`)

### Database Setup

- Installed `sequelize` v6.37.8, `pg`, `pg-hstore`, `dotenv`, and `sequelize-cli` v6.6.5 (dev)
- Created `src/config/database.ts` — runtime Sequelize instance with Neon SSL, throws if `DATABASE_URL` missing
- Created `src/config/config.js` + `.sequelizerc` — sequelize-cli config (JS, per official Neon/Sequelize docs), dev/prod environments via `NODE_ENV`
- Created `.env.example` with `NODE_ENV`, `DATABASE_URL` (dev), `DATABASE_URL_PROD` (prod), and `PORT`
- Added 5 Sequelize models (TypeScript, matching project-overview drafts): `User` (passport.js-ready: password + githubId), `ItemType`, `Item`, `Collection`, `Tag`
- Created `src/models/associations.ts` — all relations (hasMany, belongsTo, belongsToMany) with string through tables
- Created 7 migrations (JS, sequelize-cli style) with proper FK ordering: users → item_types → items → collections → tags → item_collections → item_tags
- Indexes: unique email/githubId on users, unique (slug, userId) on item_types, userId/itemTypeId/isFavorite/isPinned on items, userId on collections, reverse-FK indexes on join tables
- Cascades: CASCADE on user→items/collections/custom_types, SET NULL on collections.defaultTypeId, CASCADE on both join tables
- Neon-specific: `gen_random_uuid()` defaults (native PG 13+, no extension), SSL required, ENUM type cleanup in items down migration
- Created seed for 7 system item types matching frontend mock data (snippet, prompt, command, note, link, file, image)
- Created `scripts/test-db.ts` — integration smoke test (CRUD + associations)
- Wired `connectDatabase()` into server startup with error handling
- Added npm scripts: `migrate`, `migrate:undo`, `migration:generate`, `seed:all`, `seed:undo`, `test-db`
