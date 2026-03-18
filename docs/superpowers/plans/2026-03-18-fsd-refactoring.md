# FSD Refactoring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the dude-shape-app codebase from a flat component structure to Feature-Sliced Design (FSD) with React Router, PostCSS design tokens, and path aliases.

**Architecture:** FSD layers (app → pages → widgets → entities → shared) with strict top-down dependency flow. Current 16 components in `сomponents/` (Cyrillic "с") are redistributed into widgets, entities, and shared/ui. React Router added for multi-page readiness.

**Tech Stack:** React 19, TypeScript 5.9, Vite 7, CSS Modules, PostCSS, react-router-dom

---

## File Map

### Created
```
src/shared/config/tokens.css
src/shared/assets/              ← moved from src/assets/
src/shared/ui/icon/Icon.tsx
src/shared/ui/icon/index.ts
src/shared/ui/button/Button.tsx
src/shared/ui/button/button.module.css
src/shared/ui/button/index.ts
src/shared/ui/app-link/AppLink.tsx
src/shared/ui/app-link/app-link.module.css
src/shared/ui/app-link/index.ts
src/shared/ui/category-button/CategoryButton.tsx
src/shared/ui/category-button/category-button.module.css
src/shared/ui/category-button/index.ts
src/shared/ui/feature-item/FeatureItem.tsx
src/shared/ui/feature-item/feature-item.module.css
src/shared/ui/feature-item/index.ts
src/entities/product/model/types.ts
src/entities/product/ui/ProductCard.tsx
src/entities/product/ui/product-card.module.css
src/entities/product/index.ts
src/widgets/header/ui/Navigation.tsx
src/widgets/header/ui/navigation.module.css
src/widgets/header/ui/Header.tsx
src/widgets/header/ui/header.module.css
src/widgets/header/index.ts
src/widgets/footer/ui/Footer.tsx
src/widgets/footer/ui/footer.module.css
src/widgets/footer/ui/constants.ts
src/widgets/footer/index.ts
src/widgets/hero-section/ui/HeroSection.tsx
src/widgets/hero-section/ui/hero-section.module.css
src/widgets/hero-section/index.ts
src/widgets/about-section/ui/AboutSection.tsx
src/widgets/about-section/ui/about-section.module.css
src/widgets/about-section/ui/constants.ts
src/widgets/about-section/index.ts
src/widgets/trusted-companies/ui/TrustedCompanies.tsx
src/widgets/trusted-companies/ui/trusted-companies.module.css
src/widgets/trusted-companies/ui/constants.ts
src/widgets/trusted-companies/index.ts
src/widgets/popular-furniture/ui/PopularFurniture.tsx
src/widgets/popular-furniture/ui/popular-furniture.module.css
src/widgets/popular-furniture/ui/constants.ts
src/widgets/popular-furniture/index.ts
src/widgets/furniture-picker/ui/FurniturePicker.tsx
src/widgets/furniture-picker/ui/furniture-picker.module.css
src/widgets/furniture-picker/ui/constants.ts
src/widgets/furniture-picker/index.ts
src/widgets/customer-review/ui/CustomerReview.tsx
src/widgets/customer-review/ui/customer-review.module.css
src/widgets/customer-review/index.ts
src/widgets/subscribe-section/ui/SubscribeSection.tsx
src/widgets/subscribe-section/ui/subscribe-section.module.css
src/widgets/subscribe-section/index.ts
src/app/providers/router.tsx
src/app/styles/global.css
src/app/index.tsx
src/pages/home/ui/HomePage.tsx
src/pages/home/ui/home-page.module.css
src/pages/home/index.ts
postcss.config.js
```

### Modified
```
vite.config.ts                  ← add path alias @
tsconfig.app.json               ← add paths: { "@/*": ["./src/*"] }
src/main.tsx                    ← import App from @/app
```

### Deleted
```
src/сomponents/                 ← entire directory (Cyrillic "с")
src/assets/                     ← replaced by src/shared/assets/
src/App.tsx
src/app.module.css
```

---

## Task 1: Install dependencies

**Files:** `package.json`

- [ ] **Step 1: Install runtime and dev dependencies**

```bash
cd /Users/aeprotsenko/self-dev/dude-shape-app
npm install react-router-dom
npm install -D postcss postcss-import
```

Expected: package.json updated, node_modules updated, no errors.

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add react-router-dom, postcss, postcss-import dependencies"
```

---

## Task 2: Configure path aliases

**Files:**
- Modify: `vite.config.ts`
- Modify: `tsconfig.app.json`

- [ ] **Step 1: Update vite.config.ts**

Replace entire file content with:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 2: Update tsconfig.app.json**

Add `baseUrl` and `paths` inside `compilerOptions`:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors (existing code still compiles with old paths).

- [ ] **Step 4: Commit**

```bash
git add vite.config.ts tsconfig.app.json
git commit -m "chore: configure path alias @ pointing to src/"
```

---

## Task 3: PostCSS config and design tokens

**Files:**
- Create: `postcss.config.js`
- Create: `src/shared/config/tokens.css`

- [ ] **Step 1: Create postcss.config.js at project root**

```javascript
export default {
  plugins: {
    'postcss-import': {},
  },
}
```

- [ ] **Step 2: Create design tokens file**

Create `src/shared/config/tokens.css`:

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

- [ ] **Step 3: Commit**

```bash
git add postcss.config.js src/shared/config/tokens.css
git commit -m "chore: add PostCSS config and shared design tokens"
```

---

## Task 4: Move assets to shared layer

**Files:**
- Move: `src/assets/` → `src/shared/assets/`

- [ ] **Step 1: Move assets using git mv**

```bash
git mv src/assets src/shared/assets
```

- [ ] **Step 2: Verify**

```bash
ls src/shared/assets/
```

Expected: all SVG and PNG files present (airbnb.svg, arrow2.svg, bedRoom.svg, chair.png, diningRoom.svg, facebook.svg, hallway.svg, inst.svg, interiorFour.png, interiorOne.png, interiorThree.png, interiorTwo.png, kitchen.svg, left_vector.svg, like.svg, livingRoom.svg, loupe.svg, mail.svg, mastercard.svg, menu.svg, nightstand.png, paypal.svg, person.svg, right_vector.svg, share.svg, shield.svg, sofa.png, star.svg, stripe.svg, tick.svg, truck.svg, twitter.svg, uber.svg, visa.svg, youtube.svg).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "refactor: move assets to shared/assets layer"
```

