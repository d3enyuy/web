# Pitfalls Research

**Domain:** Portfolio Sites with Blog and Responsive Design
**Researched:** 2026-02-24
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Hardcoded Blog Data Instead of File-Based Content Management

**What goes wrong:**
Blog posts are hardcoded in component files (as seen in `/components/blog.tsx`) rather than sourced from markdown files. When adding real blog functionality, developers often try to retrofit file-based content into the existing hardcoded structure, leading to duplicate code paths, inconsistent data models, and broken features.

**Why it happens:**
- Initial prototypes use hardcoded data for rapid UI development
- Developers underestimate the complexity of transitioning from static to dynamic content
- Fear of breaking existing UI/UX causes hesitation to refactor early

**How to avoid:**
- Implement markdown-based content management from day one using `gray-matter` for frontmatter parsing
- Create a `/content/blog/` directory structure immediately, even with placeholder posts
- Define a strict TypeScript interface for blog post metadata (title, date, excerpt, tags, category, slug)
- Use `fs` and `path` utilities in server components or `getStaticProps` to read markdown files at build time
- Validate frontmatter with Zod schemas to catch missing/incorrect fields at build time

**Warning signs:**
- Blog data is defined as arrays in `.tsx` files
- No `/content/` or `/_posts/` directory exists in the project
- Blog post URLs don't include slugs (`/blog/[slug]`)
- Changes to blog content require editing TypeScript files

**Phase to address:**
Phase 1: Blog Infrastructure - Must establish file-based content management before building any blog features

---

### Pitfall 2: Missing generateStaticParams for Dynamic Blog Routes

**What goes wrong:**
When implementing `/blog/[slug]` dynamic routes in Next.js 15 App Router, developers forget to export `generateStaticParams`. This causes builds to fail with "Page X is missing exported function 'generateStaticParams'" or results in all blog pages being rendered on-demand instead of statically at build time, destroying performance.

**Why it happens:**
- Next.js 15 requires async params, breaking muscle memory from earlier versions
- Developers confuse Pages Router (`getStaticPaths`) with App Router patterns (`generateStaticParams`)
- TypeScript errors aren't always clear about what's missing

**How to avoid:**
```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug, // MUST match folder name [slug]
  }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params // Next.js 15: params is now a Promise
  const post = await getBlogPost(slug)
  return <article>{/* render post */}</article>
}
```

