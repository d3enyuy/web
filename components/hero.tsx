import Link from "next/link"
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"

export function Hero() {
  return (
    <section id="hero" className="py-12 lg:py-20">
      <div className="max-w-3xl">
        <p className="font-mono text-sm text-primary md:text-base">Software engineer across distributed teams</p>

        <h1 className="mt-5 text-5xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
          Lambiv Gills Dzenyuy
        </h1>

        <p className="mt-6 text-3xl font-semibold leading-tight text-muted-foreground md:text-4xl">
          I build backend-heavy products and systems that stay useful after launch.
        </p>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Recent work has included NDA-protected media platforms, AI products, sales automation systems, and internal tools for billing, usage, and outreach.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View selected work
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/now"
            className="inline-flex items-center gap-2 rounded-md border border-primary px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            What I&apos;m focused on
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <a
            href="https://github.com/d3enyuw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-primary"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/lambiv-dzenyuy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-primary"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href="mailto:gillslambiv@gmail.com"
            className="inline-flex items-center gap-2 transition-colors hover:text-primary"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
          <a
            href="/cv.pdf"
            download="Lambiv_Gills_Dzenyuy_CV.pdf"
            className="inline-flex items-center gap-2 transition-colors hover:text-primary"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
        </div>
      </div>
    </section>
  )
}