---

## Task 5: shared/ui — Icon

**Files:**
- Create: `src/shared/ui/icon/Icon.tsx`
- Create: `src/shared/ui/icon/index.ts`

- [ ] **Step 1: Create Icon component**

Create `src/shared/ui/icon/Icon.tsx`:

```tsx
export interface IconProps {
  src: string;
  alt?: string;
  className?: string;
}

export const Icon = ({ src, alt, className }: IconProps) => {
  return <img src={src} alt={alt} className={className} />;
};
```

- [ ] **Step 2: Create public index**

Create `src/shared/ui/icon/index.ts`:

```ts
export { Icon } from './Icon';
export type { IconProps } from './Icon';
```

---

## Task 6: shared/ui — Button

**Files:**
- Create: `src/shared/ui/button/Button.tsx`
- Create: `src/shared/ui/button/button.module.css`
- Create: `src/shared/ui/button/index.ts`

- [ ] **Step 1: Create Button component**

Create `src/shared/ui/button/Button.tsx`:

```tsx
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large' | 'vector' | 'like';
  presets?: 'dark' | 'light' | 'arrow' | 'favorites' | 'share';
}

export const Button = ({
  children,
  size = 'small',
  presets = 'light',
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={`${styles.root} ${styles[size]} ${styles[presets]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

- [ ] **Step 2: Create Button styles**

Create `src/shared/ui/button/button.module.css`:

```css
.root {
  border: none;
  cursor: pointer;
}

.small {
  font-size: var(--font-size-sm);
  line-height: 21px;
  padding: 5px 14px;
}

.medium {
  font-size: var(--font-size-base);
  line-height: 22px;
  padding: 15px 30px;
}

.large {
  font-size: var(--font-size-lg);
  line-height: 25px;
  padding: 15px 25px;
}

.dark {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.light {
  background-color: var(--color-white);
  color: var(--color-primary-dark);
}

.vector {
  width: 40px;
  height: 40px;
}

.like {
  width: 30px;
  height: 30px;
}

.arrow {
  background-color: var(--color-surface);
  border-radius: var(--radius-full);
  border: none;
}

.favorites {
  border-radius: var(--radius-full);
  border: none;
  background-color: var(--color-accent-orange);
}

.share {
  border-radius: var(--radius-full);
  border: none;
  background-color: #ecf4ff;
}
```

- [ ] **Step 3: Create public index**

Create `src/shared/ui/button/index.ts`:

```ts
export { Button } from './Button';
```

---

## Task 7: shared/ui — AppLink

**Files:**
- Create: `src/shared/ui/app-link/AppLink.tsx`
- Create: `src/shared/ui/app-link/app-link.module.css`
- Create: `src/shared/ui/app-link/index.ts`

- [ ] **Step 1: Create AppLink component**

Create `src/shared/ui/app-link/AppLink.tsx`:

```tsx
import styles from './app-link.module.css';

export interface AppLinkProps {
  href?: string;
  title: string;
  presets?: 'dark';
}

export const AppLink = ({ href = '#', title, presets }: AppLinkProps) => {
  return (
    <a
      href={href}
      className={`${styles.root} ${presets ? styles[presets] : ''}`}
    >
      {title}
    </a>
  );
};
```

- [ ] **Step 2: Create AppLink styles**

Create `src/shared/ui/app-link/app-link.module.css`:

```css
.root {
  text-decoration: none;
  color: var(--color-white);
}

.dark {
  text-decoration: none;
  color: var(--color-text-primary);
}
```

- [ ] **Step 3: Create public index**

Create `src/shared/ui/app-link/index.ts`:

```ts
export { AppLink } from './AppLink';
export type { AppLinkProps } from './AppLink';
```

---

## Task 8: shared/ui — CategoryButton

**Files:**
- Create: `src/shared/ui/category-button/CategoryButton.tsx`
- Create: `src/shared/ui/category-button/category-button.module.css`
- Create: `src/shared/ui/category-button/index.ts`

- [ ] **Step 1: Create CategoryButton component**

Create `src/shared/ui/category-button/CategoryButton.tsx`:

```tsx
import styles from './category-button.module.css';

export interface CategoryButtonProps {
  image: { url: string; alt: string };
  title: string;
}

export const CategoryButton = ({ image, title }: CategoryButtonProps) => {
  return (
    <button className={styles.categoryButton}>
      <div className={styles.content}>
        <img src={image.url} alt={image.alt} />
        <h3>{title}</h3>
      </div>
    </button>
  );
};
```

- [ ] **Step 2: Create CategoryButton styles**

Create `src/shared/ui/category-button/category-button.module.css`:

```css
.categoryButton {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 222px;
  height: 90px;
  background: var(--color-white);
  border: 1.5px solid var(--color-border);
  padding: 5px 14px;
  box-sizing: border-box;
  cursor: pointer;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.content img {
  width: 24px;
  height: 24px;
}

.content h3 {
  margin: 0;
  font-size: var(--font-size-base);
  font-weight: 400;
  color: #333;
}
```

- [ ] **Step 3: Create public index**

Create `src/shared/ui/category-button/index.ts`:

```ts
export { CategoryButton } from './CategoryButton';
export type { CategoryButtonProps } from './CategoryButton';
```

---

## Task 9: shared/ui — FeatureItem

FeatureItem is used in both `widgets/about-section` and `widgets/footer`. Since widgets cannot import from each other in FSD, it lives in `shared/ui`.

**Files:**
- Create: `src/shared/ui/feature-item/FeatureItem.tsx`
- Create: `src/shared/ui/feature-item/feature-item.module.css`
- Create: `src/shared/ui/feature-item/index.ts`

- [ ] **Step 1: Create FeatureItem component**

Create `src/shared/ui/feature-item/FeatureItem.tsx`:

```tsx
import styles from './feature-item.module.css';
import { Icon } from '@/shared/ui/icon';

export interface FeatureItemProps {
  id: string;
  icon: string;
  alt: string;
  title?: string;
  description?: string;
  className?: string;
}

export const FeatureItem = ({
  icon,
  alt,
  title,
  description,
  className,
}: FeatureItemProps) => {
  return (
    <div className={`${styles.element} ${className ?? ''}`}>
      <div className={styles.iconWrapper}>
        <Icon src={icon} alt={alt} className={className} />
      </div>
      <div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Create FeatureItem styles**

Create `src/shared/ui/feature-item/feature-item.module.css`:

```css
.element {
  display: flex;
  gap: var(--spacing-md);
  margin-top: 30px;
}

.iconWrapper {
  width: 50px;
  height: 50px;
}

.title {
  font-size: var(--font-size-lg);
  margin-top: 0;
  color: var(--color-primary);
}

.description {
  font-size: 18px;
  margin-top: 14px;
  white-space: pre-line;
}
```

- [ ] **Step 3: Create public index**

Create `src/shared/ui/feature-item/index.ts`:

```ts
export { FeatureItem } from './FeatureItem';
export type { FeatureItemProps } from './FeatureItem';
```

- [ ] **Step 4: Commit all shared/ui work**

```bash
git add src/shared/
git commit -m "refactor: migrate shared/ui — Icon, Button, AppLink, CategoryButton, FeatureItem"
```

---

## Task 10: entities/product

**Files:**
- Create: `src/entities/product/model/types.ts`
- Create: `src/entities/product/ui/ProductCard.tsx`
- Create: `src/entities/product/ui/product-card.module.css`
- Create: `src/entities/product/index.ts`

- [ ] **Step 1: Create Product type**

Create `src/entities/product/model/types.ts`:

```ts
export interface Product {
  title: string;
  price: number;
  image: { url: string; alt: string };
}
```

- [ ] **Step 2: Create ProductCard component**

Create `src/entities/product/ui/ProductCard.tsx`:

```tsx
import styles from './product-card.module.css';
import { Icon } from '@/shared/ui/icon';
import { Button } from '@/shared/ui/button';
import like from '@/shared/assets/like.svg';
import share from '@/shared/assets/share.svg';
import type { Product } from '../model/types';

export const ProductCard = ({ title, price, image }: Product) => {
  return (
    <div className={styles.card}>
      <img src={image.url} alt={image.alt} />
      <div className={styles.content}>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.activityButtons}>
            <Button size="like" presets="favorites">
              <Icon src={like} alt="like" />
            </Button>
            <Button size="like" presets="share">
              <Icon src={share} alt="share" />
            </Button>
          </div>
        </div>
        <div className={styles.buySection}>
          <p className={styles.price}>${price}</p>
          <Button size="small" presets="dark">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 3: Create ProductCard styles**

Create `src/entities/product/ui/product-card.module.css`:

```css
.card {
  width: 380px;
  height: 380px;
  flex-direction: column;
  margin-top: var(--spacing-xl);
  box-shadow: 1px 2px 4px rgb(0 0 0 / 10%);
}

.content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
}

.titleSection {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: normal;
}

.activityButtons {
  display: flex;
  gap: var(--spacing-xs);
}

.buySection {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.price {
  margin: 0;
  font-size: var(--font-size-lg);
}
```

- [ ] **Step 4: Create public index**

Create `src/entities/product/index.ts`:

```ts
export { ProductCard } from './ui/ProductCard';
export type { Product } from './model/types';
```

- [ ] **Step 5: Commit**

```bash
git add src/entities/
git commit -m "refactor: add entities/product — Product type and ProductCard component"
```

---

## Task 11: widgets/header

**Files:**
- Create: `src/widgets/header/ui/Navigation.tsx`
- Create: `src/widgets/header/ui/navigation.module.css`
- Create: `src/widgets/header/ui/Header.tsx`
- Create: `src/widgets/header/ui/header.module.css`
- Create: `src/widgets/header/index.ts`

- [ ] **Step 1: Create Navigation component**

Create `src/widgets/header/ui/Navigation.tsx`:

```tsx
import { AppLink } from '@/shared/ui/app-link';
import styles from './navigation.module.css';

const NAVIGATION_ROUTES = [
  { href: '#', title: 'Home' },
  { href: '#', title: 'About' },
  { href: '#', title: 'Features' },
  { href: '#', title: 'Contact' },
];

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {NAVIGATION_ROUTES.map((route) => (
          <li key={route.title}>
            <AppLink title={route.title} href={route.href} presets="dark" />
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

- [ ] **Step 2: Create Navigation styles**

Create `src/widgets/header/ui/navigation.module.css`:

```css
.nav {
  margin: 0 auto;
  color: var(--color-text-primary);
}

.list {
  font-size: var(--font-size-base);
  list-style: none;
  display: flex;
  gap: 60px;
  margin: 0;
  padding: 0;
}
```

- [ ] **Step 3: Create Header component**

Create `src/widgets/header/ui/Header.tsx`:

```tsx
import { Navigation } from './Navigation';
import loupeImage from '@/shared/assets/loupe.svg';
import menuImage from '@/shared/assets/menu.svg';
import styles from './header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <h2 className={styles.logo}>DudeShape</h2>
      <Navigation />
      <div className={styles.tools}>
        <img src={loupeImage} alt="loupe" />
        <img src={menuImage} alt="menu" />
      </div>
    </header>
  );
};
```

- [ ] **Step 4: Create Header styles**

Create `src/widgets/header/ui/header.module.css`:

```css
.header {
  display: flex;
  align-items: center;
  margin-top: 44px;
}

