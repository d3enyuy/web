# Requirements: Portfolio Site

**Defined:** 2026-02-24
**Core Value:** Visitors can quickly understand my skills and experience while engaging with high-quality content that reflects my expertise and personality.

## v1 Requirements

Requirements for enhanced portfolio with blog functionality. Each maps to roadmap phases.

### Blog Infrastructure

- [ ] **BLOG-01**: Blog posts sourced from markdown files in `/_posts/` directory with frontmatter parsing
- [ ] **BLOG-02**: Frontmatter schema validated at build time (title, date, excerpt, tags, category required)
- [ ] **BLOG-03**: Blog post data access layer (`/lib/blog.ts`) with TypeScript types
- [ ] **BLOG-04**: Individual blog post pages at `/blog/[slug]` with static generation
- [ ] **BLOG-05**: Markdown rendering with GitHub Flavored Markdown support
- [ ] **BLOG-06**: Syntax highlighting for code blocks with VS Code quality themes

### Blog Features

- [ ] **BLOG-07**: Blog index page at `/blog` displaying all published posts
- [ ] **BLOG-08**: Post preview cards with title, excerpt, date, reading time, and tags
- [ ] **BLOG-09**: Reading time calculation and display (based on word count)
- [ ] **BLOG-10**: Categories and tags system for content organization
- [ ] **BLOG-11**: Filter posts by category via URL (`/blog/category/[category]`)
- [ ] **BLOG-12**: Filter posts by tag via URL (`/blog/tag/[tag]`)
- [ ] **BLOG-13**: RSS feed generation at `/feed.xml` for blog subscribers

### Responsive Design

- [ ] **RESP-01**: Mobile-optimized navigation with hamburger menu
- [ ] **RESP-02**: Touch targets minimum 44x44px for all interactive elements on mobile
- [ ] **RESP-03**: Mobile menu closes automatically when viewport resizes to desktop
- [ ] **RESP-04**: Responsive layouts for all sections (Hero, About, Experience, Projects, Blog)
- [ ] **RESP-05**: Optimized typography and spacing across mobile, tablet, and desktop breakpoints
- [ ] **RESP-06**: Images scale appropriately for different screen sizes

### Content Updates

- [ ] **CONT-01**: Update email address to gillslambiv@gmail.com across all pages
- [ ] **CONT-02**: Update LinkedIn username to lambiv-dzenyuy
- [ ] **CONT-03**: Update GitHub username to d3enyuy
- [ ] **CONT-04**: Replace hardcoded blog data in homepage blog section with dynamic content from markdown files
- [ ] **CONT-05**: Link homepage blog cards to `/blog/[slug]` routes

### SEO & Performance

- [ ] **SEO-01**: Per-post Open Graph tags and meta descriptions
- [ ] **SEO-02**: Dynamic sitemap including all blog post URLs
- [ ] **SEO-03**: Structured data (JSON-LD) for BlogPosting schema on individual posts
- [ ] **SEO-04**: Optimized markdown rendering (server-side compilation or memoization)
- [ ] **PERF-01**: Remove `images.unoptimized: true` from next.config.mjs
- [ ] **PERF-02**: Blog images use Next.js Image component for automatic optimization
- [ ] **PERF-03**: Lighthouse performance score > 90, accessibility > 95

### Content Enhancement

- [ ] **ENH-01**: Table of contents for blog posts with anchor links
- [ ] **ENH-02**: Copy code button for code snippets
- [ ] **ENH-03**: Anchor links on headings (GitHub-style)
- [ ] **ENH-04**: Related posts suggestions based on tags

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Advanced Blog Features

- **BLOG-14**: Interactive code demos with live editing
- **BLOG-15**: MDX custom components for rich content
- **BLOG-16**: Blog post series organization with prev/next navigation
- **BLOG-17**: Newsletter signup integration (ConvertKit or beehiiv)
- **BLOG-18**: View/like counter for posts
- **BLOG-19**: Full-text search functionality

### Design Enhancements

- **DESIGN-01**: Advanced animations and transitions
- **DESIGN-02**: Dark mode code syntax themes (beyond default)
- **DESIGN-03**: Custom illustrations for blog posts

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Comments section | Spam/moderation overhead, security concerns, dead threads look unprofessional - use GitHub discussions or mailto for feedback instead |
| CMS/admin interface | Unnecessary complexity for developer workflow, version control loss - markdown in codebase is simpler and more reliable |
| Real-time features | Adds unnecessary complexity and server costs for static blog content - static generation with ISR is sufficient |
| Social share counts | API deprecations, privacy concerns, slow loading, maintenance burden - simple share buttons only |
| User accounts/authentication | Portfolio is public showcase, no need for user management |
| Backend API | Static site architecture is optimal for performance and simplicity |
| Infinite scroll | SEO issues, accessibility problems, breaks back button - use pagination or "load more" instead |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| (To be filled by roadmapper) | | |

**Coverage:**
- v1 requirements: 38 total
- Mapped to phases: 0 (pending roadmap creation)
- Unmapped: 38 ⚠️

---
*Requirements defined: 2026-02-24*
*Last updated: 2026-02-24 after initial definition*
