---
phase: 01-content-updates
plan: 02
subsystem: content-management
tags: [blog, markdown, data-layer, dynamic-content]
dependency_graph:
  requires: []
  provides:
    - blog-data-layer
    - blog-post-routing
    - posts-directory
  affects:
    - homepage-blog-section
tech_stack:
  added:
    - gray-matter: "^4.0.3"
  patterns:
    - Server-side data fetching with client-side interactivity
    - Props-based data flow from server to client components
    - Fallback data pattern for content systems
key_files:
  created:
    - lib/blog.ts
    - _posts/.gitkeep
  modified:
    - components/blog.tsx
    - app/page.tsx
    - package.json
decisions:
  - title: "Props-based architecture for blog data"
    context: "Blog component is client-side (uses useState) but needs server-side data"
    choice: "Fetch posts in page.tsx server component, pass as props to client component"
    alternatives:
      - "Server actions for data fetching"
      - "Convert Blog to server component with nested client components"
    rationale: "Simplest pattern, leverages Next.js App Router architecture, maintains existing interactivity"
  - title: "Fallback data when _posts/ is empty"
    context: "Phase 1 doesn't populate markdown posts yet"
    choice: "Return hardcoded fallback data from getBlogPosts()"
    alternatives:
      - "Return empty array"
      - "Show placeholder message"
    rationale: "Homepage remains functional during transition, no visual regression"
metrics:
  duration_seconds: 225
  tasks_completed: 3
  files_created: 2
  files_modified: 3
  commits: 3
  completed_date: "2026-02-25"
---

# Phase 01 Plan 02: Dynamic Blog Data Layer Summary

**One-liner:** Blog data access layer with markdown file parsing, fallback data, and clickable post cards linking to /blog/[slug] routes using gray-matter and Next.js App Router patterns.

## Objective Achieved

Replaced hardcoded blog data with dynamic content system that reads from markdown files and links to individual post routes. Homepage blog section now consumes data from a reusable `getBlogPosts()` function, preparing for full blog infrastructure in Phase 2.

## Tasks Completed

### Task 1: Create blog data access layer
**Status:** ✅ Complete
**Commit:** a48f88a

Created `lib/blog.ts` with:
- `BlogPost` TypeScript interface (slug, title, date, readTime, excerpt, tags, category, content)
- `getBlogPosts(limit?: number)` function that:
  - Reads markdown files from `_posts/` using Node.js `fs` module
  - Parses frontmatter with `gray-matter` package
  - Calculates reading time (200 words/min)
  - Generates slugs from filenames
  - Sorts by date (newest first)
  - Returns fallback data when directory is empty
- Synchronous file operations (safe for build-time execution)
- Platform-agnostic path handling with `path.join`

**Files created:**
- `lib/blog.ts` (150 lines)

**Dependencies added:**
- `gray-matter@4.0.3`

### Task 2: Update Blog component to use dynamic data and link to post pages
**Status:** ✅ Complete
**Commit:** 1a38d3a

Updated `components/blog.tsx` to:
- Accept `posts` as prop via `BlogProps` interface
- Import `BlogPost` type (not implementation, avoiding client-side fs usage)
- Wrap blog cards in Next.js `<Link>` components
- Link to `/blog/${post.slug}` (404s expected until Phase 2)
- Preserve existing category filtering and styling

Updated `app/page.tsx` to:
- Import `getBlogPosts()` from data layer
- Fetch posts server-side
- Pass posts to `<Blog posts={blogPosts} />` component

**Files modified:**
- `components/blog.tsx` (-72 lines hardcoded data, +10 lines props handling)
- `app/page.tsx` (+2 lines import/fetch, +1 line prop passing)

**Architecture decision:** Props-based pattern resolves client/server boundary cleanly.

### Task 3: Create posts directory structure
**Status:** ✅ Complete
**Commit:** 6bafebd

Created `_posts/` directory in project root with `.gitkeep` placeholder to:
- Establish content location (Jekyll/Hugo convention)
- Ensure directory is tracked by git despite being empty
- Prepare for markdown posts in Phase 2

