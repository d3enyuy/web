# Lambiv Gills Dzenyuy - Portfolio

A beautiful, modern portfolio website built with Next.js, TypeScript, and Tailwind CSS. Inspired by the elegant design of Brittany Chiang's portfolio.

## ✨ Features

- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Fully Mobile Responsive**: Optimized for all screen sizes with dedicated mobile navigation
- **Interactive Navigation**: Side navigation on desktop, hamburger menu on mobile
- **Smooth Animations**: Elegant transitions and hover effects
- **Performance Optimized**: Fast loading times and optimal performance
- **Clean Design**: Minimal, elegant design with a professional navy & teal color scheme
- **Dynamic Content**: Interactive notes section with markdown support
- **Dark Mode**: Beautiful dark theme throughout

## 📱 Mobile Responsiveness

This portfolio is fully optimized for mobile devices with:

### Navigation
- **Desktop**: Fixed side navigation with animated indicators
- **Mobile**: Hamburger menu with slide-down overlay
- **Bottom Bar**: Fixed social links bar on mobile for easy access

### Responsive Features
- **Adaptive Typography**: Font sizes scale appropriately across all screen sizes
- **Touch-Friendly**: All interactive elements are sized for easy tapping
- **Optimized Spacing**: Padding and margins adjusted for mobile screens
- **Flexible Layouts**: Grid layouts adapt from single column (mobile) to multi-column (desktop)
- **Image Optimization**: Profile images resize appropriately for different screens
- **No Horizontal Scroll**: Proper overflow handling on all devices

### Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: ≥ 640px (sm) to < 1024px (lg)
- **Desktop**: ≥ 1024px (lg)

## 📄 Sections

1. **Hero** - Eye-catching introduction with social links and animated text
2. **About** - Personal introduction, tech stack, and research interests
3. **Experience** - Detailed work history with descriptions
4. **Research** - Published papers and current research projects
5. **Projects** - Featured projects with tags and links
6. **Blog** - Blog posts with category filtering
7. **Notes** - Quick notes and TILs with markdown support
8. **Contact** - Get in touch section with email link

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Content Updates
1. **Personal Information**: Update content in components to reflect your information
2. **Projects**: Add your own projects in `components/projects.tsx`
3. **Experience**: Update your work experience in `components/experience.tsx`
4. **Research**: Update publications in `components/research.tsx`
5. **Blog**: Add blog posts in `components/blog.tsx`
6. **Social Links**: Update links in `components/social-links.tsx`
7. **Email**: Update email address in `components/contact.tsx`
8. **Profile Image**: Replace `/public/face.JPG` with your own photo

### Styling
- **Colors**: Customize the color scheme in `app/globals.css`
- **Fonts**: Geist Sans and Geist Mono are configured in `app/layout.tsx`
- **Spacing**: Adjust responsive spacing using Tailwind classes

### Mobile Optimization
All components use responsive Tailwind classes:
- Use `sm:`, `md:`, `lg:` prefixes for breakpoint-specific styles
- Mobile-first approach (base styles apply to mobile)
- Touch-friendly sizing with `active:` states for feedback

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **React 19** - UI library
- **Lucide React** - Beautiful, consistent icons
- **React Markdown** - Markdown rendering for notes and research
- **KaTeX** - Math equation rendering
- **shadcn/ui** - High-quality UI components
- **Geist Font** - Modern, clean typography

## Design Inspiration

This portfolio is inspired by the beautiful design of [Brittany Chiang](https://brittanychiang.com/), featuring:
- Clean, minimal aesthetic
- Navy blue color scheme with green accents
- Smooth scroll animations
- Professional typography
- Responsive layout

## License

ISC

## 📱 Mobile Testing

To test mobile responsiveness:

1. **Chrome DevTools**: Press F12 → Click device toolbar (or Ctrl+Shift+M)
2. **Responsive Mode**: Test different device sizes (iPhone, iPad, etc.)
3. **Real Device**: Test on actual mobile devices for best accuracy

### Key Mobile Features to Test
- ✅ Hamburger menu opens and closes smoothly
- ✅ Navigation items are easily tappable
- ✅ All sections display correctly without horizontal scroll
- ✅ Images load and scale properly
- ✅ Social links bar appears at bottom on mobile
- ✅ Forms and interactive elements work well on touch screens

## 🚀 Deployment

This portfolio can be deployed to:

- **Vercel** (Recommended for Next.js)
  ```bash
  vercel deploy
  ```
- **Netlify**
- **GitHub Pages** (with static export)
- Any hosting service that supports Next.js

## 📝 Performance Tips

- Images are optimized for different screen sizes
- Components use CSS for animations (no heavy JS libraries)
- Lazy loading for better initial page load
- Proper viewport meta tags for mobile
- Minimal dependencies for faster load times

## Author

Lambiv Gills Dzenyuy

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