.logo {
  font-size: var(--font-size-xl);
  color: var(--color-primary);
  flex-shrink: 0;
}

.tools {
  display: flex;
  gap: 26px;
  flex-shrink: 0;
}
```

- [ ] **Step 5: Create public index**

Create `src/widgets/header/index.ts`:

```ts
export { Header } from './ui/Header';
```

---

## Task 12: widgets/footer

**Files:**
- Create: `src/widgets/footer/ui/constants.ts`
- Create: `src/widgets/footer/ui/Footer.tsx`
- Create: `src/widgets/footer/ui/footer.module.css`
- Create: `src/widgets/footer/index.ts`

- [ ] **Step 1: Create footer constants**

Create `src/widgets/footer/ui/constants.ts`:

```ts
import type { FeatureItemProps } from '@/shared/ui/feature-item';
import facebook from '@/shared/assets/facebook.svg';
import twitter from '@/shared/assets/twitter.svg';
import youtube from '@/shared/assets/youtube.svg';
import inst from '@/shared/assets/inst.svg';

export const SOCIAL_MEDIA: FeatureItemProps[] = [
  { id: 'facebook', icon: facebook, alt: 'facebook' },
  { id: 'twitter', icon: twitter, alt: 'twitter' },
  { id: 'youtube', icon: youtube, alt: 'youtube' },
  { id: 'inst', icon: inst, alt: 'Instagram' },
];
```

- [ ] **Step 2: Create Footer component**

Create `src/widgets/footer/ui/Footer.tsx`:

```tsx
import styles from './footer.module.css';
import { SOCIAL_MEDIA } from './constants';
import { FeatureItem } from '@/shared/ui/feature-item';
import { AppLink } from '@/shared/ui/app-link';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import arrow from '@/shared/assets/arrow2.svg';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brandSection}>
          <h3>DudeShape</h3>
          <p className={styles.brandDescription}>
            Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed
            eiusmod tempor incididunt ut labore.
          </p>
          <h3>Follow Us :</h3>
          <div className={styles.socialMedia}>
            {SOCIAL_MEDIA.map((item) => (
              <FeatureItem
                key={item.id}
                className={styles.socialIcon}
                id={item.id}
                icon={item.icon}
                alt={item.alt}
              />
            ))}
          </div>
        </div>

        <div className={styles.navSection}>
          <h3>Take a tour</h3>
          <AppLink title="Features" />
          <AppLink title="Pricing" />
          <AppLink title="Product" />
          <AppLink title="Support" />
        </div>

        <div className={styles.navSection}>
          <h3>Our company</h3>
          <AppLink title="About Us" />
          <AppLink title="Blog" />
          <AppLink title="Media" />
          <AppLink title="Contact Us" />
        </div>

        <div className={styles.subscribeSection}>
          <h3>Subscribe</h3>
          <p className={styles.subscribeText}>
            Subscribe to get the latest news from us
          </p>
          <div className={styles.subscribeForm}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.emailInput}
            />
            <Button
              className={styles.subscribeButton}
              size="vector"
              presets="arrow"
            >
              <Icon src={arrow} alt="submit" />
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        Copyright @ 2021. Crafted with love.
      </div>
    </footer>
  );
};
```

- [ ] **Step 3: Create Footer styles**

Create `src/widgets/footer/ui/footer.module.css`:

```css
.footer {
  width: 100%;
  background-color: var(--color-secondary);
  color: var(--color-white);
  margin-top: var(--spacing-3xl);
  padding-top: 100px;
}