**Files created:**
- `_posts/.gitkeep`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical Functionality] Props-based architecture for client/server boundary**
- **Found during:** Task 2 - Build failed with "Module not found: Can't resolve 'fs'"
- **Issue:** Blog component has `"use client"` directive (uses useState), but `getBlogPosts()` imports Node.js `fs` module. Webpack can't bundle server-only modules for client components.
- **Fix:**
  - Refactored Blog component to accept `posts` prop instead of calling `getBlogPosts()` directly
  - Added `BlogProps` interface with optional `posts: BlogPost[]` parameter
  - Updated `app/page.tsx` to fetch posts server-side and pass to client component
  - Changed import from `getBlogPosts` to `type { BlogPost }` in client component
- **Files modified:** `components/blog.tsx`, `app/page.tsx`
- **Commit:** Included in 1a38d3a (Task 2 commit)
- **Rationale:** This is critical missing functionality (Rule 2) because the blog data layer must work with the existing component architecture. The plan didn't specify the client/server boundary handling, which is essential for Next.js App Router correctness.

## Verification Results

All verification criteria passed:

- ✅ lib/blog.ts exports getBlogPosts function and BlogPost type
- ✅ getBlogPosts returns fallback data when _posts/ is empty (verified via build success with empty directory)
- ✅ components/blog.tsx imports BlogPost type
- ✅ app/page.tsx imports and calls getBlogPosts()
- ✅ Blog cards are wrapped in Next.js Link components
- ✅ Each blog card links to /blog/[slug] where slug is derived from post
- ✅ _posts/ directory exists in project root
- ✅ No TypeScript errors
- ✅ Build succeeds: `bun run build`
- ✅ Homepage blog section displays posts using fallback data

**Build output:** Static prerendering successful, 246 kB First Load JS for homepage.

## Success Criteria Met

✅ Homepage blog section displays posts dynamically from `getBlogPosts()` function (using fallback data initially)
✅ Each blog card is a clickable link pointing to `/blog/[slug]`
✅ The `_posts/` directory exists and is ready to receive markdown files in Phase 2
✅ Build completes successfully with no errors

## Technical Notes

**Data flow pattern:**
```
_posts/*.md (empty)
  → getBlogPosts() [server-side, lib/blog.ts]
  → fallbackPosts array
  → page.tsx [server component]
  → Blog component [client component, receives posts prop]
  → Filtered posts [client-side state]
  → Rendered blog cards with links
```

**Next.js App Router compliance:**
- Server component (page.tsx) performs I/O operations
- Client component (blog.tsx) handles interactivity (category filtering)
- Data passed via props across server/client boundary
- No "use client" in files importing Node.js modules

**Fallback data behavior:**
The fallback data ensures the homepage remains functional during Phase 1 (content updates). When markdown files are added to `_posts/` in Phase 2, `getBlogPosts()` will automatically switch from fallback to file-based data with no code changes required.

**Link behavior:**
Blog cards now link to `/blog/[slug]` routes. These routes don't exist yet (Phase 2: Blog Infrastructure), so clicking links shows 404 pages. This is expected and acceptable for Phase 1.

## Dependencies

**Requires:**
- None (first plan with blog system)

**Provides:**
- `getBlogPosts()` function for blog data access
- `BlogPost` TypeScript interface
- `_posts/` directory structure
- Homepage blog cards with routing

**Affects:**
- Homepage blog section (now dynamic)
- Future blog post pages (prepared for Phase 2)

## Self-Check: PASSED

**Created files verification:**
```bash
[ -f "lib/blog.ts" ] && echo "FOUND: lib/blog.ts"
# FOUND: lib/blog.ts

[ -f "_posts/.gitkeep" ] && echo "FOUND: _posts/.gitkeep"
# FOUND: _posts/.gitkeep
```

**Commits verification:**
```bash
git log --oneline --all | grep -q "a48f88a" && echo "FOUND: a48f88a"
# FOUND: a48f88a

git log --oneline --all | grep -q "1a38d3a" && echo "FOUND: 1a38d3a"
# FOUND: 1a38d3a

git log --oneline --all | grep -q "6bafebd" && echo "FOUND: 6bafebd"
# FOUND: 6bafebd
```

All claimed files exist and all commits are in git history.
