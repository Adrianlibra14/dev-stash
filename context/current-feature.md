# Current Feature

**Dashboard UI Phase 1** — Zard UI initialization, component installation, and `/dashboard` route setup (phase 1 of 4).

## Status 

Complete

## Goals

- Zard UI initialization and components
- Zard component installation
- Dashboard route at /dashboard

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