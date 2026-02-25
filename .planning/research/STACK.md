# Stack Research

**Domain:** Next.js Portfolio Blog Feature
**Researched:** 2026-02-24
**Confidence:** HIGH

## Recommended Stack

### Core Technologies (Already Installed)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 15.2.4 | Full-stack React framework with App Router | Industry standard for React-based blogs, excellent static generation, built-in routing and optimization |
| React | 19 | UI component library | Latest version with improved performance and Server Components support |
| TypeScript | 5.x | Type safety | Essential for maintainable codebases, catches errors at compile time |
| Tailwind CSS | 4.1.14 | Utility-first styling | Latest v4 with native CSS support, no build step complexity |
| react-markdown | latest | Markdown rendering | Already installed, simple and reliable for rendering markdown content |
| remark-gfm | latest | GitHub-flavored Markdown | Already installed, adds tables, strikethrough, task lists, and other GFM features |
| remark-math | latest | Math expressions | Already installed, enables LaTeX math expressions in blog posts |
| rehype-katex | latest | Math rendering | Already installed, renders mathematical expressions beautifully |

### New Dependencies Needed

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| gray-matter | ^4.0.3 | Frontmatter parsing | REQUIRED - Parse YAML/JSON frontmatter from markdown files for metadata (title, date, category, tags, etc.) |
| reading-time | ^1.5.0 | Reading time estimation | RECOMMENDED - Add "X min read" metadata to posts, enhances UX |
| rehype-slug | ^6.0.0 | Heading ID generation | RECOMMENDED - Generates IDs for headings, enables anchor links and table of contents |
| rehype-autolink-headings | ^7.1.0 | Auto-link headings | RECOMMENDED - Adds clickable anchor links to headings |
| rehype-pretty-code | ^0.14.1 | Syntax highlighting | HIGHLY RECOMMENDED - Beautiful code blocks with Shiki (VS Code themes), better than alternatives |
| feed | ^4.2.2 | RSS/Atom/JSON feed generation | RECOMMENDED - Generate RSS feeds for blog subscribers, supports all feed formats |

### Supporting Libraries (Optional)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| velite | ^0.3.1 | Type-safe content layer | OPTIONAL - If you want automated type generation and validation for frontmatter, replaces Contentlayer which is abandoned |
| next-sitemap | ^4.2.3 | Sitemap generation | OPTIONAL - Next.js 15 has built-in sitemap support via sitemap.ts, but this provides more features |
| @jsdevtools/rehype-toc | ^1.1.0 | Table of contents | OPTIONAL - Auto-generate TOC from headings if needed |

### Development Tools (Already Configured)

| Tool | Purpose | Notes |
|------|---------|-------|
| PostCSS | CSS transformation | Already configured with @tailwindcss/postcss |
| Vercel Analytics | Usage tracking | Already installed and integrated |
| ESLint | Code linting | Built into Next.js, currently ignored in builds |

## Installation

