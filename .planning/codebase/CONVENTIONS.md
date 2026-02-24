# Coding Conventions

**Analysis Date:** 2026-02-24

## Naming Patterns

**Files:**
- Component files: PascalCase (e.g., `Hero.tsx`, `About.tsx`, `Contact.tsx`)
- Utility/hook files: camelCase with descriptive names (e.g., `use-mobile.ts`, `use-toast.ts`, `utils.ts`)
- UI components: PascalCase in `components/ui/` (e.g., `badge.tsx`, `button.tsx`, `card.tsx`)
- Feature sections: camelCase (e.g., `about.tsx`, `experience.tsx`, `projects.tsx`)
- Server/config files: kebab-case or camelCase (e.g., `robots.ts`, `sitemap.ts`, `manifest.ts`)

**Functions:**
- Component functions: PascalCase (e.g., `export function Hero()`, `export function Contact()`)
- Hook functions: camelCase with `use` prefix (e.g., `useToast()`, `useIsMobile()`)
- Utility functions: camelCase (e.g., `cn()`, `genId()`)
- Event handlers: camelCase with handler prefix (e.g., `handleNavClick()`, `handleMobileNavClick()`)
- Internal helper functions: camelCase (e.g., `addToRemoveQueue()`, `dispatch()`)

**Variables:**
- Constants (module-level): UPPER_CASE or camelCase (e.g., `MOBILE_BREAKPOINT`, `TOAST_LIMIT`, `TOAST_REMOVE_DELAY`)
- State variables: camelCase (e.g., `isVisible`, `activeSection`, `isMobileMenuOpen`)
- Data arrays/objects: camelCase (e.g., `navItems`, `experiences`, `skills`, `researchAreas`)
- React imports: Standard (e.g., `React`, `useState`, `useEffect`)

**Types:**
- Interfaces: PascalCase (e.g., `State`, `Action`, `ToasterToast`, `Note`)
- Type aliases: PascalCase (e.g., `ActionType`, `Toast`, `ToastProps`)
- Union types: PascalCase (e.g., `Action` discriminated unions)
- React component props: Implicit via `React.ComponentProps<>` or explicit interfaces

## Code Style

**Formatting:**
- Single quotes for strings: `'use client'`, `'react'` (consistent in imports)
- Double quotes in JSX attributes: `className="..."`
- Trailing commas in multi-line objects/arrays
- No semicolons at end of statements (Next.js ESLint default)
- Indentation: 2 spaces

**Linting:**
- ESLint configured via Next.js (see `next.config.mjs`)
- Build ignores ESLint errors: `ignoreDuringBuilds: true` in `next.config.mjs`
- TypeScript build errors ignored: `ignoreBuildErrors: true`
- No explicit `.eslintrc` file (uses Next.js defaults)

**Class Names & Styling:**
- Tailwind CSS utility classes throughout
- `cn()` utility (from `lib/utils.ts`) for conditional class merging: `cn(baseClasses, conditionalClass)`
- Use `clsx` + `tailwind-merge` pattern via `cn()` helper
- Consistent spacing: `gap-`, `px-`, `py-`, `mb-`, `mt-` prefixes
- Theme colors via CSS variables: `primary`, `foreground`, `muted-foreground`, `border`, `accent`, etc.

## Import Organization

**Order:**
1. React/Next.js imports: `import { useState } from "react"`, `import type { Metadata } from "next"`
2. Third-party UI libraries: `import { Github, Linkedin } from "lucide-react"`
3. Third-party utilities: `import ReactMarkdown from "react-markdown"`, `import { Badge } from "@/components/ui/badge"`
4. Project imports via aliases: `import { Hero } from "@/components/hero"`
5. Internal utilities: `import { cn } from "@/lib/utils"`
6. Styles: `import "./globals.css"`, `import "katex/dist/katex.min.css"`

**Path Aliases:**
- `@/*`: Root directory (e.g., `@/components/hero`, `@/lib/utils`)
- Configured in `tsconfig.json`: `"paths": { "@/*": ["./*"] }`

**Use `type` keyword for type imports:**
```typescript
import type React from "react"
import type { Metadata } from "next"
import type { ThemeProviderProps } from 'next-themes'
```

## Error Handling

**Patterns:**
- No explicit try/catch blocks observed in main codebase
- Validation via Zod when needed (present in dependencies)
- React component safety: Error boundaries implied by Next.js/React patterns
- Missing error handling in client-side navigation (e.g., `navigation.tsx` scroll handling)

**Approach:**
- Defensive programming with optional chaining: `element?.offsetTop`
- Null checks before operations: `if (element) { ... }`
- Default values in state: `isMobile` defaults to `undefined`, checked with `!!isMobile`
- No explicit error recovery mechanisms in place

## Logging

**Framework:** No structured logging library used.

**Patterns:**
- No logging observed in production code
- Console output would use standard `console.log()`, `console.error()` if needed
- Environment-based control could be added but not currently implemented
- Analytics via `@vercel/analytics/next` injected in layout

## Comments

**When to Comment:**
- Inline comments for non-obvious logic (e.g., "Find the section with the highest intersection ratio")
- Complex algorithms documented: IntersectionObserver setup in `navigation.tsx`
- Side effects noted: "! Side effects ! - This could be extracted..." in `use-toast.ts`
- Author attributions: "Inspired by react-hot-toast library"

**JSDoc/TSDoc:**
- Not consistently used
- Type annotations preferred over JSDoc comments
- Some comments explain design decisions but not exhaustive

## Function Design

**Size:**
- Component functions: 10-100+ lines (Hero: 54 lines, About: 92 lines)
- Utility functions: 5-10 lines (e.g., `cn()` is 6 lines)
- Hook functions: 10-30 lines (useIsMobile: 19 lines, useToast: 40+ lines)
- No strict size limits enforced

**Parameters:**
- Destructured props: `{ children, ...props }` in provider components
- Spread operators used for flexibility: `{ ...props }` passed through
- Type safety via React component prop types: `React.ComponentProps<'button'>`
- Optional parameters with defaults: `asChild = false`

**Return Values:**
- Components return JSX: `return <section>...</section>`
- Hooks return objects/state: `{ isMobile }`, `{ toasts, toast, dismiss }`
- Utilities return single values: `cn()` returns merged class string
- No implicit undefined returns

## Module Design

**Exports:**
- Named exports for components: `export function Hero()`, `export function About()`
- Named exports for utilities: `export function cn()`, `export { useToast, toast }`
- Default exports for layouts/pages: `export default function RootLayout()`, `export default function Home()`
- Type exports: `export { Toast, badgeVariants }`

**Barrel Files:**
- Not used in this codebase
- Each component has direct import path (e.g., `@/components/hero` not `@/components/index`)
- UI components imported individually: `@/components/ui/badge`

## Class Variance Authority (CVA) Pattern

**Component Variants:**
Used for styled component variants (buttons, badges, etc.):

```typescript
const buttonVariants = cva(
  "base-classes-here",
  {
    variants: {
      variant: {
        default: '...',
        destructive: '...',
      },
      size: {
        default: '...',
        sm: '...',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    }
  }
)

function Button({ className, variant, size, ...props }:
  React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
```

## Radix UI Pattern

Components wrap Radix UI primitives:

```typescript
function AlertDialog({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root {...props} />
}
```

## Data Structures

**Static Data:**
- Arrays of objects at module level (e.g., `navItems`, `experiences`, `skills`)
- Interfaces defined before usage: `interface Note { title, date, content, tags }`
- Mapped over with `.map()` for rendering

---

*Convention analysis: 2026-02-24*
