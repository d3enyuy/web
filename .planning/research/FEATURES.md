# Feature Research

**Domain:** Portfolio Blog for Developer Portfolio Sites
**Researched:** 2026-02-24
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Blog post listing page | Standard for any blog - users expect to see all posts | LOW | List view with title, date, excerpt, tags |
| Individual post pages | Core blog requirement - users need to read full content | LOW | Full markdown/MDX rendering with metadata |
| Markdown/MDX support | Developer audience expects markdown for code-heavy content | LOW | Already installed (react-markdown, remark-gfm) |
| Syntax highlighting | Code snippets are useless without readable highlighting | MEDIUM | Prism.js or Shiki recommended; affects readability |
| Categories/tags | Content organization - users filter by topic interest | LOW | Metadata-based, simple taxonomy |
| Filter/search by tags | With categories comes expectation of filtering | MEDIUM | Client-side filter or dedicated search component |
| Responsive design | 50%+ traffic is mobile - non-negotiable in 2026 | MEDIUM | Already a project requirement |
| Reading time estimate | Standard UX feature - helps users decide to commit time | LOW | Calculate from word count, 200-250 wpm average |
| Post metadata display | Date, author, reading time - context users expect to see | LOW | Standard frontmatter fields |
| SEO optimization | Discoverability requirement - portfolio needs to be found | MEDIUM | Individual post OG tags, meta descriptions |
| RSS feed | Developers expect RSS for content subscription | MEDIUM | Next.js RSS generation via /feed.xml route |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not expected, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Interactive code demos | Engagement++, educational value, shows expertise | HIGH | Sandpack for React, custom playground for HTML/CSS (Josh Comeau pattern) |
| MDX components in posts | Rich interactivity beyond static text - unique educational content | MEDIUM | Leverage existing MDX support, custom React components |
| Table of contents | 40% bounce rate reduction for long posts, SEO jump links | LOW | Auto-generated from headings, sticky sidebar |
| Dark mode support | Already implemented site-wide - extends to blog seamlessly | LOW | Leverage existing theme system |
| View/like counter | Social proof, engagement metric without comments bloat | MEDIUM | Simple MongoDB/KV store, privacy-first (no user tracking) |
| Series organization | Content depth - multi-part tutorials increase retention | MEDIUM | Frontmatter series field, prev/next navigation |
| Copy code button | Developer QoL feature - one-click snippet copying | LOW | Small enhancement with big UX impact |
| Anchor links on headings | Shareability - link to specific sections, GitHub-style | LOW | Auto-add IDs to headings, hover icon |
| Related posts | Keep users engaged, reduce bounce, show content depth | MEDIUM | Tag-based similarity or manual curation |
| Newsletter signup | Audience building - 43% increase in trial signups when done right | MEDIUM | Simple email capture, ConvertKit/beehiiv integration |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Comments section | "Engagement and community" | Spam, moderation overhead, security, dead threads look bad | Link to discussion on Twitter/GitHub issues, mailto for feedback |
| View count for every post | "Show popularity" | Privacy concerns, discourages reading older content, vanity metric | Optional: total site views only, or like button instead |
| Heavy animations everywhere | "Modern feel" | Slow load times, accessibility issues, distraction from content | Subtle transitions only (View Transitions API), respect prefers-reduced-motion |
| Real-time features | "Cutting edge" | Complexity, server costs, unnecessary for blog content | Static generation with ISR for updates, view counts if needed |
| Search autocomplete/suggestions | "Better UX" | Complex to build well, slow, adds bundle size | Simple tag filter + ctrl+F is enough for small-medium blogs |
| CMS/admin interface | "Easy updates" | Complexity explosion, security surface, version control loss | Keep markdown in codebase - git workflow for developers |
| Share counts (Facebook/Twitter) | "Social proof" | API deprecations, slow loading, privacy, maintenance burden | Simple share buttons only, no counts |
| Infinite scroll | "Modern UX" | SEO issues, accessibility problems, back button breaks | Pagination or "load more" button |

## Feature Dependencies

