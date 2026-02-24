# Technology Stack

**Analysis Date:** 2026-02-24

## Languages

**Primary:**
- TypeScript 5.x - Full codebase, strong type safety enabled in `tsconfig.json`
- React 19 - UI component development with JSX syntax (`components/`, `app/layout.tsx`, `app/page.tsx`)

**Secondary:**
- CSS 3 / Tailwind CSS - Styling via utility-first framework

## Runtime

**Environment:**
- Node.js (version not explicitly specified, but referenced in metadata as skill)

**Package Manager:**
- Bun (indicated by `bun.lock` file in repo)
- pnpm (indicated by `pnpm-lock.yaml` file in repo)

**Lockfile:** Both `bun.lock` and `pnpm-lock.yaml` present

## Frameworks

**Core:**
- Next.js 15.2.4 - Full-stack React framework with App Router (`app/` directory, server components)
- React 19 - UI component library

**UI Components:**
- Radix UI (20+ component packages) - Unstyled, accessible component primitives (`@radix-ui/react-*` packages)
  - Alert Dialog, Accordion, Avatar, Checkbox, Dialog, Dropdown Menu, Hover Card, Label, Menubar, Navigation Menu, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Slider, Tabs, Toast, Toggle, Tooltip
- shadcn/ui - Tailwind + Radix UI component library (configured in `components.json`)
- Lucide React 0.454.0 - Icon library used throughout components

**Theming:**
- next-themes 0.4.6 - Dark/light theme management (`components/theme-provider.tsx`)

**Styling:**
- Tailwind CSS 4.1.14 - Utility-first CSS framework
- Tailwind CSS PostCSS plugin - Via `@tailwindcss/postcss` 4.1.9
- Autoprefixer 10.4.20 - CSS vendor prefix automation
- class-variance-authority 0.7.1 - Component variant management (used in `components/ui/button-group.tsx`)
- tailwind-merge 2.5.5 - Tailwind class merging utility (`lib/utils.ts`)
- clsx 2.1.1 - Conditional className helper (`lib/utils.ts`)

**Forms & Validation:**
- react-hook-form 7.60.0 - Form state management (`components/ui/form.tsx`)
- @hookform/resolvers 3.10.0 - Form validation resolvers
- Zod 3.25.76 - TypeScript-first schema validation (`components/ui/form.tsx`)

**Markdown & Content:**
- react-markdown - Markdown rendering for content
- remark-gfm - GitHub-flavored Markdown support
- remark-math - Math expression support
- rehype-katex - LaTeX/KaTeX math rendering
- katex - Math typesetting library

**Data & Charts:**
- recharts 2.15.4 - React charting library
- date-fns 4.1.0 - Date manipulation utilities

**UI Interaction:**
- embla-carousel-react 8.5.1 - Carousel/slider component
- react-resizable-panels 2.1.7 - Resizable panel layout
- vaul 0.9.9 - Drawer component
- react-day-picker 9.8.0 - Date picker
- cmdk 1.0.4 - Command/search interface
- input-otp 1.4.1 - OTP input component
- sonner 1.7.4 - Toast notification library

**Analytics:**
- @vercel/analytics - Vercel Analytics integration (`app/layout.tsx` line 5, 117)

**Typography:**
- geist (latest) - Font family (Geist Sans and Mono) used in `app/layout.tsx`

**Styling Utilities:**
- tailwindcss-animate 1.0.7 - Tailwind animation utilities

## Testing

**Not detected** - No test dependencies (jest, vitest, testing-library) in package.json

## Build/Dev Tools

**Build System:**
- Next.js 15.2.4 - Built-in bundling and optimization

**Development:**
- TypeScript 5.x - Compilation via Next.js
- PostCSS 8.5 - CSS transformation pipeline (configured in `postcss.config.mjs`)

**Linting/Formatting:**
- ESLint - Configured in Next.js (built-in) but **ignored during builds** in `next.config.mjs` line 4
- Prettier - Not explicitly configured (no `.prettierrc` found)

## Configuration

**Environment:**
- Node environment variables via `.env*.local` files (per `.gitignore` line 27)
- No environment configuration files found in repo root (per security, not reading `.env` files)

**Build Configuration:**
- `next.config.mjs` - Next.js configuration:
  - Output: `'standalone'` mode for containerized deployments
  - ESLint: Ignored during builds
  - TypeScript errors: Ignored during builds
  - Images: Unoptimized (for static export compatibility)

**TypeScript Configuration (`tsconfig.json`):**
- Target: ES6
- Module: esnext
- Module Resolution: bundler
- JSX: preserve (Next.js handles compilation)
- Path aliases: `@/*` maps to root directory
- Strict mode: enabled
- No emit: incremental compilation

**Component Configuration (`components.json`):**
- shadcn/ui style: new-york
- Framework: React Server Components (RSC) enabled
- Tailwind config: CSS variable based, neutral base color
- Icon library: Lucide

**PostCSS Configuration (`postcss.config.mjs`):**
- Plugin: `@tailwindcss/postcss`

## Platform Requirements

**Development:**
- Node.js runtime (v18+ recommended for Next.js 15)
- Package manager: Bun or pnpm
- Git for version control

**Production:**
- Deployment target: Vercel (indicated by `@vercel/analytics` and vercel domain in metadata)
- Container-compatible output (`output: 'standalone'` in Next.js config)
- Node.js runtime for server components

## Package Manager Scripts

```bash
npm run dev          # Next.js dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run Next.js linting
```

---

*Stack analysis: 2026-02-24*
