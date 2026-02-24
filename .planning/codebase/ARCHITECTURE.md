# Architecture

**Analysis Date:** 2026-02-24

## Pattern Overview

**Overall:** Next.js App Router Single-Page Application (SPA) with modular section-based component architecture. Static site with client-side interactivity.

**Key Characteristics:**
- Server-side rendering (SSR) via Next.js 15 for SEO optimization
- Client-component driven interactivity for smooth navigation and animations
- Section-based layout with smooth scroll navigation
- Static content with dynamic styling and theme management
- Structured data for search engine optimization

## Layers

**Presentation/UI Layer:**
- Purpose: Render visual components and handle user interactions
- Location: `/components` and `/components/ui`
- Contains: React components (TSX), UI primitives from Radix UI, section components
- Depends on: Theme providers, utilities, hooks
- Used by: Page layout and navigation

**Page Layer:**
- Purpose: Assemble sections into a cohesive page experience
- Location: `/app/page.tsx`
- Contains: Single home page that composes section components
- Depends on: Section components from `/components`
- Used by: Next.js routing system

**Layout/Root Layer:**
- Purpose: Provide root HTML structure, metadata, analytics, and theme context
- Location: `/app/layout.tsx`
- Contains: Document metadata, font configuration, analytics provider, theme provider wrapper
- Depends on: Theme provider, structured data, analytics
- Used by: All pages

**Utilities & Helpers:**
- Purpose: Provide reusable helper functions
- Location: `/lib/utils.ts`
- Contains: CSS utility function (`cn`) for merging Tailwind classes
- Depends on: clsx, tailwind-merge packages
- Used by: All components needing class composition

**Custom Hooks:**
- Purpose: Provide reusable React logic
- Location: `/hooks/`
- Contains: `useIsMobile` for responsive design, `useToast` for notifications
- Depends on: React core hooks
- Used by: Components requiring device detection or toasts

**Configuration:**
- Purpose: Configure build, styling, and component generation
- Location: `/next.config.mjs`, `/components.json`, `/tsconfig.json`, `/postcss.config.mjs`
- Contains: Next.js config, shadcn/ui config, TypeScript paths, PostCSS plugins
- Depends on: Framework requirements
- Used by: Build system and development environment

## Data Flow

**Section Rendering Flow:**

1. User navigates to application root
2. Next.js server renders `/app/layout.tsx` with metadata and providers
3. Page component (`/app/page.tsx`) imports and renders section components
4. Each section component (Hero, About, Experience, etc.) renders static content with Tailwind styling
5. Theme provider applies light/dark theme CSS variables
6. Client-side hydration enables interactivity (navigation, animations)

**Navigation Flow:**

1. Navigation component (`/components/navigation.tsx`) observes section visibility using Intersection Observer API
2. Desktop: Left sidebar shows section icons; icons highlight based on visible section
3. Mobile: Top bar shows hamburger menu with full nav list
4. User clicks nav item or scrolls page manually
5. Active section updates via Intersection Observer
6. Smooth scroll animation triggered on nav click

**Theme Management:**

1. Root layout wraps app with `ThemeProvider` (next-themes wrapper)
2. Theme provider stores preference in localStorage and respects system preference
3. CSS variables in `globals.css` switch based on `.dark` class
4. Components use `foreground`, `background`, `primary`, `muted-foreground` variables
5. Theme toggle button updates preference; CSS automatically re-renders

## Key Abstractions

**Section Component Pattern:**

- **Purpose:** Encapsulate content for different portfolio sections
- **Examples:** `Hero` (`/components/hero.tsx`), `About` (`/components/about.tsx`), `Experience` (`/components/experience.tsx`), `Projects` (`/components/projects.tsx`)
- **Pattern:** Each section is a client component with `"use client"` directive, styled with Tailwind, data inline as arrays/objects

**UI Component Library:**

- **Purpose:** Provide reusable, accessible, styled UI primitives
- **Examples:** Badge, Button, Card, Dialog, Dropdown, Form controls (input, select, textarea)
- **Pattern:** Wrapped Radix UI primitives with Tailwind styling applied via `cn()` utility

**Navigation Controller:**

- **Purpose:** Manage section detection and scroll synchronization
- **Examples:** `Navigation` component with Intersection Observer
- **Pattern:** Observes section elements, tracks active section state, handles both auto-detection and manual navigation

**Metadata & SEO:**

- **Purpose:** Provide search engine optimization via structured data and meta tags
- **Examples:** `StructuredData` component (`/components/structured-data.tsx`), layout metadata
- **Pattern:** JSON-LD structured data, Open Graph tags, Twitter cards, robots configuration

## Entry Points

**Application Root:**
- Location: `/app/layout.tsx`
- Triggers: Initial page load
- Responsibilities: Setup HTML structure, configure metadata, provide theme context, load analytics

**Home Page:**
- Location: `/app/page.tsx`
- Triggers: Navigation to `/`
- Responsibilities: Compose section components into a single-page experience

**Section Components:**
- Location: `/components/{section-name}.tsx` (hero, about, experience, etc.)
- Triggers: Page render, called by home page component
- Responsibilities: Display content for specific portfolio section, handle section-specific interactivity

**Navigation:**
- Location: `/components/navigation.tsx`
- Triggers: Mounted on page load
- Responsibilities: Track active section, provide scroll navigation, manage mobile menu

## Error Handling

**Strategy:** Minimal error handling; static content with no error boundaries. No API failures or runtime errors expected.

**Patterns:**
- No explicit error handling for sections (all content is static)
- Navigation gracefully handles missing section elements
- No fallback UI for failed loads

## Cross-Cutting Concerns

**Logging:** No logging configured. Development happens via browser console.

**Validation:** Form validation via `react-hook-form` and `zod` packages (installed but not actively used in current sections).

**Authentication:** Not applicable; portfolio is public with no auth required.

**Styling:** Tailwind CSS v4 with custom CSS variables for theme support. All components use utility-first approach via `cn()` composition function.

**Accessibility:** Semantic HTML, ARIA labels on interactive elements, keyboard navigation support via native HTML. Radix UI primitives ensure proper accessibility semantics.

**SEO:** Structured data via JSON-LD, meta tags in layout, Open Graph support, sitemap and robots.txt generation via special files.

---

*Architecture analysis: 2026-02-24*