```
[Blog listing page]
    └──requires──> [Individual post pages]
    └──requires──> [Post metadata]
    └──requires──> [Categories/tags]

[Filter by tags]
    └──requires──> [Categories/tags]

[Table of contents]
    └──requires──> [Anchor links on headings]

[Series organization]
    └──requires──> [Post metadata]
    └──enhances──> [Related posts]

[Interactive code demos]
    └──requires──> [MDX components in posts]

[Newsletter signup]
    └──conflicts──> [Privacy-first analytics] (if not implemented carefully)

[Syntax highlighting]
    └──required-by──> [Copy code button]

[Reading time estimate]
    └──requires──> [Post metadata]
```

### Dependency Notes

- **Blog listing requires post pages:** Can't have index without content
- **Filter requires tags:** Taxonomy must exist before filtering works
- **TOC requires anchor links:** Auto-generated anchors make TOC functional
- **Series enhances related posts:** Series metadata makes better recommendations
- **Interactive demos require MDX:** Need component rendering capability
- **Newsletter conflicts with privacy:** Must use privacy-first email capture to maintain privacy stance
- **Copy button requires highlighting:** No highlighting = no code blocks to copy
- **Reading time requires metadata:** Calculated from content, stored in frontmatter

## MVP Definition

### Launch With (v1)

Minimum viable blog — what's needed to start publishing quality content.

- [x] Blog post listing page — Browse all posts
- [x] Individual post pages — Read full content
- [x] Markdown/MDX support — Write content with code
- [x] Syntax highlighting — Readable code snippets
- [x] Categories/tags — Organize content by topic
- [x] Filter by tags — Find posts by interest
- [x] Reading time estimate — Set user expectations
- [x] Post metadata display — Date, reading time, tags
- [x] SEO optimization — Per-post OG tags, meta descriptions
- [x] Responsive design — Mobile-first experience
- [x] RSS feed — Standard subscription method

**Rationale:** These 11 features create a complete, functional blog that meets all user expectations. Without any of these, the blog feels broken or unprofessional.

### Add After Validation (v1.x)

Features to add once core blog is working and getting traffic.

- [ ] Table of contents — After seeing post length patterns
- [ ] Copy code button — After confirming code snippet usage
- [ ] Anchor links on headings — After seeing sharing patterns
- [ ] Related posts — After content library reaches 10+ posts
- [ ] Series organization — When multi-part content emerges
- [ ] Newsletter signup — When regular traffic established (100+ visitors/week)

**Triggers:**
- TOC: When average post length > 1500 words
- Copy button: When analytics show code snippets viewed
- Anchor links: When social sharing begins
- Related posts: When 10+ posts published
- Series: When planning multi-part tutorial
- Newsletter: When consistent weekly traffic

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] Interactive code demos — High complexity, requires custom tooling
- [ ] MDX custom components — After identifying specific needs
- [ ] View/like counter — After establishing engagement baseline
- [ ] Dark mode code themes — Nice-to-have visual polish
- [ ] Search functionality — Only if blog scales beyond 50 posts

**Why defer:**
- Interactive demos: HIGH complexity, unclear ROI until content strategy solidifies
- Custom MDX components: Build when specific use case emerges, not speculatively
- View counter: Wait until traffic justifies engagement features
- Code themes: Diminishing returns, focus on content first
- Search: Premature optimization; tag filtering sufficient for small-medium blogs

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Blog listing page | HIGH | LOW | P1 |
| Individual post pages | HIGH | LOW | P1 |
| Markdown/MDX support | HIGH | LOW | P1 |
| Syntax highlighting | HIGH | MEDIUM | P1 |
| Categories/tags | HIGH | LOW | P1 |
| Filter by tags | HIGH | MEDIUM | P1 |
| Reading time | MEDIUM | LOW | P1 |
| Post metadata | HIGH | LOW | P1 |
| SEO optimization | HIGH | MEDIUM | P1 |
| Responsive design | HIGH | MEDIUM | P1 |
| RSS feed | MEDIUM | MEDIUM | P1 |
| Table of contents | MEDIUM | LOW | P2 |
| Copy code button | MEDIUM | LOW | P2 |
| Anchor links | MEDIUM | LOW | P2 |
| Related posts | MEDIUM | MEDIUM | P2 |
| Series organization | MEDIUM | MEDIUM | P2 |
| Newsletter signup | MEDIUM | MEDIUM | P2 |
| Interactive code demos | HIGH | HIGH | P3 |
| MDX custom components | MEDIUM | MEDIUM | P3 |
| View/like counter | LOW | MEDIUM | P3 |
| Search functionality | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for launch (table stakes)
- P2: Should have, add when possible (quick wins after launch)
- P3: Nice to have, future consideration (high effort or uncertain value)

