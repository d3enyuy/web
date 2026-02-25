# Architecture Research

**Domain:** Next.js Blog Integration with Portfolio Architecture
**Researched:** 2026-02-24
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER (Browser)                           │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │  Blog List │  │ Blog Post  │  │   Filter   │  │   Search   │        │
│  │ Component  │  │ Component  │  │ Component  │  │ Component  │        │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘        │
│        │               │               │               │                │
├────────┴───────────────┴───────────────┴───────────────┴────────────────┤
│                      APP ROUTER LAYER (Next.js)                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  /app/blog/page.tsx (Blog Index) - Server Component              │   │
│  │  - Fetches all blog posts                                         │   │
│  │  - Handles pagination, filtering, search via URL params           │   │
│  │  - Renders BlogList component with filtered posts                 │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  /app/blog/[slug]/page.tsx (Individual Post) - Server Component   │   │
│  │  - Uses generateStaticParams for build-time generation            │   │
│  │  - Fetches single post by slug                                    │   │
│  │  - Renders markdown with syntax highlighting                      │   │
│  └──────────────────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────────────────────┤
│                       DATA ACCESS LAYER                                  │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │  /lib/blog.ts (Blog Utilities)                                  │     │
│  │  - getAllPosts(): Post[]                                        │     │
│  │  - getPostBySlug(slug: string): Post                            │     │
│  │  - getPostsByTag(tag: string): Post[]                           │     │
│  │  - getPostsByCategory(category: string): Post[]                 │     │
│  │  Uses: fs.readdirSync, fs.readFileSync, gray-matter             │     │
│  └────────────────────────────────────────────────────────────────┘     │
├──────────────────────────────────────────────────────────────────────────┤
│                    MARKDOWN PROCESSING LAYER                             │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │  Remark & Rehype Plugins                                        │     │
│  │  - remark-gfm (GitHub Flavored Markdown)                        │     │
│  │  - remark-math (Math notation support)                          │     │
│  │  - rehype-katex (Math rendering)                                │     │
│  │  - rehype-highlight (Syntax highlighting)                       │     │
│  │  Transforms: Markdown → HTML with plugins → React Components    │     │
│  └────────────────────────────────────────────────────────────────┘     │
├──────────────────────────────────────────────────────────────────────────┤
│                      CONTENT LAYER (File System)                         │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │  /_posts/*.md or /content/blog/*.mdx                            │     │
│  │  Each file structure:                                            │     │
│  │  ---                                                             │     │
│  │  title: "Post Title"                                             │     │
│  │  date: "2025-01-15"                                              │     │
│  │  excerpt: "Post summary"                                         │     │
│  │  tags: ["tag1", "tag2"]                                          │     │
│  │  category: "technical"                                           │     │
│  │  ---                                                             │     │
│  │  # Markdown content here                                         │     │
│  └────────────────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Blog Index Page** (`/app/blog/page.tsx`) | Server component that fetches all posts, handles URL params for filtering/search/pagination, renders blog post list | Uses `searchParams` prop for URL state, calls `getAllPosts()`, filters data server-side, passes to client components |
| **Blog Post Page** (`/app/blog/[slug]/page.tsx`) | Server component for individual post rendering, generates static pages at build time | Implements `generateStaticParams()`, calls `getPostBySlug()`, renders markdown with react-markdown |
| **Blog Data Access** (`/lib/blog.ts`) | Server-side utilities for reading markdown files from filesystem | Uses Node.js `fs` module, `gray-matter` for frontmatter parsing, returns TypeScript-typed Post objects |
| **BlogList Component** (`/components/blog/blog-list.tsx`) | Client component displaying post cards with filtering UI | Manages filter state, renders PostCard components, handles category/tag selection |
| **PostCard Component** (`/components/blog/post-card.tsx`) | Presentational component for blog post preview | Displays title, excerpt, date, tags, read time; links to full post |
| **MarkdownRenderer Component** (`/components/blog/markdown-renderer.tsx`) | Wraps react-markdown with custom components and plugins | Configures remark/rehype plugins, provides custom component overrides for links/images |
| **Filter/Search Components** | Client components for interactive filtering | Update URL params via `useSearchParams` and `router.push`, trigger server-side re-render |

## Recommended Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx                    # Root layout (existing)
│   ├── page.tsx                      # Homepage with sections (existing)
│   └── blog/                         # New blog routes
│       ├── page.tsx                  # Blog index - lists all posts
│       ├── [slug]/
│       │   └── page.tsx              # Individual blog post page
│       └── category/
│           └── [category]/
│               └── page.tsx          # Posts filtered by category (optional)
├── components/
│   ├── blog.tsx                      # Existing blog section component
│   └── blog/                         # New blog-specific components
│       ├── blog-list.tsx             # Post list with filtering
│       ├── post-card.tsx             # Single post preview card
│       ├── markdown-renderer.tsx     # Markdown rendering with plugins
│       ├── blog-header.tsx           # Blog section header
│       ├── category-filter.tsx       # Category/tag filter UI
│       └── search-bar.tsx            # Search input component
├── lib/
│   ├── blog.ts                       # Blog data access utilities
│   ├── markdown.ts                   # Markdown processing utilities
│   └── types/
│       └── blog.ts                   # TypeScript types for Post, Category
├── _posts/                           # Markdown blog post files
│   ├── building-scalable-microservices.md
│   ├── distributed-consensus-algorithms.md
│   └── ml-model-deployment.md
└── public/
    └── blog/                         # Blog-specific assets
        └── images/                   # Blog post images
```

### Structure Rationale

- **`/app/blog/` directory:** Next.js App Router automatically creates `/blog` route. Dynamic `[slug]` segments enable individual post pages with static generation.
- **`/components/blog/` directory:** Encapsulates all blog-related UI components separate from portfolio section components, improving maintainability and allowing for easy feature additions.
- **`/lib/blog.ts`:** Centralizes blog data access logic, making it reusable across different routes (blog index, individual posts, homepage blog section).
- **`/_posts/` directory:** Stores markdown files outside the app directory (convention: underscore prefix indicates non-routable content). Alternative naming: `/content/blog/` or `/posts/`.
- **Component separation:** Blog section component on homepage (`/components/blog.tsx`) can import from `/lib/blog.ts` to show recent posts, while full blog experience lives under `/app/blog/`.

## Architectural Patterns

### Pattern 1: File-Based Content with Static Generation

**What:** Markdown files stored in the repository serve as the blog CMS, with Next.js generating static HTML pages at build time using `generateStaticParams`.

**When to use:** When content updates happen through code deployments (git commits), no dynamic user-generated content needed, and you want maximum performance with zero backend overhead.

**Trade-offs:**
- **Pros:** No database required, version-controlled content, instant global CDN delivery, perfect Lighthouse scores, no CMS complexity.
- **Cons:** Content updates require redeployment, not suitable for non-technical editors, can't handle real-time updates.

**Example:**
```typescript
// app/blog/[slug]/page.tsx
import { getAllPosts, getPostBySlug } from '@/lib/blog';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  return <MarkdownRenderer content={post.content} />;
}
```

### Pattern 2: URL-Based State for Filtering/Search

**What:** Use Next.js searchParams and dynamic routes for filtering, pagination, and search instead of client-side state, enabling shareable/bookmarkable URLs.

**When to use:** When you want blog filters and search to be shareable via URL, maintain state during page refresh, and support SEO-friendly filtered views.

**Trade-offs:**
- **Pros:** Shareable filtered views, browser back/forward works correctly, server-side filtering for performance, SEO-friendly.
- **Cons:** Slightly more complex than pure client state, requires understanding of URL params in App Router.

**Example:**
```typescript
// app/blog/page.tsx
export default async function BlogIndex({
  searchParams
}: {
  searchParams: { category?: string; q?: string; page?: string }
}) {
  const posts = getAllPosts();
  const filtered = posts
    .filter(p => !searchParams.category || p.category === searchParams.category)
    .filter(p => !searchParams.q || p.title.includes(searchParams.q));

  return <BlogList posts={filtered} />;
}
```

### Pattern 3: Server Components for Data, Client Components for Interactivity

**What:** Page-level components are Server Components that fetch data, with nested Client Components handling interactive features like filters, search, animations.

**When to use:** Always in Next.js 15 App Router for optimal performance - default to Server Components, add "use client" only where needed.

**Trade-offs:**
- **Pros:** Reduced JavaScript bundle size, faster initial page loads, direct server-side data access, automatic code splitting.
- **Cons:** Requires understanding of Server/Client boundary, can't use hooks/event handlers in Server Components.

**Example:**
```typescript
// app/blog/page.tsx (Server Component - default)
export default async function BlogIndex() {
  const posts = await getAllPosts(); // Direct filesystem access
  return <BlogList posts={posts} />; // Pass data to Client Component
}

// components/blog/blog-list.tsx (Client Component)
'use client';
export function BlogList({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState('all'); // Client state for UI
  // Interactive filtering, animations, etc.
}
```

## Data Flow

### Blog Index Flow (Homepage Section → Blog Page)

1. **Homepage Blog Section (`/components/blog.tsx`):**
   - Current: Hardcoded array of blog posts with static data
   - Enhanced: Import `getAllPosts()` from `/lib/blog.ts`, display 3-4 most recent posts
   - User clicks post or "View All" → Navigate to `/blog/[slug]` or `/blog`

2. **Blog Index Page (`/app/blog/page.tsx`):**
   - Server Component fetches all posts via `getAllPosts()`
   - Reads `searchParams` from URL (category, tag, search query, page number)
   - Filters posts server-side based on params
   - Renders BlogList client component with filtered posts
   - User interactions (filter, search) update URL params → page re-renders

3. **Individual Post Page (`/app/blog/[slug]/page.tsx`):**
   - `generateStaticParams()` runs at build time, creates static pages for all posts
   - Server Component calls `getPostBySlug(params.slug)`
   - Parses markdown with frontmatter
   - Renders with MarkdownRenderer component (react-markdown + plugins)
   - Syntax highlighting applied via rehype-highlight

### Data Access Flow

```
File System (_posts/*.md)
    ↓ (fs.readdirSync)
lib/blog.ts → getAllPosts()
    ↓ (fs.readFileSync + gray-matter)
Parse frontmatter + content
    ↓ (return Post[])
App Router Pages (Server Components)
    ↓ (pass as props)
Client Components (BlogList, PostCard)
    ↓ (render)
Browser DOM
```

### Markdown Processing Flow

```
Markdown File Content (string)
    ↓
gray-matter
    ↓ (split)
Frontmatter (YAML) → Post metadata
Content (Markdown) → Raw markdown string
    ↓
react-markdown
    ↓ (apply plugins)
remark-gfm (tables, strikethrough, task lists)
remark-math (LaTeX math notation)
    ↓
rehype-katex (render math)
rehype-highlight (code syntax highlighting)
    ↓
React Components (HTML elements)
    ↓
Rendered Blog Post (DOM)
```

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| **0-50 posts** | Simple file-based approach is perfect. Single `_posts/` directory, no pagination needed on blog index. |
| **50-200 posts** | Add pagination to blog index (10-20 posts per page), organize posts by year (`_posts/2025/`, `_posts/2024/`), implement tag/category filtering, add search functionality. |
| **200+ posts** | Consider static site generation alternatives (Contentlayer, Velite), implement full-text search (Algolia, Pagefind), add post series/collections, create dedicated category pages. |

### Scaling Priorities

1. **First bottleneck: Build time performance**
   - **What breaks:** With 100+ markdown files, build time increases as each file is read and processed
   - **How to fix:** Implement incremental static regeneration (ISR) for updated posts, use build caching, consider Contentlayer for optimized builds

2. **Second bottleneck: Client-side filtering performance**
   - **What breaks:** Filtering/searching 200+ posts client-side causes lag
   - **How to fix:** Server-side filtering with URL params (already recommended), add dedicated search API route with indexing, implement virtual scrolling for long lists

3. **Third bottleneck: Content authoring workflow**
   - **What breaks:** Managing hundreds of markdown files manually becomes difficult
   - **How to fix:** Add CLI tools for post creation/management, implement local CMS (Decap CMS, TinaCMS), create post templates with scaffolding scripts

## Anti-Patterns

### Anti-Pattern 1: Fetching Post Content on Blog Index

**What people do:** Load full markdown content for all posts on the blog listing page, then render excerpts

**Why it's wrong:** Wastes server processing time parsing full markdown for every post when only metadata is needed, increases memory usage, slows down blog index page

**Do this instead:**
- Parse only frontmatter with `gray-matter(fileContents).data` for listing pages
- Only parse full content with `gray-matter(fileContents).content` on individual post pages
- Store excerpt in frontmatter, not generated from content

### Anti-Pattern 2: Client-Side Markdown Files

**What people do:** Import markdown files directly into client components or fetch them via API routes

**Why it's wrong:** Increases JavaScript bundle size, wastes client bandwidth, slower page loads, unnecessary runtime overhead

**Do this instead:**
- Always read markdown files server-side using Node.js `fs` module
- Use Server Components for data fetching (default in App Router)
- Pass only processed HTML or React components to client

### Anti-Pattern 3: Mixing Blog Routing Patterns

**What people do:** Use both `/blog/[slug]` and `/posts/[id]` routes, or mix single-page blog section with separate blog pages inconsistently

**Why it's wrong:** Confusing URL structure, poor SEO, broken internal links, difficult to maintain

**Do this instead:**
- Choose one pattern: Either fully integrated single-page portfolio OR dedicated `/blog` route structure
- For this project: Keep `/components/blog.tsx` showing recent posts on homepage, full blog experience at `/blog` and `/blog/[slug]`
- Ensure homepage blog section links to `/blog/[slug]` for full posts

### Anti-Pattern 4: No Static Generation for Blog Posts

**What people do:** Use dynamic rendering (`force-dynamic`) or API routes for serving blog posts that rarely change

**Why it's wrong:** Loses Next.js's main performance benefit, slower TTFB, unnecessary server computation, higher hosting costs

**Do this instead:**
- Always use `generateStaticParams` for blog posts
- Pre-render all blog posts at build time
- Use Incremental Static Regeneration (ISR) if posts update occasionally

## Integration Points

### Internal Component Integration

| Component A | Component B | Communication | Notes |
|-------------|-------------|---------------|-------|
| Homepage Blog Section (`/components/blog.tsx`) | Blog Data Layer (`/lib/blog.ts`) | Direct import, function call | Import `getAllPosts()`, filter to 3-4 recent posts |
| Blog Index Page (`/app/blog/page.tsx`) | Blog List Component (`/components/blog/blog-list.tsx`) | Props (server → client) | Pass filtered posts array, server component to client component |
| Blog Post Page (`/app/blog/[slug]/page.tsx`) | Markdown Renderer (`/components/blog/markdown-renderer.tsx`) | Props | Pass post content and metadata |
| Category Filter | Blog Index Page | URL params (`useRouter`, `useSearchParams`) | Update URL → trigger server re-render |

### External Integration

| Integration | Pattern | Notes |
|-------------|---------|-------|
| **Syntax Highlighting (highlight.js via rehype-highlight)** | Import rehype plugin, load CSS theme in layout | 37 languages bundled by default, add custom themes via CSS imports |
| **Math Rendering (KaTeX via rehype-katex)** | Import remark-math and rehype-katex plugins, load KaTeX CSS | Already installed (`katex` package in dependencies) |
| **Markdown Extensions (remark-gfm)** | Import as remark plugin | Enables GitHub Flavored Markdown (tables, task lists, strikethrough) - already installed |
| **Analytics (Vercel Analytics)** | Already integrated in layout.tsx | Automatically tracks blog page views, no changes needed |
| **SEO (Structured Data)** | Generate JSON-LD for BlogPosting schema | Add to blog post pages for rich search results |

## Build Order and Dependencies

### Suggested Implementation Sequence

**Phase 1: Core Data Layer** (Build First - No Dependencies)
- Create `/lib/blog.ts` with data access utilities (`getAllPosts`, `getPostBySlug`)
- Create `/lib/types/blog.ts` with TypeScript interfaces
- Create sample markdown files in `/_posts/` with frontmatter
- Test utilities with simple script

**Phase 2: Individual Post Pages** (Depends on Phase 1)
- Create `/app/blog/[slug]/page.tsx` with `generateStaticParams`
- Create `/components/blog/markdown-renderer.tsx` with react-markdown
- Configure remark/rehype plugins (remark-gfm, rehype-highlight)
- Test individual post rendering with existing sample posts

**Phase 3: Blog Index Page** (Depends on Phase 1, 2)
- Create `/app/blog/page.tsx` for blog listing
- Create `/components/blog/blog-list.tsx` and `/components/blog/post-card.tsx`
- Implement basic post listing without filters
- Test navigation from index to individual posts

**Phase 4: Filtering and Search** (Depends on Phase 3)
- Add URL params support to blog index page
- Create `/components/blog/category-filter.tsx` for tag/category filtering
- Add search functionality with `/components/blog/search-bar.tsx`
- Implement pagination if post count > 10

**Phase 5: Homepage Integration** (Depends on Phase 1, 2)
- Update existing `/components/blog.tsx` to use `getAllPosts()` from lib
- Replace hardcoded posts with real data from markdown files
- Link post cards to `/blog/[slug]` routes
- Add "View All Posts" link to `/blog`

**Phase 6: Polish and SEO** (Depends on All Previous)
- Add OpenGraph images for blog posts
- Implement BlogPosting structured data (JSON-LD)
- Add RSS feed generation
- Optimize images in blog posts
- Add related posts suggestions

### Component Dependency Graph

```
lib/blog.ts (no dependencies)
    ↓
    ├─→ app/blog/[slug]/page.tsx
    │       ↓
    │   components/blog/markdown-renderer.tsx
    │
    ├─→ app/blog/page.tsx
    │       ↓
    │   components/blog/blog-list.tsx
    │       ↓
    │   components/blog/post-card.tsx
    │
    └─→ components/blog.tsx (homepage section)
```

### Critical Path
The minimum viable blog requires: Phase 1 → Phase 2 → Phase 5 (for linking homepage to posts). This provides clickable blog posts from the homepage with proper rendering. Phases 3, 4, and 6 are enhancements.

## Sources

**HIGH Confidence:**
- [Next.js Official Docs - MDX Guide](https://nextjs.org/docs/app/guides/mdx) - Official Next.js documentation on MDX integration
- [Next.js Official Docs - Dynamic Routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes) - Official documentation on [slug] patterns
- [Next.js Official Docs - generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) - Official documentation on static generation
- [Next.js Learn - Blog Data Fetching](https://nextjs.org/learn/pages-router/data-fetching-blog-data) - Official tutorial pattern

**MEDIUM Confidence:**
- [How to Build a Markdown Blog with Next.js 15](https://www.adeelhere.com/blog/2025-12-10-how-to-build-a-markdown-blog-with-nextjs) - Comprehensive 2025 tutorial showing file-based approach
- [Building a blog with Next.js 15 and React Server Components](https://maxleiter.com/blog/build-a-blog-with-nextjs-13) - Real-world implementation example
- [Best Practices for Organizing Next.js 15 2025](https://dev.to/bajrayejoon/best-practices-for-organizing-your-nextjs-15-2025-53ji) - Component organization patterns
- [Next.js Best Practices in 2025](https://medium.com/@GoutamSingha/next-js-best-practices-in-2025-build-faster-cleaner-scalable-apps-7efbad2c3820) - Architecture recommendations

**Verified Against Codebase:**
- Package.json confirms `react-markdown`, `remark-gfm`, `rehype-katex`, and `katex` already installed
- Existing section-based architecture pattern from `/app/page.tsx` and `/components/blog.tsx`
- Current single-page architecture with smooth scroll navigation from `/components/navigation.tsx`

---
*Architecture research for: Portfolio Blog Integration*
*Researched: 2026-02-24*
