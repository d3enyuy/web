import { Mail } from "lucide-react"

import { SectionHeading } from "@/components/section-heading"

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 py-20 lg:py-24">
      <SectionHeading number="04" title="Get In Touch" />

      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          Email is the best place to start. If you want to talk about backend systems, product engineering, or a practical software problem, reach out there first.
        </p>
        <a
          href="mailto:gillslambiv@gmail.com"
          className="inline-flex items-center gap-3 rounded-md border-2 border-primary px-8 py-4 font-mono text-lg text-primary transition-all duration-200 hover:bg-primary/10"
        >
          <Mail className="h-5 w-5" />
          gillslambiv@gmail.com
        </a>
      </div>

      <footer className="mt-24 border-t border-border pt-8 text-center">
        <p className="font-mono text-sm text-muted-foreground">Built with Next.js & Tailwind CSS</p>
        <p className="mt-2 text-sm text-muted-foreground">© {new Date().getFullYear()} Lambiv Gills Dzenyuy. All rights reserved.</p>
      </footer>
    </section>
  )
}