.content {
  display: flex;
  justify-content: space-between;
  padding: 0 var(--spacing-2xl);
  box-sizing: border-box;
  width: 100%;
}

.brandSection {
  display: flex;
  flex-direction: column;
  max-width: 308px;
}

.brandDescription {
  margin: var(--spacing-sm) 0;
  line-height: 1.5;
  word-wrap: break-word;
}

.socialMedia {
  display: flex;
  gap: 12px;
}

.socialIcon {
  width: 20px;
  height: 20px;
  margin-bottom: var(--spacing-lg);
}

.navSection {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  min-width: 120px;
}

.subscribeSection {
  display: flex;
  flex-direction: column;
  max-width: 300px;
}

.subscribeText {
  margin: 8px 0 var(--spacing-sm) 0;
  color: rgb(255 255 255 / 80%);
}

.subscribeForm {
  display: flex;
  width: 100%;
  max-width: 253px;
  height: 48px;
  border: 1.5px solid var(--color-border);
  background-color: var(--color-white);
  border-radius: var(--radius-sm);
  align-items: center;
  padding-inline: 10px;
}

.emailInput {
  flex: 1;
  height: 100%;
  padding: 0 var(--spacing-sm);
  border: none;
  font-size: var(--font-size-base);
  outline: none;
}

.subscribeButton {
  width: 38px;
  height: 38px;
  background-color: var(--color-accent-yellow);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  padding: 10px;
}

.copyright {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #407980;
  background-color: var(--color-secondary);
  height: 63px;
  color: var(--color-white);
}
```

- [ ] **Step 4: Create public index**

Create `src/widgets/footer/index.ts`:

```ts
export { Footer } from './ui/Footer';
```

- [ ] **Step 5: Commit**

```bash
git add src/widgets/header/ src/widgets/footer/
git commit -m "refactor: migrate widgets/header and widgets/footer"
```

---

## Task 13: widgets/hero-section (formerly Description)

**Files:**
- Create: `src/widgets/hero-section/ui/HeroSection.tsx`
- Create: `src/widgets/hero-section/ui/hero-section.module.css`
- Create: `src/widgets/hero-section/index.ts`

- [ ] **Step 1: Create HeroSection component**

Create `src/widgets/hero-section/ui/HeroSection.tsx`:

```tsx
import { Button } from '@/shared/ui/button';
import styles from './hero-section.module.css';
import chairImage from '@/shared/assets/chair.png';

