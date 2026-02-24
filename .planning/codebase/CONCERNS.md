# Codebase Concerns

**Analysis Date:** 2026-02-24

## Build Configuration Risks

**Disabled ESLint and TypeScript checks:**
- Issue: Build script has `eslint.ignoreDuringBuilds: true` and `typescript.ignoreBuildErrors: true` in `next.config.mjs`
- Files: `/Users/dzenyuy/Documents/projects/portfolio/next.config.mjs`
- Impact: Type errors and lint violations won't prevent production builds. Can silently ship broken code to users.
- Fix approach: Remove or set both to `false` to enforce type safety and code quality. Address any failing checks before deployment.

**Image optimization disabled:**
- Issue: `images.unoptimized: true` disables Next.js automatic image optimization
- Files: `/Users/dzenyuy/Documents/projects/portfolio/next.config.mjs`
- Impact: Images won't be automatically resized, converted to WebP, or cached. Increases bundle size and degrades performance.
- Fix approach: Enable optimization by removing this flag, then test image loading across different screen sizes.

## Security Issues

**Placeholder verification meta tags:**
- Issue: Google and Bing site verification meta tags contain placeholder text `"your-google-verification-code"` and `"your-bing-verification-code"`
- Files: `/Users/dzenyuy/Documents/projects/portfolio/app/layout.tsx` (lines 105-106)
- Impact: Site will not be verified with search engines. Won't appear in Google Search Console or Bing Webmaster Tools.
- Current mitigation: None - tags are inactive
- Recommendations: Replace with actual verification codes from Google Search Console and Bing Webmaster Tools, or remove if verification is not needed.

**Hardcoded email in public view:**
- Issue: Email address `gillslambiv@gmail.com` is hardcoded in multiple components and visible in structured data
- Files: `/Users/dzenyuy/Documents/projects/portfolio/components/contact.tsx`, `/Users/dzenyuy/Documents/projects/portfolio/components/structured-data.tsx`
- Impact: Email will be harvested by bots for spam and phishing. No mitigation against automated scraping.
- Current mitigation: None
- Recommendations: Consider email obfuscation, use a contact form with backend validation instead of mailto links, or implement rate limiting on email collection.

**Dangerously rendered HTML with dangerouslySetInnerHTML:**
- Issue: Structured JSON-LD data is rendered using `dangerouslySetInnerHTML` in `structured-data.tsx`. While the data is serialized from objects (reducing immediate risk), this pattern is flagged as dangerous.
- Files: `/Users/dzenyuy/Documents/projects/portfolio/components/structured-data.tsx` (line 102)
- Impact: If structured data becomes dynamic or user-generated in future, XSS vulnerability possible.
- Current mitigation: Data is hardcoded and serialized from object literals
- Recommendations: Keep data hardcoded and static. If dynamic data is needed, use a proper library like `@schema-dts` instead of string injection.

## Data Consistency Issues

**Hard-coded research paper links:**
- Issue: Research publications have placeholder links (`paperUrl: "#"`, `codeUrl: "#"`)
- Files: `/Users/dzenyuy/Documents/projects/portfolio/components/research.tsx` (lines 16-17, 26-27)
- Impact: Links don't work. Misleads users about accessible research outputs.
- Fix approach: Replace `"#"` with actual URLs or remove links until papers are published.

**Unused state in Notes component:**
- Issue: Notes are stored in local component state using `useState`. No persistence to backend or localStorage.
- Files: `/Users/dzenyuy/Documents/projects/portfolio/components/notes.tsx` (lines 52, 84-88)
- Impact: All notes added by users are lost on page refresh. Feature appears functional but data is not preserved.
- Fix approach: Add localStorage persistence with `useEffect`, or implement backend storage with an API endpoint.

## Performance Bottlenecks

**Unoptimized markdown rendering on every render:**
- Issue: React Markdown with plugins (remarkGfm, remarkMath, rehypeKatex) is instantiated fresh in render for notes and research sections
- Files: `/Users/dzenyuy/Documents/projects/portfolio/components/notes.tsx` (lines 201-237), `/Users/dzenyuy/Documents/projects/portfolio/components/research.tsx` (lines 73-105, 148-180)
- Impact: KaTeX parsing is computationally expensive. Parsing same markdown on every render wastes CPU.
- Improvement path: Memoize markdown render output with `useMemo` or pre-compile markdown to React components at build time.

