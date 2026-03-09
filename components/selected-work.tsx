import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/section-heading"
import { featuredProjects } from "@/lib/site-content"

export function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-28 py-20 lg:py-24">
      <SectionHeading
        number="02"
        title="Selected Work"
        description="A mix of professional work and personal projects. The through-line is practical software that solves an operational or human problem clearly."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <article
            key={project.slug}
            className="flex h-full flex-col rounded-2xl border border-border bg-card/60 p-6 shadow-sm transition-colors hover:border-primary/40"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">{project.kind}</p>
                <h3 className="mt-3 text-xl font-semibold text-foreground">{project.title}</h3>
              </div>
              <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                {project.status}
              </Badge>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">{project.summary}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Badge
                  key={item}
                  variant="outline"
                  className="border-border bg-background/60 text-xs text-muted-foreground"
                >
                  {item}
                </Badge>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/projects#${project.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Read case study
                <ArrowRight className="h-4 w-4" />
              </Link>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Visit site
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View all project write-ups
          <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="text-sm text-muted-foreground">Private client work stays high-level. The goal is clarity, not theater.</p>
      </div>
    </section>
  )
}
