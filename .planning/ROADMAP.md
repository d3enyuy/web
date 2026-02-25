# Roadmap: Portfolio Site

## Overview

This roadmap transforms a functional Next.js portfolio into a complete personal brand platform with blog capabilities. Starting with quick content updates to current contact information, we establish a file-based blog infrastructure with markdown content management. From there, we build discovery features (listing, categorization, filtering), enhance responsive design across all devices, optimize for SEO and performance, and polish with content enhancement features. Each phase delivers observable value while respecting dependencies and minimizing risk.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Content Updates** - Update contact information and link homepage blog to dynamic content (completed 2026-02-25)
- [ ] **Phase 2: Blog Infrastructure** - File-based markdown content system with individual post pages
- [ ] **Phase 3: Blog Listing & Discovery** - Blog index page with post cards and reading time
- [ ] **Phase 4: Responsive Design** - Mobile-optimized navigation and layouts across all sections
- [ ] **Phase 5: Categorization & Filtering** - Tag/category system with URL-based filtering
- [ ] **Phase 6: SEO & Performance** - RSS feed, per-post SEO, image optimization
- [ ] **Phase 7: Content Enhancements** - Table of contents, copy code, anchor links, related posts

## Phase Details

### Phase 1: Content Updates
**Goal**: Current contact information is displayed and homepage blog section shows real dynamic content
**Depends on**: Nothing (first phase)
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05
**Success Criteria** (what must be TRUE):
  1. Contact section displays gillslambiv@gmail.com as email address
  2. LinkedIn link points to linkedin.com/in/lambiv-dzenyuy
  3. GitHub link points to github.com/d3enyuy
  4. Homepage blog section displays posts from markdown files (not hardcoded data)
  5. Homepage blog cards link to individual post pages at /blog/[slug]
**Plans**: 2 plans

Plans:
- [ ] 01-01-PLAN.md — Update social media links and contact information
- [ ] 01-02-PLAN.md — Create blog data access layer and link homepage blog cards

### Phase 2: Blog Infrastructure
**Goal**: Individual blog posts render from markdown files with validated frontmatter and optimized performance
**Depends on**: Phase 1
**Requirements**: BLOG-01, BLOG-02, BLOG-03, BLOG-04, BLOG-05, BLOG-06
**Success Criteria** (what must be TRUE):
  1. Blog posts are stored as markdown files in /_posts/ directory
  2. Frontmatter (title, date, excerpt, tags, category) is validated at build time
  3. Individual blog posts are accessible at /blog/[slug] with static generation
  4. Markdown content renders with GitHub Flavored Markdown support
  5. Code blocks display with syntax highlighting using VS Code quality themes
**Plans**: TBD

Plans:
- TBD (will be defined during phase planning)

### Phase 3: Blog Listing & Discovery
**Goal**: Visitors can browse all blog posts and see relevant metadata to decide what to read
**Depends on**: Phase 2
**Requirements**: BLOG-07, BLOG-08, BLOG-09
**Success Criteria** (what must be TRUE):
  1. Blog index page at /blog displays all published posts
  2. Each post preview shows title, excerpt, publish date, reading time, and tags
  3. Reading time is calculated based on word count and displayed accurately
  4. Post cards are clickable and navigate to individual post pages
**Plans**: TBD

Plans:
- TBD (will be defined during phase planning)

### Phase 4: Responsive Design
**Goal**: Site works flawlessly on mobile, tablet, and desktop with proper touch targets and navigation
**Depends on**: Phase 3
**Requirements**: RESP-01, RESP-02, RESP-03, RESP-04, RESP-05, RESP-06
**Success Criteria** (what must be TRUE):
  1. Mobile navigation includes hamburger menu that opens/closes properly
  2. All interactive elements (buttons, links) meet 44x44px minimum touch target on mobile
  3. Mobile menu auto-closes when viewport resizes to desktop width
  4. All sections (Hero, About, Experience, Projects, Blog) render properly on mobile/tablet/desktop
  5. Typography scales appropriately across all breakpoints
  6. Images scale and maintain aspect ratio on different screen sizes
**Plans**: TBD

Plans:
- TBD (will be defined during phase planning)

### Phase 5: Categorization & Filtering
**Goal**: Visitors can discover content by topic through categories and tags with shareable URLs
**Depends on**: Phase 4
**Requirements**: BLOG-10, BLOG-11, BLOG-12
**Success Criteria** (what must be TRUE):
  1. Posts can be organized by categories and tags via frontmatter
  2. Category pages are accessible at /blog/category/[category] with static generation
  3. Tag pages are accessible at /blog/tag/[tag] with static generation
  4. Filtered views are shareable (URLs work on page reload)
  5. Blog index shows available categories/tags for filtering
**Plans**: TBD

Plans:
- TBD (will be defined during phase planning)

### Phase 6: SEO & Performance
**Goal**: Blog is discoverable via search engines and performs optimally with fast load times
**Depends on**: Phase 5
**Requirements**: BLOG-13, SEO-01, SEO-02, SEO-03, SEO-04, PERF-01, PERF-02, PERF-03
**Success Criteria** (what must be TRUE):
  1. RSS feed is generated at /feed.xml with all published posts
  2. Each blog post has unique Open Graph tags and meta description
  3. Sitemap includes all blog post URLs and updates on new posts
  4. Blog posts include JSON-LD structured data for BlogPosting schema
  5. Images use Next.js Image component with automatic optimization
  6. Lighthouse scores show Performance > 90, Accessibility > 95
**Plans**: TBD

Plans:
- TBD (will be defined during phase planning)

### Phase 7: Content Enhancements
**Goal**: Blog posts include interactive features that improve reading experience and engagement
**Depends on**: Phase 6
**Requirements**: ENH-01, ENH-02, ENH-03, ENH-04
**Success Criteria** (what must be TRUE):
  1. Long blog posts display table of contents with working anchor links
  2. Code blocks include copy button that copies code to clipboard
  3. All headings in blog posts have anchor links for direct sharing
  4. Blog posts show related posts section based on shared tags
**Plans**: TBD

Plans:
- TBD (will be defined during phase planning)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Content Updates | 0/2 | Complete    | 2026-02-25 |
| 2. Blog Infrastructure | 0/TBD | Not started | - |
| 3. Blog Listing & Discovery | 0/TBD | Not started | - |
| 4. Responsive Design | 0/TBD | Not started | - |
| 5. Categorization & Filtering | 0/TBD | Not started | - |
| 6. SEO & Performance | 0/TBD | Not started | - |
| 7. Content Enhancements | 0/TBD | Not started | - |