**Large UI component library unused:**
- Issue: 50+ shadcn/ui components imported and built into the project (`components/ui/`) but majority are not used
- Files: `/Users/dzenyuy/Documents/projects/portfolio/components/ui/` (726-line sidebar.tsx, 353-line chart.tsx, etc.)
- Impact: 8500+ lines of unused component code increases build size and maintenance burden.
- Improvement path: Remove unused components (chart, sidebar, dropdown-menu, menubar, etc.). Keep only: button, badge, card, input, label, badge, etc. that are actually rendered.

**Vercel Analytics loaded on every page:**
- Issue: `@vercel/analytics` is loaded with `latest` version (unpinned) in dependencies
- Files: `/Users/dzenyuy/Documents/projects/portfolio/package.json` (line 40), `/Users/dzenyuy/Documents/projects/portfolio/app/layout.tsx` (line 117)
- Impact: Always adds network request even if analytics is not configured. Latest version may contain breaking changes.
- Fix approach: Pin version to specific release (e.g., `^1.0.0`), or remove if analytics is not actively used.

## Fragile Areas

**Navigation relies on DOM IDs:**
- Issue: Navigation component uses document-based ID lookups for scroll targeting with IntersectionObserver
- Files: `/Users/dzenyuy/Documents/projects/portfolio/components/navigation.tsx` (lines 50-53, 63-64)
- Impact: If section IDs change, navigation breaks silently. No runtime validation that elements exist.
- Safe modification: Always maintain consistent section IDs across all components. Add runtime validation: check if `document.getElementById(id)` returns null and log error.
- Test coverage: No tests for navigation logic. Refactoring section structure requires manual QA.

**Key as array index in lists:**
- Issue: Multiple components use `key={index}` in `.map()` calls instead of unique identifiers
- Files: `/Users/dzenyuy/Documents/projects/portfolio/components/projects.tsx`, `/Users/dzenyuy/Documents/projects/portfolio/components/notes.tsx`, `/Users/dzenyuy/Documents/projects/portfolio/components/awards.tsx`, `/Users/dzenyuy/Documents/projects/portfolio/components/research.tsx`, `/Users/dzenyuy/Documents/projects/portfolio/components/blog.tsx`
- Impact: If notes are reordered, added, or removed, React can't match old state to new nodes. Causes wrong data in expanded notes, incorrect styling, or state leaks.
- Safe modification: Use unique identifiers: add `id` field to each note/award/project object and use `key={item.id}` instead of index.
- Test coverage: No tests covering add/remove/reorder operations. Bug would only surface at runtime when user adds notes.

**Untyped markdown data:**
- Issue: Research abstracts and note content are plain strings with markdown that's parsed at runtime. No schema validation.
- Files: `/Users/dzenyuy/Documents/projects/portfolio/components/research.tsx` (line 13), `/Users/dzenyuy/Documents/projects/portfolio/components/notes.tsx` (lines 20-49)
- Impact: If markdown is malformed or contains unsupported syntax, parser may fail silently or render incorrectly. No compile-time validation.
- Safe modification: Define a `MarkdownContent` type or use MDX at build time to validate syntax early.

## Missing Critical Features

**No error boundary:**
- Issue: No Error Boundary component wrapping the app
- Files: `/Users/dzenyuy/Documents/projects/portfolio/app/layout.tsx`
- Impact: If any component throws an error, entire app crashes with blank page. No graceful fallback for users.
- Fix approach: Add `error.tsx` in app directory and wrap critical sections with Error Boundary.

**No analytics configuration validation:**
- Issue: Analytics component is loaded but there's no visible configuration or validation that tracking is working
- Files: `/Users/dzenyuy/Documents/projects/portfolio/app/layout.tsx` (line 117)
- Impact: Cannot verify analytics is actually sending data to Vercel. Silent failure possible.
- Fix approach: Add environment variable check, log configuration status to console in development.

