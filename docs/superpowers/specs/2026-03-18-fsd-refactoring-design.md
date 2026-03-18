# FSD Refactoring Design Spec

**Date:** 2026-03-18
**Project:** dude-shape-app
**Branch:** refactor/fsd-architecture
**Status:** Approved

---

## Context

The project is a furniture e-commerce landing page built with React 19, Vite, TypeScript, and CSS Modules. Currently all 18 components live in a flat `сomponents/` directory (with a Cyrillic "с" — a bug). There is no routing, no state management, and no consistent layer separation. The project plans to expand to multiple pages (catalog, product detail, etc.), so a scalable architecture is needed.

**Chosen approach:** Full Feature-Sliced Design (FSD) restructuring with React Router, PostCSS design tokens, and path aliases.

---

## Architecture

### FSD Layer Structure

```
src/
├── app/
│   ├── providers/
│   │   └── router.tsx          # React Router configuration
│   ├── styles/
│   │   └── global.css          # Global styles + PostCSS imports
│   └── index.tsx               # App entry point
│
├── pages/
│   └── home/
│       └── ui/
│           ├── HomePage.tsx
│           └── home-page.module.css
│
├── widgets/
│   ├── header/ui/
│   ├── footer/ui/
│   ├── hero-section/ui/        # formerly Description
│   ├── about-section/ui/       # formerly Sofa
│   ├── trusted-companies/ui/   # formerly Companies
│   ├── popular-furniture/ui/   # formerly Furniture
│   ├── furniture-picker/ui/    # formerly FurniturePicker
│   ├── customer-review/ui/     # formerly CustomerFocus
│   └── subscribe-section/ui/   # formerly Subscribe
│
├── entities/
│   └── product/
│       ├── model/
│       │   └── types.ts        # Product interface
│       └── ui/
│           ├── ProductCard.tsx
│           └── product-card.module.css
│
└── shared/
    ├── config/
    │   └── tokens.css          # PostCSS design tokens
    ├── ui/
    │   ├── button/
    │   ├── icon/
    │   ├── link/
    │   └── category-button/
    ├── lib/                    # Utilities (as needed)
    └── assets/                 # All SVGs and PNGs
```

### Layer Dependency Rules (FSD)
- `app` → can import from all layers
- `pages` → can import from `widgets`, `entities`, `shared`
- `widgets` → can import from `entities`, `shared`
- `entities` → can import from `shared` only
- `shared` → no imports from other layers

### Rationale for Widget vs Feature placement
Current landing page sections (Hero, About, Companies, etc.) are placed in `widgets/` rather than `features/` because:
- They are compositional blocks assembled into a page, not isolated business scenarios
- They currently have no interactive state or user actions worth isolating as features
- `features/` layer is reserved for future interactive capabilities (e.g., cart management, filtering, authentication)

### FeatureItem component
`FeatureItem` is a helper component used only within `about-section` and `footer` widgets. It is **not** promoted to `shared/ui` because it has no global reuse across layers.

### Navigation component
Lives inside `widgets/header/ui/` rather than as a standalone slice — it is tightly coupled to the Header and has no independent consumers.

---

## React Router

```tsx
// app/providers/router.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "@/pages/home";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  // Future pages:
  // { path: "/catalog", element: <CatalogPage /> },
  // { path: "/product/:id", element: <ProductPage /> },
]);

export const AppRouter = () => <RouterProvider router={router} />;
```

---

## PostCSS Design Tokens

File: `shared/config/tokens.css`

