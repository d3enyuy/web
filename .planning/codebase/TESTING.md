# Testing Patterns

**Analysis Date:** 2026-02-24

## Test Framework

**Runner:**
- Not detected - No test runner configured
- No `jest.config.js`, `vitest.config.ts`, or test scripts in `package.json`
- `package.json` contains only: `build`, `dev`, `lint`, `start` scripts

**Assertion Library:**
- Not applicable - No testing infrastructure present

**Run Commands:**
```bash
npm run lint              # Run Next.js linter only
npm run dev              # Development server
npm run build            # Production build
npm start                # Production server
```

## Test File Organization

**Location:**
- No test files found in codebase
- No `__tests__`, `tests/`, `.test.tsx`, or `.spec.tsx` files in source directories
- Test dependencies: Zod (3.25.76) in `package.json` for schema validation only

**Naming:**
- Not applicable - No test files present

**Structure:**
- Not applicable - No test files present

## Test Types

**Unit Tests:**
- Not implemented
- No component tests for UI components
- No utility function tests (e.g., `cn()` helper)
- No hook tests (e.g., `useIsMobile()`, `useToast()`)

**Integration Tests:**
- Not implemented
- No form submission tests
- No API integration tests
- No state management tests

**E2E Tests:**
- Not implemented
- No Cypress, Playwright, or Puppeteer configuration
- Navigation flow not tested (e.g., smooth scroll behavior in `Navigation` component)

## Testing Gaps

**Critical Untested Areas:**

1. **Client Components (`"use client"`):**
   - `components/hero.tsx`: `useEffect` and state management for visibility animation
   - `components/navigation.tsx`: IntersectionObserver implementation with complex scroll logic
   - `components/notes.tsx`: Dynamic note expansion/collapse state
   - Risk: UI state bugs go undetected; scroll behavior breakage unnoticed

2. **Custom Hooks:**
   - `hooks/use-toast.ts`: Complex reducer logic for toast state management (192 lines)
   - `hooks/use-mobile.ts` (via `components/ui/use-mobile.tsx`): Media query listener and cleanup
   - Risk: Memory leaks, event listener cleanup failures, race conditions

3. **Server Components & Metadata:**
   - `app/layout.tsx`: Metadata exports, structured data injection
   - `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`: SEO configuration
   - Risk: SEO issues, incorrect metadata on pages

4. **Utility Functions:**
   - `lib/utils.ts`: `cn()` class merging (untested merging edge cases)
   - Risk: Incorrect class precedence in edge cases

5. **Data Arrays & Rendering:**
   - `components/about.tsx`, `components/experience.tsx`, `components/notes.tsx`: Static data arrays
   - Component rendering with `.map()` operations
   - Risk: Display bugs, layout breaks with dynamic content

6. **Accessibility:**
   - No ARIA testing
   - Radix UI components used but no a11y test assertions
   - Navigation focus management untested
   - Risk: Accessibility failures, poor screen reader support

7. **Responsive Behavior:**
   - `useIsMobile()` hook uses media queries but never tested
   - Mobile menu open/close not validated
   - Risk: Mobile UX broken, responsive breakpoints not verified

## Mocking

**Framework:** Not applicable - No testing infrastructure

**Patterns:** Not observed

**What to Mock (if tests added):**
- `IntersectionObserver` API in `navigation.tsx`
- `window.matchMedia()` in `use-mobile.ts`
- `document.getElementById()` in navigation scroll logic
- Vercel Analytics: `@vercel/analytics/next`
- Next.js theme provider: `next-themes`

**What NOT to Mock:**
- React component rendering (use real components)
- Radix UI primitives (use actual components)
- Tailwind CSS utilities (test visual output)
- Markdown rendering: `react-markdown` with `remark-gfm`

## Coverage

**Requirements:** No coverage enforcement - no testing infrastructure

**View Coverage:** Not applicable

---

## Recommendations for Adding Tests

### 1. Setup Testing Infrastructure
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
})
```

### 2. Component Test Example
Pattern for testing components in `components/hero.tsx`:

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import { Hero } from '@/components/hero'

describe('Hero', () => {
  it('should render hero section with animation', async () => {
    render(<Hero />)

    const heading = screen.getByRole('heading', { name: /Lambiv Gills Dzenyuy/i })
    expect(heading).toBeInTheDocument()

    await waitFor(() => {
      expect(heading.parentElement).toHaveClass('opacity-100')
    })
  })
})
```

### 3. Hook Test Example
Pattern for testing hooks in `hooks/use-toast.ts`:

```typescript
import { renderHook, act } from '@testing-library/react'
import { useToast } from '@/hooks/use-toast'

describe('useToast', () => {
  it('should add and remove toast', async () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({ title: 'Test' })
    })

    expect(result.current.toasts).toHaveLength(1)
  })
})
```

### 4. Test Utility Functions
Pattern for testing `lib/utils.ts`:

```typescript
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('should merge classes correctly', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })
})
```

### 5. Add to package.json scripts:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

*Testing analysis: 2026-02-24*
