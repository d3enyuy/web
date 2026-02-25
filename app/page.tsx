import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Blog } from "@/components/blog"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { SocialLinks } from "@/components/social-links"
import { getBlogPosts } from "@/lib/blog"

export default function Home() {
  const blogPosts = getBlogPosts()

  return (
    <div className="min-h-screen">
      <Navigation />
      <SocialLinks />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 lg:px-24">
        <Hero />
        <About />
        <Experience />
        <Blog posts={blogPosts} />
        <Contact />
      </main>
    </div>
  )
}
