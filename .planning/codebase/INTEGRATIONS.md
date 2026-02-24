# External Integrations

**Analysis Date:** 2026-02-24

## APIs & External Services

**Analytics:**
- Vercel Analytics - Web analytics integration
  - SDK: `@vercel/analytics` (latest)
  - Implementation: `Analytics` component imported in `app/layout.tsx` (line 5), rendered at line 117
  - Usage: Tracks page views and user interactions for portfolio

**Search/Command Palette:**
- No third-party search API detected - uses `cmdk` (local command palette)

## Data Storage

**Databases:**
- **Not detected** - No database client libraries found (no PostgreSQL, MongoDB, Supabase, Firebase packages)
- No backend database integrations in `package.json`

**File Storage:**
- **Static/Local filesystem only** - Assets served via `public/` directory
  - Public assets: `face.JPG`, placeholder images in `/public`
  - Images unoptimized per `next.config.mjs` line 12

**Caching:**
- **Not detected** - No Redis or caching library found
- Browser caching via Next.js default behavior

## Authentication & Identity

**Auth Provider:**
- **Not detected** - No authentication service (NextAuth, Auth0, Clerk)
- No login/user system in codebase
- Portfolio is public/static with no user accounts

**Social Integration:**
- LinkedIn: Referenced in `components/structured-data.tsx` (line 11) - `https://www.linkedin.com/in/lambiv-dzenyuy/`
- GitHub: Referenced in `components/structured-data.tsx` (line 12) - `https://github.com/d3enyuy`
- Social links component: `components/social-links.tsx`
- Twitter: Referenced in metadata as `@lambiv_dzenyuy` (`app/layout.tsx` line 85)

## Monitoring & Observability

**Error Tracking:**
- **Not detected** - No Sentry, Rollbar, or similar service found

**Analytics:**
- Vercel Analytics - Production monitoring and analytics
- Implementation: `@vercel/analytics/next` at `app/layout.tsx` line 5

**Logs:**
- **Console-based only** - Standard Node.js/browser logging via `console.*`
- No structured logging library found

## CI/CD & Deployment

**Hosting:**
- Vercel - Primary deployment platform
  - Indicated by `@vercel/analytics` integration
  - `.vercel/` directory in `.gitignore` (line 28)
  - Portfolio URL: `https://lambiv-dzenyuy.vercel.app` (from `app/layout.tsx` metadata)

**CI Pipeline:**
- **Not explicitly configured** - Likely using Vercel's default Git integration
- No GitHub Actions, GitLab CI, or Jenkins configs found
- Deploy on push via Vercel automatic deployments

**Build Output:**
- Next.js standalone mode for containerization capability

## Environment Configuration

**Required env vars:**
- **None critical** for basic functionality (portfolio is static)
- Optional: Site verification codes for search engines (commented placeholders in `app/layout.tsx` lines 105-106):
  - `meta name="google-site-verification"` - for Google Search Console
  - `meta name="msvalidate.01"` - for Bing Webmaster Tools

**Secrets location:**
- `.env*.local` files (per `.gitignore` line 27) - not committed to repo
- No actual secrets detected in codebase (portfolio is public)

## Webhooks & Callbacks

**Incoming:**
- **Not detected** - No API endpoints receiving webhooks

**Outgoing:**
- **Not detected** - No outbound webhook integrations

## SEO & Metadata Services

**Sitemap Generation:**
- `app/sitemap.ts` - Dynamic sitemap generation for search engines
  - Returns `MetadataRoute.Sitemap`

**Robots.txt:**
- `app/robots.ts` - Dynamic robots.txt for search engine crawlers
  - Returns `MetadataRoute.Robots`

**Structured Data (Schema.org):**
- `components/structured-data.tsx` - JSON-LD format
  - Person schema with employment, education, credentials
  - Linked data includes LinkedIn, GitHub profiles
  - Includes competencies (Neo4j, Apache Kafka, PostgreSQL, Spring Boot, etc.)

**Manifest (PWA):**
- `app/manifest.ts` - Progressive Web App manifest
  - Returns `MetadataRoute.Manifest`

**Meta Tags:**
- Open Graph tags in `app/layout.tsx` (lines 64-78)
- Twitter Card tags in `app/layout.tsx` (lines 80-86)
- Canonical URL in `app/layout.tsx` (line 88)

## Third-Party UI Libraries

**Icon Library:**
- Lucide React 0.454.0 - Icon components
  - Usage: `Github`, `Linkedin`, `ExternalLink`, `Mail` icons throughout components

**Font Services:**
- Vercel Geist Font - Self-hosted, no external font CDN
  - Imported from `geist` package in `app/layout.tsx` (lines 4-5)

## Content & Knowledge

**External Content Sources:**
- **Not integrated** - No CMS, blog API, or headless content platform
- Portfolio content is static React components (hardcoded in `components/`)

## No Detectable Integrations

- Database services (Supabase, Firebase, MongoDB Atlas)
- Email services (SendGrid, AWS SES, Mailgun)
- Payment processors (Stripe, PayPal)
- Form backends (Formspree, Basin)
- CDN services (CloudFlare, AWS CloudFront)
- Search services (Algolia, MeiliSearch)
- Notification services (Twilio, PushEngage)

---

*Integration audit: 2026-02-24*