## Competitor Feature Analysis

| Feature | Josh Comeau | Dan Abramov | Lee Robinson | Our Approach |
|---------|-------------|-------------|--------------|--------------|
| MDX/Markdown | MDX with custom components | Markdown (Gatsby) | MDX (Next.js) | MDX (Next.js 15) |
| Syntax highlighting | Shiki (VS Code engine) | Standard highlight | Prism.js | Shiki or Prism |
| Interactive demos | Custom Sandpack playgrounds | None | Code snippets only | Phase 2+ only |
| Dark mode | Yes (with theme toggle) | Yes | Yes | Already implemented |
| Search | Algolia | None | None | Tag filter only |
| Table of contents | Auto-generated, sticky | None | Some posts | Auto-generated |
| Reading time | Yes | No | Yes | Yes (MVP) |
| Newsletter | Yes (subtle integration) | No | Yes (ConvertKit) | Phase 2 |
| Comments | No | No | GitHub Discussions link | No (anti-feature) |
| View counts | Yes (like button) | No | No | Phase 3 consideration |
| Series organization | Yes (course structure) | No | Some series | Phase 2 |
| RSS feed | Yes | Yes | Yes | Yes (MVP) |

**Insights:**
- All top dev blogs use Markdown/MDX
- Syntax highlighting is universal (implementation varies)
- Interactive demos are unique to Josh Comeau (differentiator, high effort)
- Dark mode is standard, not differentiating
- Search is rare; most rely on tags/archives
- Comments are universally avoided
- Newsletter adoption growing but not universal

## Sources

**Portfolio Best Practices:**
- Elementor Blog: Best Web Developer Portfolio Examples 2026 (MEDIUM confidence - aggregated examples)
- Templyo: 17 Inspiring Web Developer Portfolio Examples (MEDIUM confidence - design patterns)
- Colorlib: 22 Best Developer Portfolios (LOW confidence - example gallery)

**Blog Features & Implementation:**
- Next.js Official Docs: MDX Guide (HIGH confidence - official documentation, updated Feb 2026)
- Josh Comeau: How I Built My Blog v2 (HIGH confidence - first-party case study)
- LogRocket: Create Next.js MDX Blog (MEDIUM confidence - tutorial, practical patterns)

**Developer Engagement:**
- StateShift: Future of DevRel 2026 (MEDIUM confidence - industry trends)
- DeveloperMedia: Structuring Content With Developer Engagement (MEDIUM confidence - content strategy)

**Technical Features:**
- Prism.js Official Site (HIGH confidence - library documentation)
- David Bushell: Better Syntax Highlighting (MEDIUM confidence - technical analysis)
- Crocoblock: Blog Filters in WordPress (MEDIUM confidence - UX patterns transferable to React)
- ProBlogger: Using Categories and Tags Effectively (MEDIUM confidence - established blogging wisdom)

**Social Sharing & SEO:**
- DigitalOcean: Twitter Card and Open Graph Tutorial (HIGH confidence - authoritative tutorial)
- EverywhereMarketer: Ultimate Guide to Social Meta Tags (MEDIUM confidence - comprehensive guide)

**Privacy & Analytics:**
- Matomo: Privacy Regulations 2026 (HIGH confidence - privacy platform insights)
- AnalyticSafe: Privacy-Focused Web Analytics Guide 2025 (MEDIUM confidence - current best practices)
- Cloudflare: Free Privacy-First Analytics (HIGH confidence - platform announcement)

**Newsletter Integration:**
- Upscribe: Email Capture Tools (LOW confidence - vendor marketing, but feature insights)
- beehiiv: Subscribe Forms Features (MEDIUM confidence - platform documentation)
- Omnisend: Newsletter Signup Examples 2026 (MEDIUM confidence - practical examples)

---
*Feature research for: Portfolio Blog*
*Researched: 2026-02-24*
