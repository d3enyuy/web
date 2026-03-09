import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { SelectedWork } from "@/components/selected-work"
import { Experience } from "@/components/experience"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 md:px-12 lg:px-24">
        <Hero />
        <About />
        <SelectedWork />
        <Experience />
        <Contact />
      </main>
    </div>
  )
}