```css
:root {
  /* Colors */
  --color-primary: #244d4d;
  --color-primary-dark: #154444;
  --color-secondary: #305f64;
  --color-accent-orange: #ef5423;
  --color-accent-yellow: #ffb731;
  --color-surface: #f4f6f6;
  --color-border: #d9dce5;
  --color-text-primary: #242424;
  --color-text-muted: #919090;
  --color-white: #ffffff;

  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 20px;
  --spacing-lg: 40px;
  --spacing-xl: 80px;
  --spacing-2xl: 120px;
  --spacing-3xl: 140px;

  /* Typography */
  --font-family-base: "Montserrat", "DM Sans", sans-serif;
  --font-size-sm: 12px;
  --font-size-base: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;

  /* Border radius */
  --radius-full: 50%;
  --radius-sm: 4px;
}
```

All hardcoded color/spacing values in CSS Modules are replaced with `var(--token-name)`.

PostCSS packages to install: `postcss`, `postcss-import`.

---

## Path Aliases

Single alias `@` pointing to `src/`:

```ts
// vite.config.ts
resolve: {
  alias: { "@": path.resolve(__dirname, "./src") }
}

// tsconfig.app.json
"paths": { "@/*": ["./src/*"] }
```

Import examples:
```ts
import { Button } from "@/shared/ui/button";
import { ProductCard } from "@/entities/product";
import { Header } from "@/widgets/header";
```

---

## Naming Conventions

| Entity | Style | Example |
|---|---|---|
| Component files | PascalCase | `ProductCard.tsx` |
| CSS Module files | kebab-case | `product-card.module.css` |
| Layer/slice folders | kebab-case | `popular-furniture/` |
| Hooks | camelCase with `use` prefix | `useProductList` |
| Constants | UPPER_SNAKE_CASE | `NAVIGATION_ROUTES` |
| Types/Interfaces | PascalCase | `ProductCardProps` |
| Exports | Named (no default exports in shared/ui) | `export const Button` |

---

## Bug Fixes Included

1. **Cyrillic folder name** — `сomponents/` (Cyrillic `с`) removed entirely
2. **Missing `key` props** — added to all `.map()` calls (Navigation, Furniture, Companies, FurniturePicker, Footer social icons)
3. **Mixed export style** — `FeatureItem` changed from default export to named export
4. **Unused CSS rules** — `.left`, `.right` in `furniture.module.css`; `.about` in `sofa.module.css` removed
5. **TypeScript** — `type CardsType = CardProps & {}` cleaned up to `type CardsType = CardProps`

---

## Git Process

### Branch
Work in: `refactor/fsd-architecture`

### Commit Sequence (atomic)
```
1. chore: add react-router-dom, postcss, postcss-import dependencies
2. chore: configure path aliases in vite.config.ts and tsconfig.app.json
3. chore: add PostCSS config and shared design tokens
4. refactor: scaffold FSD directory structure
5. refactor: migrate shared/ui — Button, Icon, AppLink, CategoryButton
6. refactor: add entities/product — Product type and ProductCard component
7. refactor: migrate widgets/header and widgets/footer
8. refactor: migrate widgets — hero-section, about-section, trusted-companies
9. refactor: migrate widgets — popular-furniture, furniture-picker, customer-review, subscribe-section
10. refactor: setup app layer with React Router provider
11. refactor: create pages/home as composition of widgets
12. refactor: apply design tokens across all CSS modules
13. fix: add missing key props, fix export consistency
14. chore: remove legacy сomponents/ directory
```

### PR Structure
- **Title:** `refactor: migrate to Feature-Sliced Design architecture`
- **Summary:** What changed and why
- **Architecture decisions:** Why widgets > features for current sections; why product in entities
- **Key improvements:** FSD layers, path aliases, PostCSS tokens, React Router, naming conventions, bug fixes
- **Potential risks:**
  - Asset imports via `@/shared/assets/` need verification in production build
  - `react-router-dom` increases bundle size (~50kb gzip)
  - CSS `var()` requires modern browser support (already satisfied by Vite target)

---

## Out of Scope

- State management (Redux, Zustand, etc.) — not needed yet
- Responsive/mobile styles — not in current codebase
- Unit/integration tests — separate task
- API integration — separate task
- `features/` layer population — deferred until interactive scenarios are defined
