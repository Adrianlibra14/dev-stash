# Coding Standards

## TypeScript General Guidelines

## Core Principles

- Write straightforward, readable, and maintainable code
- Follow SOLID principles and design patterns
- Use strong typing and avoid 'any'
- No commented-out code unless specified
- No unused imports or variables

## Coding Standards

### Naming Conventions

- Classes: PascalCase
- Variables, functions, methods: camelCase
- Constants, env variables: UPPERCASE

### Functions

- Use descriptive names: verbs & nouns (e.g., getUserData)
- Prefer arrow functions for simple operations
- Use default parameters and object destructuring
- Keep functions under 50 lines when possible

### Types and Interfaces

- Create custom types/interfaces for complex structures
- Define interfaces for all props, API responses, and data models
- Use type inference where obvious, explicit types where helpful
- Use 'readonly' for immutable properties
- If an import is only used as a type in the file, use 'import type' instead of 'import'

## Angular

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components
- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Prefer inline templates for small components
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management
- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates
- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services
- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection

## Express

- Implement RESTful APIs using Express.js routing.
- Structure your application using the MVC (Model-View-Controller) pattern.
- Use middleware for common tasks such as authentication, logging, and error handling.
- Implement proper error handling using try-catch blocks and error handling middleware.
- Use environment variables for configuration management.
- Implement logging for debugging and monitoring.
- Use appropriate HTTP status codes for responses.

## Tailwind CSS v4

**CRITICAL**: We are using Tailwind CSS v4, which uses CSS-based configuration.

- **DO NOT** create `tailwind.config.ts` or `tailwind.config.js` files (those are for v3)
- All theme configuration must be done in CSS using the `@theme` directive in `src/styles.css`
- Use CSS custom properties for colors, spacing, etc.
- No JavaScript-based config allowed

Example v4 configuration:

```css
@import "tailwindcss";

@theme {
  --color-primary: oklch(50% 0.2 250);
}
```

## File Organization

### Frontend

- Components: `src/app/[feature]/components/ComponentName.ts`
- Pages: `src/app/[feature]/pages/page.ts`
- Models/Types: `src/app/[feature]/models/model.ts`
- Services: `src/app/[feature]/services/service.ts`

### Backend

- Routes: `src/routes/[route]/route.ts`
- Middlewares: `src/middlewares/[middleware]/middleware.ts`
- Controllers: `src/controllers/[controller]/controller.ts`
- Validations: `src/validations/[validation]/validation.ts`
- Utils: `src/utils/[util]/util.ts`

## Styling

- Tailwind CSS for all styling
- Use zard/ui components where applicable
- No inline styles
- Dark mode first, light mode as option

## Database

- Use Sequelize for all database operations
- Use migrations

## Error Handling

- Display user-friendly error messages via toast