**No loading states or skeletons:**
- Issue: No skeleton screens or loading spinners for markdown rendering in notes/research
- Files: `/Users/dzenyuy/Documents/projects/portfolio/components/notes.tsx`, `/Users/dzenyuy/Documents/projects/portfolio/components/research.tsx`
- Impact: KaTeX rendering or large markdown blocks may cause layout shift or appear to freeze.
- Fix approach: Add loading state and skeleton UI while markdown compiles.

## Test Coverage Gaps

**No test files exist:**
- Issue: Project has zero test files despite complex interactive features
- Impact: Cannot safely refactor navigation, notes CRUD, or markdown rendering logic
- Files needing tests: `/Users/dzenyuy/Documents/projects/portfolio/components/navigation.tsx`, `/Users/dzenyuy/Documents/projects/portfolio/components/notes.tsx`, `/Users/dzenyuy/Documents/projects/portfolio/components/hero.tsx`
- Risk: High - navigation logic uses DOM queries and observers; notes use complex state management
- Priority: High

## Dependencies at Risk

**Unpinned "latest" versions:**
- Issue: Multiple dependencies pinned to "latest": `@vercel/analytics`, `geist`, `katex`, `react-markdown`
- Files: `/Users/dzenyuy/Documents/projects/portfolio/package.json` (lines 40, 47, 49, 57, 60-62)
- Impact: Build output is non-deterministic. Automatic major version upgrades could introduce breaking changes in CI/CD.
- Migration plan: Replace "latest" with explicit version ranges (e.g., `^1.0.0` or `~1.0.0`) and test before major upgrades.

**React 19 with "^" pin:**
- Issue: React is pinned to `^19` which allows minor/patch updates automatically
- Files: `/Users/dzenyuy/Documents/projects/portfolio/package.json` (line 53)
- Impact: Could receive updates with API changes or deprecations without explicit review.
- Fix approach: Consider pinning to exact version `19.0.x` if stability is critical, or maintain caret constraint and test regularly.

**Radix UI components mismatched versions:**
- Issue: Many Radix components are pinned to fixed versions (1.1.x, 1.2.x, 2.x) with no consistency
- Files: `/Users/dzenyuy/Documents/projects/portfolio/package.json` (lines 13-39)
- Impact: Incompatible component APIs if updating one requires updating others in tandem.
- Fix approach: Update all Radix packages to latest compatible versions in single commit, then test.

## Styling Concerns

**Hard-coded color values in components:**
- Issue: Some components use hard-coded primary color values instead of CSS variables
- Files: `/Users/dzenyuy/Documents/projects/portfolio/components/hero.tsx` (line 36), `/Users/dzenyuy/Documents/projects/portfolio/components/contact.tsx` (line 21)
- Impact: Changing theme requires editing multiple component files. Not DRY.
- Fix approach: Ensure all components use Tailwind utility classes exclusively (e.g., `text-primary` instead of computed colors).

## Metadata Issues

**Structured data has excessive alternate names:**
- Issue: `structured-data.tsx` lists 19 variations of the name in `alternateName` array
- Files: `/Users/dzenyuy/Documents/projects/portfolio/components/structured-data.tsx` (line 6)
- Impact: Redundant data inflates JSON-LD payload. Search engines may penalize over-optimization.
- Fix approach: Keep only necessary alternates (e.g., short form "Lambiv" and full form "Lambiv Gills Dzenyuy"). Remove duplicates and permutations.

**Placeholder URLs in structured data:**
- Issue: URL in schema.org Person object is `"https://lambivgills.com"` but canonical URL in metadata is `"https://lambiv-dzenyuy.vercel.app"`
- Files: `/Users/dzenyuy/Documents/projects/portfolio/components/structured-data.tsx` (line 8) vs `/Users/dzenyuy/Documents/projects/portfolio/app/layout.tsx` (line 88)
- Impact: Search engines see conflicting canonical URLs. May cause indexing confusion or duplicate content penalties.
- Fix approach: Use same URL everywhere or update structured data to match actual deployment domain.

---

*Concerns audit: 2026-02-24*
