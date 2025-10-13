import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Now } from "@/components/now"
import { Experience } from "@/components/experience"
import { Awards } from "@/components/awards"
import { Research } from "@/components/research"
import { Projects } from "@/components/projects"
import { Blog } from "@/components/blog"
import { Notes } from "@/components/notes"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { SocialLinks } from "@/components/social-links"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <SocialLinks />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 lg:px-24">
        <Hero />
        <About />
        <Now />
        <Awards />
        <Experience />
        <Research />
        <Projects />
        <Blog />
        <Notes />
        <Contact />
      </main>
    </div>
  )
}