**Warning signs:**
- Blog pages work in dev (`npm run dev`) but fail in production builds
- Error messages mentioning "generateStaticParams" during `next build`
- All blog routes show "λ" (lambda) instead of "○" (static) in build output
- Build time is unusually fast (indicating pages aren't being pre-rendered)

**Phase to address:**
Phase 1: Blog Infrastructure - Must be implemented when creating dynamic routes

---

### Pitfall 3: Responsive Design Mobile Menu State Leaks

**What goes wrong:**
Mobile navigation menus remain open when users resize the viewport from mobile to desktop, or when navigating between pages. The menu overlay persists off-screen, blocking interactions or causing layout issues. This is especially problematic in single-page applications with smooth scrolling where the mobile menu doesn't unmount.

**Why it happens:**
- No resize listener to close mobile menu when viewport exceeds mobile breakpoint
- Menu state is managed in component but not synchronized with viewport changes
- Developers test only on fixed viewport sizes, missing the resize transition case

**How to avoid:**
```typescript
// components/navigation.tsx
useEffect(() => {
  const handleResize = () => {
    // Close mobile menu when viewport becomes desktop
    if (window.innerWidth >= 1024 && isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [isMobileMenuOpen])

// Also close menu when route changes (if using client-side routing)
useEffect(() => {
  setIsMobileMenuOpen(false)
}, [pathname]) // or activeSection
```

**Warning signs:**
- Mobile menu icon shows "X" on desktop after resizing from mobile
- Clicking desktop navigation doesn't work after resizing from mobile
- `body` has `overflow: hidden` applied on desktop viewport
- Scrolling is disabled on desktop after resizing from small screen

**Phase to address:**
Phase 2: Responsive Design Enhancement - Critical for mobile-first navigation implementation

---

### Pitfall 4: Markdown Rendering Performance Bottleneck

**What goes wrong:**
React-markdown with plugins (remarkGfm, remarkMath, rehypeKatex) re-parses and re-renders on every component render, causing severe performance degradation. KaTeX mathematical rendering is particularly expensive. This manifests as janky scrolling, slow page loads, and poor mobile performance when displaying multiple blog posts or notes.

**Why it happens:**
- Developers don't realize markdown parsing is computationally expensive
- No memoization of rendered output
- Parsing happens in client components that re-render frequently
- Code examples show inline markdown rendering without performance warnings

**How to avoid:**
```typescript
// BAD: Re-parses on every render
<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>

// GOOD: Memoize the rendered output
const renderedContent = useMemo(
  () => <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>,
  [content]
)

// BEST: Pre-compile markdown to HTML at build time
import { remark } from 'remark'
import html from 'remark-html'

export async function getBlogPost(slug: string) {
  const { content, data } = matter(fileContent)
  const processedContent = await remark().use(html).process(content)
  return {
    ...data,
    contentHtml: processedContent.toString(),
  }
}
```

**Warning signs:**
- Lighthouse performance score < 80 on pages with markdown content
- Visible lag when expanding/collapsing notes or blog post previews
- React DevTools Profiler shows markdown components taking > 100ms to render
- Mobile devices experience stuttering when scrolling past markdown content
- Large markdown files (> 5KB) cause noticeable rendering delays

**Phase to address:**
Phase 1: Blog Infrastructure - Must optimize before shipping blog to production

---

### Pitfall 5: Blog Tag/Category System Without URL Strategy

**What goes wrong:**
Developers implement blog post filtering with tags/categories but don't create corresponding URLs (`/blog/tag/react` or `/blog/category/technical`). This creates client-side-only filtering that breaks on page reload, isn't shareable, and has zero SEO value. Users can't bookmark or share filtered views, and search engines can't discover content by topic.

**Why it happens:**
- Client-side filtering is easier to implement than dynamic routes
- Underestimating importance of shareable URLs for blog discovery
- Not planning URL structure before implementing filtering UI

**How to avoid:**
- Design URL structure first: `/blog` (all), `/blog/[category]`, `/blog/tag/[tag]`
- Create separate dynamic route pages for categories and tags
- Generate static pages for all categories/tags at build time:
```typescript
// app/blog/category/[category]/page.tsx
export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  const categories = [...new Set(posts.map(p => p.category))]
  return categories.map(category => ({ category }))
}
```
- Use Next.js Link components with proper URLs instead of client-side filtering
- Implement both approaches: static routes for SEO + client filtering for better UX on same page

**Warning signs:**
- Blog filters work with `useState` but no URL changes when filtering
- Refreshing a filtered view shows all posts instead of filtered results
- No `/blog/category/` or `/blog/tag/` routes exist
- Blog index shows "all posts" in build output but no category/tag pages

**Phase to address:**
Phase 3: Blog Categorization - Must be designed before implementing filtering UI

---

### Pitfall 6: Inconsistent Touch Target Sizes on Mobile

**What goes wrong:**
Navigation links, buttons, and interactive elements are too small for reliable touch input on mobile devices. Apple recommends 44x44 points (~57x57 pixels) for touch targets, but developers often use desktop-sized buttons (24-32px height) without proper padding. This leads to frustrated users missing clicks, accidentally tapping wrong items, and poor mobile usability scores.

**Why it happens:**
- Designing desktop-first and assuming scaling down works
- Not testing on actual mobile devices with fingers (only mouse clicks in browser DevTools)
- Tailwind utility classes like `py-1` or `py-2` creating insufficient touch areas
- Visual design prioritizing compactness over usability

**How to avoid:**
- Minimum touch target: `min-h-[44px] min-w-[44px]` in Tailwind, or `touch-action: manipulation` with proper padding
- Mobile navigation items: `py-3 px-4` minimum (12px top/bottom padding)
- Use responsive padding: `py-2 sm:py-1.5` (larger on mobile, can be smaller on desktop with mouse)
- Test with accessibility tools like Chrome DevTools Lighthouse (flags touch targets < 48x48px)
- Actual device testing: Use real phones, not just browser DevTools

**Warning signs:**
- Mobile users report "can't click links" or "keeps clicking wrong item"
- Lighthouse accessibility audit shows "Tap targets are not sized appropriately"
- Navigation links have height < 44px on mobile breakpoints
- Buttons use `p-1` or `p-2` on mobile without adequate spacing

**Phase to address:**
Phase 2: Responsive Design Enhancement - Critical during mobile navigation implementation

---

### Pitfall 7: Frontmatter Schema Validation Missing

**What goes wrong:**
Blog posts with missing, misspelled, or incorrectly typed frontmatter fields (e.g., `date: "December 10, 2025"` instead of ISO format, missing `title`, wrong type for `tags`) cause silent failures, runtime errors, or broken layouts. Builds succeed but pages render incorrectly or crash in production. Especially problematic when multiple people contribute blog posts.

**Why it happens:**
- Developers trust themselves to always format frontmatter correctly
- No validation layer between markdown files and rendering
- Copy-pasting frontmatter between posts propagates errors
- Not realizing frontmatter is user input that should be validated

**How to avoid:**
```typescript
import { z } from 'zod'

const FrontmatterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().datetime("Date must be in ISO 8601 format"), // "2025-12-10T00:00:00.000Z"
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters"),
  tags: z.array(z.string()).min(1, "At least one tag required"),
  category: z.enum(["technical", "research", "thoughts"]),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with dashes"),
  draft: z.boolean().optional().default(false),
})

export async function getBlogPost(slug: string) {
  const { data, content } = matter(fileContent)
  const validatedData = FrontmatterSchema.parse(data) // Throws if invalid
  return { ...validatedData, content }
}
```

**Warning signs:**
- Blog posts display "undefined" or blank fields
- Date formatting is inconsistent across posts ("Jan 5, 2025" vs "2025-01-05")
- Build succeeds but pages show runtime errors like "Cannot read property X of undefined"
- Different posts have different frontmatter fields with no standard structure

**Phase to address:**
Phase 1: Blog Infrastructure - Must be implemented when setting up markdown parsing

---

### Pitfall 8: No Image Optimization Strategy for Blog Content

**What goes wrong:**
Blog posts reference images using standard `<img>` tags or markdown `![alt](url)` syntax without Next.js Image optimization. Images are served at full resolution regardless of device, causing massive page weight (multiple MBs), slow LCP (Largest Contentful Paint), and poor mobile performance. This is exacerbated when `images.unoptimized: true` is set in next.config.mjs (as currently exists in this project).

**Why it happens:**
- Markdown renders `![](image.jpg)` as standard `<img>` by default
- Developers don't customize ReactMarkdown image component
- Image optimization disabled in next.config.mjs during prototyping
- Not accounting for blog images stored in `/public/blog/` during planning

**How to avoid:**
```typescript
import Image from 'next/image'

// Custom ReactMarkdown image component
const components = {
  img: ({ src, alt }: { src?: string; alt?: string }) => {
    if (!src) return null
    return (
      <Image
        src={src}
        alt={alt || ''}
        width={800}
        height={400}
        className="rounded-lg"
        sizes="(max-width: 768px) 100vw, 800px"
      />
    )
  },
}

<ReactMarkdown components={components}>{content}</ReactMarkdown>
```

- Remove `images.unoptimized: true` from next.config.mjs
- Store blog images in `/public/blog/[slug]/` for organization
- Use responsive images with proper `sizes` attribute
- Compress images before committing (use tools like ImageOptim, Squoosh)
- Provide width/height in frontmatter for CLS prevention

**Warning signs:**
- Blog pages have page weight > 2MB
- Lighthouse shows "Properly size images" or "Serve images in next-gen formats" warnings
- Mobile blog pages take > 5 seconds to load on 3G
- LCP score > 4 seconds in PageSpeed Insights
- `next.config.mjs` has `images.unoptimized: true`

**Phase to address:**
Phase 4: Content Enhancement - Must enable optimization before adding real blog images

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Disabling TypeScript build errors (`typescript.ignoreBuildErrors: true`) | Faster iteration during prototyping | Silent type errors ship to production, runtime crashes, refactoring becomes unsafe | MVP demo only, never in production |
| Using `key={index}` in blog post lists | Quick implementation without generating unique IDs | React can't track items properly when reordering/filtering, causes state bugs and performance issues | Never acceptable - always use stable unique IDs (slug or generated UUID) |
| Client-side-only blog filtering | No server-side logic needed, faster to build | Zero SEO, non-shareable URLs, breaks on refresh, accessibility issues | Only alongside proper URL-based filtering as progressive enhancement |
| Inline frontmatter without validation | No extra dependencies, faster to start | Silent failures, inconsistent data, production crashes, maintenance nightmare | Never acceptable - always validate user input |
| Hardcoded blog data in components | No file system setup needed, instant UI | Cannot scale beyond a few posts, every new post requires code deploy, impossible to maintain | POC/mockup only, must refactor before adding real content |
| Mobile menu without resize listener | Works in manual testing | Menu gets stuck when resizing viewport, blocks interactions | Never acceptable - always handle viewport changes |

---

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Vercel Analytics | Leaving `@vercel/analytics` on "latest" version | Pin to specific version (e.g., `"^1.0.0"`) to prevent breaking changes |
| Search Verification (Google/Bing) | Placeholder meta tags (`"your-google-verification-code"`) | Either add real verification codes or remove placeholder tags entirely |
| Social Sharing (Open Graph) | Using markdown images without absolute URLs | Convert relative paths to absolute URLs with domain for og:image |
| RSS Feed | Not generating RSS feed for blog | Create `/app/feed.xml/route.ts` to serve RSS for subscribers and aggregators |
| Sitemap | Static sitemap doesn't include blog posts | Generate dynamic sitemap in `/app/sitemap.ts` with all blog post URLs |

---

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Rendering all blog posts on index page | Slow initial load, large HTML payload | Implement pagination (10-20 posts per page) or "Load More" | > 20 blog posts |
| No code splitting for markdown plugins | Large JavaScript bundle (KaTeX is 500KB+) | Dynamic import KaTeX only when needed: `import('katex')` | Day 1 (KaTeX always adds weight) |
| Synchronous markdown parsing in render | Jank, stuttering, poor INP scores | Pre-compile to HTML at build time or use `useMemo` | > 5 posts with markdown content |
| No memoization of ReactMarkdown output | Every render re-parses markdown | Wrap in `useMemo` with content as dependency | First user interaction (expand/collapse) |
| Loading all blog posts in memory | High server memory, slow builds | Use streaming or pagination for build-time generation | > 100 blog posts |
| No lazy loading for images | Poor LCP, high bandwidth usage | Use Next.js Image with `loading="lazy"` and proper `sizes` | > 3 images per page |

---

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Rendering user-submitted markdown without sanitization | XSS attacks via markdown content | Use `rehype-sanitize` plugin or allow only whitelisted markdown syntax |
| Exposing email address in plain text | Spam bot harvesting, phishing attempts | Use contact form with backend validation or email obfuscation techniques |
| No rate limiting on contact form | Form spam, DDoS potential | Implement rate limiting (e.g., max 3 submissions per hour per IP) |
| Serving markdown source files publicly | Information disclosure, draft leaks | Ensure `/content/` is not in `/public/`, only serve compiled HTML |
| No CSP for third-party embeds in blog | XSS via embedded content (tweets, CodePen) | Define strict Content Security Policy headers in `next.config.mjs` |

---

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No loading states for markdown rendering | Blank space then sudden content appears (CLS) | Show skeleton screens while parsing or pre-render at build time |
| Blog posts not linkable (no slug-based URLs) | Can't share specific posts, poor SEO | Implement `/blog/[slug]` dynamic routes from the start |
| Mobile menu blocks scroll without indication | Users think page froze, confusion about how to exit | Add `overflow-y: auto` to menu or clear "scroll to close" indicator |
| No read time estimate on blog posts | Users can't decide if they have time to read | Calculate reading time from word count (200-250 words/min) |
| Category filter doesn't show post counts | Users click empty categories | Display count: "Technical (5)" or disable empty categories |
| Blog index shows all content at once | Overwhelming for readers, slow page load | Paginate or show excerpts with "Read more" links |
| No breadcrumb navigation in blog posts | Users can't navigate back to category/index | Add breadcrumbs: Home > Blog > Category > Post Title |
| Tags not clickable to view related posts | Missed opportunity for content discovery | Make tags links to `/blog/tag/[tag]` pages |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Blog posts are linkable:** Verify each post has unique URL (`/blog/[slug]`), not just client-side filtering
- [ ] **Images are optimized:** Check `next build` output shows optimized images, not "unoptimized" flag
- [ ] **RSS feed exists:** Verify `/feed.xml` serves valid RSS with all blog posts
- [ ] **Sitemap includes blog:** Check `/sitemap.xml` lists all blog post URLs for search engines
- [ ] **Dynamic routes pre-rendered:** Verify `next build` shows "○" (static) not "λ" (dynamic) for blog pages
- [ ] **Mobile menu closes on resize:** Test viewport resize from mobile to desktop, menu should auto-close
- [ ] **Touch targets sized properly:** Run Lighthouse accessibility audit, no warnings about touch target size
- [ ] **Markdown validated:** Try submitting malformed frontmatter, build should fail with clear error
- [ ] **Open Graph images absolute:** Check page source for og:image, must be absolute URL (https://)
- [ ] **Category/tag pages exist:** Verify `/blog/category/technical` and `/blog/tag/react` return 200, not 404
- [ ] **Dates in ISO format:** Check blog post dates are "2025-01-15T00:00:00.000Z" not "January 15, 2025"
- [ ] **No placeholder data:** Search codebase for `"#"` links, `"your-verification-code"`, hardcoded post arrays

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Hardcoded blog data needs to become file-based | MEDIUM | 1. Create `/content/blog/` directory<br>2. Convert each hardcoded post to markdown file with frontmatter<br>3. Implement `getBlogPosts()` utility<br>4. Replace component data with `await getBlogPosts()`<br>5. Add validation schemas<br>6. Test all blog routes |
| Missing generateStaticParams on deployed site | LOW | 1. Add `export async function generateStaticParams()` to page<br>2. Ensure it returns array with correct param name<br>3. Rebuild and redeploy<br>4. Verify build output shows "○" for blog routes |
| Mobile menu stuck open in production | LOW | 1. Add resize event listener to navigation component<br>2. Close menu when `window.innerWidth >= 1024`<br>3. Deploy hotfix immediately (user-facing bug) |
| Markdown rendering performance issues | MEDIUM | 1. Move to server-side rendering for blog posts (App Router default)<br>2. Pre-compile markdown to HTML at build time with remark-html<br>3. Add `useMemo` for any client-side markdown rendering<br>4. Consider replacing ReactMarkdown with lighter alternative |
| No frontmatter validation, posts breaking | MEDIUM | 1. Define Zod schema for frontmatter<br>2. Add validation in `getBlogPost()` function<br>3. Run build, fix all validation errors in markdown files<br>4. Add pre-commit hook to validate frontmatter before commits |
| Images not optimized, poor performance | MEDIUM-HIGH | 1. Remove `images.unoptimized: true` from next.config.mjs<br>2. Replace standard `<img>` with Next.js `<Image>` component<br>3. Customize ReactMarkdown image renderer<br>4. Compress existing blog images<br>5. Add proper width/height to prevent CLS<br>6. Test and rebuild |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Hardcoded blog data | Phase 1: Blog Infrastructure | Check `/content/blog/` directory exists with markdown files, `getBlogPosts()` reads from filesystem |
| Missing generateStaticParams | Phase 1: Blog Infrastructure | Verify `next build` shows "○" for all `/blog/[slug]` routes, not "λ" |
| Mobile menu state leaks | Phase 2: Responsive Design | Test resize from mobile to desktop, menu auto-closes |
| Markdown rendering performance | Phase 1: Blog Infrastructure | Lighthouse performance score > 90, markdown renders in < 50ms |
| No URL strategy for tags/categories | Phase 3: Blog Categorization | Verify `/blog/category/X` and `/blog/tag/Y` routes exist and are static |
| Touch target sizes too small | Phase 2: Responsive Design | Lighthouse accessibility audit shows no touch target warnings |
| No frontmatter validation | Phase 1: Blog Infrastructure | Build fails when frontmatter has missing required fields or wrong types |
| Unoptimized images | Phase 4: Content Enhancement | `next build` output shows optimized images, `next.config.mjs` has `images.unoptimized: false` or removed |
| Client-side-only filtering | Phase 3: Blog Categorization | Category filter changes URL and persists on page reload |
| No loading states | Phase 4: Content Enhancement | Skeleton screens visible during any async content loading |

---

## Sources

### High Confidence (Official Documentation + Recent Articles)

- **Next.js 15 Official Docs**: https://nextjs.org/docs/app/api-reference/functions/generate-static-params (generateStaticParams patterns)
- **Next.js Performance Guide**: https://www.debugbear.com/blog/nextjs-performance (December 2025)
- **React Server Components Performance**: https://blog.logrocket.com/react-server-components-performance-mistakes (6 RSC pitfalls)
- **Next.js Common Mistakes**: https://medium.com/@sureshdotariya/10-performance-mistakes-in-next-js-16-that-are-killing-your-app-and-how-to-fix-them-2facfab26bea (January 2026)

### Medium Confidence (WebSearch + Multiple Sources)

- **Mobile Navigation Best Practices**: https://www.smashingmagazine.com/2022/11/navigation-design-mobile-ux/ (Smashing Magazine)
- **Touch Target Sizing**: Apple Human Interface Guidelines + https://htmlburger.com/blog/mobile-menu-design/ (45 examples, 6 best practices)
- **Blog Tag/Category Systems**: https://delante.co/categories-and-tags-on-the-blog/ (SEO best practices 2025)
- **Markdown Blog Implementation**: https://www.adeelhere.com/blog/2025-12-10-how-to-build-a-markdown-blog-with-nextjs (December 2025 tutorial)
- **Frontmatter Validation**: https://docs.astro.build/en/reference/errors/markdown-content-schema-validation-error/ (Astro patterns applicable to Next.js)

### Project-Specific Evidence

- **Existing Codebase Analysis**: `/Users/dzenyuy/Documents/projects/portfolio/components/blog.tsx` (hardcoded data pattern)
- **CONCERNS.md Audit**: `/Users/dzenyuy/Documents/projects/portfolio/.planning/codebase/CONCERNS.md` (identified issues)
- **Current next.config.mjs**: `images.unoptimized: true`, `typescript.ignoreBuildErrors: true` (technical debt confirmed)

---

*Pitfalls research for: Portfolio Sites with Blog and Responsive Design*
*Researched: 2026-02-24*
