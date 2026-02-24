# Portfolio Site

## What This Is

A personal portfolio website showcasing technical skills, projects, and professional experience. The site serves as a central hub for personal branding with blog content organized by categories, fully responsive across all devices, and optimized for engagement.

## Core Value

Visitors can quickly understand my skills and experience while engaging with high-quality content that reflects my expertise and personality.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ Next.js 15 App Router architecture with server-side rendering — existing
- ✓ Section-based single-page layout (Hero, About, Experience, Projects) — existing
- ✓ Dark/light theme support with user preference persistence — existing
- ✓ Smooth scroll navigation with active section detection — existing
- ✓ SEO optimization with structured data and meta tags — existing
- ✓ Radix UI component library for accessible interactions — existing
- ✓ Tailwind CSS v4 for utility-first styling — existing
- ✓ TypeScript for type safety — existing

### Active

<!-- Current scope. Building toward these. -->

- [ ] Fully responsive design across mobile, tablet, and desktop devices
- [ ] Updated contact information (email: gillslambiv@gmail.com, LinkedIn: lambiv-dzenyuy, GitHub: d3enyuy)
- [ ] Blog feature with markdown-based content management
- [ ] Blog post categorization and filtering by topics/tags
- [ ] Enhanced visual design and user experience improvements
- [ ] Performance optimizations (loading speed, bundle size, rendering)
- [ ] Improved content presentation for projects and experience
- [ ] Interactive elements and smooth animations
- [ ] Easy content update workflow (add projects/posts quickly)

### Out of Scope

- CMS/admin interface for blog — keeping it simple with markdown files in code
- Real-time features or dynamic backend — static site with optimal performance
- User accounts or authentication — public portfolio, no login required
- Comments or social features on blog — focused on content showcase

## Context

**Current State:**
The portfolio is a functional Next.js 15 application using App Router architecture. The codebase includes a comprehensive UI component library (shadcn/ui + Radix UI), theme management, and basic SEO setup. The site has multiple sections (Hero, About, Experience, Projects) but needs responsive design improvements, blog functionality, and updated contact information.

**Technical Environment:**
- Built with Next.js 15, React 19, TypeScript 5
- Styled with Tailwind CSS v4 using CSS variables for theming
- Deployed on Vercel with analytics integration
- Uses Bun as package manager
- Includes form validation libraries (react-hook-form, Zod) ready for use
- Markdown rendering libraries installed (react-markdown, remark-gfm) for blog

**Target Audience:**
Potential employers, clients, collaborators, and peers in the tech community who want to understand my skills, see my work, and read my technical insights.

## Constraints

- **Tech Stack**: Must maintain Next.js 15 App Router + TypeScript + Tailwind CSS — already established
- **Performance**: Site must be fast (sub-second page loads) — critical for user engagement
- **SEO**: Must maintain or improve search engine visibility — important for discoverability
- **Simplicity**: Blog managed via markdown files in code — no complex CMS needed
- **Deployment**: Vercel platform — existing infrastructure

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Markdown-based blog | Version control, developer-friendly workflow, no backend complexity | — Pending |
| Single-page architecture | Fast navigation, smooth UX, modern portfolio feel | ✓ Good |
| shadcn/ui component library | High-quality accessible components, Tailwind integration | ✓ Good |
| Static generation | Optimal performance, simple deployment, no server costs | ✓ Good |

---
*Last updated: 2026-02-24 after initialization*