```bash
# Required for blog functionality
bun add gray-matter

# Recommended for enhanced blog features
bun add reading-time rehype-slug rehype-autolink-headings rehype-pretty-code feed

# Optional - for type-safe content management
bun add -D velite

# Note: Use bun since project has bun.lock
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| gray-matter | Manual parsing | Never - gray-matter is battle-tested and handles edge cases |
| rehype-pretty-code | rehype-highlight | If you don't need VS Code themes, but rehype-pretty-code is superior |
| react-markdown | next-mdx-remote | If you need remote content from CMS or want JSX components in markdown |
| File-based content | Contentlayer | NEVER - Contentlayer is abandoned as of 2024 |
| File-based content | Velite | If you want type-safe frontmatter validation and auto-generated types |
| File-based content | CMS (Sanity, Strapi) | If multiple non-technical users need to create content |
| feed package | rss package | Never - feed supports RSS, Atom, AND JSON feeds |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Contentlayer | Abandoned project, no maintenance since 2023, incompatible with latest Next.js | Velite or plain gray-matter + file system |
| next-mdx-remote | Unnecessary complexity for static file-based blog, adds runtime overhead | react-markdown with gray-matter |
| Pages Router patterns | Deprecated approach, App Router is the future | App Router with generateStaticParams |
| rehype-highlight | Less powerful than rehype-pretty-code, limited theme options | rehype-pretty-code with Shiki |
| Manual RSS generation | Error-prone, hard to maintain | feed package |

## Stack Patterns by Variant

### Simple File-Based Blog (RECOMMENDED)
**When:** Static markdown files in repository, developer-only content updates

**Stack:**
- gray-matter for frontmatter
- react-markdown + remark/rehype plugins for rendering
- Next.js App Router with generateStaticParams
- File system APIs (fs.readFile, fs.readdir)

**Why:** Simple, version-controlled, no database, fast builds, perfect for portfolios

### Type-Safe Content Layer
**When:** Want TypeScript types for frontmatter, automated validation

**Add to simple approach:**
- velite for type generation and validation
- Zod schemas for frontmatter (already have Zod installed)

**Why:** Catches content errors at build time, better DX with autocomplete

### CMS-Backed Blog
**When:** Non-developers need to create content, need preview functionality

**Replace file system with:**
- next-mdx-remote for dynamic MDX
- CMS API calls (Sanity, Contentful, etc.)

**Why:** Out of scope per PROJECT.md - keeping it simple with markdown files

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| gray-matter@4.0.3 | Next.js 15, React 19 | Stable, no dependencies on React version |
| rehype-pretty-code@0.14.1 | Shiki ^1.0.0 | Requires Shiki v1+, works with Next.js 15 |
| react-markdown@latest | React 19 | Already installed and compatible |
| velite@0.3.1 | Node.js 18.20+ | Requires modern Node.js, works with Next.js 15 |
| feed@4.2.2 | Node.js 14+ | No framework dependencies |
| Next.js 15.2.4 | All recommended packages | App Router required for modern blog patterns |

## Implementation Architecture

### File Structure
```
portfolio/
├── app/
│   ├── blog/
│   │   ├── page.tsx              # Blog index with category filtering
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Individual blog post
│   │   └── category/
│   │       └── [category]/
│   │           └── page.tsx      # Category filtered view
│   ├── feed.xml/
│   │   └── route.ts              # RSS feed generation
│   └── sitemap.ts                # Built-in Next.js sitemap
├── content/
│   └── posts/
│       ├── post-1.md
│       ├── post-2.md
│       └── ...
├── lib/
│   └── blog.ts                   # Blog utility functions (getPosts, getPost, etc.)
└── types/
    └── blog.ts                   # TypeScript types for blog posts
```

### Content Processing Flow
1. **Build Time:** Next.js reads markdown files from content/posts/
2. **Parse:** gray-matter extracts frontmatter (metadata) and content
3. **Transform:** remark/rehype plugins process markdown to HTML
4. **Enhance:** Add reading time, heading IDs, syntax highlighting
5. **Generate:** Use generateStaticParams to create static pages
6. **Output:** Fully static HTML pages with optimal performance

### Frontmatter Schema
```yaml
---
title: "Blog Post Title"
date: "2026-02-24"
excerpt: "Brief description for previews"
category: "Web Development"
tags: ["Next.js", "React", "TypeScript"]
author: "Your Name"
image: "/images/blog/post-cover.jpg"
published: true
---
```

## Confidence Levels

| Package | Confidence | Source | Rationale |
|---------|------------|--------|-----------|
| gray-matter | HIGH | npm registry, official docs, widespread use | Last updated 2021 but stable, used by Gatsby, Astro, VitePress, TinaCMS - battle-tested |
| rehype-pretty-code | MEDIUM-HIGH | GitHub releases, npm | Active development, v0.14.1 from ~1 year ago, 73+ projects using it |
| velite | MEDIUM | GitHub repo, community adoption | Newer (v0.3.1 from 2 months ago), but actively maintained, growing community |
| react-markdown | HIGH | Already installed, widely used | Stable, well-maintained, perfect for blog use cases |
| feed | HIGH | npm registry, multiple sources | v4.2.2 standard for RSS generation, supports all formats |
| reading-time | MEDIUM | npm registry | Last updated 2020 but feature-complete, no breaking changes needed |

## Sources

- Next.js 15 Official Documentation - App Router, generateStaticParams, Static Exports (HIGH confidence)
- rehype-pretty-code GitHub repository and docs (MEDIUM-HIGH confidence)
- WebSearch: "Next.js 15 blog markdown implementation 2025" - Multiple 2025 tutorials (MEDIUM confidence, verified patterns)
- WebSearch: "contentlayer vs next-mdx-remote 2025" - Contentlayer comparison and abandonment status (HIGH confidence)
- WebSearch: "velite contentlayer alternative 2025" - Velite as modern replacement (MEDIUM confidence)
- WebSearch: "gray-matter frontmatter parsing next.js best practices" - Implementation patterns (HIGH confidence)
- WebSearch: "feed npm rss atom json next.js blog 2025" - RSS feed generation (HIGH confidence)
- WebSearch: "rehype-slug rehype-autolink-headings table of contents blog 2025" - Heading enhancement (HIGH confidence)
- Existing STACK.md analysis - Current dependencies (HIGH confidence)

---
*Stack research for: Blog Feature Addition to Next.js Portfolio*
*Researched: 2026-02-24*
*Focus: Incremental addition to existing Next.js 15 + React 19 + Tailwind CSS v4 stack*