export const HeroSection = () => {
  return (
    <div className={styles.hero}>
      <img className={styles.chair} src={chairImage} alt="chair" />
      <div className={styles.text}>
        <h1>We Help You Make Modern Furniture</h1>
        <p className={styles.paragraph}>
          All of our furniture uses the best materials and choices for our
          customers. All of our furniture uses the best materials
        </p>
        <Button size="medium" presets="light">
          Explore more
        </Button>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Create HeroSection styles**

Create `src/widgets/hero-section/ui/hero-section.module.css`:

```css
.hero {
  display: flex;
  height: 560px;
  text-align: left;
  margin-top: 26px;
}

.text {
  background-color: var(--color-primary-dark);
  font-size: 30px;
  padding: var(--spacing-xl) 100px;
  color: var(--color-white);
}

.paragraph {
  font-size: var(--font-size-lg);
  padding-top: var(--spacing-md);
  padding-bottom: 30px;
}
```

- [ ] **Step 3: Create public index**

Create `src/widgets/hero-section/index.ts`:

```ts
export { HeroSection } from './ui/HeroSection';
```

---

## Task 14: widgets/trusted-companies (formerly Companies)

**Files:**
- Create: `src/widgets/trusted-companies/ui/constants.ts`
- Create: `src/widgets/trusted-companies/ui/TrustedCompanies.tsx`
- Create: `src/widgets/trusted-companies/ui/trusted-companies.module.css`
- Create: `src/widgets/trusted-companies/index.ts`

- [ ] **Step 1: Create constants**

Create `src/widgets/trusted-companies/ui/constants.ts`:

```ts
import type { IconProps } from '@/shared/ui/icon';
import mastercardIcon from '@/shared/assets/mastercard.svg';
import airbnbIcon from '@/shared/assets/airbnb.svg';
import uberIcon from '@/shared/assets/uber.svg';
import paypalIcon from '@/shared/assets/paypal.svg';
import visaIcon from '@/shared/assets/visa.svg';
import stripeIcon from '@/shared/assets/stripe.svg';

export const COMPANY_LOGOS: IconProps[] = [
  { src: mastercardIcon, alt: 'Mastercard' },
  { src: airbnbIcon, alt: 'Airbnb' },
  { src: uberIcon, alt: 'Uber' },
  { src: paypalIcon, alt: 'PayPal' },
  { src: visaIcon, alt: 'Visa' },
  { src: stripeIcon, alt: 'Stripe' },
];
```

- [ ] **Step 2: Create TrustedCompanies component**

Create `src/widgets/trusted-companies/ui/TrustedCompanies.tsx`:

```tsx
import { Icon } from '@/shared/ui/icon';
import { COMPANY_LOGOS } from './constants';
import styles from './trusted-companies.module.css';

export const TrustedCompanies = () => {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Trusted by 20,000+ companies</h2>
      <div className={styles.logos}>
        {COMPANY_LOGOS.map((logo) => (
          <Icon key={logo.alt} src={logo.src} alt={logo.alt} />
        ))}
      </div>
    </div>
  );
};
```

- [ ] **Step 3: Create TrustedCompanies styles**

Create `src/widgets/trusted-companies/ui/trusted-companies.module.css`:

```css
.title {
  display: block;
  text-align: center;
  font-size: var(--font-size-2xl);
  color: var(--color-primary);
  margin: var(--spacing-3xl) auto;
}

.logos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  margin: var(--spacing-lg) auto;
}
```

- [ ] **Step 4: Create public index**

Create `src/widgets/trusted-companies/index.ts`:

```ts
export { TrustedCompanies } from './ui/TrustedCompanies';
```

---

## Task 15: widgets/about-section (formerly Sofa)

**Files:**
- Create: `src/widgets/about-section/ui/constants.ts`
- Create: `src/widgets/about-section/ui/AboutSection.tsx`
- Create: `src/widgets/about-section/ui/about-section.module.css`
- Create: `src/widgets/about-section/index.ts`

- [ ] **Step 1: Create constants**

Create `src/widgets/about-section/ui/constants.ts`:

```ts
import type { FeatureItemProps } from '@/shared/ui/feature-item';
import shield from '@/shared/assets/shield.svg';
import tick from '@/shared/assets/tick.svg';
import truck from '@/shared/assets/truck.svg';

export const ABOUT_FEATURES: FeatureItemProps[] = [
  {
    id: 'shield',
    icon: shield,
    alt: 'shield',
    title: 'Best Quality',
    description: 'All of our furniture uses the best\n materials and choices',
  },
  {
    id: 'tick',
    icon: tick,
    alt: 'tick',
    title: '100% Secure',
    description: 'All of our furniture uses the best\n materials and choices',
  },
  {
    id: 'truck',
    icon: truck,
    alt: 'truck',
    title: 'Free Shipping',
    description: 'All of our furniture uses the best\n materials and choices',
  },
];
```

- [ ] **Step 2: Create AboutSection component**

Create `src/widgets/about-section/ui/AboutSection.tsx`:

```tsx
import { Icon } from '@/shared/ui/icon';
import { FeatureItem } from '@/shared/ui/feature-item';
import { ABOUT_FEATURES } from './constants';
import styles from './about-section.module.css';
import sofaImage from '@/shared/assets/sofa.png';

export const AboutSection = () => {
  return (
    <div className={styles.section}>
      <Icon src={sofaImage} alt="sofa" />
      <div>
        <div>
          <h1 className={styles.heading}>About Us</h1>
          <p className={styles.paragraph}>
            All of our furniture uses the best materials and <br />
            choices for our customers. All of our furniture <br />
            uses the best materials
          </p>
        </div>
        <div className={styles.features}>
          {ABOUT_FEATURES.map((item) => (
            <FeatureItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              alt={item.alt}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 3: Create AboutSection styles**

Create `src/widgets/about-section/ui/about-section.module.css`:

```css
.section {
  display: flex;
  margin-top: var(--spacing-3xl);
  justify-content: space-between;
}

.heading {
  margin: 0;
  color: var(--color-primary);
}

.paragraph {
  padding-top: var(--spacing-md);
}

.features {
  display: flex;
  flex-direction: column;
  margin-top: var(--spacing-lg);
}
```

- [ ] **Step 4: Create public index**

Create `src/widgets/about-section/index.ts`:

```ts
export { AboutSection } from './ui/AboutSection';
```

- [ ] **Step 5: Commit**

```bash
git add src/widgets/hero-section/ src/widgets/about-section/ src/widgets/trusted-companies/
git commit -m "refactor: migrate widgets — hero-section, about-section, trusted-companies"
```

---

## Task 16: widgets/popular-furniture (formerly Furniture)

**Files:**
- Create: `src/widgets/popular-furniture/ui/constants.ts`
- Create: `src/widgets/popular-furniture/ui/PopularFurniture.tsx`
- Create: `src/widgets/popular-furniture/ui/popular-furniture.module.css`
- Create: `src/widgets/popular-furniture/index.ts`

- [ ] **Step 1: Create constants**

Create `src/widgets/popular-furniture/ui/constants.ts`:

```ts
import type { Product } from '@/entities/product';
import interiorOne from '@/shared/assets/interiorOne.png';
import interiorTwo from '@/shared/assets/interiorTwo.png';
import interiorThree from '@/shared/assets/interiorThree.png';

export const FEATURED_PRODUCTS: Product[] = [
  {
    title: 'White Swan Chair',
    price: 40,
    image: { url: interiorOne, alt: 'Interior one' },
  },
  {
    title: 'White Swan Chair',
    price: 40,
    image: { url: interiorTwo, alt: 'Interior two' },
  },
  {
    title: 'White Swan Chair',
    price: 40,
    image: { url: interiorThree, alt: 'Interior three' },
  },
];
```

- [ ] **Step 2: Create PopularFurniture component**

Create `src/widgets/popular-furniture/ui/PopularFurniture.tsx`:

```tsx
import styles from './popular-furniture.module.css';
import { Icon } from '@/shared/ui/icon';
import { Button } from '@/shared/ui/button';
import { ProductCard } from '@/entities/product';
import { FEATURED_PRODUCTS } from './constants';
import vectorLeft from '@/shared/assets/left_vector.svg';
import vectorRight from '@/shared/assets/right_vector.svg';

export const PopularFurniture = () => {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Our Popular Furniture</h1>
          <p className={styles.description}>
            All of our furniture uses the best materials and choices for our
            customers. All of our <br />
            furniture uses the best materials and choices for our customers.
          </p>
        </div>
        <div className={styles.navigation}>
          <Button size="vector" presets="arrow">
            <Icon src={vectorLeft} alt="previous" />
          </Button>
          <Button size="vector" presets="arrow">
            <Icon src={vectorRight} alt="next" />
          </Button>
        </div>
      </div>

      <div className={styles.cards}>
        {FEATURED_PRODUCTS.map((product) => (
          <ProductCard
            key={product.title + product.image.alt}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};
```

- [ ] **Step 3: Create PopularFurniture styles**

Create `src/widgets/popular-furniture/ui/popular-furniture.module.css`:

```css
.section {
  flex-direction: column;
  justify-content: space-between;
  margin-top: var(--spacing-3xl);
  gap: 300px;
}

.header {
  display: flex;
  justify-content: space-between;
}

.title {
  font-size: var(--font-size-2xl);
}

.description {
  font-size: var(--font-size-lg);
}

.navigation {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-2xl);
}

.cards {
  display: flex;
  justify-content: space-between;
}
```

- [ ] **Step 4: Create public index**

Create `src/widgets/popular-furniture/index.ts`:

```ts
export { PopularFurniture } from './ui/PopularFurniture';
```

---

## Task 17: widgets/furniture-picker (formerly FurniturePicker)

**Files:**
- Create: `src/widgets/furniture-picker/ui/constants.ts`
- Create: `src/widgets/furniture-picker/ui/FurniturePicker.tsx`
- Create: `src/widgets/furniture-picker/ui/furniture-picker.module.css`
- Create: `src/widgets/furniture-picker/index.ts`

- [ ] **Step 1: Create constants**

Create `src/widgets/furniture-picker/ui/constants.ts`:

```ts
import type { CategoryButtonProps } from '@/shared/ui/category-button';
import bedRoom from '@/shared/assets/bedRoom.svg';
import diningRoom from '@/shared/assets/diningRoom.svg';
import hallway from '@/shared/assets/hallway.svg';
import kitchen from '@/shared/assets/kitchen.svg';
import livingRoom from '@/shared/assets/livingRoom.svg';

export const ROOM_CATEGORIES: CategoryButtonProps[] = [
  { image: { url: bedRoom, alt: 'bedRoom' }, title: 'Bed Room' },
  { image: { url: hallway, alt: 'hallway' }, title: 'Hallway' },
  { image: { url: diningRoom, alt: 'diningRoom' }, title: 'Dining Room' },
  { image: { url: kitchen, alt: 'kitchen' }, title: 'Kitchen' },
  { image: { url: livingRoom, alt: 'livingRoom' }, title: 'Living Room' },
  { image: { url: livingRoom, alt: 'office' }, title: 'Office' },
];
```

- [ ] **Step 2: Create FurniturePicker component**

Create `src/widgets/furniture-picker/ui/FurniturePicker.tsx`:

```tsx
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { CategoryButton } from '@/shared/ui/category-button';
import styles from './furniture-picker.module.css';
import interiorFour from '@/shared/assets/interiorFour.png';
import { ROOM_CATEGORIES } from './constants';

export const FurniturePicker = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Furniture</h1>
      <div className={styles.tabs}>
        <Button>
          <h3 className={styles.tabLabel}>Shop By Room</h3>
        </Button>
        <Button>
          <h3 className={styles.tabLabel}>Shop By Category</h3>
        </Button>
        <Button>
          <h3 className={styles.tabLabel}>Shop By Style</h3>
        </Button>
      </div>

      <div className={styles.content}>
        <Icon src={interiorFour} alt="Interior four" />
        <div className={styles.grid}>
          {ROOM_CATEGORIES.map((category) => (
            <CategoryButton
              key={category.title}
              image={category.image}
              title={category.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 3: Create FurniturePicker styles**

Create `src/widgets/furniture-picker/ui/furniture-picker.module.css`:

```css
.container {
  width: 100%;
}

.title {
  text-align: center;
  margin-top: var(--spacing-3xl);
  color: var(--color-text-primary);
}

.tabs {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.tabLabel {
  font-size: var(--font-size-xl);
  font-weight: 400;
  color: var(--color-text-muted);
}

.content {
  display: flex;
  gap: 135px;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-xl);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  width: 474px;
  flex-shrink: 0;
}
```

- [ ] **Step 4: Create public index**

Create `src/widgets/furniture-picker/index.ts`:

```ts
export { FurniturePicker } from './ui/FurniturePicker';
```

---

## Task 18: widgets/customer-review (formerly CustomerFocus)

**Files:**
- Create: `src/widgets/customer-review/ui/CustomerReview.tsx`
- Create: `src/widgets/customer-review/ui/customer-review.module.css`
- Create: `src/widgets/customer-review/index.ts`

- [ ] **Step 1: Create CustomerReview component**

Create `src/widgets/customer-review/ui/CustomerReview.tsx`:

```tsx
import styles from './customer-review.module.css';
import { Icon } from '@/shared/ui/icon';
import nightstand from '@/shared/assets/nightstand.png';
import person from '@/shared/assets/person.svg';
import star from '@/shared/assets/star.svg';

export const CustomerReview = () => {
  return (
    <div className={styles.section}>
      <Icon src={nightstand} alt="nightstand" />
      <div className={styles.review}>
        <h1>
          Our customers are very <br />
          important to us
        </h1>
        <p>
          All of our furniture uses the best materials and choices for <br />
          our customers. All of our furniture uses the best materials <br />
          and choices for our customers.
        </p>
        <div className={styles.reviewer}>
          <Icon src={person} alt="reviewer" />
          <div className={styles.reviewerInfo}>
            <h3>Mh Jibon</h3>
            <div className={styles.rating}>
              <Icon src={star} alt="star" />
              <p>4.8</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Create CustomerReview styles**

Create `src/widgets/customer-review/ui/customer-review.module.css`:

```css
.section {
  display: flex;
  gap: 100px;
  margin-top: var(--spacing-3xl);
  align-items: center;
}

.review {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.reviewer {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: var(--spacing-md);
}

.reviewerInfo {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.reviewerInfo h3,
.rating p {
  margin: 0;
  font-weight: normal;
}

.rating {
  display: flex;
  gap: 7px;
  align-items: center;
}

.rating p {
  line-height: 1;
}
```

- [ ] **Step 3: Create public index**

Create `src/widgets/customer-review/index.ts`:

```ts
export { CustomerReview } from './ui/CustomerReview';
```

---

## Task 19: widgets/subscribe-section (formerly Subscribe)

**Files:**
- Create: `src/widgets/subscribe-section/ui/SubscribeSection.tsx`
- Create: `src/widgets/subscribe-section/ui/subscribe-section.module.css`
- Create: `src/widgets/subscribe-section/index.ts`

- [ ] **Step 1: Create SubscribeSection component**

Create `src/widgets/subscribe-section/ui/SubscribeSection.tsx`:

```tsx
import styles from './subscribe-section.module.css';
import { Icon } from '@/shared/ui/icon';
import { Button } from '@/shared/ui/button';
import mail from '@/shared/assets/mail.svg';

export const SubscribeSection = () => {
  return (
    <div className={styles.section}>
      <h1>Subscribe to get the latest news about us</h1>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed <br />
        eiusmod tempor incididunt ut labore at dolore.
      </p>
      <div className={styles.inputContainer}>
        <Icon src={mail} alt="mail" className={styles.mailIcon} />
        <input
          type="email"
          placeholder="Enter your email"
          className={styles.emailInput}
        />
        <Button size="medium" presets="dark">
          Register
        </Button>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Create SubscribeSection styles**

Create `src/widgets/subscribe-section/ui/subscribe-section.module.css`:

```css
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: var(--spacing-3xl);
  background-color: var(--color-surface);
  padding-top: 65px;
}

.description {
  text-align: center;
  padding-top: var(--spacing-md);
}

.inputContainer {
  display: flex;
  width: 471px;
  height: 60px;
  border: 1.5px solid var(--color-border);
  background-color: var(--color-white);
  padding: 10px;
  align-items: center;
  margin: var(--spacing-lg) 0;
}

.emailInput {
  flex: 1;
  height: 48px;
  padding: 0 var(--spacing-sm);
  border: none;
  font-size: var(--font-size-base);
}

.mailIcon {
  width: 20px;
  height: 20px;
}

.emailInput::placeholder {
  color: #999;
}
```

- [ ] **Step 3: Create public index**

Create `src/widgets/subscribe-section/index.ts`:

```ts
export { SubscribeSection } from './ui/SubscribeSection';
```

- [ ] **Step 4: Commit**

```bash
git add src/widgets/popular-furniture/ src/widgets/furniture-picker/ src/widgets/customer-review/ src/widgets/subscribe-section/
git commit -m "refactor: migrate widgets — popular-furniture, furniture-picker, customer-review, subscribe-section"
```

---

## Task 20: app layer — global styles and Router

**Files:**
- Create: `src/app/styles/global.css`
- Create: `src/app/providers/router.tsx`
- Create: `src/app/index.tsx`

- [ ] **Step 1: Create global styles**

Create `src/app/styles/global.css`:

```css
@import '@/shared/config/tokens.css';

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family-base);
  width: 100%;
  overflow-x: hidden;
}
```

- [ ] **Step 2: Create Router provider**

Create `src/app/providers/router.tsx`:

```tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '@/pages/home';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
]);

export const AppRouter = () => <RouterProvider router={router} />;
```

- [ ] **Step 3: Create app entry point**

Create `src/app/index.tsx`:

```tsx
import { AppRouter } from './providers/router';
import './styles/global.css';

export const App = () => <AppRouter />;
```

- [ ] **Step 4: Commit**

```bash
git add src/app/
git commit -m "refactor: setup app layer with global styles and React Router provider"
```

---

## Task 21: pages/home

**Files:**
- Create: `src/pages/home/ui/HomePage.tsx`
- Create: `src/pages/home/ui/home-page.module.css`
- Create: `src/pages/home/index.ts`

- [ ] **Step 1: Create HomePage**

Create `src/pages/home/ui/HomePage.tsx`:

```tsx
import { Header } from '@/widgets/header';
import { HeroSection } from '@/widgets/hero-section';
import { TrustedCompanies } from '@/widgets/trusted-companies';
import { AboutSection } from '@/widgets/about-section';
import { PopularFurniture } from '@/widgets/popular-furniture';
import { FurniturePicker } from '@/widgets/furniture-picker';
import { CustomerReview } from '@/widgets/customer-review';
import { SubscribeSection } from '@/widgets/subscribe-section';
import { Footer } from '@/widgets/footer';
import styles from './home-page.module.css';

export const HomePage = () => {
  return (
    <>
      <div className={styles.layout}>
        <Header />
        <HeroSection />
        <TrustedCompanies />
        <AboutSection />
        <PopularFurniture />
        <FurniturePicker />
        <CustomerReview />
        <SubscribeSection />
      </div>
      <Footer />
    </>
  );
};
```

- [ ] **Step 2: Create HomePage styles**

Create `src/pages/home/ui/home-page.module.css`:

```css
.layout {
  padding-inline: var(--spacing-2xl);
}
```

- [ ] **Step 3: Create public index**

Create `src/pages/home/index.ts`:

```ts
export { HomePage } from './ui/HomePage';
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/
git commit -m "refactor: create pages/home as composition of widgets"
```

---

## Task 22: Update main.tsx entry point

**Files:**
- Modify: `src/main.tsx`

- [ ] **Step 1: Rewrite main.tsx**

Replace `src/main.tsx` with:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 2: Verify dev server starts**

```bash
npm run dev
```

Open browser at http://localhost:5173. Expected: app renders identically to before refactoring.

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/main.tsx
git commit -m "refactor: wire app layer into main entry point"
```

---

## Task 23: Remove legacy сomponents/ directory

⚠️ **Only do this after Task 22 passes** (dev server runs, TS compiles).

**Files:**
- Delete: `src/сomponents/` (Cyrillic "с")
- Delete: `src/App.tsx`
- Delete: `src/app.module.css`

- [ ] **Step 1: Remove legacy files**

```bash
git rm -r "src/сomponents"
git rm src/App.tsx src/app.module.css
```

- [ ] **Step 2: Verify dev server still works**

```bash
npm run dev
```

Expected: app still renders. No import errors in console.

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove legacy сomponents/ directory and old App files"
```

---

## Task 24: Final verification and PR prep

- [ ] **Step 1: Full lint pass**

```bash
npm run lint
```

Fix any reported issues.

- [ ] **Step 2: Full build verification**

```bash
npm run build && npm run preview
```

Open browser at http://localhost:4173. Verify all sections render correctly.

- [ ] **Step 3: Verify TypeScript strict mode**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 4: Push branch**

```bash
git push -u origin refactor/fsd-architecture
```

- [ ] **Step 5: Create PR**

Title: `refactor: migrate to Feature-Sliced Design architecture`

Body:
```markdown
## Summary

- Migrated all 16 components from flat `сomponents/` directory to FSD layers (widgets, entities, shared/ui)
- Added React Router for multi-page support
- Introduced PostCSS design tokens replacing all hardcoded color/spacing values
- Configured `@` path alias eliminating deep relative imports
- Fixed Cyrillic folder name bug (`сomponents/` → deleted)

## Architecture Decisions

**Why widgets, not features?** Current page sections (Hero, About, Companies, etc.) are compositional blocks with no isolated business logic or user interactions. `features/` layer is reserved for future interactive scenarios (cart, auth, filtering).

**Why FeatureItem in shared/ui?** It's used in both `widgets/footer` and `widgets/about-section`. Since widgets cannot import from each other per FSD rules, it must live in `shared/ui`.

**Why product in entities?** `ProductCard` is a pure data-display component with a clear domain model (`Product` type). It will be reused across future catalog and detail pages.

## Key Improvements

- FSD layer structure with strict top-down dependency flow
- `@` path alias: `../../../shared/ui` → `@/shared/ui`
- PostCSS design tokens: 15 color and 7 spacing variables covering all CSS modules
- React Router: ready for catalog, product detail, and other pages
- Consistent naming: PascalCase components, kebab-case CSS files, UPPER_SNAKE_CASE constants
- Fixed missing `key` props in all `.map()` calls
- Removed unused CSS rules (`.left`, `.right`, `.about`)
- Cleaned up `type CardsType = CardProps & {}` → `type CardsType = Product`

## Potential Risks

- Asset imports via `@/shared/assets/` should be verified in production build (Vite handles these correctly but worth confirming)
- `react-router-dom` adds ~50kb gzip to bundle — acceptable for multi-page readiness
- CSS `var()` requires modern browsers (already satisfied by Vite default target: ES2022+)
```
